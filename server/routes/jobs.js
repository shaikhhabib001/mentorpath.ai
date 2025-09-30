const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

// Get all jobs with filtering and pagination
router.get('/', jobController.getJobs);

// Get recommended jobs (optionally based on session CV analysis)
router.get('/recommended', jobController.getRecommendedJobs);

// Get job statistics
router.get('/stats', jobController.getJobStats);

// Search jobs
router.get('/search', jobController.searchJobs);

// Get job by ID
router.get('/:id', jobController.getJob);

module.exports = router;