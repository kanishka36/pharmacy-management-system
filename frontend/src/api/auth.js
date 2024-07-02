import axios from "axios";
import { useEffect } from "react";

const apiUrl = import.meta.env.VITE_ROUTE_URL;

export const userRegister = async (values) => {
  try {
    const response = await axios.post(`${apiUrl}register/user`, values, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error || "Something went wrong";
  }
};

//both customer and staff login
export const userLogin = async (values) => {
  try {
    const response = await axios.post(`${apiUrl}login`, values, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error || "Something went wrong";
  }
};

export const customerRegister = async (values) => {
  try {
    const response = await axios.post(`${apiUrl}register/customer`, values, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error || "Something went wrong";
  }
};

export const logout = async () => {
  try {
    const response = await fetch(`${apiUrl}logout`, {
      method: "POST",
      credentials: "include",
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error || "Something went wrong";
  }
};
