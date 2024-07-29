const express = require('express');
const cors = require('cors'); // Import CORS

const app = express();
const pool = require('./db'); // Import database connection
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors()); // Use CORS middleware

// Import routes
const carRoutes = require('./routes/cars');

// Use routes
app.use('/api/cars', carRoutes);

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
