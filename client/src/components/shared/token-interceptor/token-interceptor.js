import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhoost:3000", // Cambia esto por tu base URL
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    console.log(token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
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
