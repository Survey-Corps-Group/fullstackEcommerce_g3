import React from "react";
import Price from "./shopBy/Price";
import Ratings from "./shopBy/Ratings";

const ShopSideNav = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      <Ratings />
      <Price />
    </div>
  );
};

export default ShopSideNav;
