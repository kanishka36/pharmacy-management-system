import React, { useState, useTransition } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Logo from "../assets/images/logo.jpg";

const Navbar = () => {
  const Links = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About Us", path: "/" },
    { name: "Login", path: "/my-account" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  const [isClick, setIsClick] = useState(false);

  return (
    <>
      <div className="bg-cyan-400 py-2 px-3 text-white font-semibold font-poppins text-right">
        <Link>Login/Register</Link>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between p-3 font-poppins">
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
                isClick ? "opacity-0 transition-opacity duration-300 ease-linear" : "transition-opacity duration-300 ease-linear"
              }`}
            ></div>
            <div
              className={`bg-indigo-600 h-1 w-6 ${
                isClick
                  ? "transform transition-transform duration-300 ease-linear rotate-45 -translate-y-[8px]"
                  : "transform transition-transform duration-300 ease-linear"
              }`}
            ></div>
          </div>
        </div>

        <div className="sm:basis-3/6 w-full sm:mt-0 mt-3">
          <div className="flex items-center search-bar border border-indigo-500 rounded-full p-2">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-indigo-500 mx-3 text-xl"
            />
            <input
              type="text"
              placeholder="Search Product"
              className="outline-none w-full"
            />
          </div>
          <div className="search-result"></div>
        </div>

        <Link
          to="/prescription"
          className="bg-indigo-600 p-3 text-white rounded-md text-center m-3 sm:basis-1/6 w-full"
        >
          Upload Prescription
        </Link>
      </div>

      <div className="container mx-auto flex items-center m-3 justify-between font-poppins">
        <div className="hidden sm:block">
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
        </div>
      </div>
    </>
  );
};

export default Navbar;
