import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import EarningCard from './EarningCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import AppConversionRates from './AppConversionCard';
import AppCurrentVisits from './AppCurrentVisitCard';
import ApiData from './apiData';
import ExpenseData from './expenseApiData';
// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const theme = useTheme();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  const fetchData = ApiData();
  const fetchExpenseData = ExpenseData();
  const totalSaleamount = fetchData.reduce((acc, row) => acc + row.price, 0)
  const totalCostamount = fetchData.reduce((acc, row) => acc + row.cost, 0)
  const totalDiscountamount = fetchData.reduce((acc, row) => acc + row.discount, 0)
  const totalProfitamount = fetchData.reduce((acc, row) => acc + row.profit, 0)
  const totalPayableamount = fetchData.reduce((acc, row) => acc + row.payable, 0)
  const totalExpenseamount = fetchExpenseData.reduce((acc, row) => acc + row.amount, 0)
  const totalProfitAfteExpense = totalProfitamount - totalExpenseamount
  const totalTax=0


  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <TotalOrderLineChartCard keyName={"Total sale Amount"} value={totalSaleamount} isLoading={isLoading} />
          </Grid>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <EarningCard keyName={"Total Payable Amount"} value={totalPayableamount} isLoading={isLoading} />
          </Grid>
          <Grid item sm={6} xs={12} md={6} lg={3}>
            <TotalOrderLineChartCard keyName={"Total Cost Amount"} value={totalCostamount}  isLoading={isLoading} />
          </Grid>

          <Grid item sm={6} xs={12} md={6} lg={3}>
            <EarningCard keyName={"Total Expense Amount"} value={totalExpenseamount} isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <TotalOrderLineChartCard keyName={"Total Discount Amount"} value={totalDiscountamount} isLoading={isLoading} />
          </Grid>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <EarningCard  keyName={"Net Profit"} value={totalProfitAfteExpense}  isLoading={isLoading} />
          </Grid>
          <Grid item sm={6} xs={12} md={6} lg={3}>
            <TotalOrderLineChartCard keyName={"Total Profit Amount"} value={totalProfitamount} isLoading={isLoading} />
          </Grid>

          <Grid item sm={6} xs={12} md={6} lg={3}>
            <EarningCard keyName={"Total Tax Amount"} value={totalTax}isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={12}>
            <TotalGrowthBarChart isLoading={isLoading} />
          </Grid>
        
        </Grid>
      </Grid>
      
    </Grid>
  );
};

export default Dashboard;
