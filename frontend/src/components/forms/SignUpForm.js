import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Link,
  FormControl,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useReducer, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  initialSignUpState,
  signUpReducer,
  SIGN_UP,
} from "../../reducers/signUpReducer";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import axiosInstance from "../../api/myBankApi";

const SignUpForm = () => {
  //access reducer state and dispatch function
  const [state, dispatch] = useReducer(signUpReducer, initialSignUpState);

  const navigate = useNavigate();

  //access inputs refences
  const emailRef = useRef();
  const pwdRef = useRef();
  const matchPwdRef = useRef();

  //Inputs focus state
  const [focusState, setFocusState] = useState({
    email: false,
    pwd: false,
    matchPwd: false,
  });

  //paswords visiblity state
  const [showPassword, setShowPassword] = useState({
    pwd: false,
    matchPwd: false,
  });

  //error message state
  const [errorMsg, setErrorMsg] = useState("");

  //access auth state
  const { auth, setAuth } = useAuth();

  //access response, error, loading and axiosFetch from useAxios custom hook
  const [response, error, loading, axiosFetch] = useAxios();

  //email validation
  useEffect(() => {
    dispatch({ type: SIGN_UP.EMAIL_VALIDATION });
  }, [state.email]);

  //password validation
  useEffect(() => {
    dispatch({ type: SIGN_UP.PASSWORD_VALIDATION });
  }, [state.pwd]);

  //password match validation
  useEffect(() => {
    dispatch({ type: SIGN_UP.PWD_MATCH_VALIDATION });
  }, [state.matchPwd]);

  //If we displayed error and after that any value in dependency array changes,
  //we set error to empty string again
  useEffect(() => {
    dispatch({ type: SIGN_UP.ERROR_MSG, payload: "" });
  }, [state.email, state.pwd, state.matchPwd]);

  //if we have response from backend, we set auth state
  useEffect(() => {
    if (response?.accessToken) {
      setAuth(response.accessToken);
    }
    dispatch({ type: SIGN_UP.RESTORE_STATE });
  }, [response]);

  //if we have auth state, we navigate to dashboard
  useEffect(() => {
    auth && navigate("/dashboard");
  }, [auth]);

  //if we have error, we set error message
  useEffect(() => {
    if (error === "Request failed with status code 409") {
      setErrorMsg(
        "User with this email already exists. You will be redirected to login page"
      );
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } else if (error) {
      setErrorMsg("Connection error. Please reload the app");
    }
  }, [error]);

  //this object will be sent to backend
  const newUser = {
    email: state.email,
    password: state.pwd,
  };

  const handleSignUp = () => {
    console.log("Sign up:", newUser);
    switch (true) {
      case !state.email || !state.pwd || !state.matchPwd:
        dispatch({
          type: SIGN_UP.ERROR_MSG,
          payload: "All fieald are required",
        });
        break;
      case !state.validEmail:
        dispatch({
          type: SIGN_UP.ERROR_MSG,
          payload: "Invalid email",
        });
        break;
      case !state.validPwd:
        dispatch({
          type: SIGN_UP.ERROR_MSG,
          payload:
            "Password must have at least 8 characters,at least one uppercase, one lowercase and one special character: !@#$%^&*",
        });
        break;
      case !state.validMatch:
        dispatch({
          type: SIGN_UP.ERROR_MSG,
          payload: "Passwords do not match",
        });
        break;
    }

    if (state.validEmail && state.validPwd && state.validMatch) {
      axiosFetch({
        axiosInstance: axiosInstance(),
        method: "POST",
        url: "/auth/signup",
        requestConfig: newUser,
      });
    }
  };
  return (
    <Box
      mt={5}
      component='form'
      sx={{
        "& .MuiTextField-root": { mt: 3 },
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
          Sign Up
        </Typography>
        {errorMsg && (
          <Alert severity='error' sx={{ mt: 2 }}>
            {errorMsg}
          </Alert>
        )}

        <FormControl>
          <TextField
            required
            id='outlined'
            label='Email'
            type='email'
            autoFocus
            value={state.email}
            inputRef={emailRef}
            onFocus={() => {
              setFocusState({ ...focusState, email: true });
            }}
            onBlur={() => {
              setFocusState({ ...focusState, email: false });
            }}
            onChange={(e) => {
              dispatch({ type: SIGN_UP.EMAIL_INPUT, payload: e.target.value });
            }}
            helperText={
              state.email && !state.validEmail && focusState.email
                ? "Please enver valid email"
                : null
            }
          />
        </FormControl>
        <FormControl>
          <TextField
            id='filled-password-input'
            label='Password'
            type={showPassword.pwd ? "text" : "password"}
            required
            value={state.pwd}
            inputRef={pwdRef}
            onChange={(e) => {
              dispatch({
                type: SIGN_UP.PASSWORD_INPUT,
                payload: e.target.value,
              });
            }}
            onFocus={() => {
              setFocusState({ ...focusState, pwd: true });
            }}
            onBlur={() => {
              setFocusState({ ...focusState, pwd: false });
            }}
            helperText={
              !state.validPwd && focusState.pwd
                ? "8 characters, at least one uppercase, one lowercase and one special character: !@#$%^&*"
                : null
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        pwd: !showPassword.pwd,
                      })
                    }
                  >
                    {showPassword.pwd ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <FormControl>
          <TextField
            id='outlined-password-input'
            label='Confirm password'
            type={showPassword.matchPwd ? "text" : "password"}
            required
            value={state.matchPwd}
            inputRef={matchPwdRef}
            onChange={(e) => {
              dispatch({
                type: SIGN_UP.PWD_MATCH_INPUT,
                payload: e.target.value,
              });
            }}
            onFocus={() => {
              setFocusState({ ...focusState, matchPwd: true });
            }}
            onBlur={() => {
              setFocusState({ ...focusState, matchPwd: false });
            }}
            helperText={
              !state.validMatch && focusState.matchPwd
                ? "Passwords must match"
                : null
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        matchPwd: !showPassword.matchPwd,
                      })
                    }
                  >
                    {showPassword.matchPwd ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <Button
          variant='contained'
          sx={{ mt: 2, width: "100%" }}
          onClick={() => handleSignUp()}
          disabled={!state.validEmail || !state.validPwd || !state.validMatch}
        >
          Sign up
        </Button>
        <Typography variant='body2' sx={{ mt: 1 }}>
          Already registred?
        </Typography>
        <Link href='/login' underline='hover' variant='body2'>
          Sign In
        </Link>
      </Paper>
    </Box>
  );
};

export default SignUpForm;
