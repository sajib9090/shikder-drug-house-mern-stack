import Products from "./Products";
import Shipping from "./Shipping";

const CustomersChoice = () => {
  return (
    <div className="mt-32 grid grid-cols-12 gap-x-4 max-w-7xl mx-auto md:min-h-[630px] md:max-h-[530px] dark:bg-dark">
      <div className="col-span-12 md:col-span-10 shadow-xl bg-gray-100 dark:bg-dark-1">
        <Products></Products>
      </div>
      <div className="col-span-12 md:col-span-2 shadow-xl mt-10 md:mt-0 bg-gray-100 dark:bg-dark-1">
        <Shipping></Shipping>
      </div>
    </div>
  );
};

export default CustomersChoice;
