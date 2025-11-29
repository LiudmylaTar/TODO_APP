export const selectFilteredTodos = (state) => {
  const todos = state.ToDo.items;
  const filter = state.filters.status;

  if (filter === "active") {
    return todos.filter((t) => !t.completed);
  }

  if (filter === "completed") {
    return todos.filter((t) => t.completed);
  }

  return todos;
};

export const selectPaginatedTodos = (state) => {
  const filtered = selectFilteredTodos(state);
  const page = state.ToDo.page;
  const limit = state.ToDo.limit;

  const start = (page - 1) * limit;
  const end = start + limit;

  return filtered.slice(start, end);
};
