const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db'); // Import database connection
const carRoutes = require('./routes/cars');
const userRoutes = require('./routes/user');
const profileRoutes = require('./routes/profile');
const { authenticateToken, authorizeRole } = require('./middleware/auth');

const PORT = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors()); // Use CORS middleware

// Use routes
app.use('/api/cars', authenticateToken, authorizeRole('admin'), carRoutes);
app.use('/api/user', userRoutes);
app.use('/api/profile', profileRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
