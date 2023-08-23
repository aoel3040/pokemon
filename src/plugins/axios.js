import axios from "axios";

export const API = axios.create({
  baseURL: process.env.REACT_APP_POKEMON_API_URL, // 기본 서버 주소 입력
  timeout: 5000,
});
// Request interceptor response handler
const handleRequest = (res) => {
  return res;
};

const handleResponse = (res) => {
  return res;
};

const handleRequestError = (err) => {
  return err;
};

const handleResponseError = async (error) => {
  if (error.response.status === 404) {
    // const { config } = error.response;
    // config.headers = {
    //   ...config.headers,
    // };
    // return axios.request(config);
    return error;
  }
};

API.interceptors.request.use(handleRequest, handleRequestError);
API.interceptors.response.use(handleResponse, handleResponseError);
