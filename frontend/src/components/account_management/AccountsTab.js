import NewAccountBtn from "./NewAccountBtn";
import { Box, Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axiosInstance from "../../api/myBankApi";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { ACCOUNTS_URL } from "../../api/config";
import { useTheme } from "@mui/material/styles";

const AccountsTab = ({accounts, setAccounts}) => {
  const { auth } = useAuth();
  const theme = useTheme();
  const [response, error, loading, axiosFetch] = useAxios();

 

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
    if(response?.data?.length === 0){
      setNoAccounts(true);
    }
  }, [response.data]);
  return (
    <div>
      {!loading && (
        <>
          <Box
            display='flex'
            sx={{
              mt: 1,
              justifyContent: "space-between",
              alignItems: "center",
              position: "absolute",
              right: "15px",
              top: "60px",
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
            <Box sx={{ mt: 10, width: "100%" }}>
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
                  <Typography variant='subtitle2'>{account.number}</Typography>
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
    </div>
  );
};

export default AccountsTab;
