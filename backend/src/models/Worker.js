const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, required: true }, // e.g., Loader, Machine Operator, Driver
  salary: { type: Number, required: true },
  attendance: [{
    date: { type: Date },
    status: { type: String, enum: ['Present', 'Absent', 'Half-day'] }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Worker', workerSchema);
