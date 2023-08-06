import ProductCard from "../../../Components/ProductCard/ProductCard";
import useAuth from "../../../Hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAdminUser from "../../../Hooks/useAdminUser/useAdminUser";
import Loader from "../../../Components/Loader";
import useAddToCart from "../../../Hooks/useAddToCart";
import { toast } from "react-hot-toast";

const LatestProducts = () => {
  const { loading, user } = useAuth();
  const { addToCart, addCartLoading } = useAddToCart();
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
                title={product?.medicine_name}
                price={product?.medicine_price_per_unit}
                button={"Buy Now"}
                handleButtonClick={() => handleAddToCart(product)}
                isDisabled={true}
              />
            ) : (
              <ProductCard
                key={product?._id}
                img={product?.medicine_image}
                title={product?.medicine_name}
                price={product?.medicine_price_per_unit}
                button={addCartLoading ? "Wait.." : "Buy Now"}
                handleButtonClick={() => handleAddToCart(product)}
                isDisabled={false}
                to={`/shop/product_details/${product?._id}`}
              />
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default LatestProducts;
