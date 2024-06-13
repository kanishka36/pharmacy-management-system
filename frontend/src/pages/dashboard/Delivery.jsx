import React, { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import { displayAllOrder, updateDeliverStatus } from "../../api/order";

const Delivery = () => {
  const [orders, setOrders] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [orderId, setOrderId] = useState();
  const [deliveryStatus, setDeliveryStatus] = useState();

  // Display all orders
  const fetchAllOrders = async () => {
    try {
      const response = await displayAllOrder();
      const filterOders = response.filter(
        (order) => order.status !== "pending payment"
      );
      setOrders(filterOders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const handlePopup = (orderId) => {
    setShowPopup(true);
    setOrderId(orderId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDeliverStatus(deliveryStatus, orderId);
      setShowPopup(false);
      fetchAllOrders();
    } catch (error) {
      console.log(error);
    }
  };

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
                  <tr key={order._id} className="text-center">
                    <td className="border border-indigo-600 py-1">
                      {order.cartItems.map((cartItem, cartIndex) => (
                        <div
                          key={cartIndex}
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
                      <div>{order.deliverStatus}</div>
                      <div>
                        <button
                          className="bg-indigo-600 hover:bg-indigo-800 hover:scale-105 px-10 py-1 rounded-md text-white font-semibold transition-all duration-100 ease-in"
                          onClick={() => handlePopup(order._id)}
                        >
                          Update Status
                        </button>
                      </div>
                    </td>
                    <td className="border border-indigo-600 py-1">
                      {order.paymentMethod}
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
                    {/* <td className="border border-indigo-600 py-1">
                      <button className="bg-indigo-600 hover:bg-indigo-800 hover:scale-105 px-10 py-1 rounded-md text-white font-semibold transition-all duration-100 ease-in">
                        Complete
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 backdrop-blur-sm">
              <form onSubmit={handleSubmit}>
                <select
                  value={deliveryStatus}
                  onChange={(e) => setDeliveryStatus(e.target.value)}
                  className="border-solid border border-indigo-600 rounded-md px-3 py-1 mr-1 mb-2 lg:mb-0 mt-3"
                >
                  <option value="">Select Delivery Status</option>
                  <option value="Shipped">Shipped</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Delivered">Delivered</option>
                </select>
                <button
                  className="bg-indigo-600 hover:bg-indigo-800 hover:scale-105 px-10 py-1 mr-1 rounded-md text-white font-semibold transition-all duration-100 ease-in mb-2 lg:mb-0"
                  type="submit"
                >
                  Submit
                </button>
              </form>
              <button
                className="bg-indigo-600 hover:bg-indigo-800 hover:scale-105 px-10 py-1 rounded-md text-white font-semibold transition-all duration-100 ease-in"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Delivery;
