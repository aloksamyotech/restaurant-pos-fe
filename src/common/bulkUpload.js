import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import Papa from 'papaparse';

const BulkUpload = ({ onBulkUpload }) => {
  const [csvData, setCsvData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          setCsvData(result.data);
        },
        header: true, // Converts CSV headers into JSON keys
        skipEmptyLines: true
      });
    }
  };

  const handleUpload = () => {
    if (csvData.length > 0) {
      onBulkUpload(csvData); // Send parsed data to parent component
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <Button variant="contained" color="primary" onClick={handleUpload}>
        Upload Data
      </Button>
      <Typography variant="body2">{csvData.length > 0 && `Loaded ${csvData.length} entries`}</Typography>
    </div>
  );
};

export default BulkUpload;
