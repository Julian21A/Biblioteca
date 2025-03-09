import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducer/authSlice";
import bookReducer from "../reducer/bookSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    createbooks: bookReducer,
  },
});
