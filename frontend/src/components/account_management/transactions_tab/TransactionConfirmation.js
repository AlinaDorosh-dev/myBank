import { Typography, Box, Button, CircularProgress,Alert } from "@mui/material";
import axiosInstance from "../../../api/myBankApi";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
const TransactionConfirmation = ({
  transaction,
  handleCloseForm,
  setConfirmaton,
}) => {
  //retrieve auth from useAuth hook
  const { auth } = useAuth();

  //retrieve axios response, error, loading and axiosFetch function from useAxios hook
  const [response, error, loading, axiosFetch] = useAxios();
  const [openAlert, setOpenAlert] = useState(false);

  const theme = useTheme();
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
    if (response?.data) {
      setOpenAlert(true);
    }
  }, [response]);
  return (
    <>
      {loading && (
        <CircularProgress
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
      {!loading && (
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
            <Button variant='outlined' onClick={handleCloseForm}>
              Cancel
            </Button>
            <Button variant='contained' onClick={handleConfirm}>
              Confirm
            </Button>
          </Box>
        </Box>
      )}

{!loading && openAlert  && (
              <Alert severity={!error ? "success" : "error"}>
                {!error ? "The money was transferred successfully." : `${error}`}
              </Alert>
            )}
    </>
  );
};

export default TransactionConfirmation;
