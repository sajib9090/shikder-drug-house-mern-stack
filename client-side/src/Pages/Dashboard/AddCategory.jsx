import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";

const AddCategory = () => {
  const data = useLoaderData();
  const { handleSubmit, control, setValue } = useForm();
  const navigate = useNavigate();

  const onSubmit = (category) => {
    const modifyCategory = {
      category: category.category,
    };

    axios
      .put(
        `${import.meta.env.VITE_API_URL}/product/category/${data._id}`,
        modifyCategory
      )
      .then((res) => {
        toast.success("Category Updated");
        navigate("/dashboard/manageProducts");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="max-w-7xl mx-auto pt-6 md:pt-0">
      <div className="max-w-md mx-auto">
        <p>Name: {data.medicine_name}</p>
        <p>Group: {data.medicine_generic}</p>
        <p>Formation: {data.medicine_dosage_form}</p>
        <p>Price Per Unit: {data.medicine_price_per_unit}</p>
        <p>Quantity: {data.medicine_available_quantity}</p>
        <p>Made in: {data.medicine_country}</p>
        <p>Category: {data?.category ? data.category : "No category"}</p>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center">
              <Controller
                name="category"
                control={control}
                defaultValue=""
                rules={{ required: "Please select a category" }}
                render={({ field, fieldState }) => (
                  <select
                    {...field}
                    className="bg-sh px-6 py-2 text-white"
                    onChange={(e) => {
                      setValue("category", e.target.value);
                    }}
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    <option value="latest">Latest</option>
                    <option value="customer_choice">Customer Choice</option>
                  </select>
                )}
              />
              <button
                className="bg-sh px-4 py-[7px] ml-2 text-white"
                type="submit"
              >
                Add Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
