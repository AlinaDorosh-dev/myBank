/**
 * @fileoverview This component is the parent component for the transaction creation and confirmation components
*/

import TransactionCreation from "./TransactionCreation";
import TransactionConfirmation from "./TransactionConfirmation";
import { Fade, Modal, Box, Backdrop, CircularProgress } from "@mui/material";
import { modalStyle } from "../../../styles/modalStyle";
import { useState } from "react";

export const initialTransactionState = {
  sourceAccountId: "",
  sourceAccountBalance: 0,
  destinationAccount: "",
  destinationAccountId: "",
  beneficiaryName: "",
  validDestinationAcc: false,
  amount: "",
  description: "",
  errMsg: "",
};

const NewTransactionForm = ({ openForm, handleCloseForm, accounts }) => {

  //state for confirmation modal
  const [confirmation, setConfirmation] = useState(false);

  //state for transaction
  const [transaction, setTransaction] = useState(initialTransactionState);

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
          {!confirmation && (
            <TransactionCreation
              accounts={accounts}
              handleCloseForm={handleCloseForm}
              transaction={transaction}
              setTransaction={setTransaction}
              setConfirmation={setConfirmation}
            />
          )}
          {confirmation && (
            <TransactionConfirmation
              transaction={transaction}
              setTransaction={setTransaction}
              handleCloseForm={handleCloseForm}
              setConfirmation={setConfirmation}
            />
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default NewTransactionForm;
