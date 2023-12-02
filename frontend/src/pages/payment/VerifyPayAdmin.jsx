import React from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const Payment = () => {
  // Dummy data, gantilah dengan data yang sesuai dengan struktur data dari server
  const gatewayData = {
    name: "Alexa",
    phone: "08967326173",
    address: "Padamara Street No.231 Washington USA",
    product: {
      name: "White Sweater",
      quantity: 1,
      subtotal: 150,
    },
    totalPrice: 150,
    proofOfPayment: null, // Gantilah dengan URL gambar dari payment gateway
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Verify Payment" />
      <div className="pb-10 ">
        <h1 className="text-primeColor font-semibold text-lg">{gatewayData.name}</h1>
        <p>{gatewayData.phone}</p>
        <p>{gatewayData.address}</p>
        <br />
        <div className="border-b-[2px] py-4 mb-2">
          <h2 className="text-primeColor font-semibold text-lg">{gatewayData.product.name}</h2>
          <p>Quantity: {gatewayData.product.quantity}</p>
          <br />
          <p>Subtotal: ${gatewayData.product.subtotal}</p>
        </div>

        <p>
          Total Price: <span>${gatewayData.totalPrice}</span>
        </p>
        <br />

        <form className="flex items-center space-x-6">
          <div className="shrink-0">
            <h1 className="text-primeColor font-semibold text-lg">Upload proof of payment </h1>
          </div>
          <label className="block">
            <span className="sr-only">Choose profile photo</span>
            <input
              type="file"
              className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-black-700
                hover:file:bg-violet-100
              "
            />
          </label>
        </form>

        {/* Tambahkan elemen <img> untuk menampilkan gambar gateway pembayaran */}
        {gatewayData.proofOfPayment && (
          <div className="mt-4">
            <img src={gatewayData.proofOfPayment} alt="Proof of Payment" className="w-full max-w-lg" />
          </div>
        )}

        <Link to="/">
          <button className="w-52 h-10 bg-primeColor text-white text-lg mt-4 hover:bg-black duration-300">
            Verify
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Payment;
