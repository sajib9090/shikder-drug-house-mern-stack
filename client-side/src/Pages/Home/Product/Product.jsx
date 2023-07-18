import React from "react";

const Product = ({ product }) => {
  return (
    <div className="flex flex-col mb-12 md:mb-4 dark:bg-dark-1 p-4">
      <div>
        <img src={product.img} alt="" />
      </div>
      <div>
        <h3 className="text-base md:text-xl font-semibold my-6 dark:text-white">
          {product.title}
        </h3>
        <h4 className="underline text-[#009F7F] text-lg mb-4">
          $ {product.price}
        </h4>
      </div>
      <div className="mt-auto">
        <button className="btn bg-[#009F7F] border-none">Add to cart</button>
      </div>
    </div>
  );
};

export default Product;
