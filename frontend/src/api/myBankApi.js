import axios from "axios";
import { BASE_URL } from "../config";

const axiosInstance = (auth = "") =>
  axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${auth}`,
    },
  });

export default axiosInstance;
