import { useContext } from "react";
import { AuthContext } from "../Provider/authProvider";

const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export default useAuth;
