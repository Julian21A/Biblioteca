import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../components/shared/token-interceptor/token-interceptor";

/**
 * Agrega un nuevo libro enviando los datos al servidor.
 * @param {Object} bookData - Datos del libro a agregar.
 * @returns {Promise<Object>} Datos del libro agregado.
 */
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

/**
 * Busca información de un libro por nombre.
 * @param {string} name - Nombre del libro.
 * @returns {Promise<Object>} Datos del libro encontrado.
 */
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

/**
 * Obtiene el detalle de un libro por ID, incluyendo su imagen.
 * @param {string} id - ID del libro.
 * @returns {Promise<Object>} Detalles del libro y su imagen.
 */
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

/**
 * Edita la información de un libro.
 * @param {Object} bookData - Datos del libro a editar.
 * @returns {Promise<Object>} Datos actualizados del libro.
 */
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

/**
 * Realiza el alquiler de un libro.
 * @param {Object} rentInfo - Información del alquiler.
 * @returns {Promise<Object>} Datos del proceso de alquiler.
 */
export const rentBook = createAsyncThunk(
  "books/rentBook",
  async (rentInfo, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `http://localhost:8084/product/api/v1/book/rent`,
        rentInfo,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (errorRent) {
      return rejectWithValue(errorRent.response?.data || "Error de red");
    }
  }
);

/**
 * Elimina un libro por su ID.
 * @param {string} id - ID del libro a eliminar.
 * @returns {Promise<Object>} Confirmación de eliminación.
 */
export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `http://localhost:8084/product/api/v1/book/delete?id=${id}`
      );
      return response.data;
    } catch (errorRent) {
      return rejectWithValue(errorRent.response?.data || "Error de red");
    }
  }
);

/**
 * Redux slice para la gestión de libros en la aplicación.
 */
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
    resetStatusDelete: (state) => {
      state.loading = false;
      state.errorDelete = null;
      state.successDelete = false;
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
      })
      .addCase(deleteBook.pending, (state) => {
        state.loading = true;
        state.errorDelete = null;
      })
      .addCase(deleteBook.fulfilled, (state) => {
        state.loading = false;
        state.successDelete = true;
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.loading = false;
        state.errorDelete = action.payload;
      });
  },
});

export const {
  resetStatus,
  resetBooks,
  resetBookDetail,
  resetStatusRent,
  resetStatusDelete,
} = bookSlice.actions;
export default bookSlice.reducer;
