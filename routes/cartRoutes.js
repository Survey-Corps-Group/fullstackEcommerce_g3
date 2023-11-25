const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/', cartController.updateCart);
router.get('/:userId', cartController.getCart);

module.exports = router;
