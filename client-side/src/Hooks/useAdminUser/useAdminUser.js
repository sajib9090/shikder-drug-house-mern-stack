import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useAdminUser = (userEmail) => {
  const { data: adminUser = [], isLoading: isLoadingAdmin } = useQuery({
    queryKey: ["adminUser", userEmail],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/usersGetByEmail/${userEmail}`
      );
      return res.data;
    },
  });

  return { adminUser, isLoadingAdmin };
};

export default useAdminUser;
