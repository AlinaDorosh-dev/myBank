/**
 * @fileoverview This file contains the stepper component for multistep registration form.
 */
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Alert,
} from "@mui/material";
import { RegistrationContext } from "../../context/RegistrationProvider";
import { useContext, useEffect, useState } from "react";

export default function HorizontalLinearStepper() {
  const {
    activeStep,
    setActiveStep,
    steps,
    userData,
    handleSubmit,
    inputsValidation,
  } = useContext(RegistrationContext);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [invalidFields, setInvalidFields] = useState([]);
  const [disableStepTwo, setDisableStepTwo] = useState(true);
  const [disableStepThree, setDisableStepThree] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    let invalidFields = Object.entries(inputsValidation).filter(
      ([key, value]) => value === false
    );
    setInvalidFields(invalidFields);
  }, [inputsValidation]);

  useEffect(() => {
    //Anytime userData changes remove alert
    setShowAlert(false);
    setAlertMessage("");
    console.log("userData", userData);
  }, [userData]);

  useEffect(() => {
    if (
      userData.firstName &&
      userData.lastName &&
      userData.phone &&
      userData.birthDate
    ) {
      setDisableStepTwo(false);
    }
  }, [
    userData.firstName,
    userData.lastName,
    userData.birthDate,
    userData.phone,
  ]);

  useEffect(() => {
    if (userData.address && userData.city && userData.zipCode) {
      setDisableStepThree(false);
    }
  }, [userData.address, userData.city, userData.zipCode]);

  return (
    <Box sx={{ width: "100%", mt: 1 }}>
      {showAlert && (
        <Alert severity='error' sx={{ mb: 2 }}>
          {alertMessage}
        </Alert>
      )}
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps} sx={{ ml: "-.9rem" }}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>Registration Completed</Typography>
        </>
      ) : (
        <>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              variant='outlined'
              color='inherit'
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            {activeStep === 0 && (
              <Button
                variant='outlined'
                disabled={disableStepTwo}
                onClick={handleNext}
              >
                Next
              </Button>
            )}
            {activeStep === 1 && (
              <Button
                variant='outlined'
                disabled={disableStepThree}
                onClick={handleNext}
              >
                Next
              </Button>
            )}

            {activeStep === 2 && (
              <Button
                variant='outlined'
                disabled={invalidFields.length > 0}
                onClick={() => handleSubmit()}
              >
                Finish
              </Button>
            )}
          </Box>
        </>
      )}
    </Box>
  );
}
