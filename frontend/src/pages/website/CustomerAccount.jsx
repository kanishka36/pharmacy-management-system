import React, { useState } from "react";
import Orders from "../../components/websiteComponents/Orders";
import AccountDetails from "../../components/websiteComponents/AccountDetails";
import Dashboard from "../../components/websiteComponents/Dashboard";

const CustomerAccount = () => {
  const [displayedComponent, setDisplayedComponent] = useState(null);

  const handleItemClick = (componentName) => {
    setDisplayedComponent(componentName);
  };

  return (
    <>
      <div className="container mx-auto flex flex-col sm:flex-row font-poppins">
        <div className="left sm:basis-1/3">
          <div className="m-3 p-2 bg-indigo-50">
            <ul>
              <li
                className="p-1 my-2 border border-indigo-600 rounded-md cursor-pointer"
                onClick={() => handleItemClick("Dashboard")}
              >
                Dashboard
              </li>
              <li
                className="p-1 my-2 border border-indigo-600 rounded-md cursor-pointer"
                onClick={() => handleItemClick("MyPrescriptions")}
              >
                My Prescriptions
              </li>
              <li
                className="p-1 my-2 border border-indigo-600 rounded-md cursor-pointer"
                onClick={() => handleItemClick("Orders")}
              >
                Orders
              </li>
              <li
                className="p-1 my-2 border border-indigo-600 rounded-md cursor-pointer"
                onClick={() => handleItemClick("Addresses")}
              >
                Addresses
              </li>
              <li
                className="p-1 my-2 border border-indigo-600 rounded-md cursor-pointer"
                onClick={() => handleItemClick("AccountDetails")}
              >
                Account Details
              </li>
            </ul>
          </div>
        </div>
        <div className="right sm:basis-2/3 sm:ml-5">
          <div className="">
            {displayedComponent === "Dashboard" && <Dashboard />}
            {displayedComponent === "Orders" && <Orders />}
            {displayedComponent === "AccountDetails" && <AccountDetails />}
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerAccount;
