import axios from "axios";

const apiUrl = import.meta.env.VITE_ROUTE_URL;

export const addPrescription = async (values) => {
  try {
    const response = await axios.post(`${apiUrl}upload-prescription`, values, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error || "Something went wrong";
  }
};
