/**
 * @fileoverview This file contains the Contact component which is used to display contact information
 */
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
} from "@mui/material";

import { GitHub, LinkedIn, Email } from "@mui/icons-material";

import { useTheme } from "@mui/material/styles";

const Contact = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        mt: 5,
      }}
    >
      <Typography
        sx={{ width: "100%", textAlign: "center", mb: 2 }}
        variant='h4'
      >
        Contact
      </Typography>
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 600,
          mx: "auto",
          mb: 2,
          p: 3,
          textAlign: "justify",
        }}
      >
        <Typography 
        variant='subtitle1'
        sx={{
          mb: 2,
          color: theme.palette.primary.dark,
          fontWeight: 600,
          textAlign: "center",
        }}
        
        >Project author: Alina Dorosh</Typography>
        <Typography variant='body1'>
          Feel free to contact me via email or social media:
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <Email />
            </ListItemIcon>
            <ListItemText>
              <Link
                href='mailto: alina.dorosh@gmail.com'
                target='_blank'
                rel='noreferrer'
                >alina.dorosh@gmail.com</Link>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <GitHub />
            </ListItemIcon>
            <ListItemText>
              <Link
                href='https://github.com/AlinaDorosh-dev'
                target='_blank'
                rel='noreferrer'
                >github.com/AlinaDorosh-dev</Link>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LinkedIn />
            </ListItemIcon>
            <ListItemText>
              <Link
                href='https://www.linkedin.com/in/alina-dorosh/'
                target='_blank'
                rel='noreferrer'
                >linkedin.com/in/alina-dorosh/</Link>
            </ListItemText>
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
};

export default Contact;
