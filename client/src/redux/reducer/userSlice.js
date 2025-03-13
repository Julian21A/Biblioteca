import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../components/shared/token-interceptor/token-interceptor.js";

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "http://localhost:8084/product/api/v1/register/user",
        userData
      );
      return response.data; // Asumimos que la respuesta contiene los datos del usuario registrado.
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error en la solicitud");
    }
  }
);

export const getUserInfo = createAsyncThunk(
  "user/search",
  async (numberId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/user?documentNumber=${numberId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error de red");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetUserState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    resetUsers: (state) => {
      state.userData = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.userData = null;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetUserState, resetUsers } = userSlice.actions;
export default userSlice.reducer;
