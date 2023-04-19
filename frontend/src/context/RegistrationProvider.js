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

  const [invalidFields, setInvalidFields] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    let invalidFields = Object.entries(inputsValidation).filter(
      ([key, value]) => value === false
    );
    setInvalidFields(invalidFields);
  }, [inputsValidation]);

  useEffect(() => {
    setAlertMessage("");
    setShowAlert(false);
  }, [userData]);

  const instructions = {
    firstName:
      "Please enter your first name. Note: it should start with a capital letter.",
    lastName:
      "Please enter your last name. Note: it should start with a capital letter.",
    phone:
      "Please enter your phone number. Note: it should start with a 6, 7 or 8 and have 9 digits.",
    birthDate:
      "Please enter your birth date. Note: you must be over 18 years old.",
    address:
      "Please enter your address. Note: it should have at least 5 characters.",
    city: "Please enter your city. Note: it should have at least 3 characters.",
    zipCode: "Please enter your zip code. Note: it should have 5 digits.",
    documentType: "Please select your document type.",
    documentNumber: "Please enter valid document number.",
  };

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

  const updateUserData = () => {
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
  };

  const handleSubmit = () => {
    if (invalidFields.length === 0) {
      updateUserData();
    } else {
      setShowAlert(true);
      setAlertMessage(instructions[invalidFields[0][0]]);
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
        showAlert,
        alertMessage,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

export default RegistrationProvider;
