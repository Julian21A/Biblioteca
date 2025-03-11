import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const authorSlice = createSlice({
  name: "authors",
  initialState: { authors: [], loading: false, error: null, success: false },
  reducers: {
    resetAuthors: (state) => {
      state.authors = [];
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
      .addCase(addAuthor.fulfilled, (state, action) => {
        state.authors.push(action.payload);
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
        state.authorData = null;
      })
      .addCase(getAuthorInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.authData = action.payload;
      })
      .addCase(getAuthorInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

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

export const { resetStatus, resetAuthors } = authorSlice.actions;
export default authorSlice.reducer;
