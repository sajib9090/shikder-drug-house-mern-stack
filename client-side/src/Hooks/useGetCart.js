import { useQuery } from "@tanstack/react-query";
import useAuth from "./UseAuth";
import useAxiosSecure from "../api/useAxiosSecure";

const useGetCart = () => {
  const { user, loading } = useAuth();
  // const token = localStorage.getItem('access-token');
  const [axiosSecure] = useAxiosSecure();
  const { refetch: getCartRefetch, data: getCarts = [] } = useQuery({
    queryKey: ["getCarts", user && user?.email],
    enabled:
      !loading && !!user?.email && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const res = await axiosSecure(`/carts?email=${user?.email}`);
      return res.data;
    },
  });

  return [getCarts, getCartRefetch];
};
export default useGetCart;
