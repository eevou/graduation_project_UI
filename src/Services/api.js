import axios from "axios";

const API_URL = "http://193.227.24.31:5050/api";
//const API_URL = "https://localhost:7260/api";

const api = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  export default api;
  