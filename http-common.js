// axios.js
import axios from "axios";
import env from "./env";

const http = axios.create({
  baseURL: env.API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token && token !== "false") {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default http;
