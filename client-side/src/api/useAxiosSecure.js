import axios from "axios";
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});
const useAxiosSecure = () => {
  useEffect(() => {
    axiosSecure.interceptors.request.use((req) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        req.headers.authorization = `Bearer ${token}`;
      }
      return req;
    });
    axiosSecure.interceptors.response.use(
      (response) => response,

      (error) => {
        console.log(error);
      }
    );
  }, []);
  return [axiosSecure];
};

export default useAxiosSecure;
