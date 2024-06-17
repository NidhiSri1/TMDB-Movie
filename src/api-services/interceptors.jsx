import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

api.interceptors.request.use(
  (config) => {
    const token = process.env.REACT_APP_API_KEY;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.Accept = "application/json";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
