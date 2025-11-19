// src/services/api.js
import axios from "axios";

// Change baseURL if your backend runs on a different host/port.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  timeout: 10000,
});

export default api;
