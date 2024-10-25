import axios from "axios";

// export const BASE_URL = "http://localhost:3100/api/";
export const BASE_URL = "http://13.209.185.110/api/";

// axios 기본 헤더
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
