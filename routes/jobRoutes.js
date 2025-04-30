const express = require("express");
const router = express.Router();
const { createJob, getJobs, getJobById, updateJob, deleteJob } = require("../controller/jobController");
const auth = require("../middlewares/auth");

router.post('/', auth, createJob); // Create a new job
router.get('/', getJobs); // Get all jobs
router.get('/:id', getJobById); // Get a job by ID
router.put('/:id', auth, updateJob); // Update a job by ID
router.delete('/:id', auth, deleteJob); // Delete a job by ID
module.exports = router;