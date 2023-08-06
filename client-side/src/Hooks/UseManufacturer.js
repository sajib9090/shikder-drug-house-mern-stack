import { useEffect, useState } from "react";
import useAxiosSecure from "../api/useAxiosSecure";

const UseManufacturer = () => {
  const [manufacturerData, setManufacturerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [axiosSecure] = useAxiosSecure();

  useEffect(() => {
    const fetchManufacturerData = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure.get("/all/manufacturer");
        setManufacturerData(response.data.manufacturer);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching manufacturer data:", error);
        setLoading(false);
      }
    };

    fetchManufacturerData();
  }, []);

  return { manufacturerData, loading };
};

export default UseManufacturer;
