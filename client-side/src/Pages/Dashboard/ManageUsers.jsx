import { useEffect, useState } from "react";
import useAuth from "../../Hooks/UseAuth";
import useAxiosSecure from "../../api/useAxiosSecure";

const ManageUsers = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [allUsers, setAllUsers] = useState([]);
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

  useEffect(() => {
    axiosSecure.get(`/all/users`).then((data) => {
      setAllUsers(data.data);
    });
  }, [user, axiosSecure]);

  console.log(allUsers);
  return (
    <div>
      <h1>Manage users</h1>
      {allUsers?.length > 0 ? (
        allUsers.map((user, index) => (
          <ul key={index}>
            <li>
              {index + 1}. {user.name}
            </li>
          </ul>
        ))
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};

export default ManageUsers;
