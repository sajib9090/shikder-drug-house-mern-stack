import { useContext } from "react";
import { AuthContext } from "../Provider/authProvider";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../Components/Loader";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }
  if (user) {
    return children;
  }
  return <Navigate state={{ from: location }} to="/login" replace></Navigate>;
};

export default PrivateRoutes;
