import React from "react";
import Price from "./shopBy/Price";
import Ratings from "./shopBy/Ratings";

const ShopSideNav = ({ setSelectedRating, setSelectedPriceRange }) => {
  return (
    <div className="w-full flex flex-col gap-6">
      <Ratings setRating={setSelectedRating} />
      <Price setPriceRange={setSelectedPriceRange} />
    </div>
  );
};

export default ShopSideNav;
