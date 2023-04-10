import axiosInstance from "../../../api/myBankApi";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import { useEffect } from "react";
import { IBAN_REGEX } from "../../../utils/regex";
import {
  Button,
  Typography,
  Box,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
const TransactionCreation = ({
  accounts,
  handleCloseForm,
  transaction,
  setTransaction,
  setConfirmation,
}) => {
  //retrieve auth from useAuth hook
  const { auth } = useAuth();

  //retrieve axios response, error, loading and axiosFetch function from useAxios hook
  const [response, error, loading, axiosFetch] = useAxios();

  const validateDestinationAcc = async () => {
    await axiosFetch({
      axiosInstance: axiosInstance(auth),
      method: "GET",
      url: `/accounts/validate/${transaction.destinationAccount.replace(
        /\s/g,
        ""
      )}`,
    });
  };

  useEffect(() => {
    if (response.data) {
      setTransaction({
        ...transaction,
        validDestinationAcc: true,
        beneficiaryName: response.data.owner,
        destinationAccountId: response.data.id,
      });
    }
  }, [response]);

  useEffect(() => {
    const result = IBAN_REGEX.test(
      transaction.destinationAccount.replace(/ /g, "")
    );
    console.log(result);
    if (result) {
      validateDestinationAcc();
    }
  }, [transaction.destinationAccount]);

  const handleNewTransaction = async () => {
    //prevent multiple requests
    if (loading) return;
    console.log("New transaction created", transaction);
    setConfirmation(true);
  };

  const handleSelectChange = (e) => {
    const account = accounts.find((account) => account._id === e.target.value);
    setTransaction({
      ...transaction,
      sourceAccountId: e.target.value,
      sourceAccountBalance: account.balance,
    });
  };
  return (
    <>
      <Typography
        sx={{ textAlign: "center" }}
        id='transition-modal-title'
        variant='h6'
        component='h2'
      >
        Create new transaction:
      </Typography>
      <Box
        mt={5}
        component='form'
        sx={{
          "& .MuiTextField-root": { mb: 2, width: "100%" },
        }}
        noValidate
        autoComplete='off'
        onSubmit={(e) => e.preventDefault()}
      >
        <InputLabel id='source-account'>1. Choose source account:</InputLabel>
        <Select
          sx={{ mb: 2, width: "100%" }}
          labelId='source-account'
          id='source-account-select'
          value={transaction.sourceAccountId}
          label='Source Account'
          onChange={(e) => handleSelectChange(e)}
        >
          {accounts.map((account) => {
            return (
              <MenuItem
                key={account._id}
                value={account._id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {account.number}
                <Typography
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  {account.balance} €
                </Typography>
              </MenuItem>
            );
          })}
        </Select>
        <InputLabel id='destination-account'>
          2. Enter destination account:
        </InputLabel>
        <TextField
          id='destination-account-input'
          variant='outlined'
          sx={{
            width: "100%",
          }}
          value={transaction.destinationAccount}
          onChange={(e) =>
            setTransaction({
              ...transaction,
              destinationAccount: e.target.value,
            })
          }
        />
        <InputLabel id='amount'>3. Enter amount:</InputLabel>
        <OutlinedInput
          type='number'
          id='amount-input'
          variant='outlined'
          startAdornment={<InputAdornment position='start'>€</InputAdornment>}
          sx={{ width: "100%", mb: 2 }}
          value={transaction.amount}
          onChange={(e) =>
            setTransaction({ ...transaction, amount: e.target.value })
          }
        />
        <InputLabel id='description'>4. Enter description:</InputLabel>
        <TextField
          id='description-input'
          variant='outlined'
          sx={{
            width: "100%",
          }}
          value={transaction.description}
          onChange={(e) =>
            setTransaction({
              ...transaction,
              description: e.target.value,
            })
          }
        />
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
          <Button variant='contained' onClick={handleNewTransaction}>
            Transfer money
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default TransactionCreation;
