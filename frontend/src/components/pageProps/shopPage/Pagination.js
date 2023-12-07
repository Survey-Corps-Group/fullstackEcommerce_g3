// import React, { useState, useEffect } from "react";
// import ReactPaginate from "react-paginate";
// import Product from "../../home/Products/Product";
// import { getAllProducts } from "../../../modules/fetch/index";

// const ProductsPerPage = 5; // Jumlah produk per halaman

// const Pagination = () => {
//   const [products, setProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);

//   useEffect(() => {
//     // Fetch data from the API when component mounts
//     fetchProducts();
//   }, [currentPage]); // Fetch data when currentPage changes

//   const fetchProducts = async () => {
//     try {
//       const response = await getAllProducts(currentPage + 1);
//       setProducts(response.products);
//       setTotalPages(Math.ceil(response.totalProducts / ProductsPerPage));
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const handlePageClick = (selectedPage) => {
//     setCurrentPage(selectedPage.selected);
//   };

//   return (
//     <div>
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
//         {products.map((product) => (
//           <div key={product._id} className="w-full">
//             <Product
//               _id={product.item_id}
//               img={`${process.env.REACT_APP_BACKEND_URL}/${product.images[0]}`}
//               productName={product.item_name}
//               price={product.price.toFixed(2)}
//               color={product.color}
//             />
//           </div>
//         ))}
//       </div>
//       <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
//         <ReactPaginate
//           nextLabel=""
//           onPageChange={handlePageClick}
//           pageRangeDisplayed={3}
//           marginPagesDisplayed={2}
//           pageCount={totalPages}
//           previousLabel=""
//           pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
//           pageClassName="mr-6"
//           containerClassName="flex text-base font-semibold font-titleFont py-10"
//           activeClassName="bg-black text-white"
//         />

//         <p className="text-base font-normal text-lightText">
//           Products from {currentPage * ProductsPerPage + 1} to{" "}
//           {(currentPage + 1) * ProductsPerPage} of {totalPages * ProductsPerPage}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Pagination;



import React, { useState, useEffect } from "react";
import Product from "../../home/Products/Product";
import { getAllProducts } from "../../../modules/fetch/index";

const Pagination = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Fetch products for the current page when the component mounts
    fetchProducts(currentPage);
  }, [currentPage]); // Fetch data whenever currentPage changes

  const fetchProducts = async (page) => {
    try {
      const response = await getAllProducts(page);
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