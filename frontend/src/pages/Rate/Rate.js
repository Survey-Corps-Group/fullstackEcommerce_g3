import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { IconContext } from "react-icons";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const Rate = () => {
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Rate the Product" />
      <div className="pb-10 ">
      
        <div className="border-b-[2px] py-4 mb-2">
        <div class="flex">
          <div class="w-1/6 mb-4">
            <h1 className="text-primeColor font-semibold text-lg">White Sweater</h1>
          </div>
        </div>
        <div class="flex">
          <div class="w-1/6 mt-2">
            <h1 className="text-md">Product Quality</h1>
          </div>
          <div class="w-1/8 mt-2">
            <IconContext.Provider value={{ color: "orange", size: "20px"}}>
              <FaStar />
            </IconContext.Provider>
          </div>
          <select class="w-1/8 ml-4 md:w-16 border-[1px] border-gray-200 py-1 px-4 cursor-pointer text-primeColor text-base block dark:placeholder-gray-400 appearance-none focus-within:outline-none focus-visible:border-primeColor">
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </select>
        </div>               
        </div><br />
        <div class="w-1/6">
        <Link onClick={""}>
            <button className="w-32 bg-black text-gray-200 h-8  hover:bg-black hover:text-white duration-200 ">
                Submit
            </button>
        </Link>    
          </div>         
      </div>
    </div>
  );
};

export default Rate;
