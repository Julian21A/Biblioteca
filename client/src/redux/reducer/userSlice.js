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
  async (name, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `http://localhost:8084/product/api/v1/user/search?name=${name}`
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
        `http://localhost:8084/product/api/v1/user/${userData[1]}`,
        userData[0]
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error en la solicitud");
    }
  }
);

export const changePassword = createAsyncThunk(
  "user/password/edit",
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `http://localhost:8084/product/api/v1/user/password/${passwordData[1]}`,
        passwordData[0]
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error en la solicitud");
    }
  }
);

export const getLoanBooks = createAsyncThunk(
  "user/loanBooks",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:8084/product/api/v1/book/user?id=" + id
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error al obtener los libros prestados"
      );
    }
  }
);

export const returnLoanBook = createAsyncThunk(
  "user/returnBook",
  async (loanId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        "http://localhost:8084/product/api/v1/book/" + loanId
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error en la solicitud");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: [],
    userDetail: null,
    passwordData: null,
    loading: false,
    error: null,
    success: false,
    loanBooks: [],
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

    resetPasswordData: (state) => {
      state.passwordData = null;
      state.loading = false;
      state.error = null;
    },
    resetLoanBooks: (state) => {
      state.loanBooks = [];
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
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.passwordData = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.passwordData = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.passwordData = action.payload;
      })
      .addCase(getLoanBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.loanBooks = [];
      })
      .addCase(getLoanBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.loanBooks = action.payload;
      })
      .addCase(getLoanBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(returnLoanBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(returnLoanBook.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(returnLoanBook.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const {
  resetUserState,
  resetUsers,
  resetUserDetail,
  resetPasswordData,
  resetLoanBooks,
} = userSlice.actions;
export default userSlice.reducer;
