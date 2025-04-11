import { useState, useEffect } from 'react';
import { urls } from 'core/constant/urls';
import { getApi } from 'core/apis/apiClient.js';
import { getUserInfoFromToken } from 'core/apis/common';

const useGetTax = () => {
  const [taxPercentage, setTaxPercentage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const UserInfo = getUserInfoFromToken();
      const id = UserInfo?.id;
      console.log("id", id);

      try {
        const response = await getApi(urls?.employee?.getbyid.replace(':id', id));
        const tax = response?.data?.tax;
        console.log("tax", tax);
        setTaxPercentage(tax);
      } catch (error) {
        console.error("Error fetching tax:", error);
      }
    };

    fetchData();
  }, []);

  return taxPercentage;
};

export default useGetTax;
