/**
 * @fileoverview AccountsTab component renders the accounts tab in the account management page
 * 
 */

import NewAccountBtn from "./NewAccountBtn";
import { Box, Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axiosInstance from "../../../api/myBankApi";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import { ACCOUNTS_URL } from "../../../api/config";
import { useTheme } from "@mui/material/styles";

const AccountsTab = ({ accounts, setAccounts }) => {
  //retrieve auth state
  const { auth } = useAuth();

  //retrieve response, error, loading and axiosFetch from useAxios custom hook
  const [response, error, loading, axiosFetch] = useAxios();

  const theme = useTheme();
  
  //state for total balance
  const [totalBalance, setTotalBalance] = useState(0);

  //state for displaying alert when there are no accounts
  const [noAccounts, setNoAccounts] = useState(false);

  //fetch accounts when component mounts
  useEffect(() => {
    axiosFetch({
      axiosInstance: axiosInstance(auth),
      method: "GET",
      url: ACCOUNTS_URL,
    });
  }, []);

  //update accounts state when response is received
  useEffect(() => {
    if (response?.data) {
      setAccounts(response.data);
    }

    //display alert when there are no accounts
    if (response?.data?.length === 0) {
      setNoAccounts(true);
    }
  }, [response.data]);
  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "75%", md: "85%" },
        ml: { xs: 0, sm: 25, md: 15 },
      }}
    >
      {!loading && (
        <>
          <Box
            display='flex'
            sx={{
              mt: { xs: 20, sm: 8 },
              justifyContent: { xs: "space-evenly", sm: "space-between" },
              width: "100%",
              alignItems: "center",
              mx: "auto",
              p:{sm:3}
            }}
          >
            <Paper
              variant='elevation'
              elevation={3}
              sx={{ p: 1, textAlign: "center" }}
            >
              <Typography
                variant='subtitle2'
                color={theme.palette.primary.dark}
              >
                Total balance:
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
            <>
              <Box sx={{ mt: 3, width: "100%" }}>
                <Typography
                  variant='h6'
                  sx={{
                    textAlign: "center",
                    mb: 1,
                  }}
                >
                  Your accounts:
                </Typography>
                {accounts.map((account, index) => (
                  <Paper
                    variant='elevation'
                    key={index}
                    elevation={16}
                    sx={{
                      mb: 2,
                      mr: "auto",
                      ml: "auto",
                      p: 1.5,
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
            </>
          )}
          {noAccounts && (
            <Typography
              color={theme.palette.primary.dark}
              sx={{ mt: 12, width: "100%", textAlign: "center" }}
              variant='h5'
            >
              You have no account yet. Open one.
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default AccountsTab;
