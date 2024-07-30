import React, { useState } from 'react';
import CarList from './components/CarList';
import CarForm from './components/CarForm';
import Login from './components/Login';



function App() {
  const [token, setToken] = useState('');

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="App">
      <h1>Rental Car System</h1>
      <CarList token={token} />
      <CarForm token={token} />
    </div>
  );
}

export default App;
