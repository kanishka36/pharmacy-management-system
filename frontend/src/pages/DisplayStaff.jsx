import React from "react";
import Menu from "../components/Menu";
import { Link } from "react-router-dom";

const DisplayStaff = () => {
  return (
    <>
      <div className="flex">
        <Menu />
        <div className="container mx-auto w-full">
          <h1 className="text-3xl sm:text-6xl font-medium text-indigo-600 my-3 ml-3">
            Staff Details
          </h1>
          <Link to="/dashboard/add-staff">add staff</Link>
        </div>
      </div>
    </>
  );
};

export default DisplayStaff;
