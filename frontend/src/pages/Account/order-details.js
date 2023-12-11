import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserOrdersDetail, getuserOrders } from "../../modules/fetch";


const OrderDetails = () => {
  const { id } = useParams(); // Destructure the id property from the object
  const [salesOrderData, setSalesOrderData] = useState([])
  const [items, setItems] = useState([])
  const [open, setOpen] = useState(false)
  const [openConfirmation, setOpenConfirmation] = useState(false)


  useEffect(() => {
    const fetch_order_details = async () => {
      const response = await getUserOrdersDetail(id)
      console.log(response)
      setSalesOrderData(response.data)
      setItems(response.data.orderDetails.details)
    }
    fetch_order_details()
  },[]) 

 

  const handleReceived = () => {
    // setOpenConfirmation(true)
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
        // onClick={handlePayment}
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

  console.log(open, 'open')
  return (
    <div className="container mx-auto mt-8">
      <p>halaman order details untuk sales order id {id}</p>

      <div className="container mx-auto mt-8">
      <div className="bg-white overflow-hidden shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6">No Pesanan: {salesOrderData.orderDetails?.salesorder_no}</h1>
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-600 text-sm">Status: {salesOrderData.orderDetails?.order_status}</p>
        </div>
        {/* mapping detail barang */}
        {items.map((item) => (
          <div key={item.item.item_id} className="mb-4">
              <h2 className="text-xl font-bold mb-2">{item.item.item_name}</h2>
              <p className="text-gray-600 text-sm mb-2">Jumlah: {item.quantity} </p>
              <p className="text-gray-600 text-sm mb-2">Harga: {item.item.price}</p>
              <p className="text-gray-600 text-sm mb-2">total: {item.item.price * item.quantity}</p>
            </div>
        ))}
        <div className="border-t border-gray-300 pt-4">
          <p className="text-xl font-bold mb-2">Total: {salesOrderData.orderDetails?.sub_total}</p>
        </div>
        {buttonPayment()}
        {buttonReceived()}
        {/* {open === true && (
          modalConfirmation("testing")
        )} */}
        
      </div>
    </div>
    </div>
  );
};

export default OrderDetails;
