import { useState, useEffect } from 'react';
import { urls } from 'core/constant/urls';
import { getApi } from 'core/apis/apiClient.js';
import { t } from 'i18next';

 const ApiData = () => {
  const [rows, setRows] = useState([]);

  const fetchData = async () => {
    const response = await getApi(urls?.order?.get);
    const formattedData = response.data.map((item, index) => ({
      id: item?._id,
      serial: index + 1,
      phone: item?.phone || t('N/A'),
      price: item?.totalPrice || t('N/A'),
      discount: item?.discount,
      cost: item?.items?.reduce((acc, curr) => acc + curr?.cost * curr?.quantity, 0),
      profit: item?.totalPrice - (item?.items?.reduce((acc, curr) => acc + curr?.cost * curr?.quantity, 0) + item?.discount),
      payable: item?.totalPrice - item?.discount,
      
    }));

    setRows(formattedData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return rows;
}
export default ApiData;


