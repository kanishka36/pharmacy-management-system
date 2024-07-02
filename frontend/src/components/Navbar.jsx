import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Logo from "../assets/images/logo.jpg";
import { useSelector } from "react-redux";
import Header from "./Header";
import ProductSearch from "./ProductSearch";

const Navbar = () => {
  const total = useSelector((state) => state.cart.total);
  const { currentUser, isAuthenticated } = useSelector((state) => state.user);
  const Links = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About Us", path: "/" },
    (currentUser && currentUser.rest.role === "customer") ||
    currentUser === null || !isAuthenticated
      ? ""
      : { name: "Dashboard", path: "/dashboard" },
  ];

  const [isClick, setIsClick] = useState(false);

  return (
    <>
      <Header />
      <div className="flex flex-col sm:flex-row items-center justify-between p-3 font-poppins relative">
        <div className="w-full sm:basis-1/6 flex justify-between items-center">
          <Link to="/" className="logo">
            <img
              src={Logo}
              alt="logo"
              className="min-w-40 max-w-40 mix-blend-multiply"
            />
          </Link>
          <div className="sm:hidden" onClick={() => setIsClick(!isClick)}>
            <div
              className={`bg-indigo-600 h-1 w-6 mb-1 ${
                isClick
                  ? "transform transition-transform duration-300 ease-linear rotate-[-45deg] -translate-y-[-7px]"
                  : "transform transition-transform duration-300 ease-linear"
              }`}
            ></div>
            <div
              className={`bg-indigo-600 h-1 w-6 mb-1 ${
                isClick
                  ? "opacity-0 transition-opacity duration-300 ease-linear"
                  : "transition-opacity duration-300 ease-linear"
              }`}
            ></div>
            <div
              className={`bg-indigo-600 h-1 w-6 ${
                isClick
                  ? "transform transition-transform duration-300 ease-linear rotate-45 -translate-y-[9px]"
                  : "transform transition-transform duration-300 ease-linear"
              }`}
            ></div>
          </div>
        </div>
        <ProductSearch />

        <Link
          to="/prescription"
          className="bg-indigo-600 p-3 text-white rounded-md text-center m-3 sm:basis-1/6 w-full"
        >
          Upload Prescription
        </Link>
        {/* mobile */}
        <div
          className={`sm:hidden h-100 pb-3 absolute bg-cyan-500 w-1/3 left-0 top-0 translate-x-[-100%] ${
            isClick
              ? "translate-x-[0%] transform transition-transform duration-300 ease-linear"
              : "transform transition-transform duration-300 ease-linear"
          }`}
        >
          <ul className="h-full flex flex-col gap-1 ml-3 mt-3 mr-3">
            {Links.map((element, index) => (
              <li key={index} className="w-full">
                <Link to={element.path} className="text-white">
                  {element.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* computer */}
      <div className="container mx-auto flex items-center m-3 justify-between font-poppins">
        <div className="sm:flex sm:justify-between w-full hidden">
          <ul className="flex gap-2 m-3 p-3">
            {Links.map((element, index) => (
              <li key={index} className="ml-8">
                <Link
                  to={element.path}
                  className="text-blue-800 hover:text-cyan-500"
                >
                  {element.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="cart flex items-center justify-center text-indigo-600">
            <Link to="/cart" className="flex items-center">
              <FontAwesomeIcon className="text-3xl" icon={faCartShopping} />
              <div className="ml-2">
                <p>
                  <span className="font-bold">Cart</span> item
                </p>
                <p>LKR {total}.00</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
