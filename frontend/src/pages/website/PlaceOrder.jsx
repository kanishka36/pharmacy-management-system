import React, { useEffect, useState } from "react";
import { deleteCart, displayCart, updateCart } from "../../api/cart";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateTotal } from "../../redux/user/cartSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const [cartData, setCartData] = useState([]);

  //total price
  const total = cartData.reduce((acc, item) => {
    return acc + item.sellingPrice * item.quantity;
  }, 0);

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
                      <span className="">{item.quantity}</span>
                    </td>

                    <td className=" py-1">
                      {item.sellingPrice * item.quantity}.00
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                <Link to="/payment-method"> Place Order</Link> 
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
