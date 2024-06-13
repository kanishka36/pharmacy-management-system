import axios from "axios";
const apiUrl = import.meta.env.VITE_ROUTE_URL;

export const addFeedback = async (values) => {
  try {
    const response = await axios.post(`${apiUrl}add-feedback`, values, {
      withCredentials: true,
    });
    console.log("second" + values);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response.data.error || "Something went wrong";
  }
};

export const displayFeedback = async () => {
  try {
    const response = await axios.get(`${apiUrl}display-feedback`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error || "Something went wrong";
  }
};
