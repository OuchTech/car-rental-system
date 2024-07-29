const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all cars
router.get('/', async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM cars");
    conn.release();
    res.json(rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Add a new car
router.post('/', async (req, res) => {
  const { make, model, year } = req.body;
  try {
    const conn = await pool.getConnection();
    const result = await conn.query("INSERT INTO cars (make, model, year) VALUES (?, ?, ?)", [make, model, year]);
    conn.release();
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get car by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM cars WHERE id = ?", [id]);
    conn.release();
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).send('Car not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update car by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { make, model, year, available } = req.body;
  try {
    const conn = await pool.getConnection();
    const result = await conn.query("UPDATE cars SET make = ?, model = ?, year = ?, available = ? WHERE id = ?", [make, model, year, available, id]);
    conn.release();
    if (result.affectedRows > 0) {
      res.send('Car updated successfully');
    } else {
      res.status(404).send('Car not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Delete car by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const conn = await pool.getConnection();
    const result = await conn.query("DELETE FROM cars WHERE id = ?", [id]);
    conn.release();
    if (result.affectedRows > 0) {
      res.send('Car deleted successfully');
    } else {
      res.status(404).send('Car not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
