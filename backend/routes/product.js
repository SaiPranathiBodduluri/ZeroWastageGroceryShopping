const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST new product(s)
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    if (Array.isArray(data)) {
      // Bulk insert
      await Product.insertMany(data);
      res.status(201).json({ message: "Multiple products added successfully" });
    } else {
      // Single insert
      const product = new Product(data);
      await product.save();
      res.status(201).json({ message: "Product added successfully", product });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;
