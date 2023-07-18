import { Link } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import googleLogo from "../../assets/shikder-drug-house-resources/images/google.png";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Password and Confirm Password does not match");
      return;
    }
  };
  return (
    <div className="h-[110vh] flex flex-col justify-center items-center px-6 dark:bg-dark-1">
      <div className="w-[90%] md:w-[70%] h-[100vh] mt-16 flex flex-col justify-center items-center">
        <div>
          <h1 className="text-xl md:text-4xl text-center font-bold dark:text-gray-300">
            Welcome to Shikder Drug House
          </h1>
        </div>
        <div>
          <p className="text-gray-400 my-2 ">Sign Up using social networks</p>
        </div>
        <div>
          <div>
            <img className="w-10 cursor-pointer" src={googleLogo} alt="" />
          </div>
        </div>

        <div>
          <div className="divider text-gray-400">OR</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                className="py-2 my-2 md:w-[300px] rounded-3xl px-4 border border-black focus:border focus:border-green-500"
                type="text"
                placeholder="Full Name"
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
                className="py-2 my-2 md:w-[300px] rounded-3xl px-4 border border-black focus:border focus:border-green-500"
                type="email"
                placeholder="Email"
                name="email"
                {...register("email", {
                  required: "Email Address is required",
                })}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <p className="text-red-700" role="alert">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="relative">
              <input
                className="py-2 my-2 md:w-[300px] rounded-3xl px-4 border border-black focus:border focus:border-green-500"
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                name="password"
                {...register("password", {
                  required: "Password is required",
                })}
                aria-invalid={errors.password ? "true" : "false"}
              />
              {errors.password && (
                <p className="text-red-700" role="alert">
                  {errors.password?.message}
                </p>
              )}
              {passwordVisible ? (
                <AiFillEyeInvisible
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="h-5 w-5 text-sh cursor-pointer absolute right-7 md:right-4 top-[18px]"
                />
              ) : (
                <AiFillEye
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="h-5 w-5 text-sh cursor-pointer absolute right-7 md:right-4 top-[18px]"
                />
              )}
            </div>
            <div className="relative">
              <input
                className="py-2 my-2 md:w-[300px] rounded-3xl px-4 border border-black focus:border focus:border-green-500"
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="Confirm Password"
                name="confirmPassword"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                })}
                aria-invalid={errors.confirmPassword ? "true" : "false"}
              />
              {errors.confirmPassword && (
                <p className="text-red-700" role="alert">
                  {errors.confirmPassword?.message}
                </p>
              )}
              {confirmPasswordVisible ? (
                <AiFillEyeInvisible
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                  className="h-5 w-5 text-sh cursor-pointer absolute right-7 md:right-4 top-[18px]"
                />
              ) : (
                <AiFillEye
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                  className="h-5 w-5 text-sh cursor-pointer absolute right-7 md:right-4 top-[18px]"
                />
              )}
            </div>

            <div className="text-center">
              <input
                className="py-2 hover:bg-black duration-700 dark:hover:bg-white dark:hover:text-black cursor-pointer my-4 rounded-3xl bg-sh text-white w-[150px] md:w-[200px]"
                type="submit"
                value="Create Account"
              />
            </div>
          </form>
          <div>
            <p className="text-center text-sm dark:text-gray-300">
              Already have an Account?
              <Link to="/login">
                <span className="cursor-pointer underline ml-2">Sign In</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
