import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CarForm = ({ token, editingCar, setEditingCar }) => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [id, setId] = useState(null);

  useEffect(() => {
    if (editingCar) {
      setMake(editingCar.make);
      setModel(editingCar.model);
      setYear(editingCar.year);
      setId(editingCar.id);
    }
  }, [editingCar]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:3001/api/cars/${id}`, { make, model, year }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        alert('Car updated successfully');
      } else {
        await axios.post('http://localhost:3001/api/cars', { make, model, year }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        alert('Car added successfully');
      }
      setMake('');
      setModel('');
      setYear('');
      setId(null);
      setEditingCar(null);
    } catch (error) {
      console.error('Error adding/updating car:', error);
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Car' : 'Add Car'}</h2>
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
        <button type="submit">{id ? 'Update Car' : 'Add Car'}</button>
      </form>
    </div>
  );
};

export default CarForm;
