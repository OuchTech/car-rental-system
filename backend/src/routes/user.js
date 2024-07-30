const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../db');
const jwt = require('jsonwebtoken');

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

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM users WHERE username = ?', [username]);
    conn.release();
    if (rows.length > 0) {
      const user = rows[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
      } else {
        res.status(401).send('Invalid credentials');
      }
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
