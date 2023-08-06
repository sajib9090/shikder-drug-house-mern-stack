import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
import useAxiosSecure from "../../api/useAxiosSecure";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import useAuth from "../../Hooks/UseAuth";

const ModifiedUser = () => {
  const { user, loading, setLoading } = useAuth();
  const { id } = useParams();
  const [axiosSecure] = useAxiosSecure();
  const { refetch, isLoading, data } = useQuery({
    queryKey: ["userGetById", id],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/userGetById/${id}`);
      return res;
    },
  });
  if (isLoading) return <Loader />;

  // Function to format the date string to a readable format
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

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to make ${user.name} as an admin?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#009e7e",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        // updateUser
        const updateData = {
          role: "admin",
        };
        axiosSecure
          .patch(`/userUpdateById/${user._id}`, updateData)
          .then((response) => {
            Swal.fire("Done!", `${user.name} is admin now.`);
            refetch();
          })
          .catch((error) => {
            setLoading(false);
          });
      }
    });
  };

  // Swal.fire(
  //   'Deleted!',
  //   'Your file has been deleted.',
  //   'success'
  // )
  const handleMakeSeller = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to make ${user.name} as a seller?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#009e7e",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        // updateUser
        const updateData = {
          role: "seller",
        };
        axiosSecure
          .patch(`/userUpdateById/${user._id}`, updateData)
          .then((response) => {
            Swal.fire("Done!", `${user.name} is seller now.`);
            refetch();
          })
          .catch((error) => {
            setLoading(false);
          });
      }
    });
  };
  const handleRemoveAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to remove ${user.name} from admin?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#009e7e",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        // updateUser
        const updateData = {
          role: "customer",
        };
        axiosSecure
          .patch(`/userUpdateById/${user._id}`, updateData)
          .then((response) => {
            Swal.fire("Done!", `${user.name} is normal user now.`);
            refetch();
          })
          .catch((error) => {
            setLoading(false);
          });
      }
    });
  };
  const handleRemoveSeller = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to remove ${user.name} from seller?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#009e7e",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        // updateUser
        const updateData = {
          role: "customer",
        };
        axiosSecure
          .patch(`/userUpdateById/${user._id}`, updateData)
          .then((response) => {
            Swal.fire("Done!", `${user.name} is normal user now.`);
            refetch();
          })
          .catch((error) => {
            setLoading(false);
          });
      }
    });
  };

  return (
    <div className="flex flex-col justify-center items-center mt-12 md:mt-0">
      <div className="avatar">
        <div className="w-20 md:w-32 rounded-full ring ring-[#009e7e]">
          <img
            src={
              data?.data?.image
                ? data?.data?.image
                : "https://i.ibb.co/ZdwY2jZ/default-Icon.png"
            }
          />
        </div>
      </div>
      <div className="text-center">
        <p className="text-gray-400 font-semibold">{data?.data?.role}</p>
        <h3 className="text-3xl font-extrabold my-2">{data?.data?.name}</h3>
        <p className="my-1">{data?.data?.email}</p>
      </div>
      <div className="my-4">
        {data?.data?.role === "customer" ? (
          <>
            <p
              onClick={() => handleMakeAdmin(data?.data)}
              className="text-sh underline cursor-pointer"
            >
              Included as an admin
            </p>
            <p
              onClick={() => handleMakeSeller(data?.data)}
              className="text-sh underline cursor-pointer"
            >
              Included as a seller
            </p>
          </>
        ) : (
          ""
        )}
        {data?.data?.role === "admin" ? (
          <p
            onClick={() => handleRemoveAdmin(data?.data)}
            className="text-red-600 underline cursor-pointer"
          >
            Remove from admin
          </p>
        ) : (
          ""
        )}
        {data?.data?.role === "seller" ? (
          <p
            onClick={() => handleRemoveSeller(data?.data)}
            className="text-red-600 underline cursor-pointer"
          >
            Remove from seller
          </p>
        ) : (
          ""
        )}
      </div>
      <div className="shadow-md bg-gray-100 p-6">
        <div className="mt-4">
          <h2 className="text-center">Profile Regarding</h2>
        </div>
        <div
          className="flex flex-col md:flex-row mt-4
            "
        >
          <p className="md:mr-2 mb-4 md:mb-0">
            <span className="text-sh">Joining Date:</span> <br />{" "}
            {formatDate(data?.data?.createdAt)}
          </p>
          <p className="md:ml-2">
            <span className="text-sh">Last Updated:</span> <br />
            {data?.data?.lastUpdated
              ? formatDate(data?.data?.lastUpdated)
              : "Never Updated"}
          </p>
        </div>
      </div>
      <div className="shadow-md bg-gray-100 p-6 mt-4">
        <div className="mt-4">
          <h2 className="text-center">Role Regarding</h2>
        </div>
        <div
          className="flex flex-col md:flex-row mt-4
            "
        >
          <p className="md:mr-2 mb-4 md:mb-0">
            <span className="text-sh">Role Added:</span> <br />{" "}
            {formatDate(data?.data?.role_createdAt)}
          </p>
          <p className="md:ml-2">
            <span className="text-sh">Last Updated:</span> <br />
            {data?.data?.lastRoleUpdated
              ? formatDate(data?.data?.lastRoleUpdated)
              : "Never Updated"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModifiedUser;
