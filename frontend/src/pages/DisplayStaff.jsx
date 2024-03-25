import React from "react";
import Menu from "../components/Menu";
import { Link } from "react-router-dom";

const DisplayStaff = () => {
  return (
    <>
      <div className="flex">
        <Menu />
        <div className="container mx-auto w-full">
          <p>view staff</p>
          <Link to="/dashboard/add-staff">add staff</Link>
        </div>
      </div>
    </>
  );
};

export default DisplayStaff;
