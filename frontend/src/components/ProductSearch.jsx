import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { searchItem } from "../api/stock";

const ProductSearch = () => {
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
    </>
  );
};

export default ProductSearch;
