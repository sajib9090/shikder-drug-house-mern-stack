import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useGetCart from "./useGetCart";

const useAddToCart = () => {
  const [addCartLoading, setAddCartLoading] = useState(false);
  const navigate = useNavigate();
  const [getCarts, getCartRefetch] = useGetCart();

  const addToCart = async (product, user, toast) => {
    if (!user) {
      toast.success("Login first");
      navigate("/login");
      return;
    }

    const cartItem = {
      product_id: product._id,
      product_name: product.medicine_name,
      product_image: product.medicine_image,
      product_group: product.medicine_generic,
      product_size: product.medicine_strength,
      product_formation: product.medicine_dosage_form,
      product_price_per_unit: parseFloat(product.medicine_price_per_unit),
      product_quantity: 1,
      product_available_quantity: parseInt(product.medicine_available_quantity),
      buyer_email: user.email,
      seller_email: product.seller_email,
    };

    try {
      setAddCartLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/add/cart`,
        cartItem
      );

      if (response.data.acknowledged) {
        toast.success("Product added to cart successfully.");
        getCartRefetch();
      }
      if (response.data.message) {
        toast.success(response.data.message);
        getCartRefetch();
      }
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setAddCartLoading(false);
    }
  };

  return { addToCart, addCartLoading };
};

export default useAddToCart;
