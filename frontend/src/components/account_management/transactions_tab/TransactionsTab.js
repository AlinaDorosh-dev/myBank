import { Button } from "@mui/material";
import { useState } from "react";
import NewTransactionForm from "./NewTransactionForm";
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
          mt: 20,
          ml:1
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
    </>
  );
};

export default TransactionsTab;
