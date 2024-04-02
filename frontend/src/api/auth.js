import axios from "axios";

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
