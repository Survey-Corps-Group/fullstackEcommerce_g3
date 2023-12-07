import React, { useEffect, useState } from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import Slider from "react-slick";
import SampleNextArrow from "../RecentProduct/SampleNextArrow";

const BestSellers = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products`)
      .then((response) => response.json())
      .then((data) => {
        // Sort products by sumRating in descending order
        const sortedProducts = data.products.sort(
          (a, b) => b.summary_rating - a.summary_rating
        );
        setProducts(sortedProducts);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  const notFoundImage = process.env.REACT_APP_NOTFOUND_IMG

  return (
    <div className="w-full pb-20">
      <Heading heading="Our Highest Rating Product" />
      <Slider {...settings}>
        {products.map((product) => (
          <div className="px-2" key={product.item_id}>
            <Product
              _id={product.item_id}
              img={ product?.images[0] ? `${process.env.REACT_APP_BACKEND_URL}/${product.images[0]}` : notFoundImage}
              productName={product.item_name}
              price={product.price.toFixed(2)}
              color={product.color}
              sumRating={product.summary_rating}
              stock_item={product.stock_item}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BestSellers;
