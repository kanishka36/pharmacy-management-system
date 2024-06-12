import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderId: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    getOrderId: (state, action) => {
      state.orderId = action.payload;
    },
  },
});

export const { getOrderId } = orderSlice.actions;

export default orderSlice.reducer;
