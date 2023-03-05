import { cyan, grey } from "@mui/material/colors";
import { createTheme } from "@mui/material";

const theme = createTheme({
  //   heights: {
  //     HEADER: "175px",
  //     FOOTER: "64px",
  //   },

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
    h2: {
      fontSize: "3rem",
      fontWeight: 700,
      color: grey[800],
    },
    h5: {
      fontWeight: 700,
      color: grey[800],
    },
    button: {
      color: "#ffffff",
    },

    //   myVariant: {
    //     fontSize: 20,
    //   },
  },
});



export default theme;
