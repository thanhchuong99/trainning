import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
let authTokens = localStorage.getItem("access_token");

const axiosClient = axios.create({
  baseURL: "https://trainning-auth.herokuapp.com/api",
  headers: { "Content-Type": "application/json" },
});
// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    authTokens = localStorage.getItem("access_token");

    config.headers = {
      Authorization: `Bearer ${authTokens}`,
      Accept: "application/json",
    };
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);
// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  async function (error) {
    // const originalRequest = error.config;
    // if (error.response.status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = true;
    //   let refreshToken = localStorage.getItem("refresh_token");
    //   console.log(refreshToken);
    //   if (refreshToken) {
    //     const access_token = await authApi.refreshToken(refreshToken);
    //     error.response.config.headers["Authorization"] =
    //       "Bearer " + access_token;
    //     localStorage.setItem("access_token", access_token);
    //   }
    //   return axiosClient(originalRequest);
    // }
    return Promise.reject(error);
  },
);
export default axiosClient;
export const axiosPrivate = axios.create({
  baseURL: "https://trainning-auth.herokuapp.com/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
