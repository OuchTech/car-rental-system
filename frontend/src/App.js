import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import VehicleList from './components/VehicleList';
import VehicleForm from './components/VehicleForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Car Rental System</h1>
          <nav>
            <ul>
              <li><Link to="/">Vehicle List</Link></li>
              <li><Link to="/add">Add Vehicle</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<VehicleList />} />
            <Route path="/add" element={<VehicleForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;