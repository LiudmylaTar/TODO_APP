import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://nest-for-to-do.onrender.com";

export const setAuthHeader = (value) => {
  axios.defaults.headers.common.Authorization = value;
};

export const fetchRegister = createAsyncThunk(
    "auth/fetchRegister",
    async (userData, thunkAPI) => {
        try{
            const response = await axios.post("/auth/register", userData);
             setAuthHeader(`Bearer ${response.data.token}`);
             return response.data;
        } catch (error) {
             console.error(
        "Registration error:",
        error.response?.data || error.message
      );
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
)

export const fetchLogin = createAsyncThunk(
  "auth/fetchLogin",
  async (userData, thunkAPI) => {
    try {
      const res = await axios.post("/auth/login", userData);
      setAuthHeader(`Bearer ${res.data.token}`);
      return res.data;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const fetchLogout = createAsyncThunk( "auth/fetchLogout", async () => {
  await axios.post("/auth/logout");
  setAuthHeader("");
});

// * GET @ /users/current
export const refreshUser = createAsyncThunk(
  "auth/fetchRefresh",
  async (_, thunkAPI) => {
    const reduxState = thunkAPI.getState();
    setAuthHeader(`Bearer ${reduxState.auth.token}`);
    const res = await axios.get("/users/current");
    return res.data;
  },
  {
    condition: (_, thunkAPI) => {
      const reduxState = thunkAPI.getState();
      return reduxState.auth.token !== null;
    },
  }
);