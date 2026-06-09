import axios from "axios";

const BASE_URL = "https://e-commerce-nodejs-blush.vercel.app";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

/**
 * Add token to every request
 */
api.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("accessToken"));

    if (token) {
      config.headers.authorization = token;
      console.log("Token added to request:", token);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Handle responses globally
 * ❌ NO REDIRECT HERE (important)
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    // لو التوكن انتهى فعلاً
    if (status === 401) {
      localStorage.removeItem("accessToken");

      // بس هنعمل event بدل redirect
      window.dispatchEvent(new Event("auth:failed"));
    }

    return Promise.reject(error);
  }
);

export default api;