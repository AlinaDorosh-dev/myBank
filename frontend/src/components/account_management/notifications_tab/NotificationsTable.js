/**
 * @fileoverview This file contains the NotificationsTable component which displays users notifications sorted by date in a table and allows them to mark them as read.
 */
import {
  Typography,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  NavigateBefore,
  NavigateNext,
  MarkEmailRead,
  MarkunreadMailbox,
  Delete,
} from "@mui/icons-material";
import axiosInstance from "../../../api/myBankApi";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState, useContext } from "react";
import { useTheme } from "@mui/material/styles";
import { NotificationContext } from "../../../context/NotificationProvider";

const NotificationsTable = () => {
  const theme = useTheme();

  //retrieve auth state
  const { auth } = useAuth();

  //retrieve notifications state
  const { notifications, setNotifications } = useContext(NotificationContext);

  //retrieve response, error, loading and axiosFetch from useAxios custom hook
  const [response, error, loading, axiosFetch] = useAxios();

  //states for pagination
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [visibleRows, setVisibleRows] = useState([]);

  const COLUMNS = [
    { field: "date", headerName: "Date" },
    { field: "message", headerName: "Message" },
    { field: "read", headerName: "Read" },
    { field: "delete", headerName: "Delete" },
  ];

  //Reformat notifications data to be displayed in table
  useEffect(() => {
    let rows = [];
    if (notifications?.length === 0) return;
    if (notifications?.length > 0) {
      const recievedMsgs = notifications?.map((notification) => {
        return {
          id: notification._id,
          date: new Date(notification.date).toLocaleDateString(),
          message: notification.message,
          read: notification.read,
        };
      });
      rows = recievedMsgs.sort((a, b) => b.date - a.date);
      setRows(rows);
      setVisibleRows(rows.slice(0, 5));
    }
  }, [notifications]);

  //functions for handling pagination
  const handleNextPage = () => {
    if (page < rows.length / 5 - 1) {
      setPage(page + 1);
      setVisibleRows(rows.slice((page + 1) * 5, (page + 2) * 5));
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
      setVisibleRows(rows.slice((page - 1) * 5, page * 5));
    }
  };

  //function for handling marking notifications as read
  const handleMarkAsRead = (id) => {
    axiosFetch({
      axiosInstance: axiosInstance(auth),
      method: "PATCH",
      url: `/notifications/${id}`,
    });
    const updatedNotifications = notifications.map((notification) =>
      notification._id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
  };

  //function for handling deleting notifications
  const handleDetete = (id) => {
    axiosFetch({
      axiosInstance: axiosInstance(auth),
      method: "DELETE",
      url: `/notifications/${id}`,
    });
    const updatedNotifications = notifications.filter(
      (notification) => notification._id !== id
    );
    setNotifications(updatedNotifications);
  };

  return (
    <>
      {visibleRows.length > 0 ? (
        <Paper
          sx={{
            width: { xs: "100%", sm: "75%", md: "85%" },
            ml: { xs: 0, sm: 28, md: 15, lg: 20, xl: 25 },
            maxWidth: { sm: 580, md: 800, lg: 1000, xl: 1200 },
            mt: 20,
            backgroundColor: theme.palette.primary.dark,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button onClick={handlePreviousPage} disabled={page === 0}>
              <NavigateBefore fontSize='large' sx={{ color: "white" }} />
            </Button>
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                p: 2,
                color: "white",
              }}
            >
              NOTIFICATIONS
            </Typography>
            <Button
              onClick={handleNextPage}
              disabled={page === rows.length / 5 - 1}
            >
              <NavigateNext fontSize='large' sx={{ color: "white" }} />
            </Button>
          </Box>
          <TableContainer
            component={Box}
            sx={{
              backgroundColor: "white",
            }}
          >
            <Table
              sx={{
                "& .MuiTableRow-root:nth-of-type(even)": {
                  bgcolor: theme.palette.tableRow.even,
                },
              }}
            >
              <TableHead>
                <TableRow sx={{ backgroundColor: theme.palette.primary.dark }}>
                  {COLUMNS.map((column) => (
                    <TableCell
                      key={column.field}
                      align='center'
                      sx={{
                        color: "white",
                      }}
                    >
                      {column.headerName}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleRows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell
                      align='center'
                      sx={{
                        fontWeight: row.read ? "normal" : "bold",
                      }}
                    >
                      {row.date}
                    </TableCell>
                    <TableCell
                      align='center'
                      sx={{
                        fontWeight: row.read ? "normal" : "bold",
                      }}
                    >
                      {row.message}
                    </TableCell>
                    <TableCell align='center'>
                      {row.read ? (
                        <MarkEmailRead
                          sx={{
                            color: theme.palette.primary.main,
                          }}
                        />
                      ) : (
                        <Tooltip title='Mark as read'>
                          <IconButton onClick={() => handleMarkAsRead(row.id)}>
                            <MarkunreadMailbox
                              sx={{
                                color: theme.palette.notification.main,
                              }}
                            />
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                    <TableCell align='center'>
                      <Tooltip title='Delete'>
                        <IconButton onClick={() => handleDetete(row.id)}>
                          <Delete 
                            sx={{
                              color: theme.palette.notification.delete,
                            }}
                          />
                        </IconButton>
                      </Tooltip>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : null}
    </>
  );
};

export default NotificationsTable;
