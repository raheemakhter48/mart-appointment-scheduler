const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin', 'provider'], default: 'user' },
  status: { type: String, enum: ['active', 'inactive', 'pending'], default: 'active' },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema); 