import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import RegisterForm from "../components/forms/RegisterForm";
import RegistrationProvider from "../context/RegistrationProvider";

const FinishRegistration = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: theme.palette.primary.background,
        padding: 5,
      }}
    >
      <RegistrationProvider>
        <RegisterForm />
      </RegistrationProvider>
    </Box>
  );
};

export default FinishRegistration;
