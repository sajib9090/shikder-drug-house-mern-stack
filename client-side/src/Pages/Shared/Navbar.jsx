import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/shikder-drug-house-resources/images/shikderDrugHouse.png";

import { useEffect, useState } from "react";
import Switcher from "../../Hooks/Switcher/Switcher";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarClassName = `navbar1 ${
    isScrolled
      ? "navbar bg-white items-center dark:bg-dark h-[80px] fixed top-0 z-[999] max-w-7xl mx-auto dark:shadow-md dark:shadow-black shadow-2xl"
      : "navbar items-center bg-white dark:bg-dark h-[80px] fixed z-[999] max-w-7xl mx-auto"
  }`;
  return (
    <div className="max-w-7xl mx-auto">
      <div className={navbarClassName}>
        <div className="navbar-start w-[100%] justify-between md:justify-between lg:justify-start">
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn dark:text-white text-sh btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] space-y-2 p-4 shadow bg-white rounded-box w-52 dark:bg-[#010313]"
            >
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-sh font-medium text-base dark:text-gray-500"
                    : "font-medium text-base dark:text-white hover:text-sh hover:dark:text-gray-500 duration-700"
                }
              >
                <li>Home</li>
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "text-sh font-medium text-base dark:text-gray-500"
                    : "font-medium text-base dark:text-white hover:text-sh hover:dark:text-gray-500 duration-700"
                }
              >
                <li>About</li>
              </NavLink>
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  isActive
                    ? "text-sh font-medium text-base dark:text-gray-500"
                    : "font-medium text-base dark:text-white hover:text-sh hover:dark:text-gray-500 duration-700"
                }
              >
                <li>Shop</li>
              </NavLink>
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  isActive
                    ? "text-sh font-medium text-base dark:text-gray-500"
                    : "font-medium text-base dark:text-white hover:text-sh hover:dark:text-gray-500 duration-700"
                }
              >
                <li>Blog</li>
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "text-sh font-medium text-base dark:text-gray-500"
                    : "font-medium text-base dark:text-white hover:text-sh hover:dark:text-gray-500 duration-700"
                }
              >
                <li>Contact</li>
              </NavLink>
            </ul>
          </div>
          <Link to="/">
            <img className="w-[200px] md:w-[100%]" src={logo} alt="" />
          </Link>
          <div className="lg:hidden" title="Cart">
            <div className="dropdown dropdown-end" title="Cart">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#009e7e"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item bg-sh text-white">
                    8
                  </span>
                </div>
              </label>
              <div
                tabIndex={0}
                className="mt-3 z-[1] card card-compact dropdown-content w-52  bg-white shadow"
              >
                <div className="card-body dark:bg-dark-1 rounded-lg">
                  <span className="font-bold text-lg dark:text-white">
                    8 Items
                  </span>
                  <span className="text-info dark:text-gray-500">
                    Subtotal: $999
                  </span>
                  <div className="card-actions">
                    <button className="btn btn-primary btn-block">
                      View cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:hidden mr-2">
            <div title="Profile">
              <div className="dropdown dropdown-end" title="Profile">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full border border-black dark:border-white">
                    <img src="https://lh3.googleusercontent.com/ogw/AGvuzYY1Ke2kT4ItdYEOuQ7PlhxNWZxEL2mNKmhfUA7lcg=s64-c-mo" />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white dark:bg-dark-1 dark:text-white rounded-box w-52"
                >
                  <li>
                    <a className="justify-between hover:text-sh">
                      Profile
                      {/* <span className="badge">New</span> */}
                    </a>
                  </li>
                  <li title="Dashboard">
                    <a className="hover:text-sh">Dashboard</a>
                  </li>
                  <li title="Login/SignIn">
                    <Link to="/login" className="hover:text-sh">
                      Login/Sign In
                    </Link>
                  </li>
                  <li title="Logout">
                    <a className="hover:text-sh">Logout</a>
                  </li>
                  <li>
                    <div title="Change Theme">
                      <Switcher />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="navbar-end w-[80%] hidden lg:flex">
          <ul className="menu menu-horizontal space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-sh font-medium text-base dark:text-gray-500"
                  : "font-medium text-base dark:text-white hover:text-sh hover:dark:text-gray-500 duration-700"
              }
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-sh font-medium text-base dark:text-gray-500"
                  : "font-medium text-base dark:text-white hover:text-sh hover:dark:text-gray-500 duration-700"
              }
            >
              <li>About</li>
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                isActive
                  ? "text-sh font-medium text-base dark:text-gray-500"
                  : "font-medium text-base dark:text-white hover:text-sh hover:dark:text-gray-500 duration-700"
              }
            >
              <li>Shop</li>
            </NavLink>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                isActive
                  ? "text-sh font-medium text-base dark:text-gray-500"
                  : "font-medium text-base dark:text-white hover:text-sh duration-700 hover:dark:text-gray-500"
              }
            >
              <li>Blog</li>
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-sh font-medium text-base dark:text-gray-500"
                  : "font-medium text-base dark:text-white hover:text-sh hover:dark:text-gray-500 duration-700"
              }
            >
              <li>Contact</li>
            </NavLink>
          </ul>
          <div className="flex items-center space-x-4 mr-4">
            <div>
              <div className="dropdown dropdown-end" title="Cart">
                <label tabIndex={0} className="btn btn-ghost btn-circle">
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#009e7e"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="badge badge-sm indicator-item bg-sh text-white">
                      8
                    </span>
                  </div>
                </label>
                <div
                  tabIndex={0}
                  className="mt-3 z-[1] card card-compact dropdown-content w-52  bg-white shadow"
                >
                  <div className="card-body dark:bg-dark-1 rounded-lg">
                    <span className="font-bold text-lg dark:text-white">
                      8 Items
                    </span>
                    <span className="text-info dark:text-gray-500">
                      Subtotal: $999
                    </span>
                    <div className="card-actions">
                      <button className="btn btn-primary btn-block">
                        View cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="dropdown dropdown-end" title="Profile">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar online"
                >
                  <div className="w-10 rounded-full border border-gray-300 dark:border-white">
                    <img src="https://lh3.googleusercontent.com/ogw/AGvuzYY1Ke2kT4ItdYEOuQ7PlhxNWZxEL2mNKmhfUA7lcg=s64-c-mo" />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white dark:bg-dark-1 dark:text-white rounded-box w-52"
                >
                  <li>
                    <a className="justify-between hover:text-sh">
                      Profile
                      {/* <span className="badge">New</span> */}
                    </a>
                  </li>
                  <li title="Dashboard">
                    <a className="hover:text-sh">Dashboard</a>
                  </li>
                  <li title="Login/SignIn">
                    <Link to="/login" className="hover:text-sh">
                      Login/Sign In
                    </Link>
                  </li>
                  <li>
                    <a className="hover:text-sh">Logout</a>
                  </li>
                </ul>
              </div>
            </div>
            <div title="Change theme">
              <Switcher></Switcher>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
