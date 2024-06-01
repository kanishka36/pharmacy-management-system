import React, { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const PayHerePayment = () => {
  const apiUrl = import.meta.env.VITE_ROUTE_URL;

  const amount = useSelector((state) => state.cart.total);
  
  const handlePayment = async () => {
    const payment = {
      sandbox: true,
      merchant_id: "1226807", // Replace with your Merchant ID
      return_url: "http://localhost:5173/return",
      cancel_url: "http://localhost:5173/cancel",
      notify_url: "http://localhost:5173/notify",
      order_id: "ItemNo12345",
      items: "Door bell wireless",
      amount: amount,
      currency: "LKR",
      first_name: "Saman",
      last_name: "Perera",
      email: "samanp@gmail.com",
      phone: "0771234567",
      address: "No.1, Galle Road",
      city: "Colombo",
      country: "Sri Lanka",
      delivery_address: "No. 46, Galle road, Kalutara South",
      delivery_city: "Kalutara",
      delivery_country: "Sri Lanka",
      custom_1: "",
      custom_2: "",
    };

    try {
      const response = await axios.post(`${apiUrl}generate-hash`, {
        merchant_id: payment.merchant_id,
        order_id: payment.order_id,
        amount: payment.amount,
        currency: payment.currency,
      });

      payment.hash = response.data.hash;
      payhere.startPayment(payment);
    } catch (error) {
      console.error("Error generating hash:", error);
    }
  };

  useEffect(() => {
    payhere.onCompleted = function onCompleted(orderId) {
      console.log("Payment completed. OrderID:" + orderId);
      window.location.href = "http://localhost:5173/return";
    };

    payhere.onDismissed = function onDismissed() {
      console.log("Payment dismissed");
      window.location.href = "http://localhost:5173/cart";
    };

    payhere.onError = function onError(error) {
      console.log("Error:" + error);
    };

    handlePayment();
  }, []);

  return (
    <>
      <p>Processing...</p>
    </>
  );
};

export default PayHerePayment;
