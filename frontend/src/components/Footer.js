/**
 * @fileoverview This file contains the Footer component which is used to display the footer
 */
import { Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
const Footer = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        textAlign: "center",
        p: .3,
        color: "white",
        bgcolor: theme.palette.primary.dark,

     }}
      component='footer'
      variant='outlined'
    >
      <Typography variant='caption'>Copyright ©2023.</Typography>
    </Box>
  );
};

export default Footer;
