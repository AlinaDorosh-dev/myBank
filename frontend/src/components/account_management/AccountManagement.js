import DashboardDrawer from "./DashboardDrawer";
import { Box, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import useAxios from "../../hooks/useAxios";
import AccountsTab from "./accounts_tab/AccountsTab";
import TransactionsTab from "./transactions_tab/TransactionsTab";
import NotificationsTab from "./notifications_tab/NotificationsTab";
import ProfileTab from "./profile_tab/ProfileTab";

const AccountManagement = () => {
  const theme = useTheme();
  const [response, error, loading, axiosFetch] = useAxios();

  //state for for rendering the selected tab in drawer
  const [selectedIndex, setSelectedIndex] = useState(0);

  //state for accounts
  const [accounts, setAccounts] = useState([]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        backgroundColor: theme.palette.primary.background,
        height: "100vh",
        width: "100vw",
      }}
    >
      <DashboardDrawer setSelectedIndex={setSelectedIndex} />

      <Box component='section' sx={{ flexGrow: 1 }}>
        {loading && (
          <CircularProgress
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
        {!loading && selectedIndex === 0 && (
          <AccountsTab accounts={accounts} setAccounts={setAccounts} />
        )}
        {!loading && selectedIndex === 1 && (
          <TransactionsTab accounts={accounts} />
        )}
        {!loading && selectedIndex === 2 && <NotificationsTab />}
        {!loading && selectedIndex === 3 && <ProfileTab />}
      </Box>
    </Box>
  );
};

export default AccountManagement;