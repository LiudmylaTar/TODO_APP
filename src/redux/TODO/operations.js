import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://nest-for-to-do.onrender.com";

export const fetchToDo = createAsyncThunk(
  "ToDos/fetchAll",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const { page, limit } = state.ToDo;
      const { status, search, sortBy, sortOrder } = state.filters;

      const params = {
        page,
        limit,
        sortBy,
        sortOrder,
      };

      if (status !== "all") params.status = status;
      if (search?.trim()) params.search = search.trim();

      const response = await axios.get("/tasks", { params });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteToDo = createAsyncThunk(
  "ToDos/deleteToDo",
  async (ToDoId, thunkAPI) => {
    try {
      await axios.delete(`/tasks/${ToDoId}`);
      const refreshed = await thunkAPI.dispatch(fetchToDo()).unwrap();
      return { id: ToDoId, refreshed };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const addToDo = createAsyncThunk(
  "ToDos/addToDo",
  async (todo, thunkAPI) => {
    try {
      await axios.post("/tasks", {
        title: todo.text,
      });
      const refreshed = await thunkAPI.dispatch(fetchToDo()).unwrap();
      return refreshed;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response);
    }
  }
);

export const toggleCompleted = createAsyncThunk(
  "ToDos/toggleCompleted",
  async ({ id, status }, thunkAPI) => {
    try {
      const nextStatus = status === "done" ? "pending" : "done";
      await axios.patch(`/tasks/${id}`, { status: nextStatus });
      return { id, status: nextStatus };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const updateToDo = createAsyncThunk(
  "ToDos/updateToDo",
  async ({ id, changes }, thunkAPI) => {
    try {
      const response = await axios.patch(`/tasks/${id}`, changes);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
