import React from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const Payment = () => {
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Payment gateway" />
      <div className="pb-10 w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-2 gap-10">
      <span className="text-primeColor font-semibold text-lg">Alexa</span>
        <p>08967326173</p>
        <p>Padamara Street No.231 Washington USA</p><br />   
      <span className="text-primeColor font-semibold text-lg">White Sweater</span>
        <p>1 Quantity (250gr)</p><br />
      <span className="text-primeColor font-semibold text-lg">White Sweater</span>
        <p>1 Quantity (250gr)</p><br />
        <p>Total Price : 
          <span> $ 150</span>
        </p><br />

        {/* Line */}

        <span className="text-primeColor font-semibold text-lg">Upload proof of payment</span><br />
        <Link to="/">
          <button className="w-52 h-10 bg-primeColor text-white text-lg mt-4 hover:bg-black duration-300">
            Submit
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Payment;
