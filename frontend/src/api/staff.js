import axios from "axios";
const apiUrl = import.meta.env.VITE_ROUTE_URL;

export const displayStaff = async () => {
  try {
    const response = await axios.get(`${apiUrl}display-staff`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error || "Something went wrong";
  }
};

export const updateStaff = async (values, memberId) => {
  try {
    const response = await axios.put(
      `${apiUrl}update-staff/${memberId}`,
      values,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    throw error.response.data.error || "Something went wrong";
  }
};


export const deleteStaff = async (memberId) => {
  try {
    const response = await axios.delete(`${apiUrl}delete-staff/${memberId}`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error.response.data.error || "Something went wrong";
  }
};
