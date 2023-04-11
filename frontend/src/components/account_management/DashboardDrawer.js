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

const DashboardDrawer = ({ setSelectedIndex }) => {
  const drawerWidth = 170;
  return (
    <Drawer
      variant='permanent'
      anchor='top'
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: { sm: "20%", md: "15%" },
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
            flexDirection: "row",
          }}
        >
          {["Accounts", "Transfers", "Profile", "Messages"].map(
            (text, index) => (
              <ListItem
                key={text}
                disablePadding
                sx={{ textAlign: "center", flexBasis: " 25%" }}
              >
                <ListItemButton
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
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
                      <Person />
                    ) : (
                      <Badge badgeContent={4} color='primary'>
                        <Mail color='action' />
                      </Badge>
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
