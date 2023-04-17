import { Paper, Box, Typography, Link, List, ListItem } from "@mui/material";
import {
  PersonAddAltTwoTone,
  VerifiedUserTwoTone,
  LoginTwoTone,
  AccountBalanceTwoTone,
  MoveUpTwoTone,
  HistoryTwoTone,
  NotificationsActiveTwoTone,
  AccountBalanceWalletTwoTone,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const About = () => {
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
        About myBank{" "}
      </Typography>
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 800,
          mx: "auto",
          mb: 2,
          p: 3,
          textAlign: "justify",
        }}
      >
        <Typography variant='body1'>
          This is a simple banking app. Built as a personal project to improve
          practical skills in REST API design with Node.js, Express and MongoDB
          and frontend development with React and MUI.
        </Typography>

        <Typography
          variant='h6'
          sx={{
            mt: 1,
            textAlign: "center",
            width: "100%",
            mx: "auto",
            display: "block",
            fontWeight: "bold",
            color: theme.palette.primary.dark,
          }}
        >
          Features:
        </Typography>
        <List>
          <ListItem>
            <PersonAddAltTwoTone sx={{ mr: 1 }} /> Create new user account with
            email and password
          </ListItem>
          <ListItem>
            <VerifiedUserTwoTone sx={{ mr: 1 }} /> Finish registration by
            filling multistep form with personal data
          </ListItem>
          <ListItem>
            <LoginTwoTone sx={{ mr: 1 }} /> Login with email and password
          </ListItem>
          <ListItem>
            <AccountBalanceTwoTone sx={{ mr: 1 }} /> Create up to 3 bank
            accounts
          </ListItem>
          <ListItem>
            <MoveUpTwoTone sx={{ mr: 1 }} /> Transfer money to other users and
            between your accounts
          </ListItem>
          <ListItem>
            <AccountBalanceWalletTwoTone sx={{ mr: 1 }} /> Check your balance
          </ListItem>

          <ListItem>
            <HistoryTwoTone sx={{ mr: 1 }} /> Check transactions history
          </ListItem>
          <ListItem>
            <NotificationsActiveTwoTone sx={{ mr: 1 }} /> Get notifications
            about new incoming transactions
          </ListItem>
        </List>

        <Typography variant='body1'>
          The source code is available on GitHub:
        </Typography>

        <Link
          href='https://github.com/AlinaDorosh-dev/myBank'
          target='_blank'
          rel='noopener'
          variant='button'
          sx={{
            mt: 2,
            textAlign: "center",
            width: "100%",
            mx: "auto",
            display: "block",
          }}
        >
          myBank repository
        </Link>
      </Paper>
    </Box>
  );
};

export default About;
