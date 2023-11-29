// src/modules/fetch/index.js
import { instance } from '../axios/index';

//ambil data semua product
async function getAllProducts(page, itemName, price, rating, sort) {
  try {
    const response = await instance.get('/api/products', {
      params: { page, item_name: itemName, price, rating, sort },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

export { getAllProducts };
