import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const menuItem = [
  { name: "Staff Management", path: "/dashboard/staff" },
  { name: "Stock Management", path: "/dashboard/stock" },
  { name: "Prescription Handling", path: "/dashboard/prescription" },
  { name: "Delivery", path: "/dashboard/delivery" },
  { name: "News & Notification Management", path: "/dashboard/notification" },
  { name: "Order Handling", path: "/dashboard/orders" },
  { name: "Website", path: "/" },
];

const Menu = () => {
  const [isDisplay, setIsDisplay] = useState(true);
  const toggleMenu = () => {
    setIsDisplay(!isDisplay);
  };
  return (
    <div
      className={`flex absolute ${
        isDisplay ? "translate-x-[-18rem]" : "translate-x-0"
      } transition-all`}
    >
      <div
        className={`flex flex-col justify-center px-5 mt- 6 bg-indigo-500 text-white w-72 left-0 h-screen`}
      >
        {menuItem.map((item, index) => (
          <Link
            to={item.path}
            className="bg-indigo-600 p-3 flex justify-center items-center rounded-lg text-center my-1"
            key={index}
            onClick={toggleMenu}
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div
        className="flex justify-center items-center text-3xl text-indigo-600 mx-2 animate-[bounceX_1.5s_ease-in-out_infinite] z-50"
        onClick={toggleMenu}
      >
        {isDisplay ? (
          <FontAwesomeIcon icon={faChevronRight} />
        ) : (
          <FontAwesomeIcon icon={faChevronLeft} />
        )}
      </div>
    </div>
  );
};

export default Menu;
