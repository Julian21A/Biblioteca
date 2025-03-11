import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    loading: false,
    error: null,
    success: false,
    bookData: [],
  },
  reducers: {
    resetBooks: (state) => {
      state.books = [];
      state.loading = false;
      state.error = null;
    },
    resetStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addBook.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
        state.loading = false;
        state.success = true;
      })
      .addCase(addBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getBookInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.bookData = null;
      })
      .addCase(getBookInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.bookData = action.payload;
      })
      .addCase(getBookInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const addBook = createAsyncThunk(
  "books/addBook",
  async (bookData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      for (const key in bookData) {
        formData.append(key, bookData[key]);
      }
      const response = await axios.post("/api/books", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error de red");
    }
  }
);

export const getBookInfo = createAsyncThunk(
  "books/search",
  async (name, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/books?name=${name}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error de red");
    }
  }
);

export const { resetStatus, resetBooks } = bookSlice.actions;
export default bookSlice.reducer;
