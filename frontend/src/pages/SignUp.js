import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SignUpForm from "../components/forms/SignUpForm";
const SignUp = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: theme.palette.primary.background,
        padding: 5,
      }}
    >
      <SignUpForm />
    </Box>
  );
};

export default SignUp;
