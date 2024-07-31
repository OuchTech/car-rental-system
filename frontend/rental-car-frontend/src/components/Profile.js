import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = ({ token }) => {
  const [profile, setProfile] = useState({ username: '', role: '' });
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProfile(response.data);
        setNewUsername(response.data.username);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:3000/api/profile', { username: newUsername, password: newPassword }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Profile updated successfully');
      setNewPassword('');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      <p>Username: {profile.username}</p>
      <p>Role: {profile.role}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Username:</label>
          <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} required />
        </div>
        <div>
          <label>New Password:</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
