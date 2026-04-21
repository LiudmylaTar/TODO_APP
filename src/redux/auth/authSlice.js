import { createSlice } from "@reduxjs/toolkit";
import {
  fetchLogin,
  fetchLogout,
  fetchRegister,
  refreshUser,
} from "./authOperation";
import { handleError, handlePending } from "../utils/reduxUtils";

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isRefreshing: false,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { user, token } = action.payload;
      state.user = user ?? initialState.user;
      state.token = token ?? null;
      state.isLoggedIn = Boolean(token);
    },
    clearAuth(state) {
      state.user = initialState.user;
      state.token = null;
      state.isRefreshing = false;
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.pending, handlePending)
      .addCase(fetchRegister.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchRegister.rejected, handleError)
      .addCase(fetchLogin.pending, handlePending)
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.user = action.payload.user ?? initialState.user;
        state.token = action.payload.access_token ?? null;
        state.isLoggedIn = Boolean(action.payload.access_token);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchLogin.rejected, handleError)
      .addCase(fetchLogout.pending, handlePending)
      .addCase(fetchLogout.fulfilled, (state) => {
        state.error = null;
        state.user = initialState.user;
        state.token = null;
        state.isLoggedIn = false;
        state.isLoading = false;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload ?? initialState.user;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.user = initialState.user;
        state.token = null;
        state.isRefreshing = false;
        state.isLoggedIn = false;
        state.error = null;
      });
  },
});

export const { setCredentials, clearAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
