// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./filtersSlice";

const store = configureStore({
  reducer: {
    filters: filtersReducer,
  },
});

// Export types for TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
