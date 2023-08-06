import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import googleLogo from "../../assets/shikder-drug-house-resources/images/google.png";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import useAuth from "../../Hooks/UseAuth";
const SignUp = () => {
  // authentication
  const {
    createNewUserWithEmail,
    loading,
    setLoading,
    updateUserProfile,
    // logOut,
    googleSignIn,
    user,
  } = useAuth();

  // password visible not visible state
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  // form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //form data
  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Password and Confirm Password does not match");
      return;
    }

    // sign up with email
    if (user) {
      toast.error("Already logged in");
      return;
    } else {
      createNewUserWithEmail(data.email, data.password)
        .then((userCredential) => {
          const user = userCredential.user;
          updateUserProfile(data.name)
            .then(() => {
              toast.success("User created successfully");
              // logOut();
              navigate(from, { replace: true });
              // save user information inside database
              const saveUser = {
                name: data.name,
                email: data.email,
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
                  // console.log(data.insertedId);
                  if (data.insertedId) {
                    // toast.success("User created successfully");
                    // logOut();
                    navigate(from, { replace: true });
                  } else {
                    toast.error("Something went wrong");
                  }
                })
                .catch(() => {
                  setLoading(false);
                  toast.error(`Account created failed`);
                });
            })
            .catch((error) => {
              console.log(error);
              setLoading(false);
            });
        })
        .catch((error) => {
          setLoading(false);
          const errorMessage = error.message;
          if (
            errorMessage ==
            "Firebase: Password should be at least 6 characters (auth/weak-password)."
          ) {
            toast.error("Password should be at least six characters.");
          }
          if (errorMessage == "Firebase: Error (auth/email-already-in-use).") {
            toast.error("Email already used. Try with another email");
            console.log(errorMessage);
          }
        });
    }
  };

  // google sign up
  const handleGoogleSignUp = () => {
    if (user) {
      toast.error("Already logged in");
    } else {
      googleSignIn()
        .then((result) => {
          toast.success("User created successfully");
          navigate(from, { replace: true });
          const user = result.user;
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
              console.log(data);
              if (data.insertedId) {
                // toast.success("User created successfully");
                navigate(from, { replace: true });
              }
            })
            .catch(() => {
              setLoading(false);
            });
        })
        .catch((error) => {
          const errorMessage = error.message;
          setLoading(false);
          console.log(errorMessage);
        });
    }
  };

  return (
    <div className="h-[110vh] max-w-7xl mx-auto flex flex-col justify-center items-center px-6 dark:bg-dark-1">
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
            <img
              onClick={handleGoogleSignUp}
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
              <button
                type="submit"
                value="create account"
                className="h-[43px] hover:bg-black duration-700 dark:hover:bg-white dark:hover:text-black cursor-pointer my-4 rounded-3xl bg-sh text-white w-[150px] md:w-[200px]"
              >
                {loading ? (
                  <span className="loading loading-dots loading-lg "></span>
                ) : (
                  "Create Account"
                )}
              </button>
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
