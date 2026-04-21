import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    status: "all",
    search: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  },
  reducers: {
    setStatusFilter(state, action) {
      state.status = action.payload;
    },
    setSearchFilter(state, action) {
      state.search = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    setSortOrder(state, action) {
      state.sortOrder = action.payload;
    },
    setSorting(state, action) {
      const { sortBy, sortOrder } = action.payload;
      if (sortBy) state.sortBy = sortBy;
      if (sortOrder) state.sortOrder = sortOrder;
    },
  },
});

export const {
  setStatusFilter,
  setSearchFilter,
  setSortBy,
  setSortOrder,
  setSorting,
} = filtersSlice.actions;

export default filtersSlice.reducer;
