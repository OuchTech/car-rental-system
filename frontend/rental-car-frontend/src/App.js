import React from 'react';
import CarList from './components/CarList';
import CarForm from './components/CarForm';

function App() {
  return (
    <div className="App">
      <h1>Rental Car System</h1>
      <CarList />
      <CarForm />
    </div>
  );
}

export default App;
