import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { user, token } = action.payload;
      state.user = user ?? null;
      state.token = token ?? null;
    },
    clearAuth(state) {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, clearAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
