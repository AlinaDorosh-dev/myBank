/**
 * @fileoverview This file contains the NotificationsTab component.
 *  This component is used to display users notifications about recent transactions
 */

import { NotificationContext } from "../../../context/NotificationProvider";
import { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import { CircularProgress, Typography, Alert } from "@mui/material";
import NotificationsTable from "./NotificationsTable";

const NotificationsTab = () => {
  const theme = useTheme();

  //retrieve notifications state
  const { noNotifications, loading, error } = useContext(NotificationContext);

  return (
    <>
      {loading && (
        <CircularProgress
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
        />
      )}
      {!loading && noNotifications && (
        <Typography
          color={theme.palette.primary.dark}
          sx={{
            mt: { xs: 12, sm: 20 },
            mr: "auto",
            ml: { xs: "auto", sm: 25, md: "auto" },
            textAlign: "center",
            p: 2,
            width: {
              xs: "100%",
              sm: "70%",
              md: "60%",
            },
          }}
          variant='h5'
        >
          You didn't receive any notifications yet.
        </Typography>
      )}
      {!loading && !noNotifications && <NotificationsTable />}
      {!loading && error && (
        <Alert severity='error'>Error on loading notifications</Alert>
      )}
    </>
  );
};

export default NotificationsTab;
