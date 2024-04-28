import React, { useEffect, useState } from "react";
import { deleteCart, displayCart, updateCart } from "../../api/cart";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateTotal } from "../../redux/user/cartSlice";
import { useDispatch } from "react-redux";

const Cart = () => {
  const dispatch = useDispatch();
  const [cartData, setCartData] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  //total price
  const total = cartData.reduce((acc, item) => {
    return acc + item.sellingPrice * item.quantity;
  }, 0);

  //delete cart
  const handleDelete = async (itemId) => {
    try {
      await deleteCart(itemId);
      setCartData((prev) => prev.filter((item) => item._id !== itemId));
    } catch (error) {
      console.log(error);
    }
  };

  //update cart
  const handleUpdate = async () => {
    try {
      const updateItems = cartData.map((item) => {
        return {
          itemId: item._id,
          quantity: item.quantity,
        };
      });

      const res = await updateCart(updateItems);
      console.log(res);
      fetchCart();
      setIsUpdated(false);
    } catch (error) {
      console.log(error);
    }
  };

  //display cart
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

  useEffect(() => {
    dispatch(updateTotal(total));
  }, [total, dispatch]);

  const incrementCount = (itemId) => {
    setCartData((prev) =>
      prev.map((item) =>
        item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
    setIsUpdated(true);
  };

  const decrementCount = (itemId) => {
    setCartData((prev) =>
      prev.map((item) =>
        item._id === itemId && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
    setIsUpdated(true);
  };

  return (
    <>
      <div className="container flex sm:flex-row flex-col mx-auto gap-4">
        <div className="left sm:basis-2/3">
          <div className="my-3 overflow-x-auto">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="border border-indigo-600 text-indigo-600 py-2">
                    Product
                  </th>
                  <th className="border border-indigo-600 text-indigo-600 py-2">
                    Price
                  </th>
                  <th className="border border-indigo-600 text-indigo-600 py-2">
                    Quantity
                  </th>
                  <th className="border border-indigo-600 text-indigo-600 py-2">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartData.map((item, index) => (
                  <tr
                    key={index}
                    className="text-center border border-indigo-600"
                  >
                    <td className=" py-1">{item.productName}</td>
                    <td className=" py-1">{item.sellingPrice}.00</td>
                    <td className="flex justify-center items-center py-1">
                      <button
                        className="text-2xl font-bold text-white bg-indigo-600 flex justify-center items-center rounded-full pb-2 px-1 h-6 mx-1"
                        onClick={() => incrementCount(item._id)}
                        style={{ width: "2rem" }}
                      >
                        +
                      </button>
                      <span className="">{item.quantity}</span>
                      <button
                        className="text-2xl font-bold text-white bg-indigo-600 flex justify-center items-center rounded-full pb-2 px-1 h-6 mx-1"
                        onClick={() => decrementCount(item._id)}
                        style={{ width: "2rem" }}
                      >
                        -
                      </button>
                    </td>

                    <td className=" py-1">
                      {item.sellingPrice * item.quantity}.00
                    </td>
                    <td className=" py-1">
                      <button
                        type="button"
                        onClick={() => handleDelete(item._id)}
                        className="text-red-600"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mb-3">
            <button
              onClick={handleUpdate}
              disabled={!isUpdated}
              className={`text-sm sm:text-base  ${
                isUpdated
                  ? "hover:scale-105 hover:bg-indigo-800 bg-indigo-600 "
                  : " bg-indigo-400"
              } px-5 py-2 sm:px-10 sm:py-2 rounded-full text-white font-semibold transition-all duration-100 ease-in`}
            >
              Update Cart
            </button>
          </div>
        </div>
        <div className="right sm:basis-1/3">
          <div className="bg-indigo-50 rounded-md p-3">
            <p className="font-bold text-indigo-600 text-xl mb-2">
              Order Summery
            </p>
            <div className="border border-indigo-600 p-2">
              <div className="flex">
                <p className="basis-1/3 font-semibold">Subtotal</p>
                <p className="basis-2/3">
                  {total}.00 <span className="font-semibold">LKR</span>
                </p>
              </div>
              <div className="flex">
                <p className="basis-1/3 font-semibold">Shipping</p>
                <div className="">
                  <p className="basis-2/3">
                    Shipping cost 450.00{" "}
                    <span className="font-semibold">LKR</span>
                  </p>
                </div>
              </div>
              <div className="flex">
                <p className="basis-1/3 font-semibold">Total</p>
                <p className="basis-2/3">
                  {total + 450}.00 <span className="font-semibold">LKR</span>
                </p>
              </div>
              <button className="text-sm sm:text-base bg-indigo-600 hover:bg-indigo-800 hover:scale-[1.02] px-5 py-2 sm:px-10 sm:py-2 rounded-full text-white font-semibold transition-all duration-100 ease-in w-full mt-3">
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
