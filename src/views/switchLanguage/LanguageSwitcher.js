import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Box from '@mui/material/Box';
import LanguageIcon from '@mui/icons-material/Language';
const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    window.location.reload();
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '20px' }}>
      <LanguageIcon />
      <Box>
        <FormControl sx={{ fontSize: '0.875rem', pl: '10px', pr: '10px' }}>
         
          <Select
            defaultValue={i18n.language}
            onChange={(e) => changeLanguage(e.target.value)}
            
          >
            <MenuItem value="en-US">English</MenuItem>
            <MenuItem value="es">Español</MenuItem>
            <MenuItem value="eh">हिन्दी</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};
export default LanguageSwitcher;
