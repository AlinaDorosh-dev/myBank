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
      setNotifications(response.data);
      console.log(response.data);
    }
    if (response?.data?.length === 0) {
      setNoNotifications(true);
    }
  }, [response.data]);

  return (
    <NotificationContext.Provider value={{
        notifications,
        setNotifications,
        noNotifications,
        setNoNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
