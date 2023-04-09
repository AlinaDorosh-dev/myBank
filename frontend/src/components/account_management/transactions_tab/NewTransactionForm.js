import axiosInstance from "../../../api/myBankApi";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Fade,
  Modal,
  Box,
  Backdrop,
  Alert,
  CircularProgress,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { modalStyle } from "../../../styles/modalStyle";

const NewTransactionForm = ({
  openForm,
  setOpenForm,
  handleCloseForm,
  handleOpenForm,
  accounts,
}) => {
  //retrieve axios response, error, loading and axiosFetch function from useAxios hook
  const [response, error, loading, axiosFetch] = useAxios();
  console.log(accounts);
  //retrieve auth from useAuth hook
  const { auth } = useAuth();

  const [transaction, setTransaction] = useState({
    sourceAccount: "",
    destinationAccount: "",
    amount: "",
    description: "",
  });

  const handleNewTransaction = async () => {
    //prevent multiple requests
    if (loading) return;
    console.log("New transaction created", transaction);
  };

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={openForm}
      onClose={handleCloseForm}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={openForm}>
        <Box sx={modalStyle}>
          {loading && <CircularProgress />}
          {!loading && (
            <>
              <Typography
                sx={{ textAlign: "center" }}
                id='transition-modal-title'
                variant='h6'
                component='h2'
              >
                Create new transaction:
              </Typography>

              <InputLabel id='source-account'>
                1. Choose source account:
              </InputLabel>
              <Select
                sx={{ width: "100%" }}
                labelId='source-account'
                id='source-account-select'
                value={transaction.sourceAccount}
                label='Source Account'
                onChange={(e) =>
                  setTransaction({
                    ...transaction,
                    sourceAccount: e.target.value,
                  })
                }
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
                startAdornment={
                  <InputAdornment position='start'>€</InputAdornment>
                }
                sx={{ width: "100%" }}
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
                  Confirm
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default NewTransactionForm;
