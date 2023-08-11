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
import Error from "../Pages/Error/Error";
import ModifiedUser from "../Components/ModifiedUser/ModifiedUser";
import ProductDetails from "../Components/ProductDetails/ProductDetails";
import AllSellers from "../Pages/Dashboard/AllSellers";
import AddProduct from "../Pages/Dashboard/AddProduct";
import AddGeneric from "../Pages/Dashboard/AddGeneric";
import AddDosageForm from "../Pages/Dashboard/AddDosageForm";
import AddManufacturer from "../Pages/Dashboard/AddManufacturer";
import AllRequest from "../Pages/Dashboard/AllRequest";
import Shop from "../Pages/Shop/Shop";
import Cart from "../Pages/Shared/Cart";
import About from "../Pages/About/About";
import AddCategory from "../Pages/Dashboard/AddCategory";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/shop",
        element: <Shop />,
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
      {
        path: "/shop/cart/details",
        element: <Cart />,
      },
      {
        path: "/shop/product_details/:id",
        element: <ProductDetails />,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/product/${params.id}`),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <Error />,
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
        path: "/dashboard/manageUsers/user/:id",
        element: <ModifiedUser />,
      },
      {
        path: "/dashboard/manageProducts",
        element: <ManageProducts />,
      },
      {
        path: "/dashboard/allSellers",
        element: <AllSellers />,
      },
      {
        path: "/dashboard/addProduct",
        element: <AddProduct />,
      },
      {
        path: "/dashboard/addGeneric",
        element: <AddGeneric />,
      },
      {
        path: "/dashboard/addDosageForm",
        element: <AddDosageForm />,
      },
      {
        path: "/dashboard/addManufacturer",
        element: <AddManufacturer />,
      },
      {
        path: "/dashboard/allRequest",
        element: <AllRequest />,
      },
      {
        path: "/dashboard/manageProducts/addCategory/:id",
        element: <AddCategory />,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/product/${params.id}`),
      },
    ],
  },
]);
