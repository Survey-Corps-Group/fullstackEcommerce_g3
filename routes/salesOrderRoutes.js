const express = require('express');
const router = express.Router();
const upload = require('../config/multer'); // Import multer configuration
const salesOrderController = require('../controllers/salesOrderController');
const { authenticateTokenMiddleware, authorizeAdmin, authorizeUser } = require('../config/middleware');

router.put('/payment_proof/:salesorder_id', upload.single('image'), salesOrderController.uploadPaymentProof);
router.put('/order/recieved/:salesorder_id', salesOrderController.markOrderAsReceived);
router.post('/order/checkout', authenticateTokenMiddleware, salesOrderController.createOrder);
router.get('/admin/listorder', salesOrderController.listOrders);
router.get('/admin/orders/:id', salesOrderController.getOrderDetails);
router.put('/admin/orders/:id', salesOrderController.verifyOrder);

module.exports = router;
