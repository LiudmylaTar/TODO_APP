import { configureStore } from "@reduxjs/toolkit";
import { ToDoReducer } from "./TODO/toDoSlice";
import filtersReducer from "./TODO/filtersSlice";

export const store = configureStore({
  reducer: {
    ToDo: ToDoReducer,
    filters: filtersReducer,
  },
});
