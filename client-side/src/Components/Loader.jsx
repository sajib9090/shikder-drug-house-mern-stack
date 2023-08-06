import { Bars } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="h-[100vh] flex flex-col justify-center items-center z-[999]">
      <Bars
        height="60"
        width="60"
        color="#009e7e"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
