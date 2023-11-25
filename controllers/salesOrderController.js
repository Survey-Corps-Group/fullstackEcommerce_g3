const salesOrderService = require('../service/salesOrderService');

class SalesOrderController {

    async uploadPaymentProof(req, res) {
        const salesOrderId = req.params.salesorder_id;

        // Check if the file is uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        try {
            const imagePath = req.file.path;
            const updatedSalesOrder = await salesOrderService.uploadPaymentProof(salesOrderId, imagePath);
            res.json({ updatedSalesOrder });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async markOrderAsReceived(req, res) {
        const salesOrderId = req.params.salesorder_id;

        try {
            const updatedOrder = await salesOrderService.markOrderAsReceived(salesOrderId);
            res.json({ updatedOrder });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async createOrder(req, res) {
        const { salesorder_no, product, order_status, customer_name, shipping_cost, sub_total, orderDetails } = req.body;
        const userId = req.userId;

        try {
            const orderData = { salesorder_no, user_id: userId, product, order_status, customer_name, shipping_cost, sub_total, is_verified: false, image_payment: "" };
            const createdOrder = await salesOrderService.createOrderWithDetails(orderData, orderDetails);
            
            res.json(createdOrder);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async listOrders(req, res) {
        try {
            const orders = await salesOrderService.listOrders();
            res.json({ success: true, orders });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async getOrderDetails(req, res) {
        const orderId = parseInt(req.params.id);

        try {
            const orderDetails = await this.salesOrderService.getOrderDetails(orderId);
            
            if (!orderDetails) {
                return res.status(404).json({
                    success: false,
                    message: "Order not found",
                });
            }

            res.json({ success: true, orderDetails });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async verifyOrder(req, res) {
        const orderId = parseInt(req.params.id);

        try {
            const updatedOrder = await this.salesOrderService.verifyOrder(orderId);
            res.json({
                success: true,
                message: "Order status updated successfully",
                updatedOrder,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

}

module.exports = new SalesOrderController();
