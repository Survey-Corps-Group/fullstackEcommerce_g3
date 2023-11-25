const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const { authenticateTokenMiddleware } = require('../config/middleware')

router.post('/:id', authenticateTokenMiddleware, feedbackController.createFeedback);

module.exports = router;
