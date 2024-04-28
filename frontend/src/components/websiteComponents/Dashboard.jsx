import React from "react";
import { logout } from "../../api/auth";
import { loginoutSuccess } from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  const logoutCustomer = async () => {
    try {
      const response = await logout();
      dispatch(loginoutSuccess());
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="">
        <button onClick={logoutCustomer}>Logout</button>
      </div>
    </>
  );
};

export default Dashboard;
