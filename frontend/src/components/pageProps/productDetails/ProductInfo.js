import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import { createCart } from "../../../modules/fetch";
import { FaStar, FaUserCircle  } from "react-icons/fa";
import { IconContext } from "react-icons";
import useToken from '../../../hooks/useToken'; 

const ProductInfo = ({ productInfo }) => {
  const dispatch = useDispatch();
  const hasFeedbacks = productInfo?.feedbacks?.length > 0;

  const { token, userId } = useToken();

  const handleAddToCart = async () => {

    if(productInfo.stock_item <= 0) {
      window.alert('Maaf, Stock Habis')
      return
    }

    if (token) {
      try {
        await createCart(userId, productInfo.item_id, 1);
        dispatch(addToCart(productInfo));
      } catch (error) {
        window.alert('Barang sudah ada didalam cart')
        console.log(error)
      }
    } else {
      window.alert("Please Login to add to cart");
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-semibold">{productInfo?.item_name}</h2>
      <div class="flex">
          <div class="w-1/8">
          <IconContext.Provider value={{ color: "orange", size: "20px"}}>
            <FaStar />
          </IconContext.Provider>
          </div>
          <div class="w-1/8 ml-1">4.0</div>
        </div>
        <p className="text-xl font-semibold">${productInfo?.price}</p>
        <p className="text-base text-gray-600">{productInfo?.description}</p>
      <p className="font-medium text-lg">
        <span className="font-normal text-md">Colors:</span> {productInfo?.color}
      </p>

      <p className="font-medium text-lg">
      <span className="font-normal text-md">Stock:</span> {productInfo?.stock_item}
      </p>

      
      
      <button
        onClick={handleAddToCart}
        className="w-40 py-2 bg-primeColor hover:bg-black duration-300 text-white text-md font-titleFont"
      >
        Add to Cart
      </button>
      <p className="border-b-[2px] py-4 mb-2"></p>
      <div className="flex flex-col gap-4">
        <h1 className="text-primeColor font-semibold text-xl">Reviews</h1>
        
        {
  hasFeedbacks ? 
  productInfo.feedbacks.map(feedback => (
    <>
    <div className="feedback flex items-center" key={feedback.feedback_id}>
      <IconContext.Provider value={{ color: "orange", size: "20px" }}>
        <div className="flex items-center">
          {Array.from({ length: feedback.rating }, (_, index) => (
              <FaStar key={index} />
            ))}
          <span className="ml-1">{feedback.rating}</span>
        </div>
      </IconContext.Provider>
    </div>
    <p className="text-sm ml-2">{feedback.description}</p>
    </>
  )) : 
  <p className="text-sm">Be the first to leave a review.</p>
}



      </div>
    </div>
  );
};

export default ProductInfo;
