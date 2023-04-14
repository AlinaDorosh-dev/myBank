/**
 * @fileoverview Login Form Component
 */

import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Link,
  InputAdornment,
  IconButton,
  Alert,
  FormControl,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/myBankApi";
import useAxios from "../../hooks/useAxios";
import { useState, useEffect } from "react";
import { EMAIL_REGEX } from "../../utils/regex";

const LoginForm = () => {
  //retrieve response, error, loading and axiosFetch from useAxios custom hook
  const [data, error, loading, axiosFetch] = useAxios();

  //retrieve auth state and setAuth function from useAuth custom hook
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();

  //inputs states
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [pwd, setPwd] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);

  //password visibility state
  const [showPassword, setShowPassword] = useState(false);

  //function for reset login state after submit
  const resetLoginState = () => {
    setEmail("");
    setPwd("");
    setShowPassword(false);
  };

  //set auth state if user is logged in
  useEffect(() => {
    if (data?.accessToken) {
      setAuth(data.accessToken);
    }
    resetLoginState();
  }, [data.accessToken]);

  //redirect to dashboard if user is logged in
  useEffect(() => {
    auth && navigate("/dashboard");
  }, [auth]);

  //email validation
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = async () => {
    await axiosFetch({
      axiosInstance: axiosInstance(),
      method: "POST",
      url: "/auth/login",
      requestConfig: {
        email,
        password: pwd,
      },
    });
  };

  return (
    <Box
      mt={5}
      component='form'
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
      sx={{
        "& .MuiTextField-root": { mt: 4 },
      }}
      noValidate
      autoComplete='off'
    >
      <Paper
        elevation={16}
        variant='elevation'
        sx={{
          maxWidth: 400,
          margin: "auto",
          padding: 4,
        }}
      >
        <Typography variant='h4' align='center' sx={{ display: "block" }}>
          Login
        </Typography>
        {error === "Request failed with status code 401" ? (
          <Alert
            sx={{
              mt: 1,
              textAlign: "justify",
            }}
            severity='error'
          >
            Unauthorized. Wrong email or password
          </Alert>
        ) : (
          error && (
            <Alert
              sx={{
                mt: 1,
                textAlign: "left",
              }}
              severity='error'
            >
              Connection error. Please reload the app
            </Alert>
          )
        )}
        <FormControl>
          <TextField
            required
            id='outlined'
            label='Email'
            type='email'
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            autoFocus
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            helperText={
              email && emailFocus && !validEmail
                ? "Please enter valid email"
                : ""
            }
          />
        </FormControl>
        <FormControl>
          <TextField
            id='filled-password-input'
            label='Password'
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPwd(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <Button
          variant='contained'
          sx={{ mt: 3, width: "100%" }}
          onClick={() => handleLogin()}
          disabled={!email || !validEmail || !pwd}
        >
          Sign in
        </Button>
        <Typography variant='body2' sx={{ mt: 2 }}>
          Need an account?
        </Typography>
        <Link href='/signup' underline='hover' variant='body2'>
          Sign Up
        </Link>
      </Paper>
    </Box>
  );
};

export default LoginForm;
