/**
 * @fileoverview This file contains the Home component which is used to display the landing page of the application
 */
import { Typography, Box, Button, Paper, Grow } from "@mui/material";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ margin: "1rem 2rem" }}>
      <Box>
        <Grow
          appear={true}
          in={true}
          timeout={500}
          easing={{
            enter: "cubic-bezier(0, 1.5, .8, 1)",
            exit: "linear",
          }}
        >
          <Typography
            variant='h2'
            align='center'
            sx={{
              textShadow: "1px 2px 1px rgba(0, 0, 0, 0.4)",
            }}
          >
            Welcome to myBank
          </Typography>
        </Grow>
        <Typography variant='subtitle2' align='center' mt={2}>
          Your one stop shop for all your banking needs
        </Typography>
      </Box>

      <Paper variant='elevation'
        elevation={8} 
      sx={{ mt: 3, p: 2 }}>
        <CardGiftcardIcon
          color='primary'
          sx={{ m: ".7rem auto", display: "block", fontSize: "4rem" }}
        />
        <Typography variant='subtitle2' align='center'>
          100€ on ballance for 100 new customers
        </Typography>
      </Paper>
      <Button
        variant='contained'
        sx={{ mt: 2, width: "100%" }}
        onClick={() => navigate("/signup")}
      >
        Sign up for free
      </Button>
    </Box>
  );
};

export default Home;
