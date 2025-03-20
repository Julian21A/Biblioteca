import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../components/shared/token-interceptor/token-interceptor";

export const addBook = createAsyncThunk(
  "books/addBook",
  async (bookData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      for (const key in bookData) {
        formData.append(key, bookData[key]);
      }
      const response = await axiosInstance.post(
        "http://localhost:8084/product/api/v1/book/create",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
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
      const response = await axiosInstance.get(
        `http://localhost:8084/product/api/v1/book/search?fullName=${name}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error de red");
    }
  }
);

export const getBookDetail = createAsyncThunk(
  "books/detail",
  async (id, { rejectWithValue }) => {
    try {
      const responseData = await axiosInstance.get(
        `http://localhost:8084/product/api/v1/book/detail?id=${id}`
      );
      const responseImage = await axiosInstance.get(
        `http://localhost:8084/product/api/v1/book/detail/image?id=${id}`,
        { responseType: "blob" }
      );
      const imageUrl = responseImage
        ? URL.createObjectURL(responseImage.data)
        : null;
      return { json: responseData.data, image: imageUrl };
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
      for (const key in bookData.formData) {
        formData.append(key, bookData.formData[key]);
      }
      const response = await axiosInstance.put(
        `http://localhost:8084/product/api/v1/book/update/${bookData.bookId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error de red");
    }
  }
);

export const rentBook = createAsyncThunk(
  "books/rentBook",
  async (rentInfo, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      for (const key in rentInfo) {
        formData.append(key, rentInfo[key]);
      }
      const response = await axiosInstance.put(
        `http://localhost:8084/product/api/v1/book/rent`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    } catch (errorRent) {
      return rejectWithValue(errorRent.response?.data || "Error de red");
    }
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState: {
    bookData: [],
    bookDetail: {
      json: null,
      image: null,
    },
    loading: false,
    error: null,
    errorRent: null,
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
    resetStatusRent: (state) => {
      state.loading = false;
      state.errorRent = null;
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
      })
      .addCase(rentBook.pending, (state) => {
        state.loading = true;
        state.errorRent = null;
        state.bookDetail = null;
      })
      .addCase(rentBook.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(rentBook.rejected, (state, action) => {
        state.loading = false;
        state.errorRent = action.payload;
      });
  },
});

export const { resetStatus, resetBooks, resetBookDetail, resetStatusRent } =
  bookSlice.actions;
export default bookSlice.reducer;
