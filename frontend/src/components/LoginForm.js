import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../api/myBankApi";

import useAxios from "../hooks/useAxios";
import { useRef, useState, useEffect } from "react";

const LoginForm = () => {
  const LOGIN_URL = "/auth/login";
  const [data, error, loading, axiosFetch] = useAxios();
  const { auth, setAuth } = useAuth();

  const location = useLocation();
  const { from } = location.state?.from?.pathname || "/";
  const navigate = useNavigate();

  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if (data?.accessToken) {
      setAuth(data.accessToken);
    }
  }, [data.accessToken]);

  useEffect(() => {
    auth && navigate("/dashboard");
  }, [auth]);

  const resetLoginState = () => {
    setEmail("");
    setErrMsg("");
    setSuccess(false);
    setPwd("");
    setShowPassword(false);
  };

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = async () => {
    try {
      await axiosFetch({
        axiosInstance: axiosInstance(),
        method: "POST",
        url: LOGIN_URL,
        requestConfig: {
          email,
          password: pwd,
        },
      });

      //  data ? navigate("/dashboard") : navigate("/unauthorized");

      //   console.log("data", data);
      //   const accessToken = data?.accessToken;
      //   console.log("accessToken", accessToken);
      //   setAuth(accessToken);
      //   console.log("auth", auth);
      // navigate("/dashboard");
      //   const roles = response?.data?.roles;
      //   setAuth({ user, pwd, roles, accessToken });
      // setAuth({ accessToken });
      //   resetUser();
      //   setPwd("");
      //navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Wrong email or password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      // errRef.current.focus();
    }
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

        <TextField
          required
          id='outlined'
          label='Email'
          type='email'
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          autoFocus
        />
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

        <Button
          variant='contained'
          sx={{ mt: 3, width: "100%" }}
          onClick={() => handleLogin()}
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
