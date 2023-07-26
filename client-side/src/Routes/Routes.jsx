import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Profile from "../Pages/Shared/Profile";
import DashboardLayout from "../Layout/DashboardLayout";
import ManageUsers from "../Pages/Dashboard/ManageUsers";
import AllCalculation from "../Pages/Dashboard/AllCalculation";
import ManageProducts from "../Pages/Dashboard/manageProducts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <h1>Error</h1>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/user/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <h1>Error</h1>,
    children: [
      {
        path: "/dashboard/allCalculation",
        element: <AllCalculation />,
      },
      {
        path: "/dashboard/manageUsers",
        element: <ManageUsers />,
      },
      {
        path: "/dashboard/manageProducts",
        element: <ManageProducts />,
      },
    ],
  },
]);
