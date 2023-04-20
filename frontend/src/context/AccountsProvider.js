/**
 * @fileoverview This file contains the AccountsProvider component which is used to manage and provide the accounts state to all components that need it
 */
import { createContext } from "react";
import { useState } from "react";

export const AccountsContext = createContext({});

const AccountsProvider = ({ children }) => {
  //state for accounts
  const [accounts, setAccounts] = useState([]);

  //state for total balance
  const [totalBalance, setTotalBalance] = useState(0);

  //state for displaying alert when there are no accounts
  const [noAccounts, setNoAccounts] = useState(false);
  return (
    <AccountsContext.Provider
      value={{
        accounts,
        setAccounts,
        totalBalance,
        setTotalBalance,
        noAccounts,
        setNoAccounts,
      }}
    >
      {children}
    </AccountsContext.Provider>
  );
};

export default AccountsProvider;
