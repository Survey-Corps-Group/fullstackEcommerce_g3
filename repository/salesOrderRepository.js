const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class SalesOrderRepository {

    async updatePaymentProof(salesOrderId, imagePath) {
        return await prisma.salesOrder.update({
            where: {
                salesorder_id: Number(salesOrderId)
            },
            data: {
                image_payment: imagePath 
            }
        });
    }

    async updateOrderStatus(salesOrderId, status) {
        return await prisma.salesOrder.update({
            where: { 
                salesorder_id: Number(salesOrderId)
            },
            data: { 
                order_status: status
            }
        });
    }

    async createOrder(data) {
        return await prisma.SalesOrder.create({
            data: data
        });
    }

    async findAllOrders() {
        return await this.prisma.salesOrder.findMany({
            select: {
                salesorder_id: true,
                salesorder_no: true,
                sub_total: true,
                is_verified: true,
                // You can include other fields as needed
            },
        });
    }

    async findOrderById(orderId) {
        return await this.prisma.salesOrder.findUnique({
            where: {
                salesorder_id: orderId,
            },
            include: {
                details: {
                    select: {
                        quantity: true,
                        item: {
                            select: {
                                item_name: true,
                                price: true,
                            },
                        },
                    },
                },
                user: {
                    select: {
                        full_name: true,
                        address: true,
                    },
                },
            },
        });
    }

    async updateOrderVerification(orderId, isVerified) {
        return await this.prisma.salesOrder.update({
            where: { salesorder_id: orderId },
            data: { is_verified: isVerified },
        });
    }

}

module.exports = new SalesOrderRepository();
