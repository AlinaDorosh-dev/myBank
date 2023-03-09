import { Box, Typography, Paper, TextField, Button, Link } from "@mui/material";

const SignUpForm = () => {
  const handleSignUp = () => {
    console.log("Sign up");
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

        <TextField required id='outlined' label='Email' type='email' />
        <TextField
          id='filled-password-input'
          label='Password'
          type='password'
          required
          // helperText='Must be at least 8 characters'
        />
        <TextField
          id='outlined-password-input'
          label='Confirm password'
          type='password'
          required
        />
        <Button
          variant='contained'
          sx={{ mt: 2, width: "100%" }}
          onClick={() => handleSignUp()}
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
