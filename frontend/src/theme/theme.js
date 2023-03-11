import { cyan, grey } from "@mui/material/colors";
import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
   
    primary: {
      main: cyan[700],
      background: cyan[50],
      dark: cyan[900],
      contrastText: "#ffffff",
    },

    // secondary: {
    //   main: "#ffffff",
    // },
    // error: {},
    // warning: {},
    // info: {},
    // success: {},
    //
    // },
  },

  typography: {
    fontFamily: "Poppins, sans-serif",
    color: grey[800],
    h2: {
      fontSize: "3rem",
      fontWeight: 700,
      color: grey[800],
    },
    h4: { fontWeight: 700, color: grey[800] },
    h5: {
      fontWeight: 700,
      color: grey[800],
    },
    h6: {
      fontWeight: 700,
      color: grey[800],
    },
    body2: {
      color: grey[800],
    },
    button: {
      color: "#ffffff",
    },

   
  },
});

export default theme;
