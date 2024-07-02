import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
      state.isAuthenticated = true;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isAuthenticated = false;
    },
    loginoutSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
      state.isAuthenticated = false;
    },
    authenticateSuccess: (state) => {
      state.isAuthenticated = true;
    }
    ,
    authenticateFailure: (state) => {
      state.isAuthenticated = false;
    }
  },
});

export const { loginStart, loginSuccess, loginFailure, loginoutSuccess, authenticateSuccess, authenticateFailure } =
  userSlice.actions;

export default userSlice.reducer;
