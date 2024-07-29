require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const pool = require('./db'); // Import database connection
const carRoutes = require('./routes/cars');
const userRoutes = require('./routes/user');
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors()); // Use CORS middleware

// Use routes
app.use('/api/cars', carRoutes);
app.use('/api/user', userRoutes);

app.get('/', async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT 1 as val");
    conn.release();
    res.send(rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
