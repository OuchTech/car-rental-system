import React, { useState, useEffect } from 'react';

import axios from 'axios';
import CarForm from './CarForm';

const CarList = ({ token }) => {
  const [cars, setCars] = useState([]);
  const [editingCar, setEditingCar] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/cars', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, [token]);

  const handleEditClick = (car) => {
    setEditingCar(car);
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/cars/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCars(cars.filter(car => car.id !== id));
      alert('Car deleted successfully');
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  return (
    <div>
      <h2>Car List</h2>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            {car.make} {car.model} ({car.year})
            <button onClick={() => handleEditClick(car)}>Edit</button>
            <button onClick={() => handleDeleteClick(car.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <CarForm token={token} editingCar={editingCar} setEditingCar={setEditingCar} />
    </div>
  );
};

export default CarList;
