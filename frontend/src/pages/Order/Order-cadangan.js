import React from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const Order = () => {
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Order" />
      <div className="pb-10 ">
      <div class="flex">
          <h1 className="text-primeColor font-semibold text-xl">Alexa Mahendra</h1>
      </div>
        <p>08967326173</p>
        <p>Padamara Street No.231 Washington USA</p><br />
        <div className="border-b-[2px] py-4 mb-2">
        <div class="flex">
          <div class="w-1/6 mb-4">
            <h1 className="text-primeColor font-semibold text-lg">White Sweater</h1>
          </div>
          <div class="w-1/6">
            <button className="w-32 rounded-md bg-slate-500 text-gray-200 h-8  hover:bg-slate-500 hover:text-white duration-200 ">
                  Unverified
            </button>
          </div>
          <div class="w-1/6">
            <button className="w-32 rounded-md bg-green-600 text-gray-200 h-8  hover:bg-green-600 hover:text-white duration-200 ">
                  Verified
            </button>
          </div>
          <div class="w-1/6">
            <button className="w-32 rounded-md bg-blue-600 text-gray-200 h-8  hover:bg-blue-600 hover:text-white duration-200 ">
              In delivery
            </button>
          </div>
          <div class="w-1/2">
            <button className="w-32 rounded-md bg-green-700 text-gray-200 h-8  hover:bg-gree-700 hover:text-white duration-200 ">
              Accepted
            </button>
          </div>
        </div>            
            <p>Quantity : 1 </p>
            <p>Total Price : <span> $150</span></p>
        </div><br />
        <div class="w-1/6">
            <button className="w-32 bg-black text-gray-200 h-8  hover:bg-black hover:text-white duration-200 ">
                Rate it
            </button>
          </div>         
      </div>
    </div>
  );
};

export default Order;
