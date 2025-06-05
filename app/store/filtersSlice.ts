// store/filtersSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredLength: 0,
  subject: "Physics",
  filters: {
    class: [],
    units: [],
    status: "",
    weakOnly: false,
  },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSubject(state, action) {
      state.subject = action.payload;
    },
    toggleWeak(state) {
      state.filters.weakOnly = !state.filters.weakOnly;
    },
    setFilteredLength(state, action) {
      state.filteredLength = action.payload;
    },
    setStatus(state, action) {
      state.filters.status =
      state.filters.status === action.payload ? "" : action.payload;
    },
    setClasses(state, action) {
      state.filters.class = action.payload; // Array<string>
    },
    setUnits(state, action) {
      state.filters.units = action.payload; // Array<string>
    },
  },
});

export const { setSubject, toggleWeak, setFilteredLength, setStatus, setClasses, setUnits } = filtersSlice.actions;
export default filtersSlice.reducer;
