import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import { createCart } from "../../../modules/fetch";
import useToken from '../../../hooks/useToken' 

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
      <p className="text-xl font-semibold">${productInfo?.price}</p>
      <p className="text-base text-gray-600">{productInfo?.description}</p>
        {
          hasFeedbacks ? 
          productInfo.feedbacks.map(feedback => (
            <div key={feedback.feedback_id} className="feedback">
              <p className="text-sm">{feedback.description}</p>
            </div>
          )) : 
          <p className="text-sm">Be the first to leave a review.</p>
        }
      <p className="font-medium text-lg">
        <span className="font-normal">Colors:</span> {productInfo?.color}
      </p>
      <button
        onClick={handleAddToCart}
        className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg font-titleFont"
      >
        Add to Cart
      </button>
      <p className="font-normal text-sm">
        <span className="text-base font-medium"> Categories:</span> Spring
        collection, Streetwear, Women Tags: featured SKU: N/A
      </p>
    </div>
  );
};

export default ProductInfo;
