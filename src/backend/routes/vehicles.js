const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all vehicles
router.get('/', async (req, res) => {
    let conn;
    try {
        conn = await db.getConnection();
        const rows = await conn.query('SELECT * FROM vehicles');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (conn) conn.release();
    }
});

// GET a single vehicle
router.get('/:id', async (req, res) => {
    let conn;
    try {
        conn = await db.getConnection();
        const rows = await conn.query('SELECT * FROM vehicles WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            res.status(404).json({ message: "Vehicle not found" });
        } else {
            res.json(rows[0]);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (conn) conn.release();
    }
});

// POST a new vehicle
router.post('/', async (req, res) => {
    let conn;
    try {
        conn = await db.getConnection();
        const result = await conn.query(
            'INSERT INTO vehicles (model, make, year, color, daily_rate) VALUES (?, ?, ?, ?, ?)',
            [req.body.model, req.body.make, req.body.year, req.body.color, req.body.daily_rate]
        );
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (conn) conn.release();
    }
});

// PUT update a vehicle
router.put('/:id', async (req, res) => {
    let conn;
    try {
        conn = await db.getConnection();
        const result = await conn.query(
            'UPDATE vehicles SET model = ?, make = ?, year = ?, color = ?, daily_rate = ? WHERE id = ?',
            [req.body.model, req.body.make, req.body.year, req.body.color, req.body.daily_rate, req.params.id]
        );
        if (result.affectedRows === 0) {
            res.status(404).json({ message: "Vehicle not found" });
        } else {
            res.json({ id: req.params.id, ...req.body });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (conn) conn.release();
    }
});

// DELETE a vehicle
router.delete('/:id', async (req, res) => {
    let conn;
    try {
        conn = await db.getConnection();
        const result = await conn.query('DELETE FROM vehicles WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: "Vehicle not found" });
        } else {
            res.json({ message: "Vehicle deleted successfully" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (conn) conn.release();
    }
});

module.exports = router;