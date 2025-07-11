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
import GetTax from '../../../common/getTax';
import ExpenseData from './expenseApiData';
import { useTranslation } from 'react-i18next';


// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const theme = useTheme();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  const fetchData = ApiData();
  const fetchtax=GetTax();
  
  
  const fetchExpenseData = ExpenseData();
  const totalSaleamount = fetchData.reduce((acc, row) => acc + row.price, 0)
  console.log( 'totalSaleamount', totalSaleamount);
  
  const totalCostamount = fetchData.reduce((acc, row) => acc + row.cost, 0)
  const totalDiscountamount = fetchData.reduce((acc, row) => acc + row.discount, 0)
  const totalProfitamount = fetchData.reduce((acc, row) => acc + row.profit, 0)
  const totalPayableamount = fetchData.reduce((acc, row) => acc + row.payable, 0)
  const totalExpenseamount = fetchExpenseData.reduce((acc, row) => acc + row.amount, 0)
  const totalTax=Math.round(fetchData.reduce((acc, row) => acc + (row.price * fetchtax / 100), 0));
  const totalProfitAfteExpense = totalProfitamount - (totalExpenseamount + totalTax);
  const { t } = useTranslation();



  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <TotalOrderLineChartCard keyName={t('Total Sale Amount')} value={totalSaleamount} isLoading={isLoading} />
          </Grid>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <EarningCard keyName={t("Total Payable Amount")} value={totalPayableamount} isLoading={isLoading} />
          </Grid>
          <Grid item sm={6} xs={12} md={6} lg={3}>
            <TotalOrderLineChartCard keyName={t("Total Cost Amount")} value={totalCostamount}  isLoading={isLoading} />
          </Grid>

          <Grid item sm={6} xs={12} md={6} lg={3}>
            <EarningCard keyName={t("Total Expense Amount")} value={totalExpenseamount} isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <TotalOrderLineChartCard keyName={t("Total Discount Amount")} value={totalDiscountamount} isLoading={isLoading} />
          </Grid>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <EarningCard  keyName={t("Net Profit")} value={totalProfitAfteExpense}  isLoading={isLoading} />
          </Grid>
          <Grid item sm={6} xs={12} md={6} lg={3}>
            <TotalOrderLineChartCard keyName={t("Total Profit Amount")} value={totalProfitamount} isLoading={isLoading} />
          </Grid>

          <Grid item sm={6} xs={12} md={6} lg={3}>
            <EarningCard keyName={t("Total Tax Amount")} value={totalTax}isLoading={isLoading} />
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
