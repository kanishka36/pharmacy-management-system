import axios from "axios";

const apiUrl = import.meta.env.VITE_ROUTE_URL;

export const addCart = async (values) => {
  try {
    const response = await axios.post(`${apiUrl}add-cart`, values, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error || "Something went wrong";
  }
};

export const displayCart = async () => {
  try {
    const response = await axios.get(`${apiUrl}display-cart`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error || "Something went wrong";
  }
};
