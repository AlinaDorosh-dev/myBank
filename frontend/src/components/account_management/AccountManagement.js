/**
 * @fileoverview This file contains the AccountManagement component which is the main component for the account management page.
 */
import DashboardDrawer from "./DashboardDrawer";
import { Box } from "@mui/material";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";

import AccountsTab from "./accounts_tab/AccountsTab";
import TransactionsTab from "./transactions_tab/TransactionsTab";
import NotificationsTab from "./notifications_tab/NotificationsTab";
import ProfileTab from "./profile_tab/ProfileTab";
import AccountsProvider from "../../context/AccountsProvider";
import NewTransactionProvider from "../../context/NewTransactionProvider";

const AccountManagement = () => {
  const theme = useTheme();

  //state for for rendering the selected tab in drawer
  const [selectedIndex, setSelectedIndex] = useState(0);

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
      <AccountsProvider>
        <Box component='section' sx={{ flexGrow: 1 }}>
          {selectedIndex === 0 && <AccountsTab />}
          {selectedIndex === 1 && (
            <NewTransactionProvider>
              <TransactionsTab />
            </NewTransactionProvider>
          )}
          {selectedIndex === 2 && <NotificationsTab />}
          {selectedIndex === 3 && <ProfileTab />}
        </Box>
      </AccountsProvider>
    </Box>
  );
};

export default AccountManagement;
