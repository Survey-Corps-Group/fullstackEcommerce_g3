import React, { useState } from "react";
import NavTitle from "./NavTitle";

const Ratings = () => {
  const brands = [
    {
      _id: 9006,
      title: "5 Stars",
    },
    {
      _id: 9007,
      title: "4 Stars",
    },
    {
      _id: 9008,
      title: "3 Stars",
    },
    {
      _id: 9009,
      title: "2 Stars",
    },
    {
      _id: 9010,
      title: "1 Star",
    },
  ];

  return (
    <div className="cursor-pointer">
      <NavTitle title="Shop by Ratings" icons={false} />
          <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
            {brands.map((item) => (
              <li
                key={item._id}
                className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
              >
                {item.title}
              </li>
            ))}
          </ul>
        
    </div>
  );
};

export default Ratings;
