import React, { useState } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';

const RowDataImport = ({ onImport }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImport = () => {
    const formData = new FormData();
    formData.append('file', file);

    axios.post('http://localhost:5000/api/row_data/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(onImport)
    .catch((err) => console.error('Error al importar datos:', err));
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept=".xlsx, .xls" />
      <Button variant="contained" color="primary" onClick={handleImport}>
        Importar desde Excel
      </Button>
    </div>
  );
};

export default RowDataImport;
