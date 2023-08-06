import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/UseAuth";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState } from "react";

const AddGeneric = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  // form hook
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    const addGenericInfo = {
      generic: data.generic,
      sellerEmail: user.email,
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/add/generic`, addGenericInfo)
      .then((res) => {
        // console.log(res.data);
        if (res.data.acknowledged) {
          toast.success("Added successfully.");
          setLoading(false);
          reset();
        } else {
          toast.error(res.data.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        // console.log(err.message)
        toast.error(err.message);
        setLoading(false);
      });
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
                  placeholder="Generic Name"
                  name="generic"
                  {...register("generic", {
                    required: "generic is required",
                  })}
                  aria-invalid={errors.generic ? "true" : "false"}
                />
                {errors.generic && (
                  <p className="text-red-700" role="alert">
                    {errors.generic?.message}
                  </p>
                )}
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  value="submit"
                  className="h-[43px] hover:bg-black duration-700 cursor-pointer my-4 rounded-3xl bg-sh text-white w-[150px] md:w-[200px]"
                >
                  {loading ? (
                    <span className="loading loading-dots loading-lg "></span>
                  ) : (
                    "Add Generic"
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

export default AddGeneric;
