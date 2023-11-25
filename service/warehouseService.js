const warehouseRepository = require('../repository/warehouseRepository');

class WarehouseService {
    async getAllWarehouses() {
        return await warehouseRepository.findAllWarehouses();
    }

    async getWarehouseById(warehouseId) {
        return await warehouseRepository.findWarehouseById(warehouseId);
    }

    async createWarehouse(data) {
        return await warehouseRepository.createWarehouse(data);
    }

    async updateWarehouse(warehouseId, data) {
        return await warehouseRepository.updateWarehouse(warehouseId, data);
    }

    async deleteWarehouse(warehouseId) {
        return await warehouseRepository.deleteWarehouse(warehouseId);
    }
}

module.exports = new WarehouseService();
