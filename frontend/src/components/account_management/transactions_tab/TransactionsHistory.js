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
import axiosInstance from "../../../api/myBankApi";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";

const TransactionsHistory = () => {
  const theme = useTheme();
  const { auth } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [noTransactions, setNoTransactions] = useState(false);
  const [response, error, loading, axiosFetch] = useAxios();
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

  useEffect(() => {
    axiosFetch({
      axiosInstance: axiosInstance(auth),
      method: "GET",
      url: "/transactions",
    });
  }, []);

  useEffect(() => {
    if (response?.data) {
      setTransactions(response.data);
      console.log(response.data);
    }
    if (response?.data?.length === 0) {
      setNoTransactions(true);
    }
  }, [response.data]);

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
              "& .MuiTableRow-root:nth-child(even)": {
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
                  <TableCell key={column.field} align='center'
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
    </Box>
  );
};

export default TransactionsHistory;
