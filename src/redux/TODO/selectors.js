import { createSelector } from "@reduxjs/toolkit";

const selectTodos = (state) => state.ToDo.items;
const selectStatusFilter = (state) => state.filters.status;
export const selectPage = (state) => state.ToDo.page;
export const selectLimit = (state) => state.ToDo.limit;

export const selectFilteredTodos = createSelector(
  [selectTodos, selectStatusFilter],
  (todos, filter) => {
    if (filter === "active") return todos.filter((t) => !t.completed);
    if (filter === "completed") return todos.filter((t) => t.completed);
    return todos;
  }
);

export const selectPaginatedTodos = createSelector(
  [selectFilteredTodos, selectPage, selectLimit],
  (filtered, page, limit) => {
    const start = (page - 1) * limit;
    const end = start + limit;
    return filtered.slice(start, end);
  }
);
