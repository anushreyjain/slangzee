import { configureStore } from "@reduxjs/toolkit";
import slangReducer from "./slices/slangSlice";

export const store = configureStore({
  reducer: slangReducer,
});
