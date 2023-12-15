import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getuserOrders } from '../../modules/fetch';
import { jwtDecode } from 'jwt-decode';


const MyOrders = () => {

    const [dataOrder, setDataOrder] = useState([])

    // get user salesorder
    useEffect(() => {
        const fetch_user_order = async () => {
            const response = await getuserOrders()
            setDataOrder(response.data)
            console.log(response, 'responsesss')
        }
        fetch_user_order()
    }, [])
    
      return (
        <div className="container mx-auto mt-8">
          <h1 className="text-3xl font-bold mb-6">Daftar Pesanan</h1>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dataOrder.map((order) => (
              <li key={order.salesorder_id} className="bg-white overflow-hidden shadow-md rounded-lg">
                <Link to={`/my-orders/${order.salesorder_id}`}>
                  <div className="p-4">
                    <h2 className="text-xl font-bold mb-2">{order.salesorder_no}</h2>
                    <p className="text-gray-600 text-sm mb-2">Jumlah: {order.sub_total}</p>
                    {order.order_status === "" && order.image_payment ? (
                      <p className="text-gray-600 text-sm">Status: Menunggu Verifikasi</p>
                    ) : order.order_status === "" ?  (
                      <p className="text-gray-600 text-sm">Status: Menunggu pembayaran</p>
                      ) : (
                      <p className="text-gray-600 text-sm">Status: {order.order_status}</p>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );
    };


export default MyOrders;
