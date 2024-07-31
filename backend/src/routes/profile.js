const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../db');
const { authenticateToken } = require('../middleware/auth');  // Correct import

// Get user profile
router.get('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query('SELECT id, username, role FROM users WHERE id = ?', [userId]);
    conn.release();
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update user profile
router.put('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { username, password } = req.body;
  try {
    const conn = await pool.getConnection();
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await conn.query('UPDATE users SET username = ?, password = ? WHERE id = ?', [username, hashedPassword, userId]);
    } else {
      await conn.query('UPDATE users SET username = ? WHERE id = ?', [username, userId]);
    }
    conn.release();
    res.send('Profile updated successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
