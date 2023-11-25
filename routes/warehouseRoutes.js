const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouseController');
const { authenticateTokenMiddleware, authorizeAdmin } = require('../config/middleware');

router.get('/', authenticateTokenMiddleware, authorizeAdmin, warehouseController.getWarehouses);
router.get('/:id', authenticateTokenMiddleware, authorizeAdmin, warehouseController.getWarehouseById);
router.post('/', authenticateTokenMiddleware, authorizeAdmin, warehouseController.createWarehouse);
router.put('/:id', authenticateTokenMiddleware, authorizeAdmin, warehouseController.updateWarehouse);
router.delete('/:id', authenticateTokenMiddleware, authorizeAdmin, warehouseController.deleteWarehouse);

module.exports = router;
