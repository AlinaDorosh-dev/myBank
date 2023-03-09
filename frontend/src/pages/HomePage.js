import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Home from "../components/Home";

const HomePage = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        bgcolor: theme.palette.primary.background,
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Home />
    </Box>
  );
};

export default HomePage;
