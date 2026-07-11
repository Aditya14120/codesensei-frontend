import axios from "axios";
import toast from "react-hot-toast";

const SESSION_KEY = "codesensei_user";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
});

// Attach the JWT issued at login/register to every request. The backend now
// requires it on all routes except /auth/**, so requests without it will 401.
API.interceptors.request.use((config) => {
  const stored = localStorage.getItem(SESSION_KEY);

  if (stored) {
    try {
      const { token } = JSON.parse(stored);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      localStorage.removeItem(SESSION_KEY);
    }
  }

  return config;
});

// A 401 means the token is missing/expired/invalid — clear the stale session
// and let App.jsx drop back to the logged-out view instead of leaving the
// user stuck on a Dashboard that can no longer call the API.
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const hadSession = !!localStorage.getItem(SESSION_KEY);
      localStorage.removeItem(SESSION_KEY);

      if (hadSession) {
        toast.error("Your session has expired. Please log in again.");
        window.dispatchEvent(new Event("codesensei:unauthorized"));
      }
    }

    return Promise.reject(error);
  }
);

export default API;
