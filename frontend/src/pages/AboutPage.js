import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import About from "../components/About";

const AboutPage = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: theme.palette.primary.background,
        padding: 5,
      }}
    >
      <About />
    </Box>
  );
};

export default AboutPage;
