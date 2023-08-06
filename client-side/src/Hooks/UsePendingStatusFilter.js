import { useEffect, useState } from "react";

const usePendingStatusFilter = (data) => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Perform the filter operation here
    const filtered = data.filter((item) => item.status === "pending");
    setFilteredData(filtered);
  }, [data]);

  return filteredData;
};

export default usePendingStatusFilter;
