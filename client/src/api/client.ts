import axios from "axios";

// Create centralized Axios client with standard configuration
const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to automatically inject JWT authentication tokens from localStorage
apiClient.interceptors.request.use(
  (config) => {
    const userStr = localStorage.getItem("nola_builts_user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user && user.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      } catch (e) {
        console.error("Failed to parse user for authorization token", e);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration or standard HTTP errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear expired user sessions automatically on unauthorized requests
      localStorage.removeItem("nola_builts_user");
      localStorage.removeItem("nola_builts_lead_data");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
