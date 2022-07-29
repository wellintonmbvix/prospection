import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API,
});

api.defaults.headers.post['Content-Type'] = 'application/json';
api.defaults.headers.put['Content-Type'] = 'application/json';

axios.interceptors.request.use(function (config) {

    return config;
}, function (error) {
    return Promise.reject(error);
});