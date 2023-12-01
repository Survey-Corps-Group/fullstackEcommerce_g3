// import React, { useState, useEffect } from "react";
// import Slider from "react-slick";
// import Heading from "../Products/Heading";
// import Product from "../Products/Product";
// import SampleNextArrow from "./SampleNextArrow";
// import SamplePrevArrow from "./SamplePrevArrow";

// const Children = () => {
//   const [products, setProducts] = useState([]);

//   const settings = {
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     nextArrow: <SampleNextArrow />,
//     prevArrow: <SamplePrevArrow />,
//     responsive: [
//       {
//         breakpoint: 1025,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//           infinite: true,
//         },
//       },
//       {
//         breakpoint: 769,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//           infinite: true,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           infinite: true,
//         },
//       },
//     ],
//   };

//   useEffect(() => {
//     // Fetch data from the API
//     fetch("http://localhost:8000/api/products")
//       .then((response) => response.json())
//       .then((data) => setProducts(data.products))
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []); // Empty dependency array ensures the effect runs once on component mount

//   console.log();
//   return (
//     <div className="w-full pb-16">
//       <Heading heading="Children Clothes" />
//       <Slider {...settings}>
//         {products.map((product) => (
//           <div className="px-2" key={product.item_id}>
//             <Product
//               _id={product.item_id}
//               img={product.images[0]}
//               productName={product.item_name}
//               price={product.price.toFixed(2)}
//               color={product.color}
//               des={product.description}
//               sumRating={product.summary_rating}
//             />
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default Children;



// Children.js
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";

import { getAllProducts } from "../../../modules/fetch/index";

const Children = () => {
  const [products, setProducts] = useState([]);

  const notFoundImage = 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        console.log(response)
        setProducts(response.products);
      } catch (e) {
        console.log(e);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="w-full pb-16">
      <Heading heading="Children Clothes" />
      <Slider {...settings}>
        {products.map((product) => (
          <div className="px-2" key={product.item_id}>
            <Product
              _id={product.item_id}
              img={product?.images?.[0] ? `http://localhost:8000/${product.images[0]}` : notFoundImage}
              productName={product.item_name}
              price={product.price.toFixed(2)}
              color={product.color}
              sumRating={product.summary_rating}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Children;
