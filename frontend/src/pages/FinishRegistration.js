import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import RegisterForm from "../components/forms/RegisterForm";
import RegistrationProvider from "../context/RegistrationProvider";

const FinishRegistration = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: theme.palette.primary.background,
        pt: { xs: 4, sm: 6, md: 8, lg: 10},
        pb: { xs: 4, sm: 6, md: 8, lg: 10},
        pl: { xs: 2, sm: 4, md: 6, lg: 8},
        pr: { xs: 2, sm: 4, md: 6, lg: 8},
      }}
    >
      <RegistrationProvider>
        <RegisterForm />
      </RegistrationProvider>
    </Box>
  );
};

export default FinishRegistration;
