import axios from "axios";
import { getCookie } from "../utils/cookie";

const instance = axios.create({
  // baseURL: "http://localhost:3001",
    baseURL: "https://hcmut-e-commerce.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Accept-Control-Allow-Credentials": "true",
  },
});

instance.interceptors.request.use(
  (config) => {
    config.data = {
      ...config.data,
      seenJokes: JSON.parse(getCookie("seenJokes") || "[]"),
    };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
