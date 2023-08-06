// import { useEffect, useState } from "react";
import useAuth from "../../Hooks/UseAuth";
import useAxiosSecure from "../../api/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Components/Loader";
import { BsThreeDotsVertical, BsTrashFill } from "react-icons/bs";
import { BiSolidFolderOpen } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useState } from "react";
import { Link } from "react-router-dom";
// import UserCard from "../../Components/userCard/userCard";

const ManageUsers = () => {
  const { loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [userDetails, setUserDetails] = useState([]);
  // console.log(user);
  // const [allUsers, setAllUsers] = useState([]);
  // useEffect(() => {
  //   fetch(`${import.meta.env.VITE_API_URL}/all/users`, {
  //     headers: {
  //       authorization: `Bearer ${localStorage.getItem("access-token")}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setAllUsers(data);
  //     });
  // }, []);

  // useEffect(() => {
  //   axiosSecure.get(`/all/users`).then((data) => {
  //     setAllUsers(data.data);
  //   });
  // }, [user, axiosSecure]);

  // console.log(typeof allUsers[0].serial);

  const { isLoading, data: allUsers = [] } = useQuery({
    queryKey: ["allUsers"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`all/users`);
      return res.data.users;
    },
  });
  const { data: allUsersByLatest = [] } = useQuery({
    queryKey: ["allUsersByLatest"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/all/users/latest`);
      return res.data.users;
    },
  });
  if (isLoading) return <Loader />;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return date.toLocaleString(undefined, options);
  };

  const handleDetails = (user) => {
    axiosSecure
      .get(`/userGetById/${user._id}`)
      .then((d) => setUserDetails(d.data))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mt-8 md:mt-4">
      <div className="text-center">
        <div>
          <h1 className="text-2xl font-bold mb-4">
            Total User Available:{" "}
            <span className="text-sh">{allUsers.length}</span>
          </h1>
        </div>
        <div className="px-2">
          <Tabs>
            <TabList>
              <Tab>Old to New</Tab>
              <Tab>New to Old</Tab>
            </TabList>

            <TabPanel className="text-justify mt-12 mb-4">
              <div className="grid md:grid-cols-3 gap-4 px-4">
                {allUsers?.length > 0 ? (
                  allUsers?.map((user, index) => (
                    // <UserCard
                    //   key={index}
                    //   index={index + 1}
                    //   image={user.image}
                    //   name={user.name}
                    //   email={`@${user.email.split("@")[0]}`}
                    //   role={user.role}
                    //   edit={"Edit"}
                    //   delete={"Delete"}
                    // />
                    <div
                      key={index}
                      className="md:h-[140px] shadow-2xl bg-[#F2F2F2] flex flex-col md:flex-row pl-2 md:pl-4 rounded-md py-4 md:py-0"
                    >
                      <div className="h-full flex items-center justify-center relative">
                        <div className="avatar">
                          <div className="w-16 md:w-20 rounded-full ring ring-[#009e7e]">
                            <img
                              src={
                                user?.image
                                  ? user.image
                                  : "https://i.ibb.co/ZdwY2jZ/default-Icon.png"
                              }
                            />
                          </div>
                        </div>
                        <div className="absolute top-0 md:top-2 left-0">
                          <p className="font-semibold text-[8px] text-[#bebebe]">
                            {index + 1}
                          </p>
                        </div>
                      </div>
                      <div className="h-full flex items-center justify-center text-center md:text-start">
                        <div className="space-y-1 md:space-y-2 ml-2 md:ml-4">
                          <h3 className="font-semibold text-gray-500">
                            {user?.name}
                          </h3>
                          <p className="text-gray-400 text-sm">{`@${
                            user?.email.split("@")[0].length > 10
                              ? user?.email.split("@")[0].slice(0, 10)
                              : user?.email.split("@")[0]
                          }`}</p>
                          <p className="font-extrabold">{user?.role}</p>
                        </div>
                      </div>
                      <div className="ml-auto hidden md:block">
                        <details className="dropdown dropdown-end">
                          <summary className="btn hover:bg-[#F2F2F2]">
                            <BsThreeDotsVertical />
                          </summary>
                          <ul className="p-2 shadow  menu dropdown-content z-[1] bg-[#F2F2F2] w-28">
                            <Link to={`user/${user._id}`}>
                              <li>
                                <p className="hover:bg-[#F2F2F2] hover:underline text-sh duration-700">
                                  Edit <FaEdit />
                                </p>
                              </li>
                            </Link>
                            <li>
                              <h3
                                onClick={() => window.my_modal_2.showModal()}
                                className="hover:bg-[#F2F2F2] hover:underline text-sh duration-700 flex items-center"
                              >
                                <p
                                  onClick={() => handleDetails(user)}
                                  className="hover:bg-[#F2F2F2] hover:underline text-sh duration-700 flex items-center"
                                >
                                  Details <BiSolidFolderOpen className="ml-1" />
                                </p>
                              </h3>
                            </li>
                          </ul>
                        </details>
                      </div>
                      <div className="ml-auto md:hidden block absolute right-7 ">
                        <details className="dropdown dropdown-end">
                          <summary className="btn hover:bg-[#F2F2F2]">
                            <BsThreeDotsVertical />
                          </summary>
                          <ul className="p-2 shadow  menu dropdown-content z-[1] bg-[#F2F2F2] w-28">
                            <Link to={`user/${user._id}`}>
                              <li>
                                <p className="hover:bg-[#F2F2F2] hover:underline text-sh duration-700">
                                  Edit <FaEdit />
                                </p>
                              </li>
                            </Link>
                            <li>
                              <h3
                                onClick={() => window.my_modal_2.showModal()}
                                className="hover:bg-[#F2F2F2] hover:underline text-sh duration-700 flex items-center"
                              >
                                <p
                                  onClick={() => handleDetails(user)}
                                  className="hover:bg-[#F2F2F2] hover:underline text-sh duration-700 flex items-center"
                                >
                                  Details <BiSolidFolderOpen className="ml-1" />
                                </p>
                              </h3>
                            </li>
                          </ul>
                        </details>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-6xl">No users found</p>
                )}
              </div>
            </TabPanel>
            <TabPanel className="text-justify mt-12 mb-4">
              <div className="grid md:grid-cols-3 gap-4 px-4">
                {allUsersByLatest?.length > 0 ? (
                  allUsersByLatest?.map((user, index) => (
                    <div
                      key={index}
                      className="md:h-[140px] shadow-2xl bg-[#F2F2F2] flex flex-col md:flex-row pl-2 md:pl-4 rounded-md py-4 md:py-0"
                    >
                      <div className="h-full flex items-center justify-center relative">
                        <div className="avatar">
                          <div className="w-16 md:w-20 rounded-full ring ring-[#009e7e]">
                            <img
                              src={
                                user?.image
                                  ? user.image
                                  : "https://i.ibb.co/ZdwY2jZ/default-Icon.png"
                              }
                            />
                          </div>
                        </div>
                        <div className="absolute top-0 md:top-2 left-0">
                          <p className="font-semibold text-[8px] text-[#bebebe]">
                            {index + 1}
                          </p>
                        </div>
                      </div>
                      <div className="h-full flex items-center justify-center text-center md:text-start">
                        <div className="space-y-1 md:space-y-2 ml-2 md:ml-4">
                          <h3 className="font-semibold text-gray-500">
                            {user?.name}
                          </h3>
                          <p className="text-gray-400 text-sm">{`@${
                            user?.email.split("@")[0].length > 15
                              ? user?.email.split("@")[0].slice(0, 15) + ".."
                              : user?.email.split("@")[0]
                          }`}</p>
                          <p className="font-extrabold">{user?.role}</p>
                        </div>
                      </div>
                      <div className="ml-auto hidden md:block">
                        <details className="dropdown dropdown-end">
                          <summary className="btn hover:bg-[#F2F2F2]">
                            <BsThreeDotsVertical />
                          </summary>
                          <ul className="p-2 shadow  menu dropdown-content z-[1] bg-[#F2F2F2] w-28">
                            <Link to={`user/${user._id}`}>
                              <li>
                                <p className="hover:bg-[#F2F2F2] hover:underline text-sh duration-700">
                                  Edit <FaEdit />
                                </p>
                              </li>
                            </Link>
                            <li>
                              <h3
                                onClick={() => window.my_modal_2.showModal()}
                                className="hover:bg-[#F2F2F2] hover:underline text-sh duration-700 flex items-center"
                              >
                                <p
                                  onClick={() => handleDetails(user)}
                                  className="hover:bg-[#F2F2F2] hover:underline text-sh duration-700 flex items-center"
                                >
                                  Details <BiSolidFolderOpen className="ml-1" />
                                </p>
                              </h3>
                            </li>
                          </ul>
                        </details>
                      </div>
                      <div className="ml-auto md:hidden block absolute right-7 ">
                        <details className="dropdown dropdown-end">
                          <summary className="btn hover:bg-[#F2F2F2]">
                            <BsThreeDotsVertical />
                          </summary>
                          <ul className="p-2 shadow  menu dropdown-content z-[1] bg-[#F2F2F2] w-28">
                            <Link to={`user/${user._id}`}>
                              <li>
                                <p className="hover:bg-[#F2F2F2] hover:underline text-sh duration-700">
                                  Edit <FaEdit />
                                </p>
                              </li>
                            </Link>
                            <li>
                              <h3
                                onClick={() => window.my_modal_2.showModal()}
                                className="hover:bg-[#F2F2F2] hover:underline text-sh duration-700 flex items-center"
                              >
                                <p
                                  onClick={() => handleDetails(user)}
                                  className="hover:bg-[#F2F2F2] hover:underline text-sh duration-700 flex items-center"
                                >
                                  Details <BiSolidFolderOpen className="ml-1" />
                                </p>
                              </h3>
                            </li>
                          </ul>
                        </details>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-6xl">No users found</p>
                )}
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
      <dialog id="my_modal_2" className="modal">
        <form method="dialog" className="modal-box rounded-sm">
          <div className="flex flex-col justify-center items-center">
            <div className="avatar">
              <div className="w-20 md:w-32 rounded-full ring ring-[#009e7e]">
                <img
                  src={
                    userDetails?.image
                      ? userDetails.image
                      : "https://i.ibb.co/ZdwY2jZ/default-Icon.png"
                  }
                />
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-extrabold my-2">
                {userDetails?.name}
              </h3>
              <p className="text-gray-400 font-semibold">{userDetails?.role}</p>
              <p className="my-1">{userDetails?.email}</p>
            </div>
            <div
              className="flex flex-col md:flex-row mt-4
            "
            >
              <p className="md:mr-2 mb-4 md:mb-0">
                <span className="text-sh">Joining Date:</span> <br />{" "}
                {formatDate(userDetails?.createdAt)}
              </p>
              <p className="md:ml-2">
                <span className="text-sh">Last Updated:</span> <br />
                {userDetails?.lastUpdated
                  ? formatDate(userDetails.lastUpdated)
                  : "Never Updated"}
              </p>
            </div>
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ManageUsers;
