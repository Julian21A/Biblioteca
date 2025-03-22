import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../components/shared/token-interceptor/token-interceptor.js";

/**
 * Registra un nuevo usuario en el sistema.
 * @param {Object} userData - Datos del usuario a registrar.
 * @returns {Promise<Object>} Datos del usuario registrado.
 * @throws {Error} Si la solicitud falla.
 */
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "http://localhost:8084/product/api/v1/register/user",
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error en la solicitud");
    }
  }
);

/**
 * Obtiene la información de un usuario por su número de identificación.
 * @param {string} numberId - Número de identificación del usuario.
 * @returns {Promise<Object>} Datos del usuario.
 * @throws {Error} Si la solicitud falla.
 */
export const getUserInfo = createAsyncThunk(
  "user/search",
  async (numberId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/user?documentNumber=${numberId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error de red");
    }
  }
);

/**
 * Edita la información de un usuario existente.
 * @param {Object} userData - Datos del usuario a actualizar.
 * @returns {Promise<Object>} Datos actualizados del usuario.
 * @throws {Error} Si la solicitud falla.
 */
export const editUserDetail = createAsyncThunk(
  "user/edit",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        "http://localhost:8084/product/api/v1/edit/user",
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error en la solicitud");
    }
  }
);

/**
 * Obtiene los detalles de un usuario por su número de documento.
 * @param {string} documentNumber - Número de documento del usuario.
 * @returns {Promise<Object>} Detalles del usuario.
 * @throws {Error} Si la solicitud falla.
 */
export const getUserDetail = createAsyncThunk(
  "user/detail",
  async (documentNumber, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/user/${documentNumber}`);
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
    userDetail: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    /**
     * Restablece el estado de carga y error del usuario.
     * @param {Object} state - Estado actual.
     */
    resetUserState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },

    /**
     * Reinicia la lista de usuarios almacenada en el estado.
     * @param {Object} state - Estado actual.
     */
    resetUsers: (state) => {
      state.userData = [];
      state.loading = false;
      state.error = null;
    },

    /**
     * Reinicia los detalles del usuario en el estado global.
     * @param {Object} state - Estado actual.
     */
    resetUserDetail: (state) => {
      state.userDetail = null;
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
      })
      .addCase(getUserDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.userDetail = null;
      })
      .addCase(getUserDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetail = action.payload;
      })
      .addCase(getUserDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetUserState, resetUsers, resetUserDetail } =
  userSlice.actions;
export default userSlice.reducer;
