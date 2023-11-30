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

async function test(){
  try {
    const response = await instance.get('/')

    return response
  }catch(e){

  }
}

async function rajaOngkirProvince(){
  try {
    const response = await instance.get('/api/province')

    return response
  }catch(e){

  }
}

async function rajaOngkirCity(id){
  try {
    const response = await instance.get(`/api/city?province=${id}`)

    return response
  }catch(e){

  }
}

async function login(username, password) {
  try {
    const response = await instance.post('/api/users/login', { username, password });

    console.log(response.data)
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

async function register( username,email,password,address,full_name,phone,province_id,city_id) {
  try {
    const response = await instance.post('/api/users/register', { username,email,password,address,full_name,phone,province_id,city_id});
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}


async function getProductById(id) {
  try {
    const response = await instance.get(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

export { getAllProducts ,getProductById, test, login, register, rajaOngkirProvince, rajaOngkirCity};
