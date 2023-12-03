import React from "react";
import Price from "./shopBy/Price";
import Ratings from "./shopBy/Ratings";

const ShopSideNav = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      
      <Price />
      <Ratings />
    </div>
  );
};

export default ShopSideNav;
