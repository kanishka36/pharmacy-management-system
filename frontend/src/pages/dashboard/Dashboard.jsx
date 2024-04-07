import React from "react";
import { Link } from "react-router-dom";
import Menu from "../../components/Menu";

const Dashboard = () => {
  return (
    <>
      <div className="flex">
        <Menu />
        <div className="workplace h-screen ml-5">Dashboard</div>
      </div>
    </>
  );
};

export default Dashboard;
