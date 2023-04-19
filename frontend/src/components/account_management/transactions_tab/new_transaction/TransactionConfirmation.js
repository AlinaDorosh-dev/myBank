/**
 * @fileoverview This file contains the TransactionConfirmation component. This component is used to confirm the transaction before sending it to the server.
 */
import {
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import axiosInstance from "../../../../api/myBankApi";
import useAxios from "../../../../hooks/useAxios";
import useAuth from "../../../../hooks/useAuth";
import { useEffect, useState, useContext } from "react";
import { AccountsContext } from "../../../../context/AccountsProvider";
import { NewTransactionContext } from "../../../../context/NewTransactionProvider";
import { TransactionsContext } from "../../../../context/TransactionsProvider";

const TransactionConfirmation = () => {
  //retrieve auth from useAuth hook
  const { auth } = useAuth();

  //retrieve transactions state
  const { setTransactions } = useContext(TransactionsContext);

  const {
    transaction,
    setTransaction,
    handleCloseForm,
    setConfirmation,
    initialTransactionState,
  } = useContext(NewTransactionContext);

  //retrieve accounts state
  const { accounts, setAccounts } = useContext(AccountsContext);

  //retrieve axios response, error, loading and axiosFetch function from useAxios hook
  const [response, error, loading, axiosFetch] = useAxios();

  //state for alert
  const [openAlert, setOpenAlert] = useState(false);

  const theme = useTheme();

  //send transaction to server
  const handleConfirm = async () => {
    await axiosFetch({
      axiosInstance: axiosInstance(auth),
      method: "POST",
      url: "/transactions",
      requestConfig: {
        amount: Number(transaction.amount),
        description: transaction.description,
        destinationAcc: transaction.destinationAccountId,
        sourceAcc: transaction.sourceAccountId,
      },
    });
  };

  //update alert state when response or error changes
  useEffect(() => {
    console.log("accounts", accounts);
    if (response?.data || error) {
      setOpenAlert(true);
    }

    if (response?.data) {
      setTransactions((prev) => {
        return {
          ...prev,
          outgoingTransactions: [...prev.outgoingTransactions, response.data],
        };
      });

      //Update the balance of the source account after transaction
      const updatedAccounts = accounts.map((acc) =>
        acc._id === transaction.sourceAccountId
          ? { ...acc, balance: acc.balance - transaction.amount }
          : acc
      );
      setAccounts(updatedAccounts);
    }
  }, [response, error]);

  //handle canceling transaction
  const handleCancel = () => {
    handleCloseForm();
    setTimeout(() => {
      setConfirmation(false);
      setOpenAlert(false);
      //reset transaction state
      setTransaction(initialTransactionState);
    }, 200);
  };
  return (
    <>
      {loading && (
        <CircularProgress
          sx={{
            position: "absolute",
            top: "40%",
            left: "45%",
            transform: " translate(-50%, -50%)",
          }}
        />
      )}
      {!loading && openAlert && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Alert severity={!error ? "success" : "error"}>
            {!error
              ? "The money was transferred successfully."
              : "Transaction failed.Please try again later."}
          </Alert>
          <Button
            variant='outlined'
            sx={{
              mt: 3,
            }}
            onClick={handleCancel}
          >
            Ok
          </Button>
        </Box>
      )}
      {!loading && !openAlert && (
        <Box mt={1} p={2}>
          <Typography
            sx={{
              mb: 2,
              textAlign: "center",
              color: theme.palette.primary.main,
            }}
            id='transition-modal-title'
            variant='h6'
            component='h2'
          >
            Confirm transaction:
          </Typography>
          <Box mt={1} p={1}>
            <Typography sx={{ fontWeight: "bold" }} variant='body2'>
              Amount:
            </Typography>
            <Typography variant='body2'>{transaction.amount} €</Typography>
          </Box>

          <Box mt={1} p={1}>
            <Typography sx={{ fontWeight: "bold" }} variant='body2'>
              Beneficiary name:
            </Typography>
            <Typography variant='body2'>
              {transaction.beneficiaryName}
            </Typography>
          </Box>

          <Box mt={1} p={1}>
            <Typography sx={{ fontWeight: "bold" }} variant='body2'>
              Destination account:
            </Typography>
            <Typography variant='body2'>
              {transaction.destinationAccount}
            </Typography>
          </Box>

          <Box mt={1} p={1}>
            <Typography sx={{ fontWeight: "bold" }} variant='body2'>
              Description:
            </Typography>
            <Typography variant='body2'>{transaction.description}</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              mt: 2,
            }}
          >
            <Button variant='outlined' onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant='contained' onClick={handleConfirm}>
              Confirm
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default TransactionConfirmation;
