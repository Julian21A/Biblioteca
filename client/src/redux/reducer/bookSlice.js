import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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

export const getBookDetail = createAsyncThunk(
  "book/detail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/books/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error de red");
    }
  }
);

export const editBookDetail = createAsyncThunk(
  "books/editBook",
  async (bookData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      for (const key in bookData) {
        formData.append(key, bookData[key]);
      }
      const response = await axios.put("/api/books/edit", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error de red");
    }
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState: {
    bookData: [],
    bookDetail: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetBookDetail: (state) => {
      state.bookDetail = null;
      state.loading = false;
      state.error = null;
    },
    resetBooks: (state) => {
      state.bookData = [];
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
      })
      .addCase(getBookDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.bookDetail = null;
      })
      .addCase(getBookDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.bookDetail = action.payload;
      })
      .addCase(getBookDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetStatus, resetBooks, resetBookDetail } = bookSlice.actions;
export default bookSlice.reducer;
