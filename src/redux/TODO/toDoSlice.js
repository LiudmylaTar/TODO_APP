import { createSlice } from "@reduxjs/toolkit";
import {
  fetchToDo,
  deleteToDo,
  addToDo,
  toggleCompleted,
  updateToDo,
} from "./operations";
import { fetchLogout } from "../auth/authOperation";
const toDoSlice = createSlice({
  name: "ToDo",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 0,
  },
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchToDo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchToDo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload.data;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(fetchToDo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addToDo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToDo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload.data;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(addToDo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(deleteToDo.fulfilled, (state, action) => {
        if (action.payload.refreshed) {
          state.items = action.payload.refreshed.data;
          state.total = action.payload.refreshed.total;
          state.totalPages = action.payload.refreshed.totalPages;
          state.page = action.payload.refreshed.page;
          state.limit = action.payload.refreshed.limit;
          return;
        }
        state.items = state.items.filter((item) => item._id !== action.payload.id);
      })
      .addCase(toggleCompleted.fulfilled, (state, action) => {
        const todo = state.items.find((item) => item._id === action.payload.id);
        if (todo) {
          todo.status = action.payload.status;
        }
      })
      .addCase(updateToDo.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(fetchLogout.fulfilled, (state) => {
        state.items = [];
        state.error = null;
      });
  },
});

export const { setPage } = toDoSlice.actions;
export const ToDoReducer = toDoSlice.reducer;
