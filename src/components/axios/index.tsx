import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "http://localhost:8003",
});

export default AxiosInstance;
