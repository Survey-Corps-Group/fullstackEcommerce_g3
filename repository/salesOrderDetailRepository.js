const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class SalesOrderDetailRepository {
    async createOrderDetail(data) {
        return await prisma.SalesOrderDetail.create({
            data: data
        });
    }
}

module.exports = new SalesOrderDetailRepository();
