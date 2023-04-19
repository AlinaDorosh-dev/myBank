/**
 * @fileoverview This file contains the TransactionCreation component. This component is used to create a new transaction.
 */
import axiosInstance from "../../../api/myBankApi";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState, useContext } from "react";
import { AccountsContext } from "../../../context/AccountsProvider";
import { NewTransactionContext } from "../../../context/NewTransactionProvider";
import { IBAN_REGEX, AMOUNT_REGEX } from "../../../utils/regex";
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
  Alert,
} from "@mui/material";

const TransactionCreation = () => {
  //retrieve auth from useAuth hook
  const { auth } = useAuth();

  //retrieve axios response, error, loading and axiosFetch function from useAxios hook
  const [response, error, loading, axiosFetch] = useAxios();

  //retrieve accounts from AccountsContext
  const { accounts } = useContext(AccountsContext);

  //retrieve states from NewTransactionContext
  const { handleCloseForm, transaction, setTransaction, setConfirmation } =
    useContext(NewTransactionContext);

  //function for validate the destination account on the server
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

  //Once the user has entered a valid IBAN, check if the account exists
  useEffect(() => {
    const result = IBAN_REGEX.test(
      transaction.destinationAccount.replace(/ /g, "")
    );

    if (result) {
      validateDestinationAcc();
    }
  }, [transaction.destinationAccount]);

  //If the account exists, set the beneficiary name and account id
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

  const [instructions, setInstructions] = useState({
    destinationAccount: "",
    amount: "",
    description: "",
  });

  useEffect(() => {
    setInstructions({
      destinationAccount: "",
      amount: "",
      description: "",
    });
  }, [transaction]);

  const ibanTest = () =>
    IBAN_REGEX.test(transaction.destinationAccount.replace(/ /g, ""));

  const amountTest = () => AMOUNT_REGEX.test(transaction.amount);

  //handle proceed to transaction confirmation
  const handleNewTransaction = async () => {
    switch (true) {
      case !ibanTest():
        setInstructions({
          ...instructions,
          destinationAccount: "Please enter a valid destination IBAN",
        });
        break;
      case ibanTest() && !transaction.validDestinationAcc:
        setInstructions({
          ...instructions,
          destinationAccount:
            "Destination account not found. Please check the IBAN",
        });
        break;
      case transaction.amount > transaction.sourceAccountBalance:
        setInstructions({
          ...instructions,
          amount: "Insufficient funds in source account",
        });
        break;
      case transaction.amount <= 0 || !amountTest():
        setInstructions({
          ...instructions,
          amount: "Please enter a valid amount",
        });
        break;
      case transaction.description?.length < 5 ||
        transaction.description?.length > 100:
        setInstructions({
          ...instructions,
          description: "Description must be between 5 and 100 characters",
        });
        break;
      default:
        setConfirmation(true);
        break;
    }
  };

  //handle for selecing source account
  const handleSelectChange = (e) => {
    const account = accounts?.find((account) => account._id === e.target.value);
    setTransaction({
      ...transaction,
      sourceAccountId: e.target.value,
      sourceAccountBalance: account.balance,
    });
  };

  //handle input change
  const handleInputChange = (e) => {
    if (e.target.name === "amount") {
      setTransaction({
        ...transaction,
        [e.target.name]: Number(e.target.value).toFixed(2),
      });
    }
    setTransaction({
      ...transaction,
      [e.target.name]: e.target.value,
    });
  };
  console.log(accounts);

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
      {(instructions.destinationAccount ||
        instructions.amount ||
        instructions.description) && (
        <Alert severity='warning'>
          {Object.keys(instructions).map((key) => {
            return <Typography key={key}>{instructions[key]}</Typography>;
          })}
        </Alert>
      )}

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
          {accounts?.map((account) => {
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
                  {account.balance.toFixed(2)} €
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
          name='destinationAccount'
          onChange={(e) => handleInputChange(e)}
        />
        <InputLabel id='amount'>3. Enter amount:</InputLabel>
        <OutlinedInput
          type='number'
          step='.01'
          pattern='^\d*(\.\d{0,2})?$'
          id='amount-input'
          variant='outlined'
          startAdornment={<InputAdornment position='start'>€</InputAdornment>}
          sx={{ width: "100%", mb: 2 }}
          value={transaction.amount}
          name='amount'
          onChange={(e) => handleInputChange(e)}
        />
        <InputLabel id='description'>4. Enter description:</InputLabel>
        <TextField
          id='description-input'
          variant='outlined'
          sx={{
            width: "100%",
          }}
          value={transaction.description}
          name='description'
          onChange={(e) => handleInputChange(e)}
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
