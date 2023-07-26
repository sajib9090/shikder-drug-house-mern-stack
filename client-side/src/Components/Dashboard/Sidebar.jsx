import { HiMenuAlt1 } from "react-icons/hi";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Switcher from "../../Hooks/Switcher/Switcher";
import { LuLogOut } from "react-icons/lu";
import { ImUsers } from "react-icons/im";
import { PiListChecks } from "react-icons/pi";
import { RiHeartAddFill } from "react-icons/ri";
import { FaHome, FaSitemap, FaUserSecret, FaHandshake } from "react-icons/fa";
import { MdManageSearch, MdManageAccounts } from "react-icons/md";
import useAuth from "../../Hooks/UseAuth";
import { toast } from "react-hot-toast";

const Sidebar = () => {
  const { logOut, setLoading } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Log Out success");
        navigate("/");
      })
      .catch(() => {
        setLoading(false);
      });
  };
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col relative dark:bg-dark-1">
          {/* Page content here */}
          {/* <div className="h-[100vh] flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold dark:text-white">
              Welcome to Dashboard
            </h1>
          </div> */}
          {/* Page content here */}
          <Outlet />
          <label
            htmlFor="my-drawer-2"
            className="drawer-button lg:hidden absolute top-1 left-1"
          >
            <div className="">
              <HiMenuAlt1 className="h-8 w-8 bg-white text-sh cursor-pointer" />
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="p-2 md:p-4 w-64 md:w-80 h-full bg-base-200 dark:bg-dark text-base-content space-y-4 flex flex-col justify-center">
            {/* Sidebar content here */}
            <li>
              <NavLink
                to="/dashboard/allCalculation"
                className={({ isActive }) =>
                  isActive
                    ? "text-sh font-medium text-base dark:text-gray-500 flex items-center"
                    : "font-medium text-base dark:text-white hover:text-sh hover:dark:text-gray-600 duration-700 flex items-center"
                }
              >
                <FaSitemap className="h-6 w-6 mr-1" /> All Calculation
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/allCalculation"
                className={({ isActive }) =>
                  isActive
                    ? "text-sh font-medium text-base dark:text-gray-500 flex items-center"
                    : "font-medium text-base dark:text-white hover:text-sh hover:dark:text-gray-600 duration-700 flex items-center"
                }
              >
                <ImUsers className="h-6 w-6 mr-1" /> All Customers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/allCalculation"
                className={({ isActive }) =>
                  isActive
                    ? "text-sh font-medium text-base dark:text-gray-500 flex items-center"
                    : "font-medium text-base dark:text-white hover:text-sh hover:dark:text-gray-600 duration-700 flex items-center"
                }
              >
                <RiHeartAddFill className="h-6 w-6 mr-1" /> Add Product
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/allCalculation"
                className={({ isActive }) =>
                  isActive
                    ? "text-sh font-medium text-base dark:text-gray-500 flex items-center"
                    : "font-medium text-base dark:text-white hover:text-sh hover:dark:text-gray-600 duration-700 flex items-center"
                }
              >
                <PiListChecks className="h-6 w-6 mr-1" /> My Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/allCalculation"
                className={({ isActive }) =>
                  isActive
                    ? "text-sh font-medium text-base dark:text-gray-500 flex items-center"
                    : "font-medium text-base dark:text-white hover:text-sh hover:dark:text-gray-600 duration-700 flex items-center"
                }
              >
                <FaUserSecret className="h-6 w-6 mr-1" /> All Sellers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/manageUsers"
                className={({ isActive }) =>
                  isActive
                    ? "text-sh font-medium text-base dark:text-gray-500 flex items-center"
                    : "font-medium text-base dark:text-white hover:text-sh hover:dark:text-gray-600 duration-700 flex items-center"
                }
              >
                <MdManageAccounts className="mr-1 h-6 w-6" /> Manage Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/manageProducts"
                className={({ isActive }) =>
                  isActive
                    ? "text-sh font-medium text-base dark:text-gray-500 flex items-center"
                    : "font-medium text-base dark:text-white hover:text-sh hover:dark:text-gray-600 duration-700 flex items-center"
                }
              >
                <MdManageSearch className="mr-1 h-6 w-6" /> Manage Products
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="badge badge-xs badge-sh indicator-item">
                    <span className="text-white">15</span>
                  </span>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/manageProducts"
                className={({ isActive }) =>
                  isActive
                    ? "text-sh font-medium text-base dark:text-gray-500 flex items-center"
                    : "font-medium text-base dark:text-white hover:text-sh hover:dark:text-gray-600 duration-700 flex items-center"
                }
              >
                <FaHandshake className="mr-1 h-6 w-6" /> Request To Become
                Seller
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="badge badge-xs badge-sh indicator-item">
                    <span className="text-white">15</span>
                  </span>
                </div>
              </NavLink>
            </li>

            <div>
              <div className="divider bg-sh h-[2px]"></div>
            </div>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-sh font-medium text-base dark:text-gray-500 flex items-center"
                    : "font-medium text-base dark:text-white hover:text-sh hover:dark:text-gray-600 duration-700 flex items-center"
                }
              >
                <FaHome className="mr-1 h-6 w-6" />
                Home
              </NavLink>
            </li>
            <li>
              <Link
                onClick={handleLogOut}
                className="font-medium text-base dark:text-white hover:text-sh hover:dark:text-gray-600 duration-700 flex items-center"
              >
                <LuLogOut className="mr-1 h-6 w-6" />
                Logout
              </Link>
            </li>
            <li title="Change Theme">
              <Link className="hover:text-sh bg-none cursor-pointer">
                <Switcher />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
