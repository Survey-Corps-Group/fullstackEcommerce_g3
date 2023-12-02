import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import { getProductById } from "../../modules/fetch/index";

const ProductDetails = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  const { _id } = useParams();
  const [productInfo, setProductInfo] = useState("");

  useEffect(() => {
    setPrevLocation(location.pathname);
  }, [location, productInfo]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(_id);
        setProductInfo(response);
      } catch (e) {
        console.log(e);
      }
    };
    fetchProduct();
  }, [_id]);

  const notFoundImage = 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'
  const imageUrl = productInfo?.images?.[0]?.image_url ? `http://localhost:8000/${productInfo.images[0].image_url}` : notFoundImage;

  return (
    <div className="w-full mx-auto border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start">
          <Breadcrumbs title="" prevLocation={prevLocation} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="col-span-1">
            <img
              className="w-full h-full object-cover rounded-lg"
              src={imageUrl}
              alt={imageUrl}
            />
          </div>
          <div className="col-span-3 md:col-span-2 flex flex-col justify-center">
            <ProductInfo productInfo={productInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
