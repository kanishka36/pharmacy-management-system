import React from "react";
import { Link } from "react-router-dom";
import { updatePaymentMethod } from "../../api/order";
import { useSelector } from "react-redux";
import ChatBotWrapper from "../../components/websiteComponents/ChatBotWrapper";

const PaymentMethod = () => {
  const { orderId } = useSelector((state) => state.order);

  const handleSubmit = async (method) => {
    try {
      await updatePaymentMethod({ method }, orderId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container mx-auto mt-8 px-4">
        <h1 className="text-2xl font-bold mb-4">Choose Payment Method</h1>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center h-72">
          <div className="w-[20%] h-[100px] flex justify-center mb">
            <button
              onClick={() => handleSubmit("Card")}
              className="bg-blue-500 hover:bg-blue-600 text-2xl text-white font-bold py-2 px-4 rounded w-[80%]"
            >
              <Link to="/payhere">Card</Link>
            </button>
          </div>

          <div className="w-[20%] h-[100px] flex justify-center">
            <button
              onClick={() => handleSubmit("Cash on Delivery")}
              className="bg-green-500 hover:bg-green-600 text-2xl text-white font-bold py-2 px-4 rounded w-[80%]"
            >
              <Link to="/">Cash on Delivery</Link>
            </button>
          </div>
        </div>
      </div>

      <ChatBotWrapper />
    </>
  );
};

export default PaymentMethod;
