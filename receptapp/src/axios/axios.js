import axios from "axios";

const API_URL = "http://localhost:5000/api/";
const TIMEOUT = 5000;

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: TIMEOUT,
    withCredentials: true,
});

export default axiosInstance;
