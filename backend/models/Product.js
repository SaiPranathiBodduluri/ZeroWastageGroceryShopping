const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  oldPrice: { type: Number },
  expiry: { type: String },
  quantity: { type: Number, default: 1 },
  image: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
