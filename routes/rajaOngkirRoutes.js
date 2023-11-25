const express = require('express');
const router = express.Router();
const rajaOngkirController = require('../controllers/rajaOngkirController');

router.get('/province', rajaOngkirController.getProvinces);
router.get('/city', rajaOngkirController.getCities);
router.post('/cost', rajaOngkirController.calculateCost);

module.exports = router;
