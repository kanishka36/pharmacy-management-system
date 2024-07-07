import React, { useState, useEffect } from "react";
import { displayCategory, displayItem } from "../../api/stock";
import { Link } from "react-router-dom";
import { addCart } from "../../api/cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import ChatBotWrapper from "../../components/websiteComponents/ChatBotWrapper";

const Shop = () => {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState([]);
  const [message, setMessage] = useState(null);

  //display item
  const fetchItem = async () => {
    try {
      const response = await displayItem();
      setItems(response);
    } catch (error) {
      console.log(error);
    }
  };

  //fetch category
  const fetchCategory = async () => {
    try {
      const response = await displayCategory();
      setCategory(response);
    } catch (error) {}
  };

  useEffect(() => {
    fetchItem();
    fetchCategory();
  }, []);

  const handleAddtoCart = async (itemId) => {
    try {
      const selected = items.find((item) => item._id === itemId);
      const productId = selected._id;
      const subtotal = selected.sellingPrice;
      const sellingPrice = selected.sellingPrice;
      const values = { productId, subtotal, sellingPrice };
      const response = await addCart(values);
      setMessage(response.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  return (
    <>
      <div className="container mx-auto font-poppins">
        <h1 className="text-6xl font-medium text-indigo-600 my-3">Shop</h1>
        <div className="flex mb-6">
          <div className="hidden sm:block basis-1/5 border-r-2 border-solid border-indigo-600 mx-3">
            <h2 className="text-xl font-medium mb-3">Category</h2>
            {category.map((cat, index) => (
              <p key={index}>
                <Link to="/">{cat.category}</Link>
              </p>
            ))}
          </div>
          <div className="item basis-full sm:basis-4/5 mx-1 sm:m-0 relative">
            <div className="grid grid-cols-2 lg:grid-cols-3">
              {items.map((item, index) => (
                <div
                  className="flex items-center flex-col m-1 sm:m-2 p-3 border border-solid border-indigo-600 rounded-lg"
                  key={index}
                >
                  <div className="flex justify-center w-full h-40">
                    <img className="h-40 object-contain" src={item.image} />
                  </div>
                  <p>{item.productName}</p>
                  <p>The Roundup: Punishment
                    <span className="font-bold">LKR</span>
                  </p>
                  <button
                    onClick={() => handleAddtoCart(item._id)}
                    className={`text-sm sm:text-base ${
                      message !== null
                        ? "bg-indigo-400"
                        : "hover:scale-105 bg-indigo-600 hover:bg-indigo-800"
                    } px-5 py-2 sm:px-10 sm:py-2 rounded-full text-white font-semibold transition-all duration-100 ease-in`}
                    disabled={message !== null}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
            <div
              className={`top-1/4 left-1/2 p-4 translate-x-[-50%] translate-y-[-50%] bg-white rounded-md border border-green-600 ${
                message ? "fixed" : "hidden"
              }`}
            >
              <div className="flex flex-col justify-center items-center h-full text-green-500 text-center">
                {message}
                <p>Go check your cart</p>
                <FontAwesomeIcon icon={faCircleCheck} className="text-4xl"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChatBotWrapper />
    </>
  );
};

export default Shop;
