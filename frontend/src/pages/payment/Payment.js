import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { uploadPaymentProof } from "../../modules/fetch";
import { useNavigate } from 'react-router-dom';


const Payment = () => {
  const location = useLocation();

  console.log(location.state)

  const { cartData, products, userDetails, saleorder_id } = location.state || { cartData: null, products: [], userDetails: {}, saleorder_id : null};

  const [file, setFile] = useState(null);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);

  useEffect(() => {
    console.log("Cart Data:", cartData);
    console.log("Products:", products);
    console.log("User Details:", userDetails);
    console.log("Sales Order ID:", saleorder_id);
  }, [cartData, products, userDetails, saleorder_id]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async () => {
    try {
      if (!file) {
        window.alert('Please select a file.');
        return;
      }

      const formData = new FormData();
      formData.append('image', file);

      // Assuming uploadPaymentProof returns a success response
      const response = await uploadPaymentProof(saleorder_id, formData);

      console.log('Response:', response);

      // Open the success modal
      setSuccessModalOpen(true);

      // You can also perform additional actions after successful submit if needed

    } catch (error) {
      console.error('Error during payment proof upload:', error);
      window.alert('Error during payment proof upload. Please try again.');
    }
  };

  const navigate = useNavigate();

  const closeSuccessModal = () => {
    // Close the success modal
    setSuccessModalOpen(false);
    // navigate('/order', { state: { cartData, products, userDetails, saleorder } });
    navigate('/order', {
      state: {
        cartData,
        products,
        userDetails,
        saleorder_id
      }
    });
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Payment" />
      <div className="pb-10">
        <h1 className="text-primeColor font-semibold text-lg">{userDetails?.full_name}</h1>
        <p>{userDetails?.phone}</p>
        <p>{userDetails?.address}</p><br />
        {products?.map((product, index) => (
          <div key={index} className="border-b-[2px] py-4 mb-2">
            <h2 className="text-primeColor font-semibold text-lg">{product.item_name}</h2>
            <p>Quantity: {product.quantity}</p><br />
            <p>Subtotal: ${product.price * product.quantity}</p>
          </div>
        ))}
        <p>Total Price: 
          <span> ${cartData.shipping ? (cartData?.total + cartData?.shipping) : cartData?.total}</span>
        </p><br/>
        
        <form className="flex items-center space-x-6">
          <div className="shrink-0">
            <h1 className="text-primeColor font-semibold text-lg">Upload proof of payment </h1>        
          </div>
          <label className="block">
            <span className="sr-only">Choose profile photo</span>
            <input
              type="file"
              className="block w-full text-sm text-slate-500"
              onChange={handleFileChange}
            />
          </label>
        </form>

        <button
          onClick={handleSubmit}
          className="w-44 h-10 bg-primeColor text-white text-lg mt-4 hover:bg-black duration-300"
        >
          Submit
        </button>

        <p>Sales Order ID: {saleorder_id}</p>

        {/* Success Modal */}
        {isSuccessModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-md">
              <h1 className="text-2xl font-bold mb-2">Pembayaran berhasil terkirim</h1>
              <p>Terima kasih sudah upload pembayarannya</p>
              <button onClick={closeSuccessModal} className="mt-4 bg-primeColor text-white px-4 py-2 rounded-md hover:bg-black duration-300">
                Tutup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
