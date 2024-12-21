import axios from "axios";

const baseURL = "http://localhost:3000";

const axiosBasic = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

if (typeof window !== "undefined") {
  const token = localStorage.getItem("token");
  if (token) {
    axiosBasic.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
}

axiosBasic.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle 401 error here
      console.error("Unauthorized access - 401");
      // Optionally, you can redirect to login page or logout the user
      // window.location.href = "/login";
      throw error;
    }
    // return Promise.reject(error);
  }
);

export { axiosBasic };
