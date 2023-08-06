import ProductCard from "../../../Components/ProductCard/ProductCard";
import useAuth from "../../../Hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAddToCart from "../../../Hooks/useAddToCart";
import { toast } from "react-hot-toast";
import useAdminUser from "../../../Hooks/useAdminUser/useAdminUser";
import Loader from "../../../Components/Loader";

const Products = () => {
  const { loading, user } = useAuth();
  const { addToCart, addCartLoading } = useAddToCart();
  const { isLoading, data: productWithCustomerCategory = [] } = useQuery({
    queryKey: ["productWithCustomerCategory"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/all/products`
      );
      const allProducts = res.data;
      const productWithCustomerCategory = allProducts.filter(
        (product) => product.category === "customer_choice"
      );
      return productWithCustomerCategory;
    },
  });

  const handleAddToCart = (product) => {
    addToCart(product, user, toast);
  };

  const { adminUser, isLoadingAdmin } = useAdminUser(user?.email);
  if (isLoading || isLoadingAdmin) return <Loader />;

  return (
    <div className="md:h-[630px] px-4 md:px-8">
      <div>
        <h1 className=" text-3xl font-extrabold py-10 dark:text-white">
          Customer's Choice
        </h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {productWithCustomerCategory?.slice(0, 4).map((product) => (
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

export default Products;
