import DashboardDrawer from "../components/DashboardDrawer";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";

const AccountManagement = () => {
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {
    console.log(selectedIndex);
  }, [selectedIndex]);
  return (
    <Box sx={{
      backgroundColor: theme.palette.primary.background,
      height: "100vh",
    }}>
      <DashboardDrawer setSelectedIndex={setSelectedIndex} />
<Box>
  {selectedIndex === 0 && <h1>Accounts</h1>}
</Box>
    </Box>
  );
};

export default AccountManagement;
