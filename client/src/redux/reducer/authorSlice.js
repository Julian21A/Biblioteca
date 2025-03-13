import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addAuthor = createAsyncThunk(
  "authors/addAuthor",
  async (authorData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      for (const key in authorData) {
        formData.append(key, authorData[key]);
      }
      const response = await axios.post("/api/authors", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error de red");
    }
  }
);

export const getAuthorInfo = createAsyncThunk(
  "authors/search",
  async (name, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/authors?name=${name}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error de red");
    }
  }
);

export const getAuthorDetail = createAsyncThunk(
  "authors/detail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/authors/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error de red");
    }
  }
);

export const editAuthorDetail = createAsyncThunk(
  "authors/edit",
  async (authorData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      for (const key in authorData) {
        formData.append(key, authorData[key]);
      }
      const response = await axios.put("/api/authors/edit", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error de red");
    }
  }
);

const authorSlice = createSlice({
  name: "authors",
  initialState: {
    authorData: [],
    authorDetail: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetAuthorDetail: (state) => {
      state.authorDetail = null;
      state.loading = false;
      state.error = null;
    },
    resetAuthors: (state) => {
      state.authorData = [];
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
      .addCase(addAuthor.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addAuthor.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addAuthor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAuthorInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.authorData = [];
      })
      .addCase(getAuthorInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.authorData = action.payload;
      })
      .addCase(getAuthorInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAuthorDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.authorDetail = null;
      })
      .addCase(getAuthorDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.authorDetail = action.payload;
      })
      .addCase(getAuthorDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetStatus, resetAuthors, resetAuthorDetail } =
  authorSlice.actions;
export default authorSlice.reducer;
