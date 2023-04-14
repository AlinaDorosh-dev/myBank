/**
 * @fileoverview This file contains the TransactionsTab component which is a tab in the AccountManagement component. It contains the NewTransactionForm component and the TransactionsHistory component.
 */
import { Button } from "@mui/material";
import { useState } from "react";
import NewTransactionForm from "./NewTransactionForm";
import TransactionsHistory from "./TransactionsHistory";

const TransactionsTab = ({ accounts }) => {
  //state for modal
  const [openForm, setOpenForm] = useState(false);

  //handle modal open and close
  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);
  return (
    <>
      <Button
        variant='outlined'
        sx={{
          mt: { xs: 20, sm: 10 },
          ml: { xs: 1 },
          position: { sm: "absolute" },
          top: { sm: 10 },
          right: { sm: 15 },
        }}
        onClick={handleOpenForm}
      >
        Transfer money
      </Button>
      <NewTransactionForm
        openForm={openForm}
        setOpenForm={setOpenForm}
        handleOpenForm={handleOpenForm}
        handleCloseForm={handleCloseForm}
        accounts={accounts}
      />
      <TransactionsHistory />
    </>
  );
};

export default TransactionsTab;
