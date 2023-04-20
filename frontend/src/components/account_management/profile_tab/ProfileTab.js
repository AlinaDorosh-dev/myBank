/**
 * @fileoverview ProfileTab component renders the profile tab in the account management page.
 * It displays the user's profile information 
 */
import axiosInstance from "../../../api/myBankApi";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { Typography, Box, Paper, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const ProfileTab = () => {
  const theme = useTheme();

  //retrieve auth state
  const { auth } = useAuth();
  const decoded = jwt_decode(auth);
  const userId = decoded?.UserInfo?.id;

  //retrieve response, error, loading and axiosFetch from useAxios custom hook
  const [response, error, loading, axiosFetch] = useAxios();

  const [userData, setUserData] = useState({});

  const [fields, setFields] = useState([]);

  //fetch profile data when component mounts
  useEffect(() => {
    axiosFetch({
      axiosInstance: axiosInstance(auth),
      method: "GET",
      url: `/auth/user/${userId}`,
    });
  }, []);

  useEffect(() => {
    if (response?.data) setUserData(response?.data);
  }, [response?.data]);

  useEffect(() => {
    const fields = [
      {
        label: "First Name",
        value: userData.firstName,
      },
      { label: "Last Name", value: userData.lastName },
      { label: "Phone", value: userData.phone },
      {
        label: "Birth Date",
        value: new Date(userData.birthDate).toLocaleDateString(),
      },
      { label: "Address", value: userData.address?.address },
      { label: "City", value: userData.address?.city },
      { label: "Zip Code", value: userData.address?.zipCode },
      { label: "Document Type", value: userData.documentType?.toUpperCase() },
      { label: "Document Number", value: userData.documentNumber },
    ];
    setFields(fields);
  }, [userData]);

  return (
    <Box
      sx={{
        mt: { xs: 20, md: 10 },
      }}
    >
      <Typography variant='h4' textAlign={"center"} sx={{ mb: 2 }}>
        Profile information
      </Typography>
      {loading ? (
        <CircularProgress
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: " translate(-50%, -50%)",
          }}
        />
      ) : (
        <Paper
          elevation={3}
          sx={{
            width: { xs: "95%", sm: "60%" },
            maxWidth: 500,
            textAlign: "center",

            p: 4,
            ml: { xs: "auto", sm: 30, md: "auto" },
            mr: { xs: "auto" },
          }}
        >
          {fields.map((field) => (
            <Box
              key={field.label}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                variant='h6'
                sx={{
                  color: theme.palette.primary.dark,
                  fontWeight: "bold",
                  mr: 2,
                }}
              >
                {field.label}:
              </Typography>
              <Typography variant='body1'>{field.value}</Typography>
            </Box>
          ))}
        </Paper>
      )}
    </Box>
  );
};

export default ProfileTab;
