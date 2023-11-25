const salesOrderRepository = require('../repository/salesOrderRepository');
const salesOrderDetailRepository = require('../repository/salesOrderDetailRepository');

class SalesOrderService {
    
    async uploadPaymentProof(salesOrderId, imagePath) {
        return await salesOrderRepository.updatePaymentProof(salesOrderId, imagePath);
    }
    
    async markOrderAsReceived(salesOrderId) {
        return await salesOrderRepository.updateOrderStatus(salesOrderId, 'recieved');
    }
    async createOrderWithDetails(orderData, orderDetails) {
        const createOrder = await salesOrderRepository.createOrder(orderData);

        const salesOrderId = createOrder.salesorder_id;
        const createdOrderDetails = await Promise.all(orderDetails.map(async detail => {
            return salesOrderDetailRepository.createOrderDetail({
                ...detail,
                salesorder_id: salesOrderId
            });
        }));

        return { createOrder, createdOrderDetails };
    }

    async listOrders() {
        return await salesOrderRepository.findAllOrders();
    }

    async getOrderDetails(orderId) {
        return await salesOrderRepository.findOrderById(orderId);
    }

    async verifyOrder(orderId) {
        return await salesOrderRepository.updateOrderVerification(orderId, true);
    }
}

module.exports = new SalesOrderService();
