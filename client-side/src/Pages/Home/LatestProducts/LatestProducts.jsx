import ProductCard from "../../../Components/ProductCard/ProductCard";
import useAuth from "../../../Hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAdminUser from "../../../Hooks/useAdminUser/useAdminUser";
import Loader from "../../../Components/Loader";
import useAddToCart from "../../../Hooks/useAddToCart";
import { toast } from "react-hot-toast";
import { AiOutlineCheck } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { BsFillEyeFill } from "react-icons/bs";
import useViewIncrement from "../../../Hooks/useViewIncrement";

const LatestProducts = () => {
  const { loading, user } = useAuth();
  const { addToCart, addCartLoading } = useAddToCart();
  const { incrementView } = useViewIncrement();
  const { isLoading, data: productWithLatesCategory = [] } = useQuery({
    queryKey: ["productWithLatesCategory"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/all/products`
      );
      const allProducts = res.data;
      const productWithLatesCategory = allProducts.filter(
        (product) => product.category === "latest"
      );
      return productWithLatesCategory;
    },
  });

  const handleAddToCart = (product) => {
    addToCart(product, user, toast);
  };

  const handleView = async (product) => {
    await incrementView(product._id);
  };

  const { adminUser, isLoadingAdmin } = useAdminUser(user?.email);
  if (isLoading || isLoadingAdmin) return <Loader />;
  return (
    <div className="mt-32 bg-gray-100 dark:bg-dark-1 gap-x-4 max-w-7xl mx-auto px-4 md:px-8">
      <div>
        <h1 className="dark:text-white text-3xl font-extrabold py-10">
          Latest products
        </h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 pb-6">
        {productWithLatesCategory?.slice(0, 10).map((product) => (
          <>
            {user?.email === product?.seller_email ||
            adminUser.role === "admin" ? (
              <ProductCard
                key={product?._id}
                img={product?.medicine_image}
                views={
                  product?.views ? (
                    <span className="flex items-center text-xs">
                      <BsFillEyeFill className="h-4 w-4 text-sh mr-1" />{" "}
                      {product.views}
                    </span>
                  ) : (
                    <span className="flex items-center text-xs">
                      {" "}
                      <BsFillEyeFill className="h-4 w-4 text-sh mr-1" />
                      {"No views"}
                    </span>
                  )
                }
                title={
                  product.medicine_name.length > 30
                    ? product.medicine_name.slice(0, 30) + "..."
                    : product.medicine_name
                }
                price={product?.medicine_price_per_unit}
                button={"Buy Now"}
                handleButtonClick={() => handleAddToCart(product)}
                isDisabled={true}
                stock={
                  product.medicine_available_quantity == 0 ? (
                    <span className="text-red-600 flex items-center">
                      <RxCross2 className="text-red-600 h-4 w-4" />
                      Out of Stock
                    </span>
                  ) : (
                    <span className="text-sh flex items-center">
                      <AiOutlineCheck className="text-sh h-4 w-4" />
                      In Stock
                    </span>
                  )
                }
              />
            ) : (
              <ProductCard
                key={product?._id}
                img={product?.medicine_image}
                views={
                  product?.views ? (
                    <span className="flex items-center text-xs">
                      <BsFillEyeFill className="h-4 w-4 text-sh mr-1" />{" "}
                      {product.views}
                    </span>
                  ) : (
                    <span className="flex items-center text-xs">
                      {" "}
                      <BsFillEyeFill className="h-4 w-4 text-sh mr-1" />
                      {"No views"}
                    </span>
                  )
                }
                title={
                  product.medicine_name.length > 50
                    ? product.medicine_name.slice(0, 50) + "..."
                    : product.medicine_name
                }
                price={product?.medicine_price_per_unit}
                button={addCartLoading ? "Wait.." : "Buy Now"}
                handleButtonClick={() => handleAddToCart(product)}
                handleViewCount={() => handleView(product)}
                isDisabled={false}
                to={`/shop/product_details/${product?._id}`}
                stock={
                  product.medicine_available_quantity == 0 ? (
                    <span className="text-red-600 flex items-center">
                      <RxCross2 className="text-red-600 h-4 w-4" />
                      Out of Stock
                    </span>
                  ) : (
                    <span className="text-sh flex items-center">
                      <AiOutlineCheck className="text-sh h-4 w-4" />
                      In Stock
                    </span>
                  )
                }
              />
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default LatestProducts;
