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

export const searchItem = async (input) => {
  try {
    const response = await axios.get(
      `${apiUrl}product-search?search=${input}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data.error || "Something went wrong";
  }
};

export const addCategory = async (values) => {
  try {
    const response = await axios.post(`${apiUrl}add-category`, values, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error || "Something went wrong";
  }
};

export const displayCategory = async () => {
  try {
    const response = await axios.get(`${apiUrl}display-category`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error || "Something went wrong";
  }
};

export const updateCategory = async (values, categoryId) => {
  try {
    const response = await axios.put(
      `${apiUrl}update-category/${categoryId}`,
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

export const deleteCategory = async (itemId) => {
  try {
    const response = await axios.delete(`${apiUrl}delete-category/${itemId}`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error.response.data.error || "Something went wrong";
  }
};

export const searchItemDashboard = async (searchParams) => {
  try {
    const response = await axios.post(`${apiUrl}search-item-dashboard`, searchParams, {
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    throw error.response.data.error || "Something went wrong";
  }
};
