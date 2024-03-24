import React from "react";

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
  return (
    <>
      <div className="container mx-auto font-poppins">
        <h1 className="text-6xl font-medium text-indigo-600 my-3">Shop</h1>
        <div className="flex mb-6">
          <div className=" basis-1/5 border-r-2 border-solid border-indigo-600 mr-3">
            <h2 className="text-xl font-medium mb-3">Category</h2>
            <p>
              <a href="/">Ayurveda</a>
            </p>
            <p>
              <a href="/">Personal Care</a>
            </p>
            <p>
              <a href="/">Diabetic Care</a>
            </p>
            <p>
              <a href="/">Surgical Item</a>
            </p>
            <p>
              <a href="/">Kids</a>
            </p>
            <p>
              <a href="/">Vitamins & Nutritions</a>
            </p>
            <p>
              <a href="/">Adult Care</a>
            </p>
            <p>
              <a href="/">Mother & Baby Care</a>
            </p>
          </div>
          <div className="item basis-4/5">
            <div className="grid grid-cols-3">
              {listItem.map((item, index) => (
                <div className="m-3 p-3 border border-solid border-indigo-600 rounded-lg" key={index}>
                  {item}
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
