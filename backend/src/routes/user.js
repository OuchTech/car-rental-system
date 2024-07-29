const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../db');

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const conn = await pool.getConnection();
    await conn.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
    conn.release();
    res.status(201).send('User registered successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
