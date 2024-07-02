import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser, isAuthenticated } = useSelector((state) => state.user);
  return (
    <div className="bg-cyan-400 py-2 px-3 text-white font-semibold font-poppins text-right">
      {currentUser && isAuthenticated ? (
        <div className="flex flex-col items-center sm:flex-row sm:justify-end gap-2">
          <p className="text-indigo-600 text-center">{`Welcome ${currentUser.rest.email}`}</p>
          <Link
            to="/profile"
            className="border border-indigo-600 px-2 rounded-lg text-center"
          >
            My Account
          </Link>
        </div>
      ) : (
        <Link to="/my-account">Login/Register</Link>
      )}
    </div>
  );
};

export default Header;
