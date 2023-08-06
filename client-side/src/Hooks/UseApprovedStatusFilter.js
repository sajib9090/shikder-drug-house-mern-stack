import { useEffect, useState } from "react";

const UseApprovedStatusFilter = (data) => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Perform the filter operation here
    const filtered = data.filter((item) => item.status === "approved");
    setFilteredData(filtered);
  }, [data]);

  return filteredData;
};

export default UseApprovedStatusFilter;
