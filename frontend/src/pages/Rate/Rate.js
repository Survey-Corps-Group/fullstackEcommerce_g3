import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { IconContext } from "react-icons";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { reviewedOrder, createFeedback } from "../../modules/fetch";

const Rate = () => {
  const location = useLocation();
  const salesOrder = location.state || null;  

  const [rating, setRating] = useState(5);
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Data:", salesOrder);
  }, [salesOrder]);

  const handleSubmitFeedback = async () => {
    try {
      // Assuming all products in the order are rated and reviewed together
      for (const detail of salesOrder.details) {
        await createFeedback(detail.item.item_id, rating, description);
      }
      await reviewedOrder(salesOrder.salesorder_id);
      alert('Feedback submitted successfully');
      navigate(`/my-orders/${salesOrder.salesorder_id}`);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Rate the Product" />
      <div className="pb-10">
        <div className="border-b-[2px] py-4 mb-2">
          <div className="flex">
            <div className="w-1/6 mt-2">
              <h1 className="text-md">Overall Product Quality</h1>
            </div>
            <div className="w-1/8 mt-2">
              <IconContext.Provider value={{ color: "orange", size: "20px"}}>
                <FaStar />
              </IconContext.Provider>
            </div>
            <select 
              className="w-1/8 ml-4 md:w-16 border-[1px] border-gray-200 py-1 px-4 cursor-pointer text-primeColor text-base block dark:placeholder-gray-400 appearance-none focus-within:outline-none focus-visible:border-primeColor"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
            >
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
            </select>
          </div>
          <textarea 
            className="w-full mt-4 border-[1px] border-gray-200 p-2"
            placeholder="Write a review for the entire order..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="w-1/6">
          <button 
            className="w-32 bg-black text-gray-200 h-8 hover:bg-black hover:text-white duration-200"
            onClick={handleSubmitFeedback}
          >
            Submit
          </button>    
        </div>         
      </div>
    </div>
  );
};

export default Rate;
