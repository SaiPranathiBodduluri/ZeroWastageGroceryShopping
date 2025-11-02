const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Serve frontend
const frontendPath = path.join(__dirname, "../frontend/build");
app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
