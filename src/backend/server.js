const express = require('express');
const cors = require('cors');
const db = require('./db');
const vehiclesRoutes = require('./routes/vehicles');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Car Rental System API');
});

app.use('/api/vehicles', vehiclesRoutes);


app.get('/test-db', async (req, res) => {
  let conn;
  try {
    conn = await db.getConnection();
    const rows = await conn.query('SELECT 1 as val');
    res.json({ message: 'Database connection successful', data: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) conn.release(); // release to pool
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

