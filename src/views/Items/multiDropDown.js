import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { urls } from 'core/constant/urls';
import { postApi } from 'core/apis/apiClient.js';
import { getApi } from 'core/apis/apiClient.js';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.includes(name) ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular
  };
}

export default function MultipleSelect({ onSelectionChange }) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;

    const selectedValues = typeof value === 'string' ? value.split(',') : value;
    setPersonName(selectedValues);

    if (onSelectionChange) {
      onSelectionChange(selectedValues);
    }
  };
  const [ingredient, setingredients] = React.useState([]);

  React.useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [ingredientResponse] = await Promise.all([getApi(urls?.ingredient.get)]);
        setingredients(ingredientResponse.data);
      } catch (error) {
        console.error('Failed to load dropdown data', error);
      }
    };
    fetchDropdownData();
  }, []);

  return (
    <div>
      <FormControl sx={{ width: 265 }}>
        <InputLabel id="demo-multiple-name-label">Ingredients</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Ingredients" />}
          MenuProps={MenuProps}
        >
          {ingredient.map((type) => (
            <MenuItem key={type._id} value={type._id} style={getStyles(type._id, personName, theme)}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
