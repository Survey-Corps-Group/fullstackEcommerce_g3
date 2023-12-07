import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import useToken from '../../hooks/useToken' 

import { deleteCartItem, updateCartItem} from "../../modules/fetch";
import { useDispatch } from "react-redux";
import {deleteItem, increaseQuantity,} from "../../redux/orebiSlice";

const ItemCard = ({ item, updateQuantity, onDeleteItem  }) => {
  const dispatch = useDispatch();
  const { userId } = useToken();
  const [quantity, setQuantity] = useState(item.quantity);
  const notFoundImage = process.env.REACT_APP_NOTFOUND_IMG
  const imageUrl = item?.image_url ? `${process.env.REACT_APP_BACKEND_URL}/${item.image_url}` : notFoundImage;
  const maxQuantity = item.stock_item;


  const handleDeleteItem = async (cartId, itemId) => {
    try {
      await deleteCartItem(cartId, itemId);
      onDeleteItem(itemId);
      dispatch(deleteItem(itemId))
    } catch (e) {
      console.log(e);
    }
  };

  const handleIncreaseQuantity = async () => {
    if (quantity < maxQuantity) {
      const newQuantity = quantity + 1;
      await updateCartItem(userId, item.item_id, newQuantity);
      setQuantity(newQuantity);
      dispatch(increaseQuantity({ _id: item._id }));
      updateQuantity(item.item_id, newQuantity);
    }
  };

  const handleDecreaseQuantity = async () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      await updateCartItem(userId, item.item_id, newQuantity);
      setQuantity(newQuantity);
      dispatch(increaseQuantity({ _id: item._id }));
      updateQuantity(item.item_id, newQuantity);
    }
  };



  return (
    <div className="w-full grid grid-cols-5 mb-4 border py-2">
      <div className="flex col-span-5 mdl:col-span-2 items-center gap-4 ml-4">
        <ImCross
          onClick={() => handleDeleteItem(item.cartId, item.item_id)}
          className="text-primeColor hover:text-red-500 duration-300 cursor-pointer"
        />
        <img className="w-32 h-32" src={imageUrl} alt="productImage" />
        <h1 className="font-titleFont font-semibold">{item.item_name}</h1>
      </div>
      <div className="col-span-5 mdl:col-span-3 flex items-center justify-between py-4 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0">
        <div className="flex w-1/3 items-center text-lg font-semibold">
          ${item.price}
        </div>
        <div className="w-1/3 flex items-center gap-6 text-lg">
          {quantity > 1 && (
            <span
              onClick={handleDecreaseQuantity}
              className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
            >
              -
            </span>
          )}
          <p>{quantity}</p>
          {quantity < maxQuantity && (
            <span
              onClick={handleIncreaseQuantity}
              className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
            >
              +
            </span>
          )}
        </div>
        <div className="w-1/3 flex items-center font-titleFont font-bold text-lg">
          <p>${quantity * item.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
