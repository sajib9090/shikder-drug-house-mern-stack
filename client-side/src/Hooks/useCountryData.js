import { useEffect, useState } from "react";

const useCountryData = () => {
  const [countryData, setCountryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/country`);
        if (!response.ok) {
          throw new Error("Failed to fetch country data.");
        }
        const data = await response.json();
        setCountryData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching country data:", error);
        setLoading(false);
      }
    };

    fetchCountryData();
  }, []);

  return { countryData, loading };
};

export default useCountryData;
