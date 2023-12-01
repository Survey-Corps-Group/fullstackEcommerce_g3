import React from "react";
import Category from "./shopBy/Category";
import Price from "./shopBy/Price";
import Ratings from "./shopBy/Ratings";

const ShopSideNav = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      <Category />
      <Price />
      <Ratings />
    </div>
  );
};

export default ShopSideNav;
