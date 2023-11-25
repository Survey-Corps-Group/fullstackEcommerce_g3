const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class WarehouseRepository {
    async findAllWarehouses() {
        return await prisma.warehouse.findMany({
            select: {
                warehouse_id: true,
                city: true,
                province: true,
            },
        });
    }

    async findWarehouseById(warehouseId) {
        return await prisma.warehouse.findUnique({
            where: { warehouse_id: warehouseId },
            select: {
                warehouse_id: true,
                city: true,
                province: true,
            },
        });
    }

    async createWarehouse(data) {
        return await prisma.warehouse.create({ data });
    }

    async updateWarehouse(warehouseId, updateData) {
        return await prisma.warehouse.update({
            where: { warehouse_id: warehouseId },
            data: updateData,
        });
    }

    async deleteWarehouse(warehouseId) {
        return await prisma.warehouse.delete({ where: { warehouse_id: warehouseId } });
    }
}

module.exports = new WarehouseRepository();
