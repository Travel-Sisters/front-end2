import axios from "axios";
import config from '../config';

const api = axios.create({
  
  baseURL: config.API_URL,
});

const api_pix = axios.create({
  baseURL: config.API_PIX
})


api.interceptors.request.use(
  (config) => {
    // const token = sessionStorage.getItem("token");

    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    config.headers['Access-Control-Allow-Origin'] = '*';

    return config;
  },
  (error) => {
    return Promise.reject(error);
});

export { api, api_pix };