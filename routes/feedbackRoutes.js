const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

router.post('/products/:id/feedback', feedbackController.createFeedback);

module.exports = router;
