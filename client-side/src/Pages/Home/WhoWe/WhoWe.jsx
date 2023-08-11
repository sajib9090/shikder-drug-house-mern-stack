// import { useEffect } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";

const WhoWe = () => {
  // useEffect(() => {
  //   AOS.init();
  // }, []);
  return (
    <div className="max-w-7xl mx-auto mt-28 md:mt-40 px-4 md:px-10 md:min-h-[620px] md:max-h-[620px]">
      <div className="flex md:flex-row flex-col-reverse">
        <div
          className="md:min-h-[650px] md:max-h-[650px] md:w-[52%]"
          // data-aos="fade-right"
          // data-aos-offset="100"
          // data-aos-delay="10"
          // data-aos-duration="500"
          // data-aos-easing="ease-in-out"
          // data-aos-mirror="true"
          // data-aos-once="false"
          // data-aos-anchor-placement="top-center"
        >
          <div>
            <h1 className="text-[#009E7E] text-xl md:text-2xl font-bold mt-12 mb-6">
              Who We Are?
            </h1>
            <h1 className="text-4xl md:text-5xl font-bold mb-8 max-w-lg dark:text-white">
              With us, expect more than just a pharmacy.
            </h1>
            <p className="text-gray-400 max-w-lg">
              Erat litora dignissim consectetur sit mollis. Placerat gravida
              dolor integer mollis habitant felis consectetur lorem platea ac
              hendrerit. Vitae platea massa consectetuer tristique vivamus
              vulputate suspendisse blandit.
            </p>
          </div>
        </div>
        <div
          className="md:min-h-[620px] md:max-h-[620px] md:w-[48%]"
          // data-aos="fade-left"
          // data-aos-offset="100"
          // data-aos-delay="10"
          // data-aos-duration="500"
          // data-aos-easing="ease-in-out"
          // data-aos-mirror="true"
          // data-aos-once="false"
          // data-aos-anchor-placement="top-center"
        >
          <img
            className="w-full h-full rounded-2xl"
            src="https://raw.githubusercontent.com/sajib9090/shikder-drug-house-resources/main/images/two-pharmacist.jpg"
            alt=""
          />
        </div>
      </div>
      <div className="grid grid-cols-12 md:grid-cols-12 max-w-2xl md:relative md:bottom-64 left-6 rounded-xl mt-12 md:mt-0 mb-4 md:mb-0 shadow-2xl">
        <div className="h-32 bg-[#f1f1f1] dark:bg-sh col-span-6 md:col-span-4 md:rounded-s-lg rounded-tl-lg flex flex-col justify-center items-center border-r border-[#bcbcbc75]">
          <h1 className="text-[#009E7E] dark:text-white text-5xl font-bold">
            14K+
          </h1>
          <p>Happy Customer</p>
        </div>
        <div className="h-32 bg-[#f1f1f1] dark:bg-sh col-span-6 md:col-span-4 rounded-tr-lg md:rounded-tr-none flex flex-col justify-center items-center md:border-r border-[#bcbcbc75]">
          <h1 className="text-[#009E7E] dark:text-white text-5xl font-bold">
            27K+
          </h1>
          <p>Product Sell</p>
        </div>
        <div className="h-32 bg-[#f1f1f1] dark:bg-sh col-span-12 md:col-span-4 md:rounded-e-lg rounded-b-lg md:rounded-b-none md:rounded-br-lg flex flex-col justify-center items-center border-t md:border-t-[0px] border-[#bcbcbc75]">
          <h1 className="text-[#009E7E] dark:text-white text-5xl font-bold">
            4+
          </h1>
          <p>Years Experience</p>
        </div>
      </div>
    </div>
  );
};

export default WhoWe;
