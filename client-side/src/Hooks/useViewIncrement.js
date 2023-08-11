import axios from "axios";

const useViewIncrement = () => {
  const incrementView = async (productId) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/product/${productId}`,
        {
          value: 1,
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return { incrementView };
};

export default useViewIncrement;
