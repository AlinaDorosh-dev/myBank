/**
 * @fileoverview This file contains the NotificationProvider component which is used to manage and provide the notifications state to all components that need it
 */
import { createContext, useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import axiosInstance from "../api/myBankApi";

export const NotificationContext = createContext({});

const NotificationProvider = ({ children }) => {
  const { auth } = useAuth();
  const [response, error, loading, axiosFetch] = useAxios();
  const [notifications, setNotifications] = useState([]);
  const [noNotifications, setNoNotifications] = useState(false);

  useEffect(() => {
    axiosFetch({
      axiosInstance: axiosInstance(auth),
      method: "GET",
      url: "/notifications",
    });
  }, []);

  useEffect(() => {
    if (response?.data) {
      const sortedNotifications = response.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setNotifications(sortedNotifications);
    }
    if (response?.data?.length === 0) {
      setNoNotifications(true);
    }
  }, [response.data]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,
        noNotifications,
        setNoNotifications,
        error, 
        loading,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
