
import React, { useState, useEffect } from "react";

const PaymentVerify = () => {
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);

  // Misalnya, gunakan useEffect untuk mendapatkan data pembayaran dari server
  useEffect(() => {
    // Gantilah bagian berikut dengan logika pengambilan data pembayaran dari server
    // Contoh menggunakan fetch untuk mendapatkan data dari endpoint API
    fetch("https://api.example.com/payments")
      .then((response) => response.json())
      .then((data) => setPayments(data))
      .catch((error) => console.error("Error fetching payments:", error));
  }, []);

  // Handler untuk memilih pembayaran yang akan diverifikasi
  const handlePaymentSelect = (payment) => {
    setSelectedPayment(payment);
  };

  // Handler untuk memverifikasi pembayaran
  const handleVerifyPayment = () => {
    if (selectedPayment) {
      // Gantilah bagian berikut dengan logika untuk memverifikasi pembayaran
      console.log(`Payment verified for Order ID ${selectedPayment.orderId}`);
      // Refresh data pembayaran setelah verifikasi
      fetch("https://api.example.com/payments")
        .then((response) => response.json())
        .then((data) => setPayments(data))
        .catch((error) => console.error("Error fetching payments:", error));
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">Payment Verification</h2>
      <div className="bg-white p-4 rounded-md shadow-md">
        {payments.length === 0 ? (
          <p className="text-gray-600">No payments available for verification.</p>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Select Payment to Verify:</label>
              <select
                className="mt-1 p-2 w-full border rounded-md"
                onChange={(e) => handlePaymentSelect(JSON.parse(e.target.value))}
              >
                <option value="" disabled selected>
                  Choose a payment
                </option>
                {payments.map((payment) => (
                  <option key={payment.id} value={JSON.stringify(payment)}>
                    Order ID: {payment.orderId} - Amount: ${payment.amount}
                  </option>
                ))}
              </select>
            </div>
            {selectedPayment && (
              <div className="flex items-center space-x-4">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                  onClick={handleVerifyPayment}
                >
                  Verify Payment
                </button>
                <p className="text-gray-600">
                  Selected Payment: Order ID {selectedPayment.orderId} - Amount: ${selectedPayment.amount}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentVerify;
