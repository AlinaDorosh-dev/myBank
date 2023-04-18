import { createContext, useState } from "react";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import axiosInstance from "../api/myBankApi";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import {
  NAME_REGEX,
  PHONE_REGEX,
  ZIPCODE_REGEX,
  DNI_REGEX,
  NIE_REGEX,
} from "../utils/regex";
import { ageValidation } from "../utils/ageValidation";

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

  const [inputsValidation, setInputsValidation] = useState({
    firstName: false,
    lastName: false,
    phone: false,
    birthDate: false,
    address: false,
    city: false,
    zipCode: false,
    documentType: false,
    documentNumber: false,
  });

  const [inputFocus, setInputFocus] = useState({
    firstName: false,
    lastName: false,
    phone: false,
    birthDate: false,
    address: false,
    city: false,
    zipCode: false,
    documentType: false,
    documentNumber: false,
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

  useEffect(() => {
    if (userData.firstName)
      setInputsValidation({
        ...inputsValidation,
        firstName: NAME_REGEX.test(userData.firstName),
      });

    if (userData.lastName)
      setInputsValidation({
        ...inputsValidation,
        lastName: NAME_REGEX.test(userData.lastName),
      });

    if (userData.phone)
      setInputsValidation({
        ...inputsValidation,
        phone: PHONE_REGEX.test(userData.phone),
      });

    if (userData.birthDate)
      setInputsValidation({
        ...inputsValidation,
        birthDate: ageValidation(userData.birthDate),
      });

    if (userData.address.length > 5)
      setInputsValidation({
        ...inputsValidation,
        address: true,
      });

    if (userData.city.length >= 3)
      setInputsValidation({
        ...inputsValidation,
        city: true,
      });

    if (userData.zipCode)
      setInputsValidation({
        ...inputsValidation,
        zipCode: ZIPCODE_REGEX.test(userData.zipCode),
      });

    if (userData.documentType === "dni" || userData.documentType === "nie")
      setInputsValidation({
        ...inputsValidation,
        documentType: true,
      });

    if (userData.documentNumber)
      setInputsValidation({
        ...inputsValidation,
        documentNumber:
          documentType === "dni"
            ? DNI_REGEX.test(userData.documentNumber)
            : NIE_REGEX.test(userData.documentNumber),
      });
  }, [userData]);

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
          birthDate: new Date(birthDate).toISOString(),
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
        inputsValidation,
        setInputsValidation,
        inputFocus,
        setInputFocus,
        handleSubmit,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

export default RegistrationProvider;
