import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://nest-for-to-do.onrender.com";

export const setAuthHeader = (value) => {
  if (value) {
    axios.defaults.headers.common.Authorization = value;
    return;
  }
  delete axios.defaults.headers.common.Authorization;
};

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post("/auth/register", userData);
      setAuthHeader(`Bearer ${res.data.access_token}`);
      return response.data;
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const fetchLogin = createAsyncThunk(
  "auth/fetchLogin",
  async (userData, thunkAPI) => {
    try {
      const res = await axios.post("/auth/login", userData);
      setAuthHeader(`Bearer ${res.data.access_token}`);
      return res.data;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const fetchLogout = createAsyncThunk(
  "auth/fetchLogout",
  async (_, thunkAPI) => {
    try {
      await axios.post("/auth/logout");
      setAuthHeader("");
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

// * GET @ /auth/current
export const refreshUser = createAsyncThunk(
  "auth/fetchRefresh",
  async (_, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      setAuthHeader(`Bearer ${reduxState.auth.token}`);
      const res = await axios.get("/auth/current");
      return res.data;
    } catch (error) {
      setAuthHeader("");
      localStorage.removeItem("persist:auth");
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const reduxState = thunkAPI.getState();
      const token = reduxState.auth.token;
      return typeof token === "string" && token.trim().length > 0;
    },
  }
);