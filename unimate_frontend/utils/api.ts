import axios from "axios";
import { getAccess, getRefresh, saveTokens, clearTokens } from "./auth";

const API_URL = "https://d45585a47804.ngrok-free.app/api/students";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(async (config) => {
  const token = await getAccess();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    // Access token expired
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      const refresh = await getRefresh();

      if (!refresh) {
        await clearTokens();
        return Promise.reject(error);
      }

      try {
        const r = await axios.post(`${API_URL}/auth/refresh/`, { refresh });

        await saveTokens(r.data.access, refresh);

        original.headers.Authorization = `Bearer ${r.data.access}`;

        return api(original);
      } catch (err) {
        // refresh expired → logout user
        await clearTokens();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
