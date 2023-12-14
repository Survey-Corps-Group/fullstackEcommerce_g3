import React, { useState, useEffect } from "react";
import { adminGetAllSalesOrder } from "../../modules/fetch";
import { Link } from "react-router-dom";

const AdminListOrder = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListOrder = async () => {
      try {
        const response = await adminGetAllSalesOrder();
        // Sort the orders by salesorder_id in ascending order
        const sortedOrders = response.orders.sort((a, b) => a.salesorder_id - b.salesorder_id);
        setOrders(sortedOrders);
      } catch (error) {
        setError("Error fetching orders");
      }
    };
    fetchListOrder();
  }, []);

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
                <th className="py-2 px-4 border-r">No</th>
                <th className="py-2 px-4 border-r">Order ID</th>
                <th className="py-2 px-4 border-r">No Order</th>
                <th className="py-2 px-4 border-r">Total Pembayaran</th>
                <th className="py-2 px-4 border-r">Detail</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.salesorder_id} className="border-b">
                  <td className="py-2 px-4 border-r">{index + 1}</td>
                  <td className="py-2 px-4 border-r">{order.salesorder_id}</td>
                  <td className="py-2 px-4 border-r">{order.salesorder_no}</td>
                  <td className="py-2 px-4 border-r">{order.sub_total}</td>
                  <td className="py-2 px-4 border-r">
                    <Link to={`/AdminListOrder/${order.salesorder_id}`} className="text-blue-500 hover:underline">
                      Detail 
                    </Link>
                  </td>
                  <td className="py-2 px-4">
                    {order.order_status === 'cancel' ? (
                      <div className="bg-red-100 text-yellow-800 py-1 px-2 rounded">
                      <h1 className="font-bold">CANCEL</h1>
                    </div>
                    ) : order.is_verified ? (
                      <div className="bg-green-100 text-green-800 py-1 px-2 rounded">
                      <h1 className="font-bold">ACC</h1>
                    </div>
                    ) : (
                      <div className="bg-yellow-100 text-yellow-800 py-1 px-2 rounded">
                        <h1 className="font-bold">PEND</h1>
                      </div>
                    )
                  }
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
