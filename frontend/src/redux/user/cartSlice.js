import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    total: 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        updateTotal: (state, action)=> {
            state.total = action.payload
        }
    }
})

export const {updateTotal} = cartSlice.actions;

export default cartSlice.reducer;