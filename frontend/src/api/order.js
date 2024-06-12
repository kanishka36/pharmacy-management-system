import axios from "axios";

const apiUrl = import.meta.env.VITE_ROUTE_URL;

export const addOrder = async (values) => {
  console.log(values);
  try {
    const response = await axios.post(`${apiUrl}add-order`, values, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error || "Something went wrong";
  }
};

export const displayOrder = async () => {
  try {
    const response = await axios.get(`${apiUrl}display-order`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error || "Something went wrong";
  }
};
