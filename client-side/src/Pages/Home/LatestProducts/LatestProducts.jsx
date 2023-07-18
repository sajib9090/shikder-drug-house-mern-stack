import { useEffect, useState } from "react";
import Product from "../Product/Product";

const LatestProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(
      `https://raw.githubusercontent.com/sajib9090/shikder-drug-house-resources/main/Poducts/Products.json`
    )
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="mt-32 bg-gray-100 dark:bg-dark gap-x-4 max-w-7xl mx-auto px-4 md:px-8">
      <div>
        <h1 className="dark:text-white text-3xl font-extrabold py-10">
          Latest products
        </h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 pb-6">
        {products &&
          products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default LatestProducts;
