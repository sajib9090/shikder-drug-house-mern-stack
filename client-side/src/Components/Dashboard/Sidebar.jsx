import { HiMenuAlt1 } from "react-icons/hi";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
// import Switcher from "../../Hooks/Switcher/Switcher";
import { LuLogOut } from "react-icons/lu";
import { ImUsers } from "react-icons/im";
import { PiListChecks } from "react-icons/pi";
import { RiHeartAddFill } from "react-icons/ri";
import { FaHome, FaSitemap, FaUserSecret, FaHandshake } from "react-icons/fa";
import { MdManageSearch, MdManageAccounts } from "react-icons/md";
import { TbDna } from "react-icons/tb";
import useAuth from "../../Hooks/UseAuth";
import { toast } from "react-hot-toast";
import Loader from "../Loader";
import useAxiosSecure from "../../api/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Sidebar = () => {
  const { logOut, setLoading, user, loading } = useAuth();
  const navigate = useNavigate();
  const [axiosSecure] = useAxiosSecure();

  const { isLoading, data } = useQuery({
    queryKey: ["user"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/users/${user?.email}`);
      return res.data;
    },
  });
  if (isLoading) return <Loader />;

  // console.log(data);
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
    <div className="max-w-7xl mx-auto">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col relative">
          {/* Page content here */}
          {/* <div className="h-[100vh] flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold dark:text-white">
              Welcome to Dashboard
            </h1>
          </div> */}
          {/* Page content here */}

          <label
            htmlFor="my-drawer-2"
            className="drawer-button lg:hidden absolute top-1 right-1"
          >
            <div className="">
              <HiMenuAlt1 className="h-8 w-8 bg-white text-sh cursor-pointer" />
            </div>
          </label>
          <div className="pt-8 bg-white">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="p-2 md:p-4 w-48 md:w-80 h-full bg-base-200 text-base-content space-y-4 flex flex-col justify-center">
            {/* Sidebar content here */}

            {data?.role === "admin" ? (
              <>
                <li>
                  <NavLink
                    to="/dashboard/allCalculation"
                    className={({ isActive }) =>
                      isActive
                        ? "text-sh font-medium text-base flex items-center"
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
                        ? "text-sh font-medium text-base flex items-center"
                        : "font-medium text-base dark:text-white hover:text-sh hover:dark:text-gray-600 duration-700 flex items-center"
                    }
                  >
                    <ImUsers className="h-6 w-6 mr-1" /> All Customers
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/allSellers"
                    className={({ isActive }) =>
                      isActive
                        ? "text-sh font-medium text-base  flex items-center"
                        : "font-medium text-base  hover:text-sh  duration-700 flex items-center"
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
                        ? "text-sh font-medium text-base  flex items-center"
                        : "font-medium text-base  hover:text-sh  duration-700 flex items-center"
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
                        ? "text-sh font-medium text-base  flex items-center"
                        : "font-medium text-base  hover:text-sh duration-700 flex items-center"
                    }
                  >
                    <MdManageSearch className="mr-1 h-6 w-6" /> Manage Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/allRequest"
                    className={({ isActive }) =>
                      isActive
                        ? "text-sh font-medium text-base  flex items-center"
                        : "font-medium text-base  hover:text-sh  duration-700 flex items-center"
                    }
                  >
                    <FaHandshake className="mr-1 h-6 w-6" /> All Request
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/dashboard/addManufacturer"
                    className={({ isActive }) =>
                      isActive
                        ? "text-sh font-medium text-base  flex items-center"
                        : "font-medium text-base   duration-700 flex items-center"
                    }
                  >
                    <TbDna className="h-6 w-6 mr-1" /> Add Manufacturer
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/addDosageForm"
                    className={({ isActive }) =>
                      isActive
                        ? "text-sh font-medium text-base  flex items-center"
                        : "font-medium text-base   duration-700 flex items-center"
                    }
                  >
                    <TbDna className="h-6 w-6 mr-1" /> Add Dosage Form
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/addGeneric"
                    className={({ isActive }) =>
                      isActive
                        ? "text-sh font-medium text-base  flex items-center"
                        : "font-medium text-base   duration-700 flex items-center"
                    }
                  >
                    <TbDna className="h-6 w-6 mr-1" /> Add Generic
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/addProduct"
                    className={({ isActive }) =>
                      isActive
                        ? "text-sh font-medium text-base  flex items-center"
                        : "font-medium text-base   duration-700 flex items-center"
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
                        ? "text-sh font-medium text-base  flex items-center"
                        : "font-medium text-base  hover:text-sh  duration-700 flex items-center"
                    }
                  >
                    <PiListChecks className="h-6 w-6 mr-1" /> My Products
                  </NavLink>
                </li>
              </>
            )}

            <div>
              <div className="divider bg-sh h-[2px]"></div>
            </div>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-sh font-medium text-base  flex items-center"
                    : "font-medium text-base  hover:text-sh  duration-700 flex items-center"
                }
              >
                <FaHome className="mr-1 h-6 w-6" />
                Home
              </NavLink>
            </li>
            <li>
              <Link
                onClick={handleLogOut}
                className="font-medium text-base  hover:text-sh  duration-700 flex items-center"
              >
                <LuLogOut className="mr-1 h-6 w-6" />
                Logout
              </Link>
            </li>
            {/* <li title="Change Theme">
              <Link className="hover:text-sh bg-none cursor-pointer">
                <Switcher />
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
