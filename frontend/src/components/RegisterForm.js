import { Box, Paper, TextField } from "@mui/material";

const RegisterForm = () => {
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
        <TextField required id='outlined' label='First Name' type='text' />
      
      </Paper>
    </Box>
  );
};

export default RegisterForm;
