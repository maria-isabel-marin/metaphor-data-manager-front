import React, { useEffect, useState } from 'react';
import { fetchData, deleteData } from '../api';

const RowDataList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData().then((res) => setData(res.data));
  }, []);

  const handleDelete = (id) => {
    deleteData(id).then(() => setData(data.filter(item => item.id !== id)));
  };

  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>
          {item.titulo_1}
          <button onClick={() => handleDelete(item.id)}>Eliminar</button>
        </li>
      ))}
    </ul>
  );
};

export default RowDataList;
