import doctor from "../../../assets/doctor-service.json";
import Lottie from "lottie-react";
import { FaHeartbeat } from "react-icons/fa";
import { BiSolidDiscount } from "react-icons/bi";
import { RiCustomerService2Fill } from "react-icons/ri";

const WhyChoseUs = () => {
  return (
    <div className="mt-40">
      <div className="max-w-7xl mx-auto px-4 md:px-10 md:min-h-[620px] md:max-h-[920px] bg-[#FAFAFA] dark:bg-dark grid grid-cols-1 md:grid-cols-2">
        <div className="md:h-[600px]">
          <div>
            <h3 className="text-[#009F7F] pb-3">WHY CHOOSE US</h3>
            <h1 className="text-3xl md:text-4xl max-w-md dark:text-white">
              Best services available for the best customers
            </h1>
          </div>
          <div className="p-4">
            <Lottie animationData={doctor} loop={true} />
          </div>
        </div>
        <div className="grid grid-cols-1">
          <div className="pb-6 md:h-[200px]">
            <div className="bg-white dark:bg-dark-1 h-[100%] rounded-xl shadow-xl flex items-center md:items-start p-4">
              <div>
                <FaHeartbeat className="h-14 w-14 text-[#009F7F]" />
              </div>
              <div className="mt-auto pl-2 md:px-4">
                <h1 className="text-[#868686] dark:text-white text-2xl md:text-3xl font-bold pb-2 md:pb-4">
                  Honesty & transparency
                </h1>
                <p className="text-[#868686] pb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus
                  leo.
                </p>
              </div>
            </div>
          </div>
          <div className="pb-6 md:h-[200px]">
            <div className="bg-white dark:bg-dark-1 h-[100%] rounded-xl shadow-xl flex items-center md:items-start p-4">
              <div>
                <BiSolidDiscount className="h-14 w-14 text-[#009F7F]" />
              </div>
              <div className="mt-auto pl-2 md:px-4 overflow-hidden">
                <h1 className="text-[#868686] dark:text-white text-2xl md:text-3xl font-bold pb-2 md:pb-4">
                  Extra Discount
                </h1>
                <p className="text-[#868686] pb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus
                  leo.
                </p>
              </div>
            </div>
          </div>
          <div className="pb-6 md:h-[200px]">
            <div className="bg-white dark:bg-dark-1 h-[100%] rounded-xl shadow-xl flex items-center md:items-start p-4">
              <div>
                <RiCustomerService2Fill className="h-14 w-14 text-[#009F7F]" />
              </div>
              <div className="mt-auto pl-2 md:px-4 overflow-hidden">
                <h1 className="text-[#868686] dark:text-white text-2xl md:text-3xl font-bold pb-2 md:pb-4">
                  24/7 Premium Support
                </h1>
                <p className="text-[#868686] pb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus
                  leo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChoseUs;
