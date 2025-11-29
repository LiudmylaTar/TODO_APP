import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

export const fetchToDo = createAsyncThunk(
  "ToDos/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/todos");
      return {
        items: response.data,
        total: response.data.length,
      };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteToDo = createAsyncThunk(
  "ToDos/deleteToDo",
  async (ToDoId, thunkAPI) => {
    try {
      await axios.delete(`/todos/${ToDoId}`);
      return { id: ToDoId };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const addToDo = createAsyncThunk(
  "ToDos/addToDo",
  async (todo, thunkAPI) => {
    try {
      await axios.post("/todos", {
        title: todo.text,
        completed: false,
        userId: 1,
      });
      return {
        id: todo.id,
        title: todo.text,
        completed: false,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response);
    }
  }
);

export const toggleCompleted = createAsyncThunk(
  "ToDos/toggleCompleted",
  async ({ id, completed }, thunkAPI) => {
    try {
      await axios.patch(`/todos/${id}`, { completed });
      return { id, completed };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
