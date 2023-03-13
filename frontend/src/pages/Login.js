import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LoginForm from "../components/forms/LoginForm";

const Login = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: theme.palette.primary.background,
        padding: 5,
      }}
    >
      <LoginForm />
    </Box>
  );
};

export default Login;
