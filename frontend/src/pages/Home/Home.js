import React from "react";
import Banner from "../../components/Banner/Banner";
import BannerBottom from "../../components/Banner/BannerBottom";
import BestSellers from "../../components/home/BestSellers/BestSellers";
import Sale from "../../components/home/Sale/Sale";
import YearProduct from "../../components/home/YearProduct/YearProduct";
import Women from "../../components/home/Women/NewArrivals";
import Children from "../../components/home/Children/Children";

const Home = () => {
  return (
    <div className="w-full mx-auto">
      <Banner />
      <BannerBottom />
      <div className="max-w-container mx-auto px-4">
        {/* <Sale /> */}
        <BestSellers />
        {/* <YearProduct /> */}
        {/* <Women /> */}
        <Children />
      </div>
    </div>
  );
};

export default Home;
