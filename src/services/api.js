
import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.2.12:8080/api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
