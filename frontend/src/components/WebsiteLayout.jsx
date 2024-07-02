import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import {
  authenticateSuccess,
  authenticateFailure,
} from "../redux/user/userSlice";
import axios from "axios";

const WebsiteLayout = ({ component: Component }) => {
  
  const dispatch = useDispatch();
  const apiUrl = import.meta.env.VITE_ROUTE_URL;

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(`${apiUrl}checkToken`, {
          withCredentials: true,
        });
        console.log(response)
        if (response.status === 200) {
          dispatch(authenticateSuccess());
        } else {
          dispatch(authenticateFailure());
        }
      } catch (error) {
        dispatch(authenticateFailure());
      }
    };

    checkAuthStatus();
  }, [dispatch, apiUrl]);

  return (
    <>
      <Navbar />
      <Component />
      <Footer />
    </>
  );
};

export default WebsiteLayout;
