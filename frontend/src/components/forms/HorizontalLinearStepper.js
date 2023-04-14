/**
 * @fileoverview This file contains the stepper component for multistep registration form.
 */

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { RegistrationContext } from "../../context/RegistrationProvider";
import { useContext } from "react";

export default function HorizontalLinearStepper() {
  const {
    activeStep,
    setActiveStep,
    steps,
    userData,
    attachment,
    handleSubmit,
  } = useContext(RegistrationContext);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: "100%", mt: 1 }}>
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
                disabled={
                  !userData.firstName ||
                  !userData.lastName ||
                  !userData.phone ||
                  !userData.birthDate
                }
                onClick={handleNext}
              >
                Next
              </Button>
            )}
            {activeStep === 1 && (
              <Button
                variant='outlined'
                disabled={
                  !userData.address || !userData.city || !userData.zipCode
                }
                onClick={handleNext}
              >
                Next
              </Button>
            )}

            {activeStep === 2 && (
              <Button
                variant='outlined'
                disabled={
                  !userData.documentType || !userData.documentNumber
                  //  || !attachment
                }
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
