import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  access_token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
      state.access_token = null;
    },
    login(state, action) {
      state.isLoggedIn = true;
      state.access_token = action.payload.idToken;
    },
  },
});

export const authActions = authSlice.actions;

export const authReducer = authSlice.reducer;
