import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_EXPENSE_TRACKER_API_URL, // Change this
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

export default api;
