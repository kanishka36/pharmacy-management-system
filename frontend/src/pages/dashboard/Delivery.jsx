import React, { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import { displayAllOrder } from "../../api/order";

const Delivery = () => {
  const [orders, setOrders] = useState([]);

  // display order
  const fetchAllOrders = async () => {
    try {
      const response = await displayAllOrder();
      setOrders(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <>
      <div className="flex">
        <Menu />
        <div className="container mx-auto w-full font-poppins">
          <h1 className="text-3xl sm:text-6xl font-medium text-indigo-600 my-3 ml-3">
            Delivery
          </h1>

          <div className="my-3 overflow-x-auto mx-3">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="border border-indigo-600 text-indigo-600 py-2">
                    Item
                  </th>
                  <th className="border border-indigo-600 text-indigo-600 py-2">
                    Address
                  </th>
                  <th className="border border-indigo-600 text-indigo-600 py-2">
                    Status
                  </th>
                  <th className="border border-indigo-600 text-indigo-600 py-2">
                    Payment Method
                  </th>
                  <th className="border border-indigo-600 text-indigo-600 py-2">
                    Total
                  </th>
                  <th className="border border-indigo-600 text-indigo-600 py-2">
                    Action
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
                      {order.deliveryAddress}
                    </td>
                    <td className="border border-indigo-600 py-1">
                      <div className="">{order.deliverStatus}</div>
                      <div className="">
                        <button>Update Status</button>
                      </div>
                    </td>
                    <td className="border border-indigo-600 py-1">{order.paymentMethod}</td>
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
                    <td className="border border-indigo-600 py-1">
                      <button>Complete</button>
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

export default Delivery;
