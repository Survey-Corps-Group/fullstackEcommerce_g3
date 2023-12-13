import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserOrdersDetail, verified, declined, updateStockQuantity } from "../../modules/fetch";

const AdminListOrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);
  const [isVerified, setIsVerified] = useState(false);

  const orderstatus = order.order_status;

  useEffect(() => {
    const orderDetails = async () => {
      const response = await getUserOrdersDetail(id);
      setOrder(response.data.orderDetails);
      setOrderDetail(response.data.orderDetails.details);
      setIsVerified(response.data.orderDetails.is_verified);
    };
    orderDetails();
  }, [id]);

  const imageupload =
    process.env.REACT_APP_BACKEND_URL + "/" + order.image_payment;

  const handleVerified = async () => {
    await verified(id);
    setIsVerified(true);
  };

  const handleDeclined = async () => {
    await declined(id);

    for (let detail of orderDetail) {
      try {
        await updateStockQuantity(detail.item.item_id, -detail.quantity);
      } catch (error) {
        console.log(error)
      }
    }
    

    window.location.reload();
  };

  const isOrderCanceled = orderstatus === "cancel";

  return (
    <div className="max-w-3xl mx-auto mt-8 m-10">
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">
        Detail Pembayaran
      </h2>
      {isOrderCanceled ? (
        <div className="bg-pink-100 text-pink-800 py-2 px-4 rounded text-center font-bold mb-4">
          Berhasil Mencancel Pembayaran
        </div>
      ) : (
        <>
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="py-2 px-4 border-r">Nomor Transaksi</th>
                <th className="py-2 px-4 border-r">Username</th>
                <th className="py-2 px-4 border-r">Total Pembayaran</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-4 border-r">{order.salesorder_no}</td>
                <td className="py-2 px-4 border-r">{order.user?.full_name}</td>
                <td className="py-2 px-4 border-r">{order.sub_total}</td>
              </tr>
            </tbody>
          </table>

          <p className="pt-8">Rincian : </p>
          {orderDetail.map((details) => (
            <ol
              key={details.salesorder_detail_id}
              className="list-decimal pl-5"
            >
              <li>
                {details.item.item_name} -{" "}
                {details.quantity * details.item.price}
              </li>
            </ol>
          ))}

          <p className="pt-8">Bukti Pembayaran : </p>
          {!order.image_payment && (
            <p className="text-red-700">Belum ada bukti pembayaran</p>
          )}

          {order.image_payment && <img src={imageupload} alt="" />}
          <div className="flex pt-10">
            {isVerified ? (
              <div
                className="bg-green-200 text-green-800 py-2 px-4 rounded w-full text-center font-bold"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                BERHASIL MEMVERIFIKASI PEMBAYARAN
              </div>
            ) : (
              <>
                <button
                  onClick={handleVerified}
                  className="bg-green-500 text-white py-2 px-4 rounded w-24"
                >
                  Accept
                </button>

                <button
                  onClick={handleDeclined}
                  className="bg-red-500 text-white ml-5 py-2 px-4 rounded w-24"
                >
                  Decline
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminListOrderDetail;
