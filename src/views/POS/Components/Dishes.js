import React, { useState, useEffect } from 'react';
import { getApi } from 'core/apis/apiClient.js';
import { urls } from 'core/constant/urls';

const useDishes = (categories) => {
const [dishes, setRows] = useState([]);

  const fetchData = async () => {
    const response = await getApi(urls?.item?.get);

    
    const formattedData = response?.data
      ?.filter((item) =>
        categories.some(
          (category) =>
            category.checked && 
            category.items.some(
              (catItem) => catItem.checked && catItem._id === item._id 
            )
        )
      )
      .map((item) => ({
        id: item?._id,
        name: item?.name,
        image: item?.itemImage,
        price: item?.price,
        cost: item?.cost
      }));

    setRows(formattedData);
  };

  useEffect(() => {
    fetchData();
  }, [categories]); 

  return dishes;
};

export default useDishes;
