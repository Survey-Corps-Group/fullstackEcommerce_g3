import React from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const Payment = () => {
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Payment gateway" />
      <div className="pb-10 ">
      <h1 className="text-primeColor font-semibold text-lg">Alexa</h1>
        <p>08967326173</p>
        <p>Padamara Street No.231 Washington USA</p><br />
        <div className="border-b-[2px] py-4 mb-2">
          <h2 className="text-primeColor font-semibold text-lg">White Sweater</h2>
            <p>Quantity : 1 </p><br />
            <p>Subtotal : $150</p>
        </div>
            
            <p>Total Price : 
              <span> $150</span>
            </p><br />            
        
      <form class="flex items-center space-x-6">
        <div class="shrink-0">
          <h1 className="text-primeColor font-semibold text-lg">Upload proof of payment </h1>        
        </div>
        <label class="block">
          <span class="sr-only">Choose profile photo</span>
          <input type="file" class="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-black-700
            hover:file:bg-violet-100
          "/>
        </label>
      </form>
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
