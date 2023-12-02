import React from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const Payment = () => {
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Order" />
      <div className="pb-10 ">
      <h1 className="text-primeColor font-semibold text-lg">Alexa
      
      </h1>
        <p>08967326173</p>
        <p>Padamara Street No.231 Washington USA</p><br />
        <div className="border-b-[2px] py-4 mb-2">
          <h2 className="text-primeColor font-semibold text-lg">White Sweater</h2>
            <p>Quantity : 1 </p><br />
            <p>Subtotal : $150</p>
        </div>
            <p>Total Price : 
              <span> $150</span>
              <button
                className="w-36 ml-4 rounded-lg bg-slate-500 text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold  hover:bg-slate-500 hover:text-white duration-200 mt-4"
              >
              Unverified
            </button>
            </p><br />            
      </div>
    </div>
  );
};

export default Payment;
