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
  TablePagination,
  TableSortLabel,
} from "@mui/material";

import axiosInstance from "../../../api/myBankApi";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { maxWidth } from "@mui/system";

const TransactionsHistory = () => {
  const theme = useTheme();
  const { auth } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [noTransactions, setNoTransactions] = useState(false);
  const [response, error, loading, axiosFetch] = useAxios();
  const [showIncoming, setShowIncoming] = useState(true);
  const [rows, setRows] = useState([]);

  const INCOMING_COLUMNS = [
    { field: "date", headerName: "Date", width: 120 },
    { field: "remitent", headerName: "Remitent", width: 250 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "amount", headerName: "Amount", width: 100 },
  ];

  const OUTGOING_COLUMNS = ["date", "beneficiary", "description", "amount"];

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
    if (transactions.incomingTransactions) {
      const rows = transactions.incomingTransactions.map((transaction) => {
        return {
          id: transaction._id,
          date: new Date(transaction.date).toLocaleDateString(),
          remitent: `${transaction.sourceAcc.user.firstName} ${transaction.sourceAcc.user.lastName}`,
          description: transaction.description,
          amount: `${transaction.amount} €`,
        };
      });
      setRows(rows);
    }
  }, [transactions]);

  return (
    <Box>
      <Typography
        variant='h6'
        sx={{
          textAlign: "center",
          mt: { xs: 2, sm: 15 },
          mb: 1,
        }}
      >
        Your transactions history:
      </Typography>

      <Box
        sx={{
          width: { xs: "100%", sm: "75%", md: "85%" },
          ml: { xs: 0, sm: 28, md: 15 , lg: 20, xl: 25},
          maxWidth: { sm: 580, md: 800, lg: 1000, xl: 1200 },
          mt: 3,
          backgroundColor: "white",
        }}
      >
        
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              p: 2,
              color: theme.palette.primary.dark,
            }}
          >
            INCOMING TRANSACTIONS
          </Typography>
       
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {INCOMING_COLUMNS.map((column) => (
                  <TableCell key={column.field} align='center'>
                    {column.headerName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow>
                  <TableCell align='center'>{row.date}</TableCell>
                  <TableCell align='center'>{row.remitent}</TableCell>
                  <TableCell align='center'>{row.description}</TableCell>
                  <TableCell align='center'>{row.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default TransactionsHistory;
