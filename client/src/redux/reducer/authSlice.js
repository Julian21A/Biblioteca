import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    success: false,
    user: null,
  },

  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.user = action.payload;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.success = false;
      state.user = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;

/**
 * Realiza la autenticación de un usuario enviando sus datos a un servidor.
 *
 * Esta función despacha las acciones necesarias para iniciar el proceso de login.
 * Realiza una solicitud POST a un servidor para autenticar al usuario con los datos proporcionados
 * y maneja tanto la respuesta exitosa como la de error. Si el login es exitoso, devuelve los datos del usuario autenticado.
 *
 * @param {Object} userData - El objeto que contiene los datos del usuario para el login. (Debe incluir propiedades como `userName` y `password`).
 * @param {string} userData.userName - El nombre de usuario del usuario que intenta iniciar sesión.
 * @param {string} userData.password - La contraseña del usuario que intenta iniciar sesión.
 * @returns {Promise<Object>} Una promesa que resuelve los datos del usuario autenticado si el login es exitoso.
 * @throws {Error} Si la solicitud de login falla, se lanza un error que contiene el mensaje de la respuesta de error.
 */
export const loginUser = (userData) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.post(
      "http://localhost:8081/auth/login",
      userData
    );
    dispatch(loginSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(
      loginFailure(error.response?.data?.message || "Error desconocido")
    );
    throw error;
  }
};

export default authSlice.reducer;
