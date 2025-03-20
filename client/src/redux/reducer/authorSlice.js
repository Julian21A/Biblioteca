import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../components/shared/token-interceptor/token-interceptor";

export const addAuthor = createAsyncThunk(
  "authors/addAuthor",
  async (authorInfo, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      for (const key in authorInfo) {
        formData.append(key, authorInfo[key]);
      }
      const response = await axiosInstance.post(
        "http://localhost:8084/product/api/v1/author/create",
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

export const getAuthorInfo = createAsyncThunk(
  "authors/search",
  async (name, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `http://localhost:8084/product/api/v1/author/search?fullName=${name}`
      );
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
      const responseData = await axiosInstance.get(
        `http://localhost:8084/product/api/v1/author/detail?id=${id}`
      );
      const responseImage = await axiosInstance.get(
        `http://localhost:8084/product/api/v1/author/detail/image?id=${id}`,
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

export const getAllAuthors = createAsyncThunk(
  "authors/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:8084/product/api/v1/author/all"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error de red");
    }
  }
);

export const editAuthorDetail = createAsyncThunk(
  "authors/edit",
  async (authorInfo, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      for (const key in authorInfo.formData) {
        formData.append(key, authorInfo.formData[key]);
      }
      const response = await axiosInstance.put(
        `http://localhost:8084/product/api/v1/author/update/${authorInfo.authorId}`,
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

const authorSlice = createSlice({
  name: "authors",
  initialState: {
    authorData: [],
    authorDetail: {
      json: null,
      image: null,
    },
    authorNames: [],
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
    resetAuthorNames: (state) => {
      state.authorNames = null;
      state.loading = false;
      state.error = null;
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
      })
      .addCase(getAllAuthors.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.authorDetail = null;
      })
      .addCase(getAllAuthors.fulfilled, (state, action) => {
        state.loading = false;
        state.authorNames = action.payload;
      })
      .addCase(getAllAuthors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  resetStatus,
  resetAuthors,
  resetAuthorDetail,
  resetAuthorNames,
} = authorSlice.actions;
export default authorSlice.reducer;
