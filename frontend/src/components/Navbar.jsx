import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Logo from "../assets/images/logo.jpg";
import { useSelector } from "react-redux";
import Header from "./Header";
import { searchItem } from "../api/stock";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const Links = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About Us", path: "/" },
    currentUser && currentUser.rest.role === "customer"
      ? ""
      : { name: "Dashboard", path: "/dashboard" },
  ];

  const [isClick, setIsClick] = useState(false);
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hoveredResult, setHoveredResult] = useState(null);

  const fetchProduct = async () => {
    try {
      const response = await searchItem(input);
      setSearchResults(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (input.trim() !== "") {
      fetchProduct();
    } else {
      setSearchResults([]); // Reset search results if input is empty
    }
  }, [input]);

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
        {/* search */}
        <div className="sm:basis-3/6 w-full sm:mt-0 mt-3 relative">
          <div className="flex items-center search-bar border border-indigo-500 rounded-full p-2 relative">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-indigo-500 mx-3 text-xl"
            />
            <input
              type="text"
              placeholder="Search Product"
              className="outline-none w-full"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          {/* search result */}
          {searchResults.length > 0 && (
            <div className="search-result bg-indigo-50 p-2 top-18 z-40 absolute w-full left-0">
              <div className="relative">
                {searchResults.map((result) => (
                  <div className="flex" key={result._id}>
                    <div
                      className="flex items-center justify-between sm:w-1/2 w-full hover:bg-slate-300 p-1"
                      onMouseEnter={() => setHoveredResult(result._id)}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          className="w-10 h-10 object-contain p-1 border"
                          src={result.image}
                        />
                        <p>{result.productName}</p>
                      </div>
                      <div className="text-right">
                        <p>LKR</p>
                        <p>{result.sellingPrice}.00</p>
                      </div>
                    </div>
                    {hoveredResult === result._id && (
                      <div className="full-result absolute left-[50%] top-0 ml-2 w-1/2 bg-indigo-50 hidden sm:block">
                        <div className="h-42 w-full flex justify-center border-b border-indigo-600 mb-6">
                          <img
                            className="h-40 object-contain bg-indigo-50 p-6"
                            src={result.image}
                            alt="product"
                          />
                        </div>
                        <div className="flex flex-col justify-center text-center my-3">
                          <p className="mb-3">{result.productName}</p>

                          <p>
                            {result.sellingPrice}.00
                            <span className="font-bold"> LKR</span>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <Link
          to="/prescription"
          className="bg-indigo-600 p-3 text-white rounded-md text-center m-3 sm:basis-1/6 w-full"
        >
          Upload Prescription
        </Link>

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
