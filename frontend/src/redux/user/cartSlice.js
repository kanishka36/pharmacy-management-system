import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    total: 0,
    items: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        updateTotal: (state, action)=> {
            state.total = action.payload
        },
        proceedItem: (state, action) => {
            state.items = action.payload
        }
    }
})

export const {updateTotal, proceedItem} = cartSlice.actions;

export default cartSlice.reducer;