import React from "react";
import Banner from "../../components/Banner/Banner";
import BannerBottom from "../../components/Banner/BannerBottom";
import BestSellers from "../../components/home/BestSellers/BestSellers";
import RecentProduct from "../../components/home/RecentProduct/RecentProduct";
import Intro from "../../components/home/Intro/Intro";


const Home = () => {
  return (
    <div className="w-full mx-auto">
      <Banner />
      <BannerBottom />
      <div className="max-w-container mx-auto px-4">
        <Intro />
        <BestSellers />
        <RecentProduct />
      </div>
    </div>
  );
};

export default Home;
