import * as React from "react";
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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const drawerWidth = 240;

function Header(props) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { auth, setAuth } = useAuth();

  useEffect(() => {
    console.log(auth);
  }, [auth]);

  const navItems = [
    { text: "Home", route: "/" },
    { text: "About", route: "/about" },
    { text: "Contact", route: "/contact" },
    { text: !auth ? "Login" : "Logout", route: !auth ? "/login" : "/" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleClick = (item) => {
    console.log(item.text);
    if (item.text === "Logout") {
      setAuth("");
      navigate(item.route);
    } else {
      navigate(item.route);
    }
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
          <ListItem key={item.text} disablePadding onClick={() => handleClick(item)}>
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
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
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
