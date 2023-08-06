import { useForm, Controller } from "react-hook-form";
import useAuth from "../../Hooks/UseAuth";

import useCountryData from "../../Hooks/UseCountryData";
import Select from "react-select";
import { toast } from "react-hot-toast";
import { useState } from "react";
import UseDosageForm from "../../Hooks/UseDosageForm";
import UseApprovedStatusFilter from "../../Hooks/UseApprovedStatusFilter";
import UseManufacturer from "../../Hooks/UseManufacturer";
import axios from "axios";

const AddProduct = () => {
  const { loading, setLoading, user } = useAuth();
  const { countryData } = useCountryData();
  const { dosageFormData } = UseDosageForm();
  const { manufacturerData } = UseManufacturer();
  const [selectedOption, setSelectedOption] = useState(null);
  const [generics, setGenerics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const filteredDosageForm = UseApprovedStatusFilter(dosageFormData);
  const filteredManufacturer = UseApprovedStatusFilter(manufacturerData);
  const temp = [];
  const defaultOption = {
    label: "Select generic",
    value: "",
  };

  const handleGenericChange = (inputValue, actionMeta) => {
    if (inputValue) {
      try {
        (async () => {
          const data = await fetch(
            `${import.meta.env.VITE_API_URL}/get/generic/${inputValue}`
          );
          const result = await data.json();
          const generic = result.map((g) => {
            const option = {
              label: g.generic,
              value: g.generic,
            };
            temp.push(option);
          });
          setGenerics(temp);
        })();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("image", data.product_img[0]);
      const url = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMG_BB_KEY
      }`;
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const imgData = await response.json();
      const imgURL = imgData.data.display_url;

      const saveProduct = {
        medicine_name: data.name,
        medicine_image: imgURL,
        medicine_generic: data.generic.value,
        medicine_manufacturer: data.manufacturer,
        medicine_strength: data.strength,
        medicine_dosage_form: data.dosage_form,
        medicine_price_per_unit: data.price,
        medicine_available_quantity: data.available_quantity,
        medicine_country: data.country,
        seller_email: user.email,
        isBanned: false,
      };

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/add/product`,
          saveProduct
        );
        if (response.statusText === "OK") {
          setIsLoading(false);
          toast.success("Product added successfully.");
          reset();
        }
      } catch (error) {
        console.log(error.message);
        if (error.message === "Request failed with status code 404") {
          toast.error("Product added unsuccessfully.");
          setIsLoading(false);
        }
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <div className="max-w-7xl mx-auto mt-6 md:mt-0">
      <div className="max-w-7xl mx-auto flex flex-col justify-center items-center px-6">
        <div className="w-[90%] md:w-[70%] mt-16 flex flex-col justify-center items-center">
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <input
                  className="py-2 my-2 md:w-[300px] rounded-3xl px-4 border border-black focus:border focus:border-green-500"
                  type="text"
                  placeholder="Medicine Name"
                  name="name"
                  {...register("name", {
                    required: "Name is required",
                  })}
                  aria-invalid={errors.name ? "true" : "false"}
                />
                {errors.name && (
                  <p className="text-red-700" role="alert">
                    {errors.name?.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  className="px-2 py-3 w-[100%] text-sh dark:text-white rounded-md outline-1 outline-[#007CFF]"
                  type="file"
                  id="product_img"
                  name="product_img"
                  accept="image/*"
                  {...register("product_img", {
                    required: "Product image is required",
                    validate: (fileList) => {
                      if (fileList.length === 0) {
                        return "Please select an image";
                      }
                      const file = fileList[0];
                      if (file.size > 1 * 1024 * 1024) {
                        return "Image size should be less than 1MB";
                      }
                      return true;
                    },
                  })}
                  aria-invalid={errors.product_img ? "true" : "false"}
                />
                {errors.product_img && (
                  <p className="text-red-700" role="alert">
                    {errors.product_img.message}
                  </p>
                )}
              </div>
              <div>
                <Controller
                  name="generic"
                  control={control}
                  rules={{ required: "Generic is required" }}
                  render={({ field }) => (
                    <div>
                      <Select
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: state.isFocused ? "black" : "black",
                            borderRadius: "20px",
                            padding: "2px",
                            width: "220px",
                          }),
                        }}
                        {...field}
                        defaultValue={defaultOption}
                        onChange={(value) => {
                          setSelectedOption(value);
                          field.onChange(value);
                        }}
                        onInputChange={handleGenericChange}
                        options={generics}
                        isSearchable
                        aria-invalid={!!errors.generic}
                      />
                      {errors.generic && (
                        <p className="text-red-700" role="alert">
                          {errors.generic.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>

              <div>
                <select
                  className="py-2 my-2 md:w-[300px] w-[220px] rounded-3xl px-4 border border-black focus:border focus:border-green-500"
                  name="manufacturer"
                  {...register("Manufacturer", {
                    required: "dosage_form is required",
                  })}
                  aria-invalid={errors.manufacturer ? "true" : "false"}
                >
                  <option value="" disabled selected>
                    Manufacturer
                  </option>
                  {filteredManufacturer.map((m) => (
                    <option key={m._id} value={m.manufacturer}>
                      {m.manufacturer}
                    </option>
                  ))}
                </select>
                {errors.manufacturer && (
                  <p className="text-red-700" role="alert">
                    {errors.manufacturer?.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  className="py-2 my-2 md:w-[300px] rounded-3xl px-4 border border-black focus:border focus:border-green-500"
                  type="text"
                  placeholder="mg/ml"
                  name="strength"
                  {...register("strength", {
                    required: "strength is required",
                  })}
                  aria-invalid={errors.strength ? "true" : "false"}
                />
                {errors.strength && (
                  <p className="text-red-700" role="alert">
                    {errors.strength?.message}
                  </p>
                )}
              </div>

              <div>
                <select
                  className="py-2 my-2 w-[220px] md:w-[300px] rounded-3xl px-4 border border-black focus:border focus:border-green-500"
                  name="dosage_form"
                  {...register("dosage_form", {
                    required: "dosage_form is required",
                  })}
                  aria-invalid={errors.dosage_form ? "true" : "false"}
                >
                  <option value="" disabled selected>
                    tab/cap/syrup
                  </option>
                  {filteredDosageForm.map((d) => (
                    <option key={d._id} value={d.dosageForm}>
                      {d.dosageForm}
                    </option>
                  ))}
                </select>
                {errors.dosage_form && (
                  <p className="text-red-700" role="alert">
                    {errors.dosage_form?.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  className="py-2 my-2 md:w-[300px] rounded-3xl px-4 border border-black focus:border focus:border-green-500"
                  type="text"
                  placeholder="Price per unit"
                  name="price"
                  {...register("price", {
                    required: "Price is required",
                    pattern: {
                      value: /^(?!-)[0-9]*(\.\d+)?$/,
                      message: "Invalid price format",
                    },
                  })}
                  aria-invalid={errors.price ? "true" : "false"}
                />
                {errors.price && (
                  <p className="text-red-700" role="alert">
                    {errors.price?.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  className="py-2 my-2 md:w-[300px] rounded-3xl px-4 border border-black focus:border focus:border-green-500"
                  type="number"
                  placeholder="Available Quantity"
                  name="available_quantity"
                  {...register("available_quantity", {
                    required: "Quantity is required",
                    validate: (value) => {
                      if (value < 0) {
                        return "Quantity cannot be negative";
                      }
                      return true;
                    },
                  })}
                  aria-invalid={errors.available_quantity ? "true" : "false"}
                />
                {errors.available_quantity && (
                  <p className="text-red-700" role="alert">
                    {errors.available_quantity.message}
                  </p>
                )}
              </div>
              <div>
                <select
                  className="py-2 my-2 w-[220px] md:w-[300px] rounded-3xl px-4 border border-black focus:border focus:border-green-500"
                  name="country"
                  {...register("country", {
                    required: "Country is required",
                  })}
                  aria-invalid={errors.country ? "true" : "false"}
                >
                  <option value="" disabled selected>
                    Made by country
                  </option>
                  {countryData.map((country) => (
                    <option key={country._id} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <p className="text-red-700" role="alert">
                    {errors.country?.message}
                  </p>
                )}
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  value="create account"
                  className="h-[43px] hover:bg-black duration-700 cursor-pointer my-4 rounded-3xl bg-sh text-white w-[150px] md:w-[200px]"
                >
                  {isLoading ? (
                    <span className="loading loading-dots loading-lg "></span>
                  ) : (
                    "Add Product"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
