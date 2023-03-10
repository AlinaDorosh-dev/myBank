import { createContext, useState } from "react";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import axiosInstance from "../api/myBankApi";

export const RegistrationContext = createContext({});

const RegistrationProvider = ({ children, userId }) => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Personal Info", "Address", "Upload Document"];
  const [attachment, setAttachment] = useState(null);

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
    attachment: "",
  });

  const {
    firstName,
    lastName,
    phone,
    birthDate,
    address: { address, city, zipCode },
    documentType,
    documentNumber,
  } = userData;
  const USER_URL = `/auth/user/${userId}`;
  const [data, error, loading, axiosFetch] = useAxios();
  const { auth, setAuth } = useAuth();

  const handleSubmit = () => {
    console.log(userData);
    try {
      axiosFetch({
        axiosInstance: axiosInstance(auth),
        method: "PATCH",
        url: USER_URL,
        requestConfig: {
          firstName,
          lastName,
          phone,
          birthDate,
          address,
          city,
          zipCode,
          documentType,
          documentNumber,
        },
      });
    } catch (error) {
      console.log(error);
    }
    // setAttachment(e.target.files[0]);
    // const reader = new FileReader();
    // reader.onload = () => {
    //   if (reader.readyState === 2) {
    //     setAttachment(reader.result);
    //   }
    // };
    // let url = reader.readAsDataURL(e.target.files[0]);
    // console.log(url);
  };
  return (
    <RegistrationContext.Provider
      value={{
        activeStep,
        setActiveStep,
        steps,
        userData,
        setUserData,
        attachment,
        setAttachment,
        handleSubmit,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

export default RegistrationProvider;
