import axios from "axios";

const apiUrl = import.meta.env.VITE_ROUTE_URL;

export const addItem = async (values) => {
  try {
    const response = await axios.post(`${apiUrl}add-item`, values, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error || "Something went wrong";
  }
};

export const displayItem = async () => {
  try {
    const response = await axios.get(`${apiUrl}display-item`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error || "Something went wrong";
  }
};

export const deleteItem = async (itemId) => {
  try {
    const response = await axios.delete(`${apiUrl}delete-item/${itemId}`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error.response.data.error || "Something went wrong";
  }
};

export const updateItem = async (values, itemId) => {
  try {
    const response = await axios.put(`${apiUrl}update-item/${itemId}`, values, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error.response.data.error || "Something went wrong";
  }
};
