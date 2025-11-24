// app/utils/api.ts
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const API_BASE = "http://10.0.2.2:8000"; // Android emulator
// const API_BASE = "http://localhost:8000"; // 


const api = axios.create({
  baseURL: API_BASE,
});

// Load token before each request
api.interceptors.request.use(async (config) => {
  const access = await SecureStore.getItemAsync("access");
  if (access) {
    config.headers.Authorization = `Bearer ${access}`;
  }
  return config;
});

// Auto refresh token on 401
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      const refresh = await SecureStore.getItemAsync("refresh");

      if (!refresh) {
        return Promise.reject(error);
      }

      try {
        const resp = await axios.post(`${API_BASE}/api/auth/refresh/`, {
          refresh,
        });

        await SecureStore.setItemAsync("access", resp.data.access);

        original.headers.Authorization = `Bearer ${resp.data.access}`;
        return api(original);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
export { API_BASE };
