import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../components/shared/token-interceptor/token-interceptor";

/**
 * Añade un nuevo autor enviando datos en formato FormData.
 * @async
 * @function
 * @param {Object} authorInfo - Información del autor.
 * @returns {Promise<Object>} Datos del autor creado.
 */
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

/**
 * Obtiene información de un autor por su nombre.
 * @async
 * @function
 * @param {string} name - Nombre del autor.
 * @returns {Promise<Object>} Datos del autor encontrado.
 */
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

/**
 * Obtiene los detalles de un autor por su ID, incluyendo su imagen.
 * @async
 * @function
 * @param {number} id - ID del autor.
 * @returns {Promise<Object>} Datos detallados del autor.
 */
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

/**
 * Obtiene una lista de todos los autores registrados.
 * @async
 * @function
 * @returns {Promise<Array>} Lista de autores.
 */
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

/**
 * Edita los detalles de un autor existente.
 * @async
 * @function
 * @param {Object} authorInfo - Información del autor a editar.
 * @param {number} authorInfo.authorId - ID del autor.
 * @param {Object} authorInfo.formData - Datos actualizados del autor.
 * @returns {Promise<Object>} Datos del autor actualizado.
 */
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

/**
 * Slice de Redux para la gestión de autores.
 */
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
    /**
     * Resetea los detalles del autor.
     */
    resetAuthorDetail: (state) => {
      state.authorDetail = null;
      state.loading = false;
      state.error = null;
    },
    /**
     * Resetea la lista de autores.
     */
    resetAuthors: (state) => {
      state.authorData = [];
      state.loading = false;
      state.error = null;
    },
    /**
     * Resetea el estado general del slice.
     */
    resetStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    /**
     * Resetea la lista de nombres de autores.
     */
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
