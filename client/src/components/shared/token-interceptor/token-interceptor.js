import axios from "axios";

/**
 * Instancia de Axios preconfigurada con una base URL y manejo de autenticación.
 *
 * @constant {AxiosInstance} axiosInstance - Instancia de Axios con configuración predeterminada.
 */
const axiosInstance = axios.create({
  baseURL: "https://localhoost:3000", // Cambia esto por tu base URL correcta
});

/**
 * Interceptor de solicitudes para agregar el token de autenticación si existe en `localStorage`.
 *
 * @function
 * @param {AxiosRequestConfig} config - Configuración de la solicitud saliente.
 * @returns {AxiosRequestConfig} Configuración modificada con el encabezado de autorización si hay un token.
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  /**
   * Manejo de error en la configuración de la solicitud.
   *
   * @function
   * @param {any} error - Error capturado en la solicitud.
   * @returns {Promise<never>} Promesa rechazada con el error.
   */
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Interceptor de respuestas para manejar errores globales, como tokens expirados.
 *
 * - Si la respuesta tiene un estado `401` (No autorizado), se limpia el `localStorage` y se muestra un mensaje de error.
 *
 * @function
 * @param {AxiosResponse} response - Respuesta de la solicitud.
 * @returns {AxiosResponse} Retorna la respuesta si no hay errores.
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  /**
   * Manejo de error en la respuesta.
   *
   * @async
   * @param {any} error - Error capturado en la respuesta.
   * @returns {Promise<never>} Promesa rechazada con el error.
   */
  async (error) => {
    if (error.response.status === 401) {
      window.location.href = "/Login";
      localStorage.clear();
      console.error("Token expired or not valid");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
