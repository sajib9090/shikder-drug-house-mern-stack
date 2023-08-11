import { BsSearch } from "react-icons/bs";
import Loader from "../../Components/Loader";
import axios from "axios";
import ProductCard from "../../Components/ProductCard/ProductCard";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/UseAuth";
import useAdminUser from "../../Hooks/useAdminUser/useAdminUser";
import useAddToCart from "../../Hooks/useAddToCart";
import { useEffect, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { BsFillEyeFill } from "react-icons/bs";
import useViewIncrement from "../../Hooks/useViewIncrement";

{
  /* <AiOutlineCheck className="text-sh h-4 w-4" />
          <RxCross2 className="text-red-600 h-4 w-4" /> */
}

const Shop = () => {
  const { user } = useAuth();
  const { addToCart, addCartLoading } = useAddToCart();
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");
  const { incrementView } = useViewIncrement();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/all/products`)
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  const handleInputChange = (event) => {
    setSearchProduct(event.target.value);
  };

  const handleSearch = () => {
    // Call the search function here
    setIsLoading(true);
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/product/getBySearch/${searchProduct}`
      )
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const handleSearchButton = () => {
    handleSearch();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const { adminUser, isLoadingAdmin } = useAdminUser(user?.email);

  const handleAddToCart = (product) => {
    addToCart(product, user, toast);
  };

  const handleView = async (product) => {
    await incrementView(product._id);
  };
  if (isLoading || isLoadingAdmin) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto dark:bg-dark-2">
      <div className="h-[50vh] md:h-[80vh] md:max-h-[400px] shop">
        <div className="bg-sh h-full w-full bg-opacity-sh-70 dark:bg-deep-sh dark:bg-opacity-sh-90 bg-opacity-75 flex justify-center items-center"></div>
      </div>
      <div className="text-center mt-10">
        <form onSubmit={(event) => event.preventDefault()}>
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered rounded-l-3xl rounded-r-none h-[40px] input-success w-full max-w-[180px] md:max-w-xs px-6"
            defaultValue={searchProduct}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSearchButton}
            className="bg-sh rounded-r-3xl rounded-l-none h-[40px] px-6"
          >
            <BsSearch className="text-white" />
          </button>
        </form>
      </div>
      {products?.length === 0 ? (
        <h2 className="text-center text-3xl font-bold mt-8">
          No Product Found
        </h2>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 px-4">
          {products?.map((product) => (
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
                    product.medicine_name.length > 50
                      ? product.medicine_name.slice(0, 50) + "..."
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
      )}
    </div>
  );
};

export default Shop;
