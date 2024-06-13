import axios from "axios";
const apiUrl = import.meta.env.VITE_ROUTE_URL;

export const addNotification = async (values) => {
  try {
    const response = await axios.post(`${apiUrl}add-notification`, values, {
      withCredentials: true,
    });
    console.log("second"+values)
    return response.data;
  } catch (error) {
    console.log(error)
    throw error.response.data.error || "Something went wrong";
  }
};

export const displayNotification = async () => {
  try {
    const response = await axios.get(`${apiUrl}display-notification`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error || "Something went wrong";
  }
};

export const deleteNotification = async (notificationId) => {
  try {
    const response = await axios.delete(`${apiUrl}delete-notification/${notificationId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error || "Something went wrong";
  }
};

export const updateNotification = async (items, notificationId) => {
  try {
    const response = await axios.put(`${apiUrl}update-notification/${notificationId}`, items, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error.response.data.error || "Something went wrong";
  }
};
