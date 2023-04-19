import { createContext, useState } from "react";

export const NewTransactionContext = createContext({});

const NewTransactionProvider = ({ children }) => {
  //state for modal
  const [openForm, setOpenForm] = useState(false);

  //state for confirmation modal
  const [confirmation, setConfirmation] = useState(false);

  const initialTransactionState = {
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

  //state for transaction
  const [transaction, setTransaction] = useState(initialTransactionState);

  //handle modal open and close
  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);

  return (
    <NewTransactionContext.Provider
      value={{
        openForm,
        handleOpenForm,
        handleCloseForm,
        confirmation,
        setConfirmation,
        transaction,
        setTransaction,
        initialTransactionState,
      }}
    >
      {children}
    </NewTransactionContext.Provider>
  );
};

export default NewTransactionProvider;
