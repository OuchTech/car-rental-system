import React, { useState, useEffect } from 'react';
import { getVehicles, deleteVehicle } from '../services/api';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const data = await getVehicles();
      setVehicles(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch vehicles');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteVehicle(id);
      fetchVehicles();
    } catch (err) {
      console.error('Failed to delete vehicle:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Vehicles</h2>
      <ul>
        {vehicles.map(vehicle => (
          <li key={vehicle.id}>
            {vehicle.make} {vehicle.model} ({vehicle.year}) - ${vehicle.daily_rate}/day
            <button onClick={() => handleDelete(vehicle.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VehicleList;