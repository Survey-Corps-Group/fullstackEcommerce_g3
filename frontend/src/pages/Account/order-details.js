import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserOrdersDetail, getuserOrders, deliveredOrder, send_email } from "../../modules/fetch";
import useUserDetails from '../../hooks/useUserDetails';

const OrderDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Destructure the id property from the object
  const [salesOrderData, setSalesOrderData] = useState([])
  const [items, setItems] = useState([])
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const { userDetails } = useUserDetails();

  useEffect(() => {
    const fetch_order_details = async () => {
      const response = await getUserOrdersDetail(id)
      console.log(response)
      setSalesOrderData(response.data)
      setItems(response.data.orderDetails.details)
    }
    fetch_order_details()
  },[id]) 

  const productNames = items.map(detail => detail.item.item_name);
  const concatenatedProductNames = productNames.join(", ");

  const handleReceived = () => {
    setShowConfirmationModal(true);
  }

  const handleConfirmation = async (accepted) => {
    if (accepted) {
      try {
        // Show confirmation modal
        setShowConfirmationModal(true);
  
        // Mark order as received when accepted
        await deliveredOrder(salesOrderData.orderDetails?.salesorder_id);
        // console.log();
        
        window.alert('Sukses');
        window.location.reload();
        await send_email(userDetails?.email, userDetails?.full_name, concatenatedProductNames);
        
      } catch (error) {
        console.error("Error updating order status:", error);
        // Handle error as needed
      }
    }
  setShowConfirmationModal(false);
  };

  const handleReviewed = () => {
    const dataToPass = salesOrderData.orderDetails;
    navigate('/rate', { state: dataToPass });
  }

  const handlePayment = () => {
    const dataToPass = {
      saleorder_id : id,
      cartData: { total: salesOrderData.orderDetails.sub_total },
      userDetails: salesOrderData.orderDetails.user_id
    };
    navigate('/paymentgateway', { state: dataToPass });
  }

  // button payment
  const buttonPayment = () => {
    if(salesOrderData.orderDetails?.image_payment) {
    return(
      <p></p>
    )
    } else {
      return(
        <button 
        onClick={handlePayment}
        className="bg-blue-500 text-white py-2 px-4 rounded"
        >
        Tambahkan Gambar Pembayaran
      </button>
      )
    }
  }
  console.log(salesOrderData.orderDetails?.order_status, 'order status')

  // button received
  const buttonReceived = () => {
    if(salesOrderData.orderDetails?.order_status === "process") {
    return(
      <button 
      onClick={handleReceived}
      className="bg-blue-500 text-white py-2 px-4 rounded"
      >
      Pesanan diterima
    </button>
    )
    } else {
      return(
      <p></p>
      )
    }
  }

  const buttonReviewed = () => {
    if(salesOrderData.orderDetails?.order_status === "recieved") {
    return(
      <button 
      onClick={handleReviewed}
      className="bg-teal-500 text-white py-2 px-4 rounded"
      >
      Berikan penilaian!
    </button>
    )
    } else {
      return(
      <p></p>
      )
    }
  }

  const buttonOnly = () => {
    if(salesOrderData.orderDetails?.order_status === "reviewed") {
    return(
      <button
      onClick={() => navigate('/')}
      className="bg-yellow-500 text-white py-2 px-4 rounded"
      >
      Terimakasih atas penilaiannya!
    </button>
    )
  }
}

  return (
    <div className="container mx-auto mt-8">
      <div className="container mx-auto mt-8">
      <div className="bg-white overflow-hidden shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6">No Pesanan: {salesOrderData.orderDetails?.salesorder_no}</h1>
        <div className="flex items-center mb-4">
          {salesOrderData.orderDetails?.order_status === "" && salesOrderData.orderDetails?.image_payment ? (
          <p className="text-gray-600 text-sm">Status: Menunggu Verifikasi</p>
          ) : salesOrderData.orderDetails?.order_status === ""  ?(
            <p className="text-gray-600 text-sm">Status: Menunggu Pembayaran</p>
          ) : (
            <p className="text-gray-600 text-sm">Status: {salesOrderData.orderDetails?.order_status}</p>
          )}
          {salesOrderData.orderDetails?.order_status === 'cancel' &&(
            <div className="bg-red-500 bg-opacity-50 text-white rounded-full p-2 ml-4">
              Verifiikasi Pembayaran Gagal
            </div>
          )}
          {salesOrderData.orderDetails?.is_verified && salesOrderData.orderDetails?.order_status === 'recieved' && (
          <div className="bg-green-500 bg-opacity-50 text-white rounded-full p-2 ml-4">
            Pesanan Selesai
          </div>
          )}
          {salesOrderData.orderDetails?.is_verified && salesOrderData.orderDetails?.order_status !== 'recieved' &&(
          <div className="bg-green-500 bg-opacity-50 text-white rounded-full p-2 ml-4">
            Verifikasi Pembayaran Berhasil
          </div>
          )}
       
        </div>
        {/* mapping detail barang */}
        {items.map((item) => (
          <div key={item.item.item_id} className="mb-4">
              <h2 className="text-xl font-bold mb-2">{item.item.item_name}</h2>
              <p className="text-gray-600 text-sm mb-2">Jumlah: {item.quantity} </p>
              <p className="text-gray-600 text-sm mb-2">Harga: {item.item.price}</p>
              <p className="text-gray-600 text-sm mb-2">Total: {item.item.price * item.quantity}</p>
            </div>
        ))}
        <div className="border-t border-gray-300 pt-4">
          <p className="text-gray-600 text-sm mb-2">Shipping Cost: {salesOrderData.orderDetails?.shipping_cost}</p>
          <p className="text-xl font-bold mb-2">Total: {salesOrderData.orderDetails?.sub_total}</p>
        </div>
        {buttonPayment()}
        {buttonReceived()}
        {buttonReviewed()}
        {buttonOnly()}
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
    </div>
    </div>
  );
};

export default OrderDetails;
