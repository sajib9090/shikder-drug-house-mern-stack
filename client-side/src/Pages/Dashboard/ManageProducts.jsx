import { useQuery } from "@tanstack/react-query";
import Loader from "../../Components/Loader";
import axios from "axios";
import useAuth from "../../Hooks/UseAuth";
import { Link } from "react-router-dom";

const ManageProducts = () => {
  const { loading } = useAuth();
  const { isLoading, data: productWithoutCategory = [] } = useQuery({
    queryKey: ["productWithoutCategory"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/all/products`
      );
      const allProducts = res.data;
      const productsWithoutCategory = allProducts.filter(
        (product) => !product.category
      );
      return productsWithoutCategory;
    },
  });

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
  if (isLoading) return <Loader />;
  return (
    <div>
      <h1>Manage Products</h1>
      <div className="mt-5">
        {productWithoutCategory?.length === 0 ? (
          <>
            <h3 className="text-3xl font-medium">No Product found</h3>
          </>
        ) : (
          <>
            {productWithoutCategory?.map((item) => (
              <div
                key={item._id}
                className="md:h-[180px] bg-slate-50 flex flex-col md:flex-row item-center px-4 py-8 md:py-0 mb-4 shadow-2xl"
              >
                <div className="avatar">
                  <div className="w-24 rounded">
                    <img src={item.medicine_image} />
                  </div>
                </div>
                <div className="text-left md:ml-4 flex justify-center flex-col mt-3 md:mt-0">
                  <p className="font-semibold">
                    Name:{" "}
                    <span className="font-normal">{item.medicine_name}</span>
                  </p>
                  <p className="font-semibold">
                    Shop Name:{" "}
                    <span className="font-normal">{item.medicine_generic}</span>
                  </p>
                  <p className="font-semibold">
                    Price:{" "}
                    <span className="font-normal">
                      {item.medicine_price_per_unit}
                    </span>
                  </p>
                  <p className="font-semibold">
                    Uploaded Date:{" "}
                    <span className="font-normal">
                      {formatDate(item.createdAt)}
                    </span>
                  </p>
                </div>
                <div className="mx-auto md:mx-0 md:ml-auto flex flex-col justify-center space-y-1 mt-3 md:mt-0">
                  <Link
                    to={`/dashboard/manageProducts/addCategory/${item._id}`}
                  >
                    <button className="bg-sh px-4 py-[2px] text-white rounded-3xl hover:bg-black duration-700">
                      Add Category
                    </button>
                  </Link>
                  <button className="bg-red-600 px-4 py-[2px] text-white rounded-3xl hover:bg-black duration-700">
                    Ban
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
