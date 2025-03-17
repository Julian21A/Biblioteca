import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducer/authSlice";
import bookReducer from "../reducer/bookSlice";
import authorReducer from "../reducer/authorSlice";
import userReducer from "../reducer/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: bookReducer,
    authors: authorReducer,
    user: userReducer,
  },
});
