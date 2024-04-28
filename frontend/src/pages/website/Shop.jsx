import React, { useState, useEffect } from "react";
import { displayCategory, displayItem } from "../../api/stock";
import { Link } from "react-router-dom";
import { addCart } from "../../api/cart";

const Shop = () => {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState([]);

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
      const subtotal = selected.sellingPrice;
      const productName = selected.productName;
      const sellingPrice = selected.sellingPrice;
      // const quantity = selected.quantity;
      const values = { subtotal, productName, sellingPrice};
      const response = await addCart(values);
      console.log(response)
    } catch (error) {
      console.log(error);
    }
  };

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
          <div className="item basis-full sm:basis-4/5 mx-1 sm:m-0">
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
                  <p>
                    {item.sellingPrice}.00{" "}
                    <span className="font-bold">LKR</span>
                  </p>
                  <button
                    onClick={() => handleAddtoCart(item._id)}
                    className="text-sm sm:text-base bg-indigo-600 hover:bg-indigo-800 hover:scale-105 px-5 py-2 sm:px-10 sm:py-2 rounded-full text-white font-semibold transition-all duration-100 ease-in"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
