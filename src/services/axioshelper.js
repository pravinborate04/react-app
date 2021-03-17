import axios from "axios";
require("dotenv").config();
const instance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:8081",
});

instance.interceptors.request.use(
  async (config1) => {
    const token = await localStorage.getItem("accessToken");
    if (token) {
      config1.headers.Authorization = "Basic " + token;
    }
    config1.headers["Content-Type"] = "application/json";
    return config1;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
