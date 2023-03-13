import axiosInstance from "../api/myBankApi";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { Button, Typography, Fade, Modal, Box, Backdrop } from "@mui/material";
import { NEW_ACCOUNT_URL } from "../api/config";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const NewAccountBtn = ({ accounts, setTotalBalance, setAccounts }) => {
  const [response, error, loading, axiosFetch] = useAxios();
  const { auth } = useAuth();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (response?.data) {
      setAccounts([...accounts, response.data]);
    }
  }, [response.data]);

  useEffect(() => {
    if (accounts.length)
      setTotalBalance(accounts.map((i) => i.balance).reduce((a, b) => a + b));
  }, [accounts]);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleNewAccount = () => {
    axiosFetch({
      axiosInstance: axiosInstance(auth),
      method: "POST",
      url: NEW_ACCOUNT_URL,
    });
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
          <Box sx={style}>
            <Typography sx={{textAlign: "center"}}id='transition-modal-title' variant='h6' component='h2'>
              Do you want to create a new account in myBank?
            </Typography>
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
              mt: 2
            }}>
              <Button variant='outlined' onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant='contained' onClick={handleNewAccount}>
                Confirm
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default NewAccountBtn;
