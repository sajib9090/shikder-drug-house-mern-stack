import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { FaFacebook, FaLinkedin, FaPinterest, FaTwitter } from "react-icons/fa";
import payment from "../../assets/shikder-drug-house-resources/images/payment.png";
import Shipping from "../../Pages/Home/CustomersChoice/Shipping";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../Hooks/UseAuth";
import axios from "axios";
import toast from "react-hot-toast";
import useGetCart from "../../Hooks/useGetCart";
import { AiOutlineLoading3Quarters, AiOutlineCheck } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";

const ProductDetails = () => {
  const data = useLoaderData();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [addCartLoading, setAddCartLoading] = useState(false);
  const [getCarts, getCartRefetch] = useGetCart();

  const socials = [
    {
      id: 1,
      link: <FaFacebook />,
    },
    {
      id: 2,
      link: <FaTwitter />,
    },
    {
      id: 3,
      link: <FaPinterest />,
    },
    {
      id: 4,
      link: <FaLinkedin />,
    },
  ];

  const handleAddToCart = async (product) => {
    if (parseInt(data.medicine_available_quantity) < quantity) {
      return toast.error("Insufficient Quantity");
    } else {
      const cartItem = {
        product_id: product._id,
        product_name: product.medicine_name,
        product_image: product.medicine_image,
        product_group: product.medicine_generic,
        product_size: product.medicine_strength,
        product_formation: product.medicine_dosage_form,
        product_price_per_unit: parseFloat(product.medicine_price_per_unit),
        product_quantity: parseInt(quantity),
        product_available_quantity: parseInt(
          product.medicine_available_quantity
        ),
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
    }
  };
  return (
    <div className=" grid grid-cols-1 md:grid-cols-12 gap-2 mb-4 max-w-7xl mx-auto pt-24 dark:bg-dark-1">
      <div className=" md:col-span-10 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className=" overflow-hidden">
            <img
              src={data.medicine_image}
              className="transition hover:scale-125 duration-1000 overflow-hidden"
              alt="Product image"
            />
          </div>
          <div className="mt-10 px-6">
            <h2 className="text-xl md:text-3xl font-bold dark:text-white">
              {data.medicine_name}
            </h2>
            <p className="mt-4 flex flex-col md:flex-row md:items-center gap-2 text-base dark:text-gray-300">
              Customer Review
              <Rating style={{ maxWidth: 90 }} value={5} readOnly />
            </p>
            <div className="divider mt-10"></div>
            <p className="text-xl text-sh">
              Price: TK. {data.medicine_price_per_unit}
            </p>
            <p className="">
              {data.medicine_available_quantity === 0 ? (
                <span className="text-red-600 flex items-center">
                  <RxCross2 className="text-red-600 h-4 w-4" />
                  Out of Stock
                </span>
              ) : (
                <span className="text-sh flex items-center">
                  <AiOutlineCheck className="text-sh h-4 w-4" />
                  In Stock
                </span>
              )}
            </p>
            <ul className="pl-4 dark:text-gray-400 mt-5 list-disc">
              <li>Platea lectus est tortor et euismod hendrerit.</li>
              <li>himenaeos morbi bibendum montes.</li>
              <li>Integer ultrices tincidunt.</li>
              <li>suspendisse fusce pede quam id.</li>
            </ul>
            <div className="flex items-center gap-6 mt-4 ">
              <div className="flex">
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-lg duration-700 font-bold dark:text-white bg-sh mx-auto text-white w-8 h-8 text-center"
                >
                  +
                </button>
                <button className="w-12 md:w-16 dark:text-white">
                  {quantity}
                </button>
                <button
                  onClick={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                    }
                  }}
                  className="text-lg font-bold duration-700 dark:text-white bg-sh text-white w-8 h-8 text-center"
                >
                  -
                </button>
              </div>
              <button
                onClick={() => handleAddToCart(data)}
                className="bg-sh rounded hover:rounded-3xl text-white h-[40px] w-[120px] hover:bg-opacity-sh-70 duration-700"
              >
                {addCartLoading ? (
                  <AiOutlineLoading3Quarters className="animate-spin mx-auto h-6 w-6" />
                ) : (
                  "Add to Cart"
                )}
              </button>
            </div>
            <div className="divider mt-5"></div>
            <div className="flex items-center gap-2 mb-3">
              <p className="dark:text-gray-400">Shareit</p>
              <div className="flex gap-2">
                {socials.map((social) => (
                  <p
                    key={social.id}
                    className="w-7 h-7 flex justify-center items-center text-white px-2 bg-sh cursor-pointer hover:bg-sh hover:bg-opacity-sh-70 duration-700 rounded-md hover:scale-105"
                  >
                    {social.link}
                  </p>
                ))}
              </div>
            </div>
            <img src={payment} alt="Payment" />
          </div>
        </div>
      </div>
      <div className="shadow-2xl md:col-span-2">
        <Shipping />
      </div>
    </div>
  );
};

export default ProductDetails;
