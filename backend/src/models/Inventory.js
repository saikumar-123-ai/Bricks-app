const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  item: { type: String, required: true }, // e.g. Available Bricks, Coal, Sand, Clay
  quantity: { type: Number, required: true },
  unit: { type: String, required: true }, // e.g. pcs, tons, kg
  minStockLevel: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);
