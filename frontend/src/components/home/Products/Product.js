import React from "react";

const Product = ({ _id, img, productName, price, color, badge, sumRating, des, onAddToCart }) => {
  return (
    <div className="border border-gray-200 rounded-md overflow-hidden">
      <div className="bg-white p-4 shadow-md rounded-md">
        <img src={img} alt={productName} className="w-full h-40 object-cover mb-4 rounded-md" />
        <h3 className="text-lg font-semibold mb-2">{productName}</h3>
        <p className="text-gray-600 mb-2">Price: ${price}</p>
        <p className="text-gray-600 mb-2">Color: {color}</p>
        <p className="text-gray-600 mb-2">Rating: {sumRating}</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          onClick={onAddToCart}>
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

