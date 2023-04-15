/**
 * @fileoverview Multi-step form for complete registration before using the app.
 */
import {
  Box,
  Paper,
  TextField,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Fab,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import HorizontalLinearStepper from "./HorizontalLinearStepper";
import { RegistrationContext } from "../../context/RegistrationProvider";
import { useContext } from "react";

const RegisterForm = () => {
  const {
    activeStep,
    userData,
    setUserData,
    inputsValidation,
    setInputsValidation,
    inputFocus,
    setInputFocus,
  } = useContext(RegistrationContext);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <Box
      mt={5}
      component='form'
      sx={{
        "& .MuiTextField-root": { mt: 3, width: "100%" },
      }}
      noValidate
      autoComplete='off'
      onSubmit={(e) => e.preventDefault()}
    >
      <Paper
        elevation={16}
        variant='elevation'
        sx={{
          maxWidth: 400,
          margin: "auto",
          padding: 3,
        }}
      >
        <Typography
          variant='h6'
          sx={{ textAlign: "center", lineHeight: "1.2rem" }}
        >
          Finish your registration
        </Typography>
        {activeStep === 0 && (
          <Box>
            <TextField
              required
              id='outlined'
              label='First Name'
              type='text'
              name='firstName'
              minLength='3'
              autoFocus
              value={userData.firstName}
              onChange={(e) => handleChange(e)}
              onFocus={() => setInputFocus({ ...inputFocus, firstName: true })}
              onBlur={() => setInputFocus({ ...inputFocus, firstName: false })}
              helperText={
                userData.firstName &&
                inputFocus.firstName &&
                !inputsValidation.firstName
                  ? "At least 3 characters"
                  : null
              }
            />
            <TextField
              required
              id='outlined'
              label='Last Name'
              type='text'
              name='lastName'
              minLength='3'
              value={userData.lastName}
              onChange={(e) => handleChange(e)}
              onFocus={() => setInputFocus({ ...inputFocus, lastName: true })}
              onBlur={() => setInputFocus({ ...inputFocus, lastName: false })}
              helperText={
                userData.lastName &&
                inputFocus.lastName &&
                !inputsValidation.lastName
                  ? "At least 3 characters"
                  : null
              }
            />
            <TextField
              required
              id='outlined'
              label='Phone'
              type='phone'
              name='phone'
              minLength='9'
              value={userData.phone}
              onChange={(e) => handleChange(e)}
              onFocus={() => setInputFocus({ ...inputFocus, phone: true })}
              onBlur={() => setInputFocus({ ...inputFocus, phone: false })}
              helperText={
                userData.phone && inputFocus.phone && !inputsValidation.phone
                  ? "At least 9 numbers"
                  : null
              }
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Birth Date'
                disableFuture
                onChange={(e) => setUserData({ ...userData, birthDate: e.$d })}
              />
            </LocalizationProvider>
          </Box>
        )}
        {activeStep === 1 && (
          <Box>
            <TextField
              required
              id='outlined'
              label='Address'
              type='text'
              name='address'
              value={userData.address}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              required
              id='outlined'
              label='City'
              type='text'
              name='city'
              value={userData.city}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              required
              id='outlined'
              label='Zip code'
              type='number'
              name='zipCode'
              minLength='5'
              value={userData.zipCode}
              onChange={(e) => handleChange(e)}
            />
          </Box>
        )}
        {activeStep === 2 && (
          <Box>
            <FormControl fullWidth sx={{ width: "100%", mt: 3 }}>
              <InputLabel id='document-type-label'>Document Type</InputLabel>
              <Select
                labelId='document-type-label'
                id='document-type'
                value={userData.documentType}
                name='documentType'
                label='Document Type'
                onChange={(e) => handleChange(e)}
              >
                <MenuItem value='dni'>DNI</MenuItem>
                <MenuItem value='nie'>NIE</MenuItem>
              </Select>
            </FormControl>
            <TextField
              required
              id='outlined'
              label='Document Number'
              type='text'
              name='documentNumber'
              minLength='9'
              value={userData.documentNumber}
              onChange={(e) => handleChange(e)}
            />
          </Box>
        )}

        <HorizontalLinearStepper />
      </Paper>
    </Box>
  );
};

export default RegisterForm;
