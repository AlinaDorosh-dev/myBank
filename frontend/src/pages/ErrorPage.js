import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant='h2' align='center' mt={12} sx={{ display: "block" }}>
        404{" "}
      </Typography>
      <Typography variant='h4' align='center' sx={{ display: "block" }}>
        Page not found
      </Typography>
      <Button
        variant='contained'
        sx={{ m: 8, width: 200, display: "block" }}
        onClick={() => navigate("/")}
      >
        Take me back home
      </Button>
    </Box>
  );
};

export default ErrorPage;
