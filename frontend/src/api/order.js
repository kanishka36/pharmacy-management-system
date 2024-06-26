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

export const displayAllOrder = async () => {
  try {
    const response = await axios.get(`${apiUrl}display-all-order`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error || "Something went wrong";
  }
};

export const updatePaymentMethod = async (paymentMethod, orderId) => {
  try {
    const response = await axios.put(
      `${apiUrl}update-payment-method/${orderId}`,
      paymentMethod,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    throw error.response.data.error || "Something went wrong";
  }
};

export const updateDeliverStatus = async (deliverStatus, orderId) => {
  try {
    console.log({deliverStatus})
    const response = await axios.put(
      `${apiUrl}update-deliver-status/${orderId}`,
      {deliverStatus},
      {
        withCredentials: true,
      }
    );
    console.log("done");
    return response;
  } catch (error) {
    throw error.response.data.error || "Something went wrong";
  }
};
