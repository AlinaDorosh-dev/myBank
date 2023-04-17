/**
 * @fileoverview This file contains the TransactionsHistory component. This component is used to display users transactions history
 */
import {
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";

import { TransactionsContext } from "../../../context/TransactionsProvider";
import { useEffect, useState, useContext } from "react";
import { useTheme } from "@mui/material/styles";

const TransactionsHistory = () => {
  const theme = useTheme();

  //retrieve transactions state
  const { transactions, noTransactions, errMessage } =
    useContext(TransactionsContext);

  //states for pagination
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [visibleRows, setVisibleRows] = useState([]);

  const COLUMNS = [
    { field: "date", headerName: "Date" },
    { field: "remitent/receiver", headerName: "Remitent/Receiver" },
    { field: "description", headerName: "Description" },
    { field: "amount", headerName: "Amount" },
    { field: "type", headerName: "Type" },
  ];

  //reformat transactions data for table
  useEffect(() => {
    let rows = [];

    if (
      transactions?.incomingTransactions ||
      transactions?.outgoingTransactions
    ) {
      const incomingRows = transactions?.incomingTransactions?.map(
        (transaction) => {
          return {
            id: transaction._id,
            date: new Date(transaction.date).toLocaleDateString(),
            name: `${transaction.sourceAcc.user.firstName} ${transaction.sourceAcc.user.lastName}`,
            description: transaction.description,
            amount: `${transaction.amount} €`,
            type: "incoming",
          };
        }
      );
      const outgoingRows = transactions?.outgoingTransactions?.map(
        (transaction) => {
          return {
            id: transaction._id,
            date: new Date(transaction.date).toLocaleDateString(),
            name: `${transaction.destinationAcc.user.firstName} ${transaction.destinationAcc.user.lastName}`,
            description: transaction.description,
            amount: `${transaction.amount} €`,
            type: "outgoing",
          };
        }
      );
      rows = incomingRows
        .concat(outgoingRows)
        .sort((a, b) => (b.date > a.date ? -1 : a.date > b.date ? 1 : 0));
      setRows(rows);
      setVisibleRows(rows.slice(0, 5));
    }
  }, [transactions?.incomingTransactions, transactions?.outgoingTransactions]);

  //handle pagination
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

  return (
    <Box>
      {noTransactions ? (
        <Typography
          color={theme.palette.primary.dark}
          sx={{ mt: 12, width: "100%", textAlign: "center" }}
          variant='h5'
        >
          You don't have any transactions yet. Make your first transaction now!
        </Typography>
      ) : errMessage ? (
        <Alert severity='error'>{errMessage}</Alert>
      ) : (
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
              TRANSACTIONS HISTORY
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
              <TableHead
                sx={{
                  backgroundColor: theme.palette.primary.dark,
                }}
              >
                <TableRow>
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
              <TableBody sx={{}}>
                {visibleRows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell align='center'>{row.date}</TableCell>
                    <TableCell align='center'>{row.name}</TableCell>
                    <TableCell align='center'>{row.description}</TableCell>
                    <TableCell align='center'>{row.amount}</TableCell>
                    <TableCell align='center'>{row.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Box>
  );
};

export default TransactionsHistory;
