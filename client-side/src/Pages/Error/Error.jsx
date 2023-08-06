import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <div className="h-[100vh] w-[100%] bg-[#FAFAFA] flex flex-col md:flex-row justify-center items-center">
      <div className="w-[100%] md:w-[50%] text-center md:text-right md:border-r md:border-[#868686] md:border-opacity-50">
        <h1 className="text-[#868686] text-6xl md:text-9xl font-extrabold md:mr-4 py-6">
          404
        </h1>
      </div>

      <div className="w-[100%] md:w-[50%] md:ml-4 text-center md:text-start space-y-3">
        <h1 className="text-3xl font-bold">Page not found</h1>
        <p className="max-w-xs text-[#868686]">
          The page you are looking for does not exist, it may have been moved,
          or removed altogether.
        </p>
        <div>
          <Link to="/">
            <button className="flex items-center px-5 text-white py-2 bg-sh hover:bg-black duration-700 font-semibold rounded-[4px] text-center mx-auto md:mx-0">
              <span className="mr-2">Back To Home</span> <AiFillHome />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
