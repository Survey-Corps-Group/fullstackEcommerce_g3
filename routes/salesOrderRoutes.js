const express = require('express');
const router = express.Router();
const upload = require('../config/multer'); // Import multer configuration
const salesOrderController = require('../controllers/salesOrderController');
const { authenticateTokenMiddleware, authorizeAdmin } = require('../config/middleware');

router.put('/payment_proof/:salesorder_id', upload.single('image'), authenticateTokenMiddleware, salesOrderController.uploadPaymentProof);
router.put('/recieved/:salesorder_id', authenticateTokenMiddleware, salesOrderController.markOrderAsReceived);
router.post('checkout', authenticateTokenMiddleware, salesOrderController.createOrder);
router.get('/listorder', authenticateTokenMiddleware, authorizeAdmin, usalesOrderController.listOrders);
router.get(':id', authenticateTokenMiddleware, authorizeAdmin, salesOrderController.getOrderDetails);
router.put(':id', authenticateTokenMiddleware, authorizeAdmin, salesOrderController.verifyOrder);

module.exports = router;
