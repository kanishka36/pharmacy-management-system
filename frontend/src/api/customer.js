import axios from "axios";
const apiUrl = import.meta.env.VITE_ROUTE_URL;

export const displayCustomer = async () => {
  try {
    const response = await axios.get(`${apiUrl}display/custome`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error || "Something went wrong";
  }
};
