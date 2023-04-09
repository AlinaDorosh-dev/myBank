/**
 * @fileoverview NewAccountBtn component
 * contains the button to create a new account && modal to confirm account creation
 */

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
} from "@mui/material";
import { NEW_ACCOUNT_URL } from "../../../api/config";
import { modalStyle } from "../../../styles/modalStyle";


const NewAccountBtn = ({ accounts, setTotalBalance, setAccounts }) => {
  //retrieve axios response, error, loading and axiosFetch function from useAxios hook
  const [response, error, loading, axiosFetch] = useAxios();

  //retrieve auth from useAuth hook
  const { auth } = useAuth();

  //state for modal
  const [openModal, setOpenModal] = useState(false);

  //state for alert
  const [openAlert, setOpenAlert] = useState(false);

  //state for avoiding user from creating more than 3 accounts
  const [accountsExcess, setAccountsExcess] = useState(false);

  //update accounts and total balance when a new account is created
  useEffect(() => {
    if (response?.data) {
      setAccounts([...accounts, response.data]);
    }
  }, [response.data]);

  useEffect(() => {
    if (accounts.length)
      setTotalBalance(accounts.map((i) => i.balance).reduce((a, b) => a + b));
  }, [accounts]);

  useEffect(() => {
    console.log(error); //log error to console for debugging purposes
  }, [error]);

  //handle modal open and close
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  //handle new account creation
  const handleNewAccount = async () => {
    //prevent multiple requests
    if (loading) return;

    //prevent user from creating more than 3 accounts
    if (accounts?.length >= 3) {
      setAccountsExcess(true);
      setOpenAlert(true);
      setTimeout(() => {
        handleCloseModal();
      }, 2500);
      setTimeout(() => {
        setOpenAlert(false);
      }, 3000);
      return;
    }
    //send request to create new account
    await axiosFetch({
      axiosInstance: axiosInstance(auth),
      method: "POST",
      url: NEW_ACCOUNT_URL,
    });
    //show alert
    setOpenAlert(true);
    setTimeout(() => {
      handleCloseModal();
    }, 2500);
    setTimeout(() => {
      setOpenAlert(false);
    }, 3000);
  };
  return (
    <>
      <Button variant='outlined' onClick={handleOpenModal}>
        New Account
      </Button>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModal}>
          <Box sx={modalStyle}>
            {loading && <CircularProgress />}
            {!openAlert && !loading && (
              <>
                <Typography
                  sx={{ textAlign: "center" }}
                  id='transition-modal-title'
                  variant='h6'
                  component='h2'
                >
                  Do you want to create a new account in myBank?
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    mt: 2,
                  }}
                >
                  <Button variant='outlined' onClick={handleCloseModal}>
                    Cancel
                  </Button>
                  <Button variant='contained' onClick={handleNewAccount}>
                    Confirm
                  </Button>
                </Box>
              </>
            )}
            {!loading && openAlert && !accountsExcess && (
              <Alert severity={!error ? "success" : "error"}>
                {!error ? "Account created successfully" : `${error}`}
              </Alert>
            )}
            {!loading && openAlert && accountsExcess && (
              <Alert severity='warning'>
                You can have only up to 3 accounts
              </Alert>
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default NewAccountBtn;
