import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://azkroflyzbackend-ojv2zf4s.b4a.run",
  // baseURL: "http://localhost:8003",
});

export default AxiosInstance;
