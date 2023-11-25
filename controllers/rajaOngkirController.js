const rajaOngkirService = require('../service/rajaOngkirService');

class RajaOngkirController {
    async getProvinces(req, res) {
        try {
            const provinces = await rajaOngkirService.getProvinces();
            res.json(provinces);
        } catch (err) {
            res.status(500).json({
                success: false,
                message: `Server error: ${err.message}`,
            });
        }
    }

    async getCities(req, res) {
        const provinceId = req.query.province;
        if (!provinceId) {
            return res.status(400).json({
                success: false,
                message: "Province ID is required",
            });
        }

        try {
            const cities = await rajaOngkirService.getCities(provinceId);
            res.json(cities);
        } catch (err) {
            res.status(500).json({
                success: false,
                message: `Server error: ${err.message}`,
            });
        }
    }

    async calculateCost(req, res) {
        const { origin, destination, weight, courier } = req.body;

        if (!origin || !destination || !weight || !courier) {
            return res.status(400).json({
                success: false,
                message: "Missing required parameter: origin, destination, weight, or courier",
            });
        }

        try {
            const cost = await rajaOngkirService.calculateCost({ origin, destination, weight, courier });
            res.json(cost);
        } catch (err) {
            res.status(500).json({
                success: false,
                message: `Server error: ${err.message}`,
            });
        }
    }
}

module.exports = new RajaOngkirController();
