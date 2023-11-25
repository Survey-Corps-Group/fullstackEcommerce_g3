const axiosInstance = require('../utils/axiosInstance');

class RajaOngkirService {
    async getProvinces() {
        const response = await axiosInstance.get('/province');
        return response.data.rajaongkir.results;
    }

    async getCities(provinceId) {
        const response = await axiosInstance.get('/city', { params: { province: provinceId } });
        return response.data.rajaongkir.results;
    }

    async calculateCost(data) {
        const response = await axiosInstance.post('/cost', data);
        return response.data.rajaongkir.results;
    }
}

module.exports = new RajaOngkirService();
