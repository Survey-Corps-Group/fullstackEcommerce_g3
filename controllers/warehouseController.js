const warehouseService = require('../service/warehouseService');

class WarehouseController {
    async getWarehouses(req, res) {
        try {
            const warehouses = await warehouseService.getAllWarehouses();
            res.json(warehouses);
        } catch (err) {
            res.status(500).json({
                success: false,
                message: `Server error: ${err.message}`,
            });
        }
    }

    async getWarehouseById(req, res) {
        const warehouseId = parseInt(req.params.id);
        try {
            const warehouse = await warehouseService.getWarehouseById(warehouseId);

            if (warehouse) {
                res.json(warehouse);
            } else {
                res.status(404).json({
                    success: false,
                    message: "Warehouse not found",
                });
            }
        } catch (err) {
            res.status(500).json({
                success: false,
                message: `Server error: ${err.message}`,
            });
        }
    }

    async createWarehouse(req, res) {
        try {
            const newWarehouse = await warehouseService.createWarehouse(req.body);
            res.json({
                success: true,
                message: "Warehouse created successfully",
                warehouse: newWarehouse,
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: `Server error: ${err.message}`,
            });
        }
    }

    async updateWarehouse(req, res) {
        const warehouseId = parseInt(req.params.id);
        try {
            const updatedWarehouse = await warehouseService.updateWarehouse(warehouseId, req.body);
            res.json({
                success: true,
                message: "Warehouse updated successfully",
                warehouse: updatedWarehouse,
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: `Server error: ${err.message}`,
            });
        }
    }

    async deleteWarehouse(req, res) {
        const warehouseId = parseInt(req.params.id);
        try {
            const deletedWarehouse = await warehouseService.deleteWarehouse(warehouseId);
            res.json({
                success: true,
                message: "Warehouse deleted successfully",
                deletedWarehouseId: deletedWarehouse.warehouse_id,
            });
        } catch (err) {
            if (err.code === "P2025") {
                res.status(404).json({
                    success: false,
                    message: "Warehouse not found",
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: `Server error: ${err.message}`,
                });
            }
        }
    }
}

module.exports = new WarehouseController();
