import React, { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { resetCart } from "../../redux/orebiSlice";
import { emptyCart } from "../../assets/images/index";
import ItemCard from "./ItemCard";
import { getCart, deleteAllCartItems, fetchShippingCost } from "../../modules/fetch";
import useToken from '../../hooks/useToken';

const Cart = () => { 
  const [products, setProducts] = useState([]);
  const [shippingCost, setShippingCost] = useState(0);
  const dispatch = useDispatch();
  const { userId, city_id } = useToken();

  const updateProductQuantity = (itemId, newQuantity) => {
    setProducts(currentProducts => 
      currentProducts.map(product => 
        product.item_id === itemId ? { ...product, quantity: newQuantity } : product
      )
    );
  };

  const handleDeleteItem = (itemId) => {
    setProducts(currentProducts => 
      currentProducts.filter(product => product.item_id !== itemId)
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      if (userId) {
        try {
          const response = await getCart(userId);
          setProducts(response);
        } catch (e) {
          console.log(e);
        }
      }
    };

    fetchProducts();
  }, [userId]);

  useEffect(() => {
    const calculateShippingCost = async () => {
      if (products.length > 0) {
        const userCityId = city_id;
    
        const shippingCostPromises = products.map(product => {
          const weight = product.package_weight * product.quantity * 1000;
          return fetchShippingCost(userCityId, parseInt(product.warehouse_city), weight, 'jne');
        });
  
        const shippingCosts = await Promise.all(shippingCostPromises);
        const totalShippingCost = shippingCosts.reduce((acc, cost) => acc + cost.value, 0);
        setShippingCost(totalShippingCost);
      }
    };
  
    calculateShippingCost();
  }, [products, city_id]);

  const handleResetCart = async () => {
    try {
      await deleteAllCartItems(userId);
      setProducts([]);
      dispatch(resetCart());
    } catch (e) {
      console.log(e);
    }
  };

  const calculateTotals = useMemo(() => {
    let totalProductCost = products?.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return { total: totalProductCost, shipping: shippingCost };
  }, [products, shippingCost]);

  console.log('isi products', products)


  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Cart" />
      {products?.length > 0 ? (
        <div className="pb-20">
          <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
            <h2 className="col-span-2">Product</h2>
            <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Sub Total</h2>
          </div>
          <div className="mt-5">
            {products.map((item) => (
              <div key={item.item_id}>
                <ItemCard item={item} updateQuantity={updateProductQuantity} onDeleteItem={handleDeleteItem}/>
              </div>
            ))}
          </div>

          <button
            onClick={handleResetCart}
            className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
          >
            Reset cart
          </button>

        
          <div className="max-w-7xl gap-4 flex justify-end mt-4">
            <div className="w-96 flex flex-col gap-4">
              <h1 className="text-2xl font-semibold text-right">Cart totals</h1>
              <div>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Subtotal
                  <span className="font-semibold tracking-wide font-titleFont">
                    ${calculateTotals.total}
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  JNE Ekonomis Charge
                  <span className="font-semibold tracking-wide font-titleFont">
                    ${calculateTotals.shipping}
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                  Total
                  <span className="font-bold tracking-wide text-lg font-titleFont">
                    ${calculateTotals.total + calculateTotals.shipping}
                  </span>
                </p>
              </div>
              <div className="flex justify-end">
                <Link to="/paymentgateway">
                  <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
        >
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="emptyCart"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              Your Cart feels lonely.
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Your Shopping cart lives to serve. Give it purpose - fill it with
              books, electronics, videos, etc. and make it happy.
            </p>
            <Link to="/shop">
              <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                Continue Shopping
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
