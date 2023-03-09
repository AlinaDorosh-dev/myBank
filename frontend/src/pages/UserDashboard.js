import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import RegisterForm from "../components/RegisterForm";
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
      <Typography variant='subtitle1'>
        Finish your registration and open an account
      </Typography>
      <RegisterForm />
    </Box>
  );
};

export default UserDashboard;
