import TransactionCreation from "./TransactionCreation";
import TransactionConfirmation from "./TransactionConfirmation";
import { Fade, Modal, Box, Backdrop, CircularProgress } from "@mui/material";
import { modalStyle } from "../../../styles/modalStyle";
import { useState } from "react";

const NewTransactionForm = ({ openForm, handleCloseForm, accounts }) => {
  const [confirmation, setConfirmation] = useState(false);

  const [transaction, setTransaction] = useState({
    sourceAccountId: "",
    sourceAccountBalance: 0,
    destinationAccount: "",
    destinationAccountId: "",
    beneficiaryName: "",
    validDestinationAcc: false,
    amount: "",
    description: "",
    errMsg: "",
  });

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
            <TransactionConfirmation transaction={transaction} handleCloseForm={handleCloseForm} />
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default NewTransactionForm;
