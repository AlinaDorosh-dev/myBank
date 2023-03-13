import DashboardDrawer from "../components/DashboardDrawer";
import { Box, Paper, Typography, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import axiosInstance from "../api/myBankApi";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import NewAccountBtn from "../components/NewAccountBtn";
import { ACCOUNTS_URL } from "../api/config";
const AccountManagement = () => {
  const theme = useTheme();
  const [response, error, loading, axiosFetch] = useAxios();
  const { auth } = useAuth();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [accounts, setAccounts] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    axiosFetch({
      axiosInstance: axiosInstance(auth),
      method: "GET",
      url: ACCOUNTS_URL,
    });
  }, []);

  useEffect(() => {
    if (response?.data) {
      setAccounts(response.data);
    }
  }, [response.data]);

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: theme.palette.primary.background,
        height: "100vh",
        width: "100vw",
      }}
    >
      <DashboardDrawer setSelectedIndex={setSelectedIndex} />
      <Box component='section' sx={{ flexGrow: 1, p: 5 }}>
        {loading && (
          <CircularProgress/>
        )}
        {!loading && selectedIndex === 0 && (
          <>
            <Box
              display='flex'
              sx={{
                mt: 4,
                justifyContent: "space-between",
                alignItems: "center",
                position: "absolute",
                right: "15px",
              }}
            >
              <Paper
                variant='elevation'
                elevation={3}
                sx={{ mr: 2, p: 1, textAlign: "center" }}
              >
                <Typography
                  variant='subtitle2'
                  color={theme.palette.primary.dark}
                >
                  Total ballance:
                  {totalBalance}€
                </Typography>
              </Paper>
              <NewAccountBtn
                accounts={accounts}
                setTotalBalance={setTotalBalance}
                setAccounts={setAccounts}
              />
            </Box>
            {!loading && accounts.length && (
              <Box sx={{ mt: 12, width: "100%" }}>
                {accounts.map((account, index) => (
                  <Paper
                    variant='elevation'
                    key={index}
                    elevation={16}
                    sx={{
                      m: 3,
                      p: 2,
                      width: "90%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant='subtitle2'>
                      {account.number}
                    </Typography>
                    <Typography
                      variant='subtitle2'
                      color={theme.palette.primary.dark}
                    >
                      {account.balance}€
                    </Typography>
                  </Paper>
                ))}
              </Box>
            )}
            {!loading && !accounts.length && (
              <Typography
                color={theme.palette.primary.dark}
                sx={{ mt: 12, width: "100%" }}
                variant='h5'
              >
                You have no account yet. Open one.
              </Typography>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default AccountManagement;
