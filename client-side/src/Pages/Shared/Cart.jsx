import { CiCircleRemove } from "react-icons/ci";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useGetCart from "../../Hooks/useGetCart";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import Marquee from "react-fast-marquee";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Cart = () => {
  const [getCarts, getCartRefetch] = useGetCart();
  const [cartLoadingMinus, setCartLoadingMinus] = useState(false);
  const [cartLoadingPlus, setCartLoadingPlus] = useState(false);

  const deliveryCharge = 60;

  const subTotal = getCarts
    .reduce(
      (sum, item) => item.product_price_per_unit * item.product_quantity + sum,
      0
    )
    .toFixed(2);

  const handlePlus = async (cart) => {
    if (cart.product_quantity === cart.product_available_quantity) {
      return toast.error("Insufficient Quantity.");
    }
    setCartLoadingPlus(true);
    try {
      const updateCart = {
        product_quantity: cart.product_quantity + 1,
      };

      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/carts/update/${cart?._id}`,
        updateCart
      );

      if (response.data === "Cart updated successfully.") {
        getCartRefetch();
        setCartLoadingPlus(false);
      }
    } catch (error) {
      console.error(error);
      setCartLoadingPlus(false);
    }
  };
  const handleMinus = async (cart) => {
    if (cart.product_quantity === 1) {
      return toast.error("Required minimum quantity one.");
    }
    setCartLoadingMinus(true);
    try {
      const updateCart = {
        product_quantity: cart.product_quantity - 1,
      };

      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/carts/update/${cart?._id}`,
        updateCart
      );

      if (response.data === "Cart updated successfully.") {
        getCartRefetch();
        setCartLoadingMinus(false);
      }
    } catch (error) {
      console.error(error);
      setCartLoadingMinus(false);
    }
  };

  const handleDelete = (cart) => {
    // console.log(cart);
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this from cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${import.meta.env.VITE_API_URL}/cartItemDelete/${cart?._id}`)
          .then((res) => {
            if (res.data.acknowledged) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              getCartRefetch();
            }
          })
          .catch((err) => {
            console.log(err);
            toast.error("Something went wrong");
          });
      }
    });
  };

  return (
    <div className="pt-24 max-w-7xl mx-auto dark:bg-dark-1 min-h-screen">
      <div className="flex items-center justify-between px-4 md:px-6 mb-4">
        <h3 className="text-black dark:text-white font-semibold text-lg md:text-2xl">
          Your Cart - {getCarts.length} items
        </h3>
        <p className="underline text-sh font-medium md:font-bold text-base md:text-lg cursor-pointer animate-pulse">
          History
        </p>
      </div>
      {getCarts?.length === 0 ? (
        <div className="h-[65vh] flex flex-col justify-center items-center">
          <h1 className="text-3xl text-center dark:text-white font-medium">
            Your Cart is empty.. <br className="md:hidden" />
            <Link className="text-sh underline" to={"/shop"}>
              Please Add Product
            </Link>
            .
          </h1>
        </div>
      ) : (
        <>
          <div>
            <h3 className="text-center font-semibold text-lg my-4 dark:text-white">
              Total Price: TK.{" "}
              <span className="font-extrabold text-sh">{subTotal}</span>
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>
                    <label className="dark:text-white">No.</label>
                  </th>
                  <th className="dark:text-white">Items</th>
                  <th className="dark:text-white">Price</th>
                  <th className="dark:text-white">Quantity</th>
                  <th className="dark:text-white">Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {getCarts?.map((cart, index) => (
                  <tr key={cart._id}>
                    <th>
                      <label>
                        <p className="dark:text-white">{index + 1}</p>
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={cart?.product_image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold dark:text-white">
                            {cart?.product_name.length > 20
                              ? cart?.product_name.slice(0, 20) + "..."
                              : cart?.product_name}
                          </div>
                          <div className="text-sm opacity-50 dark:text-gray-200">
                            {cart?.product_group.length > 20
                              ? cart?.product_group.slice(0, 20) + "..."
                              : cart?.product_group}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="dark:text-white">
                        TK. {cart?.product_price_per_unit}
                      </p>
                    </td>
                    <td>
                      <div className="flex items-center">
                        <button
                          onClick={() => handlePlus(cart)}
                          className="bg-sh rounded-l-sm py-1 px-2 font-bold w-[40px] h-[34px] text-base text-white "
                        >
                          {cartLoadingPlus ? (
                            <>
                              <AiOutlineLoading3Quarters className="animate-spin" />
                            </>
                          ) : (
                            "+"
                          )}
                        </button>
                        <button className="w-[50px] border border-gray-300 py-1 dark:text-white font-bold text-base px-2">
                          {cart?.product_quantity}
                        </button>
                        <button
                          onClick={() => handleMinus(cart)}
                          className="bg-red-500 w-[40px] h-[34px] rounded-r-sm py-1 px-2 font-bold text-base text-white"
                        >
                          {cartLoadingMinus ? (
                            <>
                              <AiOutlineLoading3Quarters className="animate-spin" />
                            </>
                          ) : (
                            "-"
                          )}
                        </button>
                      </div>
                    </td>
                    <th>
                      <button className="btn btn-ghost btn-xs dark:text-white">
                        TK.{" "}
                        {(
                          cart?.product_price_per_unit * cart?.product_quantity
                        ).toFixed(2)}
                      </button>
                    </th>
                    <th>
                      <button onClick={() => handleDelete(cart)} className="">
                        <CiCircleRemove className="h-6 w-6 dark:text-white" />
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-12 mx-4 md:mx-0">
            <div className="text-center my-6">
              <Marquee speed={90}>
                <p className="tracking-wider dark:text-white">
                  If you want to delivery charge free. Please order more than{" "}
                  <span className="font-bold text-sh">1000</span> TK.
                </p>
              </Marquee>
            </div>
            <div className="max-w-sm mx-auto">
              <div className="flex justify-between">
                <p className="dark:text-white">Sub Total:</p>
                <p className="dark:text-white">
                  TK. <span className="text-sh font-bold">{subTotal}</span>
                </p>
              </div>
              <div className="divider my-0 dark:border-b dark:border-white"></div>
              <div className="flex justify-between">
                <p className="dark:text-white">Delivery Charge:</p>
                <p className="dark:text-white">
                  TK.{" "}
                  <span className="text-sh font-bold">
                    {subTotal > 1000 ? "Free" : deliveryCharge}
                  </span>
                </p>
              </div>
              <div className="divider my-0 dark:border-b dark:border-white"></div>
              <div className="flex justify-between">
                <p className="dark:text-white">Grand Total:</p>
                <p className="dark:text-white">
                  TK.{" "}
                  <span className="text-sh font-bold">
                    {subTotal > 1000
                      ? subTotal
                      : (parseFloat(subTotal) + deliveryCharge).toFixed(2)}
                  </span>
                </p>
              </div>
              <div className="divider my-0 dark:border-b dark:border-white"></div>
              <div className="text-right pb-10 mt-2">
                <button className="bg-sh py-[5px] px-6 text-white rounded-3xl animate-bounce hover:animate-none hover:bg-opacity-sh-75 duration-700">
                  Check Out
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
