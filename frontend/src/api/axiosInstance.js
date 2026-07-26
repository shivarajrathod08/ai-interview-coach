import axios from "axios";
import { getToken, removeToken } from "../utils/tokenUtils";
import { removeItem } from "../utils/storage";
import { STORAGE_KEYS } from "../constants/appConstants";
import { ROUTES } from "../constants/routes";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      removeToken();
      removeItem(STORAGE_KEYS.USER);

      if (window.location.pathname !== ROUTES.LOGIN) {
        window.location.assign(ROUTES.LOGIN);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;