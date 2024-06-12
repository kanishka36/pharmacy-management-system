import React, { useEffect, useState } from "react";
import { displayOrder } from "../../api/order";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // display order
  const fetchOrders = async () => {
    try {
      const response = await displayOrder();
      setOrders(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <div className="">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-3 text-indigo-600">
          Orders
        </h2>
        <div className="">
          <p>Order details</p>
          <div className="my-3 overflow-x-auto">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="border border-indigo-600 text-indigo-600 py-2">
                    Item
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
                {orders.map((order, index) => (
                  <tr key={index} className="text-center">
                    <td className="border border-indigo-600 py-1">
                      {order.cartItems.map((cartItem, cartindex) => (
                        <div
                          key={cartindex}
                          className="flex mb-2 justify-between"
                        >
                          <div className="basis-1/4 flex justify-center">
                            <img
                              className="w-20 h-15 object-contain"
                              src={cartItem.products.image}
                              alt={cartItem.products.productName}
                            />
                          </div>
                          <div className="basis-1/4">
                            {cartItem.products.productName}
                          </div>
                          <div className="basis-1/4">
                            Qty {cartItem.quantity}
                          </div>
                          <div className="basis-1/4">
                            Rs.{" "}
                            {(
                              cartItem.quantity * cartItem.products.sellingPrice
                            ).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </td>
                    <td className="border border-indigo-600 py-1">
                      {order.status}
                    </td>
                    <td className="border border-indigo-600 py-1">
                      Rs.{" "}
                      {order.cartItems
                        .reduce(
                          (total, cartItem) =>
                            total +
                            cartItem.quantity * cartItem.products.sellingPrice,
                          0
                        )
                        .toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
