import { useEffect } from "react";
import { useState } from "react";
import useAuth from "../../Hooks/UseAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import defaultIcon from "../../assets/shikder-drug-house-resources/images/defaultIcon.png";
import { useForm } from "react-hook-form";
import axios from "axios";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

const Profile = () => {
  const { user, logOut, loading, setLoading, updateUserProfilePhoto } =
    useAuth();
  const [savedUser, setSavedUser] = useState([]);
  const [imageSizeError, setImageSizeError] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Log Out success");
        navigate("/");
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/users/${user && user?.email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSavedUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // user profile photo change
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    //image upload
    const image = e.target.image.files[0];
    const formData = new FormData();
    formData.append("image", image);

    // Check the file size before uploading
    if (image && image.size > 1024 * 1024) {
      // Set the error state to true if the image size exceeds 1 MB

      setImageSizeError(true);
      return;
    } else {
      setImageSizeError(false);
      try {
        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMG_BB_KEY
          }`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          // Handle the error, if the response is not ok
          toast.error("Photo upload failed");
          return;
        }

        const imgData = await response.json();
        const imgURL = imgData.data.display_url;

        try {
          await updateUserProfilePhoto(imgURL);

          const updatedUserProfile = {
            image: imgURL,
          };

          const putResponse = await fetch(
            `${import.meta.env.VITE_API_URL}/users/${user.email}`,
            {
              method: "PUT",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(updatedUserProfile),
            }
          );

          const data = await putResponse.json();
          if (data.modifiedCount > 0) {
            setLoading(false);
            toast.success("Profile Photo updated");
          }
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (user && user?.email) {
      setIsLoading(true);
      const sellerInformation = {
        shopName: data.shop,
        address: data.address,
        paymentMethod: data.paymentMethod,
        isSellerRequest: true,
      };
      axios
        .put(
          `${import.meta.env.VITE_API_URL}/seller/request/${user?.email}`,
          sellerInformation
        )
        .then((res) => {
          if (res.data.acknowledged) {
            toast.success("Request send please wait for admin approval.");
            setIsLoading(false);
            navigate("/");
          }
        })
        .catch((err) => {
          if (err) {
            toast.error("Something went wrong try again.");
            setIsLoading(false);
          }
        });
    }
  };

  return (
    <div className="bg-white dark:bg-dark-1">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center">
          <div className=" bg-gray-200 dark:bg-dark-2 min-h-[100vh] w-[90%] mx-auto md:w-[500px] shadow-xl">
            <div className="mt-24">
              <h2 className="text-center text-sh font-bold text-xl">Profile</h2>
            </div>
            <div className="flex justify-center mt-6">
              <div className="avatar ">
                <div className="w-24 rounded-full ring ring-[#009e7e] ring-offset-2">
                  <img
                    src={user && user?.photoURL ? user.photoURL : defaultIcon}
                  />
                </div>
              </div>
            </div>
            <div className="mt-2">
              <h3 className="text-center text-xl font-bold dark:text-white">
                {user && user?.displayName}
              </h3>
              <p className="text-center text-gray-500 font-medium">
                {user && user?.email}
              </p>
            </div>
            <div className="divider"></div>
            <div className="flex flex-col justify-center items-center space-y-2">
              <div>
                {savedUser?.isSellerRequest === true ||
                savedUser?.role === "seller" ? (
                  <>
                    {savedUser?.role === "seller" ? (
                      ""
                    ) : (
                      <h3 className="text-sh underline cursor-pointer my-4">
                        Seller request pending...
                      </h3>
                    )}
                  </>
                ) : (
                  <Accordion allowZeroExpanded>
                    <AccordionItem>
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          <h3 className="text-sh underline cursor-pointer my-4">
                            Want to become a seller?
                          </h3>
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <form className="" onSubmit={handleSubmit(onSubmit)}>
                          <div>
                            <p className="text-sh">Email (Unchangable)</p>
                            <input
                              className="py-2 my-2 md:w-[300px] rounded-3xl px-4 border border-black focus:border focus:border-green-500"
                              type="text"
                              placeholder={savedUser?.email}
                              defaultValue={savedUser?.email}
                              readOnly
                            />
                          </div>
                          <div>
                            <p className="text-sh">Shop Name*</p>
                            <input
                              className="py-2 my-2 md:w-[300px] rounded-3xl px-4 border border-black focus:border focus:border-green-500"
                              type="text"
                              placeholder="Enter shop name"
                              name="shop"
                              {...register("shop", {
                                required: "Shop name is required",
                              })}
                              aria-invalid={errors.strength ? "true" : "false"}
                            />
                            {errors.shop && (
                              <p className="text-red-700" role="alert">
                                {errors.shop?.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <p className="text-sh">Details Address*</p>
                            <input
                              className="py-2 my-2 md:w-[300px] rounded-3xl px-4 border border-black focus:border focus:border-green-500"
                              type="text"
                              placeholder="Enter details address"
                              name="address"
                              {...register("address", {
                                required: "Address name is required",
                              })}
                              aria-invalid={errors.address ? "true" : "false"}
                            />
                            {errors.address && (
                              <p className="text-red-700" role="alert">
                                {errors.address?.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <p className="text-sh">Select payment method*</p>
                            <select
                              className="py-2 my-2 md:w-[300px] w-[220px] rounded-3xl px-4 border border-black focus:border focus:border-green-500"
                              name="paymentMethod"
                              {...register("paymentMethod", {
                                required: "Payment Method is required",
                              })}
                              aria-invalid={
                                errors.paymentMethod ? "true" : "false"
                              }
                            >
                              <option value="bank">Bank</option>
                              <option value="bkash">BKash</option>
                              <option value="nagad">Nagad</option>
                              <option value="rocket">Rocket</option>
                            </select>
                            {errors.paymentMethod && (
                              <p className="text-red-700" role="alert">
                                {errors.paymentMethod.message}
                              </p>
                            )}
                          </div>
                          <div className="text-center">
                            <button
                              type="submit"
                              value="submit"
                              className="h-[43px] hover:bg-black duration-700 cursor-pointer my-4 rounded-3xl bg-sh text-white w-[150px] md:w-[200px]"
                            >
                              {isLoading ? (
                                <span className="loading loading-dots loading-lg "></span>
                              ) : (
                                "Submit"
                              )}
                            </button>
                          </div>
                        </form>
                      </AccordionItemPanel>
                    </AccordionItem>
                  </Accordion>
                )}
              </div>
              <div>
                <div className="collapse collapse-arrow dark:bg-dark">
                  <input type="radio" name="my-accordion-2" />
                  <div className="collapse-title text-lg font-medium text-sh dark:text-white">
                    Want to Change Profile photo?
                  </div>
                  <div className="collapse-content">
                    <form onSubmit={handleProfileSubmit}>
                      <input
                        className="px-2 py-3 w-[100%] text-sh dark:text-white rounded-md outline-1 outline-[#007CFF]"
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                      />
                      {imageSizeError && (
                        <p className="text-red-500 py-2">
                          File size must be below 1 MB.
                        </p>
                      )}
                      <button
                        className="hover:bg-black duration-700 dark:hover:bg-white dark:hover:text-black cursor-pointer rounded-3xl bg-sh text-white h-[33px] w-[70px] md:w-[100px]"
                        type="submit"
                        value="save"
                      >
                        {loading ? (
                          <span className="loading loading-dots loading-lg "></span>
                        ) : (
                          "Save"
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="">
                <button
                  onClick={handleLogOut}
                  className="mb-8 h-[33px] hover:bg-black duration-700 dark:hover:bg-white dark:hover:text-black cursor-pointer rounded-3xl bg-red-800 text-white w-[150px] md:w-[200px]"
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
