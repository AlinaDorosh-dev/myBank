import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
  Toolbar,
  Badge,
} from "@mui/material";
import { AccountBalance, EuroSymbol, Person, Mail } from "@mui/icons-material";
import { NotificationContext } from "../../context/NotificationProvider";
import { useContext, useEffect, useState } from "react";
const DashboardDrawer = ({ setSelectedIndex }) => {
  const { notifications } = useContext(NotificationContext);

  const [unreadMessages, setUnreadMessages] = useState(0);

  useEffect(() => {
    if (notifications?.length === 0) return;
    if (notifications?.length > 0) {
      const unreadMsgs = notifications.filter((notification) => {
        return !notification.read;
      });
      setUnreadMessages(unreadMsgs.length);
    }
  }, [notifications]);

  const drawerWidth = 170;
  return (
    <Drawer
      variant='permanent'
      anchor='top'
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: { sm: "25%", md: "15%" },
          height: { sm: "100vh" },
          boxSizing: "border-box",
          zIndex: 0,
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "hidden" }}>
        <List
          sx={{
            display: "flex",
            flexDirection: { xs: "row", sm: "column" },
          }}
        >
          {["Accounts", "Transfers", "Messages", "Profile"].map(
            (text, index) => (
              <ListItem
                key={text}
                disablePadding
                sx={{ textAlign: "center", flexBasis: " 25%" }}
              >
                <ListItemButton
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: { xs: "center", sm: "left" },
                    mr: -3,
                    ml: -2,
                  }}
                  onClick={() => setSelectedIndex(index)}
                >
                  <ListItemIcon sx={{ textAlign: "center", display: "block" }}>
                    {index === 0 ? (
                      <AccountBalance />
                    ) : index === 1 ? (
                      <EuroSymbol />
                    ) : index === 2 ? (
                      <Badge badgeContent={unreadMessages} color='primary'>
                        <Mail color='action' />
                      </Badge>
                    ) : (
                      <Person />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ fontSize: "0.6rem" }} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      </Box>
    </Drawer>
  );
};

export default DashboardDrawer;
