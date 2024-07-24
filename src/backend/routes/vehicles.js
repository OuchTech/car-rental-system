const express = require('express');
const router = express.Router();
const Joi = require('joi');
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



const vehicleSchema = Joi.object({
    model: Joi.string().required(),
    make: Joi.string().required(),
    year: Joi.number().integer().min(1900).max(new Date().getFullYear() + 1).required(),
    color: Joi.string(),
    daily_rate: Joi.number().precision(2).positive().required()
  });
  
  const validateVehicle = (req, res, next) => {
    const { error } = vehicleSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
  
  router.get('/', async (req, res) => {
    let conn;
    try {
      conn = await db.getConnection();
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const [rows, fields] = await conn.query('SELECT * FROM vehicles LIMIT ? OFFSET ?', [limit, offset]);
      const [countResult] = await conn.query('SELECT COUNT(*) as count FROM vehicles');
      const totalCount = countResult[0].count;
      res.json({
        data: rows,
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit)
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    } finally {
      if (conn) conn.release();
    }
  });

// POST a new vehicle
router.post('/', validateVehicle, async (req, res) => {
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
router.put('/:id', validateVehicle, async (req, res) => {
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