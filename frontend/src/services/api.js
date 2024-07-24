import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getVehicles = async () => {
  const response = await axios.get(`${API_URL}/vehicles`);
  return response.data;
};

export const getVehicle = async (id) => {
  const response = await axios.get(`${API_URL}/vehicles/${id}`);
  return response.data;
};

export const createVehicle = async (vehicleData) => {
  const response = await axios.post(`${API_URL}/vehicles`, vehicleData);
  return response.data;
};

export const updateVehicle = async (id, vehicleData) => {
  const response = await axios.put(`${API_URL}/vehicles/${id}`, vehicleData);
  return response.data;
};

export const deleteVehicle = async (id) => {
  const response = await axios.delete(`${API_URL}/vehicles/${id}`);
  return response.data;
};