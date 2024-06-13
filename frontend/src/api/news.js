import axios from "axios";

const apiUrl = import.meta.env.VITE_ROUTE_URL;

export const addNews = async (values) => {
  try {
    const response = await axios.post(`${apiUrl}add-news`, values, {
      withCredentials: true,
    });
    console.log("second"+values)
    return response.data;
  } catch (error) {
    console.log(error)
    throw error.response.data.error || "Something went wrong";
  }
};

export const displayNews = async () => {
  try {
    const response = await axios.get(`${apiUrl}display-news`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error || "Something went wrong";
  }
};

export const deleteNews = async (newsId) => {
  try {
    const response = await axios.delete(`${apiUrl}delete-news/${newsId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error || "Something went wrong";
  }
};

export const updateNews = async (items, newsId) => {
  try {
    const response = await axios.put(`${apiUrl}update-news/${newsId}`, items, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error.response.data.error || "Something went wrong";
  }
};
