import React from "react";
import { Link } from "react-router-dom";
import Menu from "../components/Menu";

const menuItem = [
  { name: "Staff Management", path: "/dashboard/staff-management" },
  { name: "Stock Management", path: "/" },
  { name: "Prescription Handling", path: "/" },
  { name: "Delivery", path: "/" },
  { name: "Item & Category Management", path: "/" },
  { name: "News & Notification Management", path: "/" },
  { name: "Order Handling", path: "/" },
];

const Dashboard = () => {
  return (
    <>
      <div className="flex">
        <Menu />
        <div className="workplace h-screen ml-5">
          Dashboard
        </div>
      </div>
    </>
  );
};

export default Dashboard;
