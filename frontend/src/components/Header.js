/**
 * @fileoverview This file contains the Header component which is used to display the header with navigaton links and the drawer for navigation on mobile
 */
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

const drawerWidth = 240;

function Header(props) {
  const theme = useTheme();
  const navigate = useNavigate();

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);

  const { auth, setAuth } = useAuth();

  const navItems = [
    {
      text: !auth ? "Home" : "My Dashboard",
      route: !auth ? "/" : "/dashboard",
    },
    { text: "About", route: "/about" },
    { text: "Contact", route: "/contact" },
    { text: !auth ? "Login" : "Logout", route: !auth ? "/login" : "/" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleClick = (item) => {
    if (item.text === "Logout") {
      setConfirmLogout(true);
    } else {
      navigate(item.route);
    }
  };

  const handleLogout = () => {
    setConfirmLogout(false);
    setAuth("");
    sessionStorage.removeItem("auth");
    navigate("/");
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        variant='h5'
        sx={{ p: 2, bgcolor: theme.palette.primary.background }}
      >
        myBank
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.text}
            disablePadding
            onClick={() => handleClick(item)}
          >
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <Dialog
        open={confirmLogout}
        onClose={() => setConfirmLogout(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          <Typography
            color={theme.palette.primary.dark}
            sx={{ mt: 2, width: "100%", textAlign: "center" }}
            variant='h5'
          >
            Log Out
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant='outlined'
            autoFocus
            onClick={() => setConfirmLogout(false)}
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            onClick={() => {
              handleLogout();
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <AppBar component='nav'>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h5'
            component='div'
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" },color: "white" }}
          >
            myBank
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                onClick={() => handleClick(item)}
                key={item.text}
                variant='button'
              >
                {item.text}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component='nav'>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default Header;
