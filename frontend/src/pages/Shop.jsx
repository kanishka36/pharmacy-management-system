import React, { useState, useEffect } from "react";
import { displayItem } from "../api/stock";
import { Link } from "react-router-dom";

const listItem = [
  "item1",
  "item1",
  "item1",
  "item1",
  "item1",
  "item1",
  "item1",
  "item1",
  "item1",
  "item1",
  "item1",
  "item1",
  "item1",
];

const Shop = () => {
  const [items, setItems] = useState([]);
  //display item
  const fetchItem = async () => {
    try {
      const response = await displayItem();
      setItems(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);

  return (
    <>
      <div className="container mx-auto font-poppins">
        <h1 className="text-6xl font-medium text-indigo-600 my-3">Shop</h1>
        <div className="flex mb-6">
          <div className="hidden sm:block basis-1/5 border-r-2 border-solid border-indigo-600 mx-3">
            <h2 className="text-xl font-medium mb-3">Category</h2>
            <p>
              <Link to="/">Ayurveda</Link>
            </p>
            <p>
              <Link to="/">Personal Care</Link>
            </p>
            <p>
              <Link to="/">Diabetic Care</Link>
            </p>
            <p>
              <Link to="/">Surgical Item</Link>
            </p>
            <p>
              <Link to="/">Kids</Link>
            </p>
            <p>
              <Link to="/">Vitamins & Nutritions</Link>
            </p>
            <p>
              <Link to="/">Adult Care</Link>
            </p>
            <p>
              <Link to="/">Mother & Baby Care</Link>
            </p>
          </div>
          <div className="item basis-full sm:basis-4/5 mx-1 sm:m-0">
            <div className="grid grid-cols-2 lg:grid-cols-3">
              {items.map((item, index) => (
                <div
                  className="flex items-center flex-col m-1 sm:m-2 p-3 border border-solid border-indigo-600 rounded-lg"
                  key={index}
                >
                  <img src="" />
                  <p>{item.barcode}</p>
                  <p>{item.productName}</p>
                  <p>{item.sellingPrice}</p>
                  <button className="text-sm sm:text-base bg-indigo-600 hover:bg-indigo-800 hover:scale-105 px-5 py-2 sm:px-10 sm:py-2 rounded-full text-white font-semibold transition-all duration-100 ease-in">
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
