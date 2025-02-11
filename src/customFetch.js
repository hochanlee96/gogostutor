import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL, // Replace with your backend URL
  withCredentials: true, // Send cookies in requests (for refresh token)
  headers: {
    "Content-Type": "application/json",
  },
});

export const setupAxiosInterceptors = (getAccessToken, setAccessToken) => {
  // Request Interceptor: Attach accessToken to the Authorization header
  api.interceptors.request.use(
    (config) => {
      const token = getAccessToken(); // Dynamically fetch the latest access token
      if (token) {
        console.log("token: " + token);
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response Interceptor: Handle 401 errors (expired or invalid token)
  api.interceptors.response.use(
    (response) => response, // Pass through successful responses
    async (error) => {
      const originalRequest = error.config;

      // Check if the error is a 401 and it's not a retry
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // Mark the request as a retry to avoid infinite loops

        try {
          // Attempt to refresh the access token
          const refreshResponse = await axios.post(
            process.env.REACT_APP_BACKEND_URL + "/tutors/refresh-token",
            {},
            { withCredentials: true } // Send cookies to backend
          );

          const newAccessToken = refreshResponse.data.accessToken;
          setAccessToken(newAccessToken); // Update the state with the new access token

          // Retry the original request with the new access token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          // Handle token refresh failure (e.g., redirect to login)
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error); // Propagate other errors
    }
  );
};

export default api;
