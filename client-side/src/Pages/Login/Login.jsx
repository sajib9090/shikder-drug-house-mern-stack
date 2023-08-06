import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import googleLogo from "../../assets/shikder-drug-house-resources/images/google.png";
import useAuth from "../../Hooks/UseAuth";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
const Login = () => {
  // authentication
  const { user, loading, setLoading, googleSignIn, signInWithEmail } =
    useAuth();
  // password visible not visible state
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //form data
  const onSubmit = (data) => {
    if (user) {
      toast.error("Already logged in");
      return;
    } else {
      signInWithEmail(data.email, data.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          reset();
          toast.success("Login Success");
          navigate(from, { replace: true });
        })
        .catch((error) => {
          const errorMessage = error.message;
          setLoading(false);
          console.log(errorMessage);
          if (errorMessage == "Firebase: Error (auth/wrong-password).") {
            toast.error("Wrong Password");
          }
        });
    }
  };

  const handleGoogleSignIn = () => {
    if (user && user) {
      toast.error("User already logged in");
    } else {
      googleSignIn()
        .then((result) => {
          const user = result.user;
          navigate(from, { replace: true });
          toast.success("Login successfully");

          const saveUser = {
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
          };

          fetch(`${import.meta.env.VITE_API_URL}/add/users`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(saveUser),
          })
            .then((res) => res.json())
            .then((data) => {
              // console.log(data);
              if (data.insertedId) {
                navigate(from, { replace: true });
                // toast.success("User Login successfully");
              }
            })
            .catch(() => {
              setLoading(false);
            });
        })
        .catch((error) => {
          setLoading(false);
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    }
  };

  return (
    <div className="h-[100vh] max-w-7xl mx-auto flex flex-col justify-center items-center px-6 dark:bg-dark-1">
      <div className="w-[90%] md:w-[70%] h-[100vh] mt-16 flex flex-col justify-center items-center">
        <div>
          <h1 className="text-3xl md:text-4xl text-center font-bold dark:text-gray-300">
            Login to Your Account
          </h1>
        </div>
        <div>
          <p className="text-gray-400 my-2 ">Login using social networks</p>
        </div>
        <div>
          <div>
            <img
              onClick={handleGoogleSignIn}
              className="w-10 cursor-pointer"
              src={googleLogo}
              alt=""
            />
          </div>
        </div>

        <div>
          <div className="divider text-gray-400">OR</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                className="py-2 my-2 md:w-[300px] rounded-3xl px-4 border border-black focus:border focus:border-green-500"
                type="email"
                placeholder="Email"
                name="email"
                {...register("email", {
                  required: "Email is required",
                })}
                aria-invalid={errors.name ? "true" : "false"}
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
            <label className="">
              <a
                href="#"
                className="label-text-alt text-sh link link-hover dark:text-white"
              >
                Forgot password?
              </a>
            </label>
            <div className="text-center">
              <button
                type="submit"
                value="login"
                className="h-[43px] hover:bg-black duration-700 dark:hover:bg-white dark:hover:text-black cursor-pointer my-4 rounded-3xl bg-sh text-white w-[150px] md:w-[200px]"
              >
                {loading ? (
                  <span className="loading loading-dots loading-lg "></span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
          <div>
            <p className="text-center text-sm dark:text-gray-300">
              New to Shikder Drug House?
              <Link to="/signUp">
                <span className="cursor-pointer underline ml-2">Sign Up</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
