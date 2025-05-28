import React, { useState, useEffect } from 'react';
import { getApi } from 'core/apis/apiClient.js';
import { urls } from 'core/constant/urls';

const ExpenseData = () => {
  const [expenses, setExpenses] = useState([]);
 

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const response = await getApi(urls?.expense?.get);
    const formattedData = response.data.map((item, index) => ({
      serial: index + 1,
      name: item?.name,
      desc: item?.desc,
      amount: item?.amount,
      expenseType: item?.expenseNameId?.expenseName,
      createdAt: new Date(item?.createdAt).toLocaleDateString()
    }));
    setExpenses(formattedData);
   
  };

  return expenses;
   
  
}

export default ExpenseData;
