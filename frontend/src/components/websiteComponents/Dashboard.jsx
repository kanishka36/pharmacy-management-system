import React from "react";
import { logout } from "../../api/auth";
import { loginoutSuccess } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutCustomer = async () => {
    try {
      await logout();
      dispatch(loginoutSuccess());
      navigate("/");
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
