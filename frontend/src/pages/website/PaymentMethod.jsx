import React from "react";
import { Link } from "react-router-dom";
import { updatePaymentMethod } from "../../api/order";
import { useSelector } from "react-redux";

const PaymentMethod = () => {
  const { orderId } = useSelector((state) => state.order);

  const handleSubmit = async (method) => {
    try {
      await updatePaymentMethod({method}, orderId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="">
        <button onClick={() => handleSubmit("Card")}>
          <Link to="/payhere">Card</Link>
        </button>
        <button onClick={() => handleSubmit("Cash on Delivery")}>
          Cash on Delivery
        </button>
      </div>
    </>
  );
};

export default PaymentMethod;
