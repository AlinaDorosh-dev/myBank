import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemButton,
    Box,
    Toolbar,
  } from "@mui/material";
  import { AccountBalance, EuroSymbol, Person } from "@mui/icons-material";

const DashboardDrawer = ({setSelectedIndex}) => {
  return (
    <Drawer
    variant='permanent'
    sx={{
      width: { sm: "30%", md: "15%" },
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: {
        width:{ sm: "30%" , md: "15%"},
        boxSizing: "border-box",
        zIndex: 0,
      },
    }}
  >
    <Toolbar />
    <Box sx={{ overflow: "hidden" }}>
      <List>
        {["Accounts", "Transactions", "Personal info"].map(
          (text, index) => (
            <ListItem key={text} disablePadding >
              <ListItemButton onClick={()=>setSelectedIndex(index)}>
                <ListItemIcon sx={{ mr: -3, ml: -1 }}>
                  {index === 0 ? (
                    <AccountBalance />
                  ) : index === 1 ? (
                    <EuroSymbol />
                  ) : (
                    <Person />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </Box>
  </Drawer>
  )
}

export default DashboardDrawer