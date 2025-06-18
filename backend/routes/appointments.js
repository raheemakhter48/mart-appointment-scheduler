const express = require('express');
const Appointment = require('../models/Appointment');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Auth middleware
function auth(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}

// Get all appointments (admin/provider)
router.get('/', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('user', 'name email');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get appointment by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate('user', 'name email');
    if (!appointment) return res.status(404).json({ msg: 'Appointment not found' });
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Create appointment
router.post('/', auth, async (req, res) => {
  try {
    const { provider, date, time } = req.body;
    const appointment = new Appointment({
      user: req.user.id,
      provider,
      date,
      time,
    });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update appointment
router.put('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!appointment) return res.status(404).json({ msg: 'Appointment not found' });
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete appointment
router.delete('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) return res.status(404).json({ msg: 'Appointment not found' });
    res.json({ msg: 'Appointment deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router; 