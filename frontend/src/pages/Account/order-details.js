import React from "react";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { id } = useParams(); // Destructure the id property from the object

  return (
    <div className="container mx-auto mt-8">
      <p>halaman order details untuk sales order id {id}</p>
    </div>
  );
};

export default OrderDetails;
