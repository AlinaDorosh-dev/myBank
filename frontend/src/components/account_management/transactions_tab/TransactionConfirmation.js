import { Typography, Box, Button } from "@mui/material";
import axiosInstance from "../../../api/myBankApi";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import { useEffect } from "react";

const TransactionConfirmation = ({ transaction, handleCloseForm }) => {
  //retrieve auth from useAuth hook
  const { auth } = useAuth();

  //retrieve axios response, error, loading and axiosFetch function from useAxios hook
  const [response, error, loading, axiosFetch] = useAxios();

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

  useEffect(() => {
    console.log("response", response);
  }, [response]);
  return (
    <Box mt={5} p={2}>
      <Typography
        sx={{ textAlign: "center" }}
        id='transition-modal-title'
        variant='h6'
        component='h2'
      >
        Confirm transaction:
      </Typography>
      <Box>
        <Typography sx={{ fontWeight: "bold" }} variant='body2'>
          Amount:
        </Typography>
        <Typography variant='body2'>{transaction.amount} €</Typography>
      </Box>

      <Box>
        <Typography sx={{ fontWeight: "bold" }} variant='body2'>
          Beneficiary name:
        </Typography>
        <Typography variant='body2'>{transaction.beneficiaryName}</Typography>
      </Box>

      <Box>
        <Typography sx={{ fontWeight: "bold" }} variant='body2'>
          Destination account:
        </Typography>
        <Typography variant='body2'>
          {transaction.destinationAccount}
        </Typography>
      </Box>

      <Box>
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
        <Button variant='outlined' onClick={handleCloseForm}>
          Cancel
        </Button>
        <Button variant='contained' onClick={handleConfirm}>
          Confirm
        </Button>
      </Box>
    </Box>
  );
};

export default TransactionConfirmation;
