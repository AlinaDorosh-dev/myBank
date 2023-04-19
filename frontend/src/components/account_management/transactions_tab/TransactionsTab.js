/**
 * @fileoverview This file contains the TransactionsTab component which is a tab in the AccountManagement component. It contains the NewTransactionForm component and the TransactionsHistory component.
 */
import { Button } from "@mui/material";
import NewTransactionForm from "./new_transaction/NewTransactionForm";
import TransactionsHistory from "./transactions_history/TransactionsHistory";
import TransactionsProvider from "../../../context/TransactionsProvider";
import { useContext } from "react";
import { NewTransactionContext } from "../../../context/NewTransactionProvider";

const TransactionsTab = () => {
  //retrieve states from NewTransactionContext
  const { handleOpenForm } = useContext(NewTransactionContext);
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
      <TransactionsProvider>
        <NewTransactionForm />
        <TransactionsHistory />
      </TransactionsProvider>
    </>
  );
};

export default TransactionsTab;
