import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import RegisterForm from "../components/RegisterForm";
import RegistrationProvider from "../context/RegistrationProvider";
const UserDashboard = ({ userId }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: theme.palette.primary.background,
        padding: 5,
      }}
    >
      <p
        style={{
          textAlign: "center",
        }}
      >
        UserDashboard of {userId}
      </p>
      <RegistrationProvider userId={userId}>
        <RegisterForm />
      </RegistrationProvider>
    </Box>
  );
};

export default UserDashboard;
