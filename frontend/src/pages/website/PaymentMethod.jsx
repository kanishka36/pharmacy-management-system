import React from "react";
import { Link } from "react-router-dom";

const PaymentMethod = () => {
  return (
    <>
      <div className="">
        <button>
          <Link to="/payhere">Card</Link>
        </button>
        <button>Cash on Delivery</button>
      </div>
    </>
  );
};

export default PaymentMethod;
