import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
  
const Payment = () => {
  const location = useLocation();
  console.log(location);
  const { cartData, products, userDetails } = location.state || { cartData: null, products: [], userDetails: {}};


  useEffect(() => {
    console.log("Cart Data:", cartData);
    console.log("Products:", products);
  }, [cartData, products, userDetails]);
  

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Payment" />
      <div className="pb-10 ">
      <h1 className="text-primeColor font-semibold text-lg">{userDetails?.full_name}</h1>
        <p>{userDetails?.phone}</p>
        <p>{userDetails?.address}</p><br />
      {products.map((product, index) => (
        <div key={index} className="border-b-[2px] py-4 mb-2">
          <h2 className="text-primeColor font-semibold text-lg">{product.item_name}</h2>
          <p>Quantity: {product.quantity}</p><br />
          <p>Subtotal: ${product.price * product.quantity}</p>
        </div>
      ))}
      <p>Total Price: 
        <span> ${cartData?.total}</span>
      </p><br/>
        
      <form className="flex items-center space-x-6">
        <div className="shrink-0">
          <h1 className="text-primeColor font-semibold text-lg">Upload proof of payment </h1>        
        </div>
        <label className="block">
          <span className="sr-only">Choose profile photo</span>
          <input type="file" className="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-black-700
            hover:file:bg-violet-100
          "/>
        </label>
      </form>
        <Link to="/order">
          <button className="w-44 h-10 bg-primeColor text-white text-lg mt-4 hover:bg-black duration-300">
            Submit
          </button>
        </Link>
      </div>
      </div>
  );
};

export default Payment;
