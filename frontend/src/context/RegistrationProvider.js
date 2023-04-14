import { createContext, useState } from "react";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import axiosInstance from "../api/myBankApi";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";

export const RegistrationContext = createContext({});

const RegistrationProvider = ({ children }) => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Personal Info", "Address", "Document"];

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    birthDate: "",
    address: "",
    city: "",
    zipCode: "",
    documentType: "",
    documentNumber: "",
  });

  const [response, error, loading, axiosFetch] = useAxios();
  const { auth } = useAuth();
  const decoded = jwt_decode(auth);
  const userId = decoded?.UserInfo?.id;

  const {
    firstName,
    lastName,
    phone,
    birthDate,
    address,
    city,
    zipCode,
    documentType,
    documentNumber,
  } = userData;

  useEffect(() => {
    response?.status === "succeeded" &&
      navigate("/dashboard/account-management");
  }, [response?.status]);

  const handleSubmit = () => {
    try {
      axiosFetch({
        axiosInstance: axiosInstance(auth),
        method: "PATCH",
        url: `/auth/user/${userId}`,
        requestConfig: {
          firstName,
          lastName,
          phone,
          birthDate,
          address: {
            address,
            city,
            zipCode,
          },
          documentType,
          documentNumber,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <RegistrationContext.Provider
      value={{
        activeStep,
        setActiveStep,
        steps,
        userData,
        setUserData,
        handleSubmit,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

export default RegistrationProvider;
