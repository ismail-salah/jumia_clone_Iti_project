import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'https://ali-service-ey1c.onrender.com/api/team2',
  baseURL: 'http://localhost:8000/api/team2',
});
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from local storage
    const token = localStorage.getItem('token');

    // Add the token to the headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstance;