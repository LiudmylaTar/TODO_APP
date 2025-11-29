import { createSlice } from "@reduxjs/toolkit";
import { fetchToDo, deleteToDo, addToDo, toggleCompleted } from "./operations";

const toDoSlice = createSlice({
  name: "ToDo",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    total: 0,
    page: 1,
    limit: 12,
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
        state.items = action.payload.items;
        state.total = action.payload.total;
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
        state.items.unshift(action.payload);
      })
      .addCase(addToDo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(deleteToDo.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      })

      .addCase(toggleCompleted.fulfilled, (state, action) => {
        const todo = state.items.find((item) => item.id === action.payload.id);
        if (todo) {
          todo.completed = action.payload.completed;
        }
      });
  },
});

export const { setPage } = toDoSlice.actions;
export const ToDoReducer = toDoSlice.reducer;
