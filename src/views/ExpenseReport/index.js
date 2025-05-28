import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  CardContent
} from '@mui/material';
import { getApi } from 'core/apis/apiClient.js';
import { urls } from 'core/constant/urls';
import { t } from 'i18next';
import * as XLSX from 'xlsx';
import { Box, Stack } from '@mui/system';

const ExpenseReport = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const currency = localStorage.getItem("$2b$10$ehdPSDmr6P1");
 
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const response = await getApi(urls?.expense?.get);
    const formattedData = response.data.map((item, index) => ({
      serial: index + 1,
      name: item?.name,
      desc: item?.desc || 'N/A',
      amount: item?.amount,
      expenseType: item?.expenseNameId?.expenseName,
      createdAt: new Date(item?.createdAt).toLocaleDateString()
    }));
    setExpenses(formattedData);
    setFilteredExpenses(formattedData);
  };
  const totalExpenseAmount = expenses.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
  const handleFilter = () => {
    if (!startDate || !endDate) return;
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate);

    end.setHours(23, 59, 59, 999);

    const filtered = expenses.filter((expense) => {
      const expenseDate = new Date(expense.createdAt);

      return expenseDate >= start && expenseDate <= end;
    });

    setFilteredExpenses(filtered);
  };

  const handleExportCSV = () => {
    const ws = XLSX.utils.json_to_sheet(filteredExpenses);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Expenses Report');
    XLSX.writeFile(wb, 'Expense_Report.xlsx');
  };

  return (
    <Container>
      <Card sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4">{t('Expense Report')}</Typography>
      </Card>

      <Card sx={{ p: 2, mb: 3 }}>
        <Stack direction={'row'} spacing={2}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            type="date"
            label={t('Start Date')}
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e?.target?.value)}
            sx={{ mr: 2 }}
          />

          <TextField
            type="date"
            label={t('End Date')}
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e?.target?.value)}
            sx={{ mr: 2 ,}}
            
          />
          </Box>
       

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap', 
              gap: 2,
              mb: 2
            }}
          >
            
          <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" color="primary" onClick={handleFilter}>
                {t('Filter')}
              </Button>
              <Button variant="contained" color="primary" onClick={handleExportCSV}>
                {t('Download CSV')}
              </Button>
            </Box>
            <Card sx={{ Width: 'auto', boxShadow: 3 }}>
              <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                 {t('Total Expense Amount')}
                </Typography>
                <Typography variant="h6" color="error" fontWeight="bold" sx={{ml:1}}>
                {currency}{totalExpenseAmount.toLocaleString('en-IN')}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Stack>
      </Card>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('S.No')}</TableCell>
              <TableCell>{t('Expense Name')}</TableCell>
              <TableCell>{t('Description')}</TableCell>
              <TableCell>{t('Amount')}</TableCell>
              <TableCell>{t('Expense Type')}</TableCell>
              <TableCell>{t('Created Date')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredExpenses.map((expense) => (
              <TableRow key={expense.serial}>
                <TableCell>{expense?.serial}</TableCell>
                <TableCell>{expense?.name}</TableCell>
                <TableCell>{expense?.desc}</TableCell>
                <TableCell>{expense?.amount}</TableCell>
                <TableCell>{expense?.expenseType}</TableCell>
                <TableCell>{expense?.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ExpenseReport;
