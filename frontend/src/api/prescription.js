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

export const displayPrescription = async () => {
  try {
    const response = await axios.get(`${apiUrl}display-prescription`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error || "Something went wrong";
  }
};

export const displaySinglePrescription = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}display-prescription/${id}`, {
      withCredentials: true,
    })
    return response.data;
  } catch (error) {
    throw error.response.data.error || "Something went wrong";
  }
}
