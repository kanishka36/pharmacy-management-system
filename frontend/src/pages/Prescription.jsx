import React from "react";
import guidImg from "../assets/images/slider1.jpg";

const Prescription = () => {
  return (
    <>
      <div className="container mx-auto flex flex-col items-center font-poppins">
        <div className="w-full">
          <h1 className="text-6xl font-medium text-indigo-600 my-6 text-left">
            Upload your Prescription Now
          </h1>
        </div>
        <img src={guidImg} alt="guid" />
        <p className="my-3 text-xl font-medium">
          Please Login or Register before you Send the Prescription under{" "}
          <a href="">My Account</a>. Refresh again
        </p>
        <div className="flex w-full md:w-1/2 my-6">
          <form className="w-full">
            <div className="flex flex-col">
              <label>Your Name:</label>
              <input
                type="text"
                className="w-full border-solid border-2 border-indigo-600 rounded-full px-3 py-1 mt-1 mb-3"
              />
            </div>
            <div className="flex flex-col">
              <label>Email</label>
              <input
                type="email"
                className="w-full border-solid border-2 border-indigo-600 rounded-full px-3 py-1 mt-1 mb-3"
              />
            </div>
            <div className="flex flex-col">
              <label>Age:</label>
              <input
                type="text"
                className="w-full border-solid border-2 border-indigo-600 rounded-full px-3 py-1 mt-1 mb-3"
              />
            </div>
            <div className="flex flex-col">
              <label>Contact No:</label>
              <input
                type="text"
                className="w-full border-solid border-2 border-indigo-600 rounded-full px-3 py-1 mt-1 mb-3"
              />
            </div>
            <div className="flex flex-col">
              <label>Delivery Address:</label>
              <input
                type="text"
                className="w-full border-solid border-2 border-indigo-600 rounded-full px-3 py-1 mt-1 mb-3"
              />
            </div>
            <div className="flex">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-800 hover:scale-105 px-10 py-2 rounded-full text-white font-semibold transition-all duration-100 ease-in"
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Prescription;
