import { useParams } from "react-router-dom"
import { getUserOrdersDetail, verified, declined } from "../../modules/fetch"
import { useEffect, useState } from "react"

const AdminListOrderDetail = () => {
    const {id} = useParams()
    const [order, setOrder] = useState([])
    const [orderDetail, setOrderDetail] = useState([])

    useEffect(() => {
        const order_details = async () => {
            const response = await getUserOrdersDetail(id)
            console.log(response.data.orderDetails, 'details')
            setOrder(response.data.orderDetails)
            setOrderDetail(response.data.orderDetails.details)
        }
        order_details()
    },[])

    const handleVerified = async () => {
      console.log("klik")
      await verified(id)
      alert("Bukti pembayaran di approve")
    }

    const handleDeclined = async () => {
      console.log("klik")
      await declined(id)
      alert("Bukti pembayaran di declined")
    }

    return (
        <div className="max-w-3xl mx-auto mt-8">
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">Detail Pembayaran</h2>
            <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="py-2 px-4 border-r">Order Id</th>
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
                <ol key={details.salesorder_detail_id} className="list-decimal pl-5">
                <li>{details.item.item_name} - {details.quantity * details.item.price}</li>
            </ol>
            ))}

            <p className="pt-8">Bukti Pembayaran : </p>
            {!order.image_payment && (
              <p className="text-red-700">Belum ada bukti pembayaran</p>
            )}

            {order.image_payment && (
            <img src={order.image_payment} alt="" />
            )}
            <div className="flex pt-10">
              <button onClick={handleVerified} className="bg-green-500 text-white py-2 px-4 rounded w-24">
                Accept
              </button>

              <button onClick={handleDeclined} className="bg-red-500 text-white ml-5 py-2 px-4 rounded w-24">
                Decline
              </button>
            </div>

        </div>
    )
}

export default AdminListOrderDetail