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
  },
});

export const { setStatusFilter, setSearchFilter, setSortBy, setSortOrder } =
  filtersSlice.actions;

export default filtersSlice.reducer;
