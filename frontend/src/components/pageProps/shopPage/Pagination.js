import React, { useState, useEffect } from "react";
import Product from "../../home/Products/Product";
import { getAllProducts } from "../../../modules/fetch/index";

const Pagination = ({ price, rating }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchProducts(currentPage, price, rating);
  }, [currentPage, price, rating]);

  const fetchProducts = async (page, price, rating) => {
    try {
      console.log(currentPage, price, rating)
      const response = await getAllProducts(page, null, price, rating, null);
      setProducts(response.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleNextPage = () => {
    // Move to the next page and trigger a new API call
    setCurrentPage((prevPage) => prevPage + 1);
  
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  

  const handlePrevPage = () => {
    // Move to the previous page (do not go below page 1) and trigger a new API call
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const notFoundImage = process.env.REACT_APP_NOTFOUND_IMG

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
        {products.map((product) => (
          <div key={product.item_id} className="w-full">
            <Product
              _id={product.item_id}
              img={product?.images[0] ? `${process.env.REACT_APP_BACKEND_URL}/${product.images[0]}` : notFoundImage}
              productName={product.item_name}
              price={product.price.toFixed(2)}
              color={product.color}
              stock_item={product.stock_item}
            />
          </div>
        ))}
      </div>
      <p className="text-base font-normal text-lightText">
        Total Products: {products.length}
      </p>
      <div className="flex justify-between mt-4">
        <button onClick={handlePrevPage} className="bg-blue-500 text-white px-4 py-2">
          Previous Page
        </button>
        <button onClick={handleNextPage} className="bg-blue-500 text-white px-4 py-2">
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Pagination;