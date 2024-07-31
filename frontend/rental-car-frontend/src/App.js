import React, { useState } from 'react';
import CarList from './components/CarList';
import CarForm from './components/CarForm';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';

function App() {
  const [token, setToken] = useState('');
  const [showLogin, setShowLogin] = useState(true);
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    setToken('');
    setShowLogin(true);
    setShowProfile(false);
  };

  if (!token) {
    return (
      <div>
        {showLogin ? (
          <>
            <Login setToken={setToken} />
            <p>
              Don't have an account?{' '}
              <button onClick={() => setShowLogin(false)}>Register</button>
            </p>
          </>
        ) : (
          <>
            <Register />
            <p>
              Already have an account?{' '}
              <button onClick={() => setShowLogin(true)}>Login</button>
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Rental Car System</h1>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => setShowProfile(!showProfile)}>
        {showProfile ? 'Hide Profile' : 'Show Profile'}
      </button>
      {showProfile ? (
        <Profile token={token} />
      ) : (
        <>
          <CarList token={token} />
          <CarForm token={token} />
        </>
      )}
    </div>
  );
}

export default App;
