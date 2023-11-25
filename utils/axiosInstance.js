const axios = require('axios');

const axiosInstance = axios.create({
  baseURL: process.env.RAJA_ONGKIR_URL,
  headers: { key: process.env.RAJA_ONGKIR_KEY },
});

module.exports = axiosInstance;
