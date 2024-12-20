import axios from "axios";

const baseURL = process.env.API_BASE_URL || "http://localhost:3000";

const axiosBasic = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

if (typeof window !== "undefined") {
  axiosBasic.defaults.baseURL =
    window.__remix__.apiBaseUrl || "http://localhost:3000";
}

export { axiosBasic };
