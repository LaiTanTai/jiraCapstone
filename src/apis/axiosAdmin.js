import axios from "axios";

const Bear = JSON.parse(localStorage.getItem("user"))?.accessToken;
console.log(Bear);
const axiosAdmin = axios.create({
  baseURL: "https://jiranew.cybersoft.edu.vn/api",
  headers: {
    Authorization: `Bearer ${Bear}`,
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0MiIsIkhldEhhblN0cmluZyI6IjEwLzEwLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5Njg5NjAwMDAwMCIsIm5iZiI6MTY2NzA2MjgwMCwiZXhwIjoxNjk3MDQzNjAwfQ.g_aUM-jnWQ1i_eCbjNfvNxudUdUPpfC36068g5o9Ung",
  },
});
export default axiosAdmin;
