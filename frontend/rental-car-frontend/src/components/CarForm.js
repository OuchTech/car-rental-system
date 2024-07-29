import React, { useState } from 'react';
import axios from 'axios';

const CarForm = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/cars', { make, model, year });
      alert('Car added successfully');
      setMake('');
      setModel('');
      setYear('');
    } catch (error) {
      console.error('Error adding car:', error);
    }
  };

  return (
    <div>
      <h2>Car Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Make:</label>
          <input type="text" value={make} onChange={(e) => setMake(e.target.value)} required />
        </div>
        <div>
          <label>Model:</label>
          <input type="text" value={model} onChange={(e) => setModel(e.target.value)} required />
        </div>
        <div>
          <label>Year:</label>
          <input type="number" value={year} onChange={(e) => setYear(e.target.value)} required />
        </div>
        <button type="submit">Add Car</button>
      </form>
    </div>
  );
};

export default CarForm;
