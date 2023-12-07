// components/admin/AdminListOrder.js
import React, { useState, useEffect } from "react";

const AdminListOrder = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  // Misalnya, gunakan useEffect untuk mendapatkan data pesanan dari server
  useEffect(() => {
    // Gantilah bagian berikut dengan logika pengambilan data pesanan dari server
    // Contoh menggunakan fetch untuk mendapatkan data dari endpoint API
    fetch("http://localhost:8000/admin/listorder")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setOrders(data))
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setError("Error fetching orders. Please try again later.");
      });
  }, []);

  const handleVerify = (orderId) => {
    // Implementasikan logika untuk mengirim permintaan verifikasi ke server
    console.log(`Order ${orderId} verified`);
  };

  const handleUnverify = (orderId) => {
    // Implementasikan logika untuk mengirim permintaan unverifikasi ke server
    console.log(`Order ${orderId} unverified`);
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">List of Orders</h2>
      <div className="bg-white overflow-hidden shadow-sm rounded-md">
        {error ? (
          <p className="p-4 text-red-600">{error}</p>
        ) : orders.length === 0 ? (
          <p className="p-4 text-gray-600">No orders available.</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="py-2 px-4 border-r">Order</th>
                <th className="py-2 px-4 border-r">Customer Name</th>
                <th className="py-2 px-4 border-r">Address</th>
                <th className="py-2 px-4 border-r">Shipping Price</th>
                <th className="py-2 px-4 border-r">Total Amount</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="py-2 px-4 border-r">{order.id}</td>
                  <td className="py-2 px-4 border-r">{order.customerName}</td>
                  <td className="py-2 px-4 border-r">{order.address}</td>
                  <td className="py-2 px-4 border-r">{order.shippingPrice}</td>
                  <td className="py-2 px-4 border-r">{order.totalAmount}</td>
                  <td className="py-2 px-4">{order.status}</td>
                  <td className="py-2 px-4 border-r">
                    {order.status === "unverified" ? (
                      <button onClick={() => handleVerify(order.id)} className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-md">Verify</button>
                    ) : (
                      <button onClick={() => handleUnverify(order.id)} className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md">Unverify</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminListOrder;
