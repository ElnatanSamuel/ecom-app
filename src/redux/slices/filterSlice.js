import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: "",
  style: "",
  priceRange: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      const { type, value } = action.payload;
      state[type] = value;
    },
    clearFilters: (state) => {
      state.category = "";
      state.style = "";
      state.priceRange = "";
    },
  },
});

export const { setFilter, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;
