import { Typography, Box, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        bgcolor: theme.palette.primary.background,
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box>
        <Typography variant='h2' align='center'>
          Welcome to myBank
        </Typography>
        <Typography variant='subtitle2' align='center' mt={2}>
          Your one stop shop for all your banking needs
        </Typography>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant='subtitle1' align='center'>
          100€ on ballance for 100 new customers
        </Typography>
        <Button
          variant='contained'
          sx={{ m: 2, width: "80%" }}
          onClick={() => navigate("/signup")}
        >
          Sign up for free
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
