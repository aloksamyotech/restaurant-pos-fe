import React, { useState } from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Checkbox,
    FormControlLabel,
    Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect } from "react";
import { getApi } from "core/apis/apiClient";
import { urls } from "core/constant/urls";

const POSCategories = ({ categories, setCategories }) => {

    useEffect(() => {
        const fetchData = async () => {
         const categoryResponse = await getApi(urls?.foodCategory?.get);
         const fetchedCategories = categoryResponse?.data || [];
         const itemResponse = await getApi(urls?.item?.get);
         const items = itemResponse?.data || [];
         const formattedCategories = fetchedCategories.map((category) => {
                const filteredItems = items.filter((item) => String(item?.categoryId?._id) === String(category?._id));
                return {
                    ...category,
                    checked: true,
                    items: filteredItems.map((item) => ({
                        ...item,
                        checked: true
                    }))
                };
            });
            setCategories(formattedCategories);

        };

        fetchData();
    }, []);

    const handleCategoryChange = (categoryId) => {
        setCategories((prevCategories) =>
            prevCategories.map((category) =>
                category._id === categoryId
                    ? {
                        ...category,
                        checked: !category.checked,
                        items: category.items.map((item) => ({
                            ...item,
                            checked: !category.checked
                        }))
                    }
                    : category
            )
        );
    };

    const handleItemChange = (categoryId, itemId) => {
        setCategories((prevCategories) =>
            prevCategories.map((category) =>
                category._id === categoryId
                    ? {
                        ...category,
                        items: category.items.map((item) =>
                            item._id === itemId ? { ...item, checked: !item.checked } : item
                        )
                    }
                    : category
            )
        );
    };

    return (
        <div>
            {categories.map((category) => (
                <Accordion key={category._id}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={category.checked}
                                    onChange={() => handleCategoryChange(category._id)}
                                />
                            }
                            label={<Typography variant="h6">{category?.categoryName}</Typography>}
                        />
                    </AccordionSummary>

                    <AccordionDetails>
                        {category.items.map((item) => (
                            <FormControlLabel
                                key={item._id}
                                control={
                                    <Checkbox
                                        checked={item.checked}
                                        onChange={() => handleItemChange(category._id, item._id)}
                                        disabled={!category.checked} 
                                    />
                                }
                                label={item?.name}
                                sx={{ marginLeft: 2 }}
                            />
                        ))}
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
};

export default POSCategories;
