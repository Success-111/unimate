import axios from "axios";
import * as SecureStore from "expo-secure-store";

// Use your PC's LAN IP so your phone can reach the dev server.
// Replace 192.168.1.42 with your computer's local IP (same Wi‑Fi).
const API_URL = "https://35b8e2f22ebf.ngrok-free.app/api/students";

// Alternatives:
// const API_URL = "http://10.0.2.2:8000"; // Android emulator
// const API_URL = "http://localhost:8000"; // iOS simulator

const api = axios.create({
  baseURL: API_URL,
});

// Attach token
api.interceptors.request.use(async (config) => {
  const access = await SecureStore.getItemAsync("access");
  if (access) config.headers.Authorization = `Bearer ${access}`;
  return config;
});

// Auto refresh token
api.interceptors.response.use(
  (r) => r,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      const refresh = await SecureStore.getItemAsync("refresh");

      const resp = await axios.post(`${API_URL}/auth/refresh/`, { refresh });

      await SecureStore.setItemAsync("access", resp.data.access);

      original.headers.Authorization = `Bearer ${resp.data.access}`;

      return api(original);
    }

    return Promise.reject(error);
  }
);

export default api;
