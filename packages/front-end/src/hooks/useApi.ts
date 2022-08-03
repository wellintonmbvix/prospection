import axios from "axios";
import { getUserLocalStorage } from "../contexts/Auth/util";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API,
});

api.defaults.headers.post["Content-Type"] = "application/json";
api.defaults.headers.put["Content-Type"] = "application/json";
api.defaults.headers.get["Content-Type"] = "application/json";

axios.interceptors.request.use(
  function (config) {
    const user = getUserLocalStorage();

    api.defaults.headers.common["Authorization"] = user.token;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
