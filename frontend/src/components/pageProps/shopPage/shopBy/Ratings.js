import React, { useState } from "react";
import NavTitle from "./NavTitle";
import { FaStar } from "react-icons/fa";
import { IconContext } from "react-icons";
import { motion } from "framer-motion";


const Ratings = ({ setRating }) => {
  const [showBrands, setShowBrands] = useState(true);

  const handleRatingClick = (rating) => {
    setRating(rating);
  };

  const brands = [
    {
      _id: 9006,
      title: "5",
    },
    {
      _id: 9007,
      title: "4",
    },
    {
      _id: 9008,
      title: "3",
    },
    {
      _id: 9009,
      title: "2",
    },
    {
      _id: 9010,
      title: "1",
    },
  ];

  
  return (
    <div className="cursor-pointer">
      <div
        onClick={() => setShowBrands(!showBrands)}
        className="cursor-pointer"
      >
        <NavTitle title="Shop by Ratings" icons={true} />
      </div>
      {showBrands && (
      <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
            {brands.map((item) => (
              <li
                key={item._id}
                onClick={() => handleRatingClick(parseInt(item.title))}
                className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
              >
                <IconContext.Provider value={{ color: "orange"}}>
                  <div>
                    <FaStar />
                  </div>
                </IconContext.Provider>
                {item.title}
              </li>
            ))}
          </ul>
          </motion.div>
      )}
    </div>
  );
};

export default Ratings;
