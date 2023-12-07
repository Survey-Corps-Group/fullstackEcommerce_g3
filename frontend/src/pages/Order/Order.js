import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { getSalesOrder, deliveredOrder } from "../../modules/fetch";


const Order = () => {
  const location = useLocation();
  const { cartData, products, userDetails, saleorder } = location.state || {
    cartData: null,
    products: [],
    userDetails: {},
    saleorder: {},
  };
  const { createOrder } = saleorder || {};
  const { salesorder_id } = createOrder || {};
  const [is_verified, setIsVerified] = useState();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);


  const fetchSalesOrder = async () => {
    try {
      const response = await getSalesOrder(salesorder_id);
      const { salesOrder } = response;
      const { is_verified } = salesOrder || {};
      setIsVerified(is_verified);
    } catch (error) {
      console.error("Error fetching sales order:", error);
    }
  };

  useEffect(() => {
    fetchSalesOrder();
  }, [salesorder_id]);

  const handleConfirmation = async (accepted) => {
    if (accepted) {
      try {
        // Show confirmation modal
        setShowConfirmationModal(true);
  
        // Mark order as received when accepted
        await deliveredOrder(salesorder_id);
        
        // Fetch the updated sales order details
        const a = getSalesOrder(salesorder_id)
        // console.log();
        setShowThankYouMessage(true);
      } catch (error) {
        console.error("Error updating order status:", error);
        // Handle error as needed
      }
    }
  setShowConfirmationModal(false);
  };

  const handleAccept = () => {
    // Show confirmation modal
    setShowConfirmationModal(true);
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Order" />
      <div className="pb-10">
        <h1 className="text-primeColor font-semibold text-lg">{userDetails?.full_name}</h1>
        <p>{userDetails?.phone}</p>
        <p>{userDetails?.address}</p>
        <br />
        {products.map((product, index) => (
          <div key={index} className="border-b-[2px] py-4 mb-2">
            <h2 className="text-primeColor font-semibold text-lg">{product.item_name}</h2>
            <p>Quantity: {product.quantity}</p>
            <br />
            <p>Subtotal: ${product.price * product.quantity}</p>
          </div>
        ))}
        <p>
          Total Price: <span> ${cartData?.total}</span>
        </p>
        <br />

        {/* Card for order status */}
        {is_verified !== null && (
          <div className={`mt-6 p-4 border rounded-md ${is_verified ? 'bg-green-100' : 'bg-yellow-100'}`}>
            {is_verified == true ? (
              <>
                <h1 className="text-lg font-semibold text-primeColor">Status: VERIFIED</h1>
                <p>Sudah di verifikasi admin, barang akan dikirim. silahkan menunggu</p>
                <div style={{ height: '100px' }}></div>
                {!showThankYouMessage ? (
                  <>
                    <p>sudah menerima barang? klik tombol DITERIMA</p>
                    <button
                      className="mt-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 duration-300"
                      onClick={handleAccept}>
                      DITERIMA
                    </button>
                  </>
                ) : (
                  <h1>TERIMAKASIH TELAH BERBELANJA DI TOKO KAMI</h1>
                )}
              </>
            ) : (
              <>
                <h1 className="text-lg font-semibold text-primeColor">Pembayaran Berhasil</h1>
                <p>Menunggu admin verifikasi pembayaranmu.</p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md">
            <p className="text-lg font-semibold">Apakah yakin sudah menerima barang?</p>
            <div style={{ height: "20px" }}></div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => handleConfirmation(true)}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 duration-300"
              >
                YA
              </button>
              <button
                onClick={() => handleConfirmation(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 duration-300"
              >
                TIDAK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default Order;
