const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const listEndpoints = require("express-list-endpoints");
require('dotenv').config();

const seedAdminUser = require('./seeder/seedAdmin'); 

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(async () => {
  console.log("✅ MongoDB connected");
  await seedAdminUser(); // <-- Run admin seeder
})
.catch(err => console.error('❌ MongoDB connection error:', err));

// Routes placeholder
app.get('/', (req, res) => {
  res.send("Job Board API Running");
});

const authRoute = require('./routes/authRoutes');
const jobRoutes = require("./routes/jobRoutes");
const likeRoutes = require("./routes/likeRoutes");


app.use("/api/auth", authRoute);
app.use("/api/jobs", jobRoutes);
app.use("/api",likeRoutes);

// List endpoints
const endpoints = listEndpoints(app);
console.log('📋 API Endpoints:', endpoints);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
