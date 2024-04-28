import React, { useEffect, useState } from "react";
import { displayCart } from "../../api/cart";

const Cart = () => {
  const [cartData, setCartData] = useState([]);

  const fetchCart = async () => {
    try {
      const response = await displayCart();
      setCartData(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <>
      <div className="container mx-auto">
        <div className="my-3 overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="border border-indigo-600 text-indigo-600 py-2">
                  Order
                </th>
                <th className="border border-indigo-600 text-indigo-600 py-2">
                  Date
                </th>
                <th className="border border-indigo-600 text-indigo-600 py-2">
                  Status
                </th>
                <th className="border border-indigo-600 text-indigo-600 py-2">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {cartData.map((member, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-indigo-600 py-1">
                    {member._id}
                  </td>
                  <td className="border border-indigo-600 py-1">
                    {member.firstName + " " + member.lastName}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Cart;
