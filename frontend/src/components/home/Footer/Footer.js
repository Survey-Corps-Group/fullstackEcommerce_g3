import { FaGithub } from "react-icons/fa";
import FooterListTitle from "./FooterListTitle";
import { Link } from "react-router-dom";


const Footer = () => {
  
  
  return (
    <div className="w-full bg-[#F5F5F3] py-20">
      <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2  xl:grid-cols-6 px-4 gap-10">
        <div className="col-span-4">
          <FooterListTitle title="About Us" />
          <div className="flex flex-col gap-6">
            <p className="text-base w-full xl:w-[80%]">
            <span className="text-primeColor font-semibold text-lg">MomMeMall</span>{" "}
            is one of the main destination for the needs of loving mothers and children. At MomMeMall, we understand how important the journey of motherhood and childhood is. That's why we are committed to providing a collection of high-quality products designed to meet all your family's needs.
            </p>
            <ul className="flex items-center gap-2">
              <a
                href="https://github.com/Survey-Corps-Group/fullstackEcommerce_g3"
                target="_blank"
                rel="noreferrer"
              >
                <li className="w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                  <FaGithub />
                </li>
              </a>
              
            </ul>
          </div>
        </div>
        <div>
          <FooterListTitle title="MomMeMall" />
          <ul className="flex flex-col gap-2">
            <Link to="/">
              <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
                Home
              </li>
            </Link>
            <Link to="/shop">
              <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
                Shopping
              </li>
            </Link>
        
          </ul>
        </div>
        <div>
          <FooterListTitle title="Category" />
          <ul className="flex flex-col gap-2">
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Best Sellers
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Women's Clothes
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Children's Clothes
            </li>
            
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
