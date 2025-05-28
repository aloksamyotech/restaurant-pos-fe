import React, { useState, useEffect } from "react";
import { getApi } from "core/apis/apiClient.js";
import { urls } from "core/constant/urls";

const useDishes = (categories) => {
  const [allDishes, setAllDishes] = useState([]);
  const [dishes, setDishes] = useState([]);

  const fetchData = async () => {
    const response = await getApi(urls?.item?.get);
    const formattedData = response?.data?.map((item) => ({
      id: item?._id,
      name: item?.name,
      image: item?.itemImage,
      price: item?.price,
      cost: item?.cost,
      categoryId: String(item?.categoryId?._id)
    }));

    setAllDishes(formattedData);
    setDishes(formattedData);
  };


  useEffect(() => {
    fetchData();
  }, []);


  useEffect(() => {

    const selectedCategories = categories
      .filter((category) => category?.selected)
      .map((category) => String(category._id));

    const checkedItems = categories
      .flatMap((category) =>
        category.items.filter((item) => item.checked).map((item) => item._id)
      );

    if (selectedCategories.length > 0) {
      const filteredData = allDishes.filter((dish) => {

        const categoryMatch = selectedCategories.includes(dish.categoryId);

        const itemMatch = dish.id ? checkedItems.includes(dish.id) : true;

        return categoryMatch && itemMatch;
      });


      setDishes(filteredData);
    } else {
      setDishes(allDishes);
    }
  }, [categories, allDishes]);


  return dishes;
};

export default useDishes;






