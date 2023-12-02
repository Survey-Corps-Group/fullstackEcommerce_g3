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

async function fetchShippingCost(origin, destination, weight, courier) {
  try {
    const response = await instance.post('/api/cost', {
      origin,
      destination,
      weight,
      courier
    });
    
    const payload = response.data;

    let cheapestOption = null;
    for (const courier of payload) {
      for (const costOption of courier.costs) {
        for (const costDetail of costOption.cost) {
          if (cheapestOption === null || costDetail.value < cheapestOption.value) {
            cheapestOption = {
              courierName: courier.name,
              service: costOption.service,
              value: costDetail.value,
              etd: costDetail.etd,
              description: costOption.description
            };
          }
        }
      }
    }

    return cheapestOption;

  } catch (error) {
    window.alert(error)
  }
}

async function login(username, password) {
  try {
    const response = await instance.post('/api/users/login', { username, password });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

async function register(username, email, password, address, full_name, phone, province_id, city_id) {
  try {
    const registerResponse = await instance.post('/api/users/register', {
      username, email, password, address, full_name, phone, province_id, city_id
    });

    return registerResponse.data;
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

async function createCart(userId, itemId, quantity) {
  try {
  const response = await instance.post('/api/itemcart', { userId: parseInt(userId), items: [{ itemId, quantity }] });
  return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

async function getCart(userId) {
  try {
    const response = await instance.get(`/api/cart/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

async function deleteCartItem(cartId, itemId) {
  try {
    const response = await instance.delete(`/api/cartItem`, {
      params: { cartId, itemId }
    });
    return response.data;
  } catch (error) {
    window.alert(error);
  }
}


async function updateCartItem(userId, itemId, newQuantity) {
  try {
    const response = await instance.patch(`/api/cartItem`, {
      userId,
      itemId,
      newQuantity
    });
    return response.data;
  } catch (error) {
    window.alert(error);
  }
}


async function countCartItems(userId) {
  try {
    const response = await instance.get(`/api/cartItem/count/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

async function deleteAllCartItems(userId) {
  try {
    const response = await instance.delete(`/api/cart/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}


export { 
  getAllProducts, 
  getProductById, 
  test, 
  login, 
  register, 
  rajaOngkirProvince, 
  rajaOngkirCity, 
  createCart, 
  getCart, 
  deleteCartItem, 
  countCartItems, 
  deleteAllCartItems,
  updateCartItem,
  fetchShippingCost
};