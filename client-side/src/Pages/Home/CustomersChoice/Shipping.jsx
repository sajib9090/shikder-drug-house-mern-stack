import { HiTruck } from "react-icons/hi";
import { TbClockShield } from "react-icons/tb";
import { BsShieldLockFill } from "react-icons/bs";

const Shipping = () => {
  return (
    <div className="shadow-xl md:h-[630px] rounded-md">
      <div className="h-1/3 object-cover p-4">
        <div className="flex items-center justify-center">
          <HiTruck className="h-14 w-14 text-[#1DAB89]" />
        </div>
        <div className="text-center">
          <h2 className="text-xl text-[#1DAB89]">International Shipment</h2>
          <small className="text-gray-400">
            Your orders are shipped seamlessly between countries
          </small>
        </div>
      </div>
      <div className="h-1/3 object-cover p-4">
        <div className="flex items-center justify-center">
          <TbClockShield className="h-14 w-14 text-[#1DAB89]" />
        </div>
        <div className="text-center">
          <h2 className="text-xl text-[#1DAB89]">Secure Payment</h2>
          <small className="text-gray-400">
            Your orders are shipped seamlessly between countries
          </small>
        </div>
      </div>
      <div className="h-1/3 object-cover p-4">
        <div className="flex items-center justify-center">
          <BsShieldLockFill className="h-14 w-14 text-[#1DAB89]" />
        </div>
        <div className="text-center">
          <h2 className="text-xl text-[#1DAB89]">30 Days Warranty</h2>
          <small className="text-gray-400">
            Your orders are shipped seamlessly between countries
          </small>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
