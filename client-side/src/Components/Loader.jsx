import { Bars } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="h-[100vh] flex flex-col justify-center z-[999]">
      <Bars
        height="80"
        width="80"
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
