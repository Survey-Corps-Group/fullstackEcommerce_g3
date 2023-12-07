import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import { createCart } from "../../../modules/fetch";

import useToken from '../../../hooks/useToken' 

const Product = ({ productName, _id, img, badge, price, color, city_id, sumRating, stock_item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, userId } = useToken();

  const handleProductDetails = () => {
    navigate(`/product/${_id}`, { state: { item: { productName, _id, img, badge, price, color, sumRating, city_id, stock_item} } });
  };

  const handleAddToCart = async () => {

    console.log(stock_item)

    if(stock_item === 0) {
      window.alert('Maaf, Stock Habis')
      return
    }

    const productData = { _id, name: productName, quantity: 1, image: img, badge, price, colors: color, city_id:city_id };

    if (token) {
      try {
        await createCart(userId, _id, productData.quantity);
        dispatch(addToCart(productData));
      } catch (error) {
        window.alert('Barang sudah ada didalam cart')
        console.log(error)
      }
    } else {
      window.alert("Please Login to add to cart");
    }
  };

return (
  <div className="border border-gray-200 rounded-md overflow-hidden">
    <div className="bg-white p-4 shadow-md rounded-md">
      <img src={img} alt={productName} className="w-full h-40 object-cover mb-4 rounded-md" onClick={handleProductDetails}/>
      <h3 className="text-lg font-semibold mb-2">{productName}</h3>
      <p className="text-gray-600 mb-2">Price: ${price}</p>
      <p className="text-gray-600 mb-2">Color: {color}</p>
      <p className="text-gray-600 mb-2">Rating: {sumRating}</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        onClick={handleAddToCart}
        >
        Add to Cart
      </button>
    </div>
    {badge && (
      <div className="bg-yellow-500 text-white px-2 py-1 absolute top-0 right-0 m-2 rounded-md">
        Popular
      </div>
    )}
  </div>
);
};

export default Product;
