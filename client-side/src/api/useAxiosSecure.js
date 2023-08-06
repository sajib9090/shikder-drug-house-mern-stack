import axios from "axios";
import { useEffect } from "react";
import useAuth from "../Hooks/UseAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});
const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    axiosSecure.interceptors.request.use((req) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        req.headers.authorization = `Bearer ${token}`;
      }
      return req;
    });

    // if anyone try to access this data without verification we should logout him/her and we should navigate that user in home or login page..
    // then we should return the error for showing user.
    axiosSecure.interceptors.response.use(
      (response) => response,

      async (error) => {
        if (
          (error.response && error.response.status === 401) ||
          error.response.status === 403
        ) {
          await logOut();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, [logOut, navigate, axiosSecure]);
  return [axiosSecure];
};

export default useAxiosSecure;
