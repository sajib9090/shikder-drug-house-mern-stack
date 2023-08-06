import { useEffect, useState } from "react";
import useAxiosSecure from "../api/useAxiosSecure";

const UseDosageForm = () => {
  const [dosageFormData, setDosageFormData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [axiosSecure] = useAxiosSecure();

  useEffect(() => {
    const fetchDosageFormData = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure.get("/all/dosageForm");
        setDosageFormData(response.data.dosageForm);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dosage form data:", error);
        setLoading(false);
      }
    };

    fetchDosageFormData();
  }, []);

  return { dosageFormData, loading };
};

export default UseDosageForm;
