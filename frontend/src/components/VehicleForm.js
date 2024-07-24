import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createVehicle } from '../services/api';

const VehicleForm = () => {
  const [vehicle, setVehicle] = useState({
    make: '',
    model: '',
    year: '',
    color: '',
    daily_rate: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createVehicle(vehicle);
      navigate('/');
    } catch (error) {
      console.error('Failed to create vehicle:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Vehicle</h2>
      <div>
        <label htmlFor="make">Make:</label>
        <input type="text" id="make" name="make" value={vehicle.make} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="model">Model:</label>
        <input type="text" id="model" name="model" value={vehicle.model} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="year">Year:</label>
        <input type="number" id="year" name="year" value={vehicle.year} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="color">Color:</label>
        <input type="text" id="color" name="color" value={vehicle.color} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="daily_rate">Daily Rate:</label>
        <input type="number" id="daily_rate" name="daily_rate" value={vehicle.daily_rate} onChange={handleChange} required />
      </div>
      <button type="submit">Add Vehicle</button>
    </form>
  );
};

export default VehicleForm;