import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { createData, updateData } from '../api';

const RowDataForm = ({ data, isEditing, onSave }) => {
  const [form, setForm] = useState(data || {});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateData(data.id, form).then(onSave);
    } else {
      createData(form).then(onSave);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField name="titulo_1" label="Titulo 1" value={form.titulo_1 || ''} onChange={handleChange} />
      {/* Agregar más campos de acuerdo a la estructura */}
      <Button type="submit">{isEditing ? 'Actualizar' : 'Crear'}</Button>
    </form>
  );
};

export default RowDataForm;
