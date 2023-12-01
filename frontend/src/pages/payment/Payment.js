import React from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const Payment = () => {
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Payment gateway" />
      <div className="pb-10">
      <span className="text-primeColor font-semibold text-lg">Alexa</span>
        <p>08967326173</p>
        <p>Padamara Street No.231 Washington USA</p><br />
        
        <span className="text-primeColor font-semibold text-lg">Women's Clothes</span>
        <p>1 Quantity (250gr)</p><br />
        
        <Link to="/">
          <button className="w-52 h-10 bg-primeColor text-white text-lg mt-4 hover:bg-black duration-300">
            Explore More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Payment;
