import React, {useState} from "react";
import NavTitle from "./NavTitle";
import { motion } from "framer-motion";

const Price = ({ setPriceRange }) => {
  const [showPrice, setShowPrice] = useState(true);
  const handlePriceClick = (priceRange) => {
    setPriceRange(priceRange)
  };

  const price = [
    {
      _id: 950,
      sort: 'lowest',
    },{
      _id: 951,
      priceOne: 50.0,
      sort: 'highest',
    },
  ];
  return (
    <div className="cursor-pointer">
      <div
        onClick={() => setShowPrice(!showPrice)}
        className="cursor-pointer"
      >
      <NavTitle title="Shop by Price" icons={true} />
      </div>
      
      {showPrice && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {price.map((item) => (
            <li
              key={item._id}
              onClick={() => handlePriceClick(item.sort)}
              className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
            >
              {item.sort.toUpperCase()}
            </li>
          ))}
        </ul>
        </motion.div>
        )}
      </div>
  );
};

export default Price;
