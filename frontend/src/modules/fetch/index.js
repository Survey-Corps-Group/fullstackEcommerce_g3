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

async function rajaOngkirProvinceName(id){
  try {
    const response = await instance.get(`/api/province?id=${id}`)
    return response
  }catch(e){

  }
}


async function rajaOngkirCityName(city_id, province_id){
  try { 
    const response = await instance.get(`/api/city?id=${city_id}&province=${province_id}`)

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

async function checkoutCart(customerName, shippingCost, subTotal, orderDetails) {
  try {
    const salesorderNo = `SO/${Date.now()}`;
    const response = await instance.post('/api/products/cart/checkout', {
      salesorder_no: salesorderNo,
      order_status: 'waiting_for_payment',
      customer_name: customerName,
      shipping_cost: shippingCost,
      sub_total: subTotal,
      orderDetails: orderDetails
    });

    return response.data;
  } catch (error) {
    console.error('Error during checkout:', error);
    window.alert(error);
  }
}

async function fetchUserDetails(userId) {
  try {
    const response = await instance.get(`/api/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    window.alert(error);
  }
}



async function updateStockQuantity(itemid, quantity) {
  try {
    const response = await instance.put(`/api/products/${itemid}/stock`, {stock_quantity : quantity});
    return response.data;
  } catch (error) {
    throw error;
  }
}


async function uploadPaymentProof (salesorderId, formData){
  try {
    const response = await instance.put(`/api/payment_proof/${salesorderId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};


async function getSalesOrder(salesorderId) {
  try {
    const response = await instance.get(`/api/salesorder/${salesorderId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sales order:', error);
    throw error;
  }
}

async function deliveredOrder (salesorderId){
  try {
    const response = await instance.put(`/api/product/recieved/${salesorderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

async function updateProfile (id, username,
  email,
  password,
  address,
  full_name,
  phone,
  city_id,
  province_id ){
  try {
    const response = await instance.put(`/api/users/${id}`,
  {username,
  email,
  password,
  address,
  full_name,
  phone,
  city_id,
  province_id
  });
    return response.data;
  } catch (error) {
    throw error;
  }
};

async function getUserOrdersDetail(id){
  try {
      const response = await instance.get(`/api/users/orders/${id}`)
      console.log(response)
      return response
  } catch (error) {
    throw error
  }
}

async function getuserOrders(){
  try {
      const response = await instance.get('/api/users/orders')
      return response
  } catch (error) {
    throw error
  }
}

 async function createWarehouse (warehouseData) {
  try {
    const response = await instance.post('/api/warehouses', warehouseData);
    return response.data;
  } catch (error) {
    console.error('Error creating warehouse:', error);
    throw error;
  }
};

async function getAllWarehouse() {
  try {

    const response = await instance.get('/api/warehouses')
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

async function updatedWarehouse(editingWarehouseId, sendData) {
  try {

    const response = await instance.put(`/api/warehouses/${editingWarehouseId}`, {
      city : sendData.city, 
      province : sendData.province, 
      city_id : sendData.city_id, 
      province_id : sendData.province_id,
      
    })
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

async function deletedWarehouse(id) {
  try {

    const response = await instance.delete(`/api/warehouses/${id}`)
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}


export { 
  deliveredOrder,
  getSalesOrder,
  uploadPaymentProof,
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
  fetchShippingCost,
  checkoutCart,
  fetchUserDetails,
  rajaOngkirProvinceName,
  updateStockQuantity,
  rajaOngkirCityName,
  updateProfile,
  getuserOrders,
  createWarehouse,
  getAllWarehouse,
  updatedWarehouse,
  deletedWarehouse,
  getUserOrdersDetail
};
