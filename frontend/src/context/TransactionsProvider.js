import { createContext, useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import axiosInstance from "../api/myBankApi";

export const TransactionsContext = createContext({});

const TransactionsProvider = ({ children }) => {
  //retrieve auth state
  const { auth } = useAuth();

  //retrieve response, error, loading and axiosFetch from useAxios custom hook
  const [response, error, loading, axiosFetch] = useAxios();

  const [transactions, setTransactions] = useState([]);
  const [noTransactions, setNoTransactions] = useState(false);

  const [errMessage, setErrMessage] = useState("");

  //fetch transactions on component mount
  useEffect(() => {
    axiosFetch({
      axiosInstance: axiosInstance(auth),
      method: "GET",
      url: "/transactions",
    });
  }, []);

  //set transactions state when response is received
  useEffect(() => {
    if (response?.data) {
      setTransactions(response.data);
    }
    if (response?.data?.length === 0) {
      setNoTransactions(true);
    }
  }, [response.data]);

  //set error message when error is received
  useEffect(() => {
    if (error) {
      setErrMessage("Error on loading transactions. Please reload the app.");
    }
  }, [error]);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        setTransactions,
        noTransactions,
        errMessage,
        loading,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export default TransactionsProvider;
