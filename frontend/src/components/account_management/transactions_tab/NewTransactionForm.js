/**
 * @fileoverview This component is the parent component for the transaction creation and confirmation components
 */

import TransactionCreation from "./TransactionCreation";
import TransactionConfirmation from "./TransactionConfirmation";
import { Fade, Modal, Box, Backdrop } from "@mui/material";
import { modalStyle } from "../../../styles/modalStyle";
import { useContext } from "react";
import { NewTransactionContext } from "../../../context/NewTransactionProvider";

const NewTransactionForm = () => {
  //retrieve states from NewTransactionContext
  const { openForm, handleCloseForm, confirmation } = useContext(
    NewTransactionContext
  );
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
          {!confirmation && <TransactionCreation />}
          {confirmation && <TransactionConfirmation />}
        </Box>
      </Fade>
    </Modal>
  );
};

export default NewTransactionForm;
