/**
 * @fileoverview This file contains the TransactionsHistory component. This component is used to display users transactions history
 */
import { Typography, Box, CircularProgress, Alert } from "@mui/material";

import { TransactionsContext } from "../../../../context/TransactionsProvider";
import { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import TransactionsTable from "./TransactionsTable";

const TransactionsHistory = () => {
  const theme = useTheme();

  //retrieve transactions state
  const { noTransactions, errMessage, loading } =
    useContext(TransactionsContext);

  return (
    <>
      {loading && (
        <CircularProgress
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
        />
      )}
      {!loading && noTransactions && (
        <Typography
          color={theme.palette.primary.dark}
          sx={{
            mt: { xs: 12, sm: 20 },
            mr: "auto",
            ml: { xs: "auto", sm: 25, md: "auto" },
            textAlign: "center",
            p: 2,
            width: {
              xs: "100%",
              sm: "70%",
              md: "60%",
            },
          }}
          variant='h5'
        >
          You have no transactions yet. Create your first transaction by
          clicking on the "Transfer money" button.
        </Typography>
      )}
      {!loading && !noTransactions && <TransactionsTable />}
      {!loading && errMessage && <Alert severity='error'>{errMessage}</Alert>}
    </>
  );
};

export default TransactionsHistory;
