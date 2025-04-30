const express = require('express');
const mongos = require('mongoose');
const cors = require('cors');
const listEndpoints = require("express-list-endpoints");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongos.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));


// Routes placeholder
app.get('/', (req, res) => {
    res.send("Job Board API Running");
  });

const authRoute = require('./routes/authRoutes')
const jobRoutes = require("./routes/jobRoutes");
app.use("/api/auth", authRoute)
app.use("/api/jobs", jobRoutes)

const endpoints = listEndpoints(app);
console.log(endpoints);



  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });