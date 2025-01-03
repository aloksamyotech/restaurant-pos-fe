import React, { useState, useEffect } from "react";
import { getApi } from 'core/apis/apiClient.js';
import { urls } from "core/constant/urls";

const useDishes = () => {
    const [dishes, setRows] = useState([]);
    const fetchData = async () => {
      
      const response = await getApi(urls?.item?.get);
      
      const formattedData = response?.data?.map((item, index) => ({
        id: item?._id,
        name: item?.name,
        
        image: item?.image,
        
        price: item?.price,
       
    
  
        
      }));
      setRows(formattedData);
           };
  
    useEffect(() => {
  
      fetchData();
    }, []);
    return dishes;
  }

  export default useDishes;