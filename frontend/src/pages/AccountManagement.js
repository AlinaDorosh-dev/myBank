import DashboardDrawer from "../components/DashboardDrawer";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";

const accounts = [
  "SE83 1756 3624 6902 3431 9402",
  "GI56 DTJC EG4P KJRO JCJH 6W7",
  "IL81 2655 4983 4710 9697 045",
];
const ballances = ["1000", "2000", "3000"];

const AccountManagement = () => {
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {
    console.log(selectedIndex);
  }, [selectedIndex]);
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: theme.palette.primary.background,
        height: "100vh",
        width: "100vw",
      }}
    >
      <DashboardDrawer setSelectedIndex={setSelectedIndex} />
      <Box component='section' sx={{ flexGrow: 1, p: 5 }}>
        {selectedIndex === 0 && (
          <>
            <Box
              display='flex'
              sx={{
                mt: 4,
                justifyContent: "space-between",
                alignItems: "center",
                position: "absolute",
                right: "15px",
              }}
            >
              <Paper
                variant='elevation'
                elevation={3}
                sx={{ mr: 2, p: 1, textAlign: "center" }}
              >
                <Typography
                  variant='subtitle2'
                  color={theme.palette.primary.dark}
                >
                  Total ballance:
                  {ballances.reduce((a, b) => parseInt(a) + parseInt(b))}€
                </Typography>
              </Paper>
              <Button variant='outlined'>New Account</Button>
            </Box>

            <Box sx={{ mt: 12, width: "100%" }}>
              {accounts.map((account, index) => (
                <Paper
                  variant='elevation'
                  key={index}
                  elevation={16}
                  sx={{
                    m: 3,
                    p: 2,
                    width: "90%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant='subtitle2'>{account}</Typography>
                  <Typography
                    variant='subtitle2'
                    color={theme.palette.primary.dark}
                  >
                    {ballances[index]}€
                  </Typography>
                </Paper>
              ))}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default AccountManagement;
