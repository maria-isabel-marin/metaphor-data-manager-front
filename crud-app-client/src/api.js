import axios from 'axios';

const API_URL = 'http://localhost:5000/api/row_data';

export const fetchData = () => axios.get(API_URL);
export const createData = (data) => axios.post(API_URL, data);
export const updateData = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteData = (id) => axios.delete(`${API_URL}/${id}`);
