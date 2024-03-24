import axios from "axios";


const api = axios.create({
  
  baseURL: "/api",
});


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

export default api;