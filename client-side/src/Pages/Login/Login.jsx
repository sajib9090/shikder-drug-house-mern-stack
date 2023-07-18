import { Link } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import googleLogo from "../../assets/shikder-drug-house-resources/images/google.png";
const Login = () => {
  return (
    <div className="h-[100vh] flex flex-col justify-center items-center px-6 dark:bg-dark-1">
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
            <img className="w-10 cursor-pointer" src={googleLogo} alt="" />
          </div>
        </div>

        <div>
          <div className="divider text-gray-400">OR</div>
          <form>
            <div>
              <input
                className="py-2 my-2 md:w-[300px] rounded-3xl px-4 border border-black focus:border focus:border-green-500"
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="relative">
              <input
                className="py-2 my-2 md:w-[300px] rounded-3xl px-4 border border-black focus:border focus:border-green-500"
                type="password"
                placeholder="Password"
              />
              {/*
                <AiFillEyeInvisible className="h-5 w-5 text-sh cursor-pointer absolute right-7 md:right-4 top-[18px]" />
               */}

              <AiFillEye className="h-5 w-5 text-sh cursor-pointer absolute right-7 md:right-4 top-[18px]" />
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
              <input
                className="py-2 hover:bg-black duration-700 dark:hover:bg-white dark:hover:text-black cursor-pointer my-4 rounded-3xl bg-sh text-white w-[150px] md:w-[200px]"
                type="submit"
                value="Sign In"
              />
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
