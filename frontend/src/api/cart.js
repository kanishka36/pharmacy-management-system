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

export const deleteCart = async (cartId) => {
  try {
    const response = await axios.delete(`${apiUrl}delete-cart/${cartId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error || "Something went wrong";
  }
};

export const updateCart = async (items) => {
  try {
    const response = await axios.put(`${apiUrl}update-cart`, items, {
      withCredentials: true,
    });
    return response;
    console.log(items)
  } catch (error) {
    throw error.response.data.error || "Something went wrong";
  }
};
