import "./Promo.css";

const Promo = () => {
  return (
    <div className="max-w-7xl mx-auto mt-36 px-4 md:px-10 md:min-h-[620px] md:max-h-[620px] grid grid-cols-12 gap-4 md:grid-rows-2">
      <div className="promo1 h-[100vh] col-span-12 md:col-span-4 md:row-span-2 md:h-[100%] rounded-lg px-6 pt-8">
        <button className="bg-[#656DFF] px-8 py-1 text-white rounded-2xl font-bold">
          Promo
        </button>
        <h2 className="text-3xl font-semi-bold py-4">
          Save up to $15 on select Digital Thermometers
        </h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
      </div>
      <div className="promo2 bg-blue-600 col-span-12 md:col-span-4 h-[50vh] md:h-[100%] rounded-lg px-6 pt-8 flex flex-col">
        <h2 className="text-2xl font-bold">N95 Face Mask</h2>
        <p className="py-4 max-w-[200px]">
          Lorem ipsum dolor sit amet consectetur adipiscing elit dolor
        </p>
        <div className="mt-auto">
          <button className="bg-[#009F7F] text-white rounded-md px-5 py-1 mb-16">
            Shop now
          </button>
        </div>
      </div>
      <div className="promo3 bg-yellow-600 h-[50vh] md:h-[100%] col-span-12 md:col-span-4 rounded-lg px-6 pt-8 flex flex-col items-end">
        <h2 className="text-2xl font-bold">Daily Routine for Good Health</h2>
        <p className="py-4 max-w-[200px]">
          Lorem ipsum dolor sit amet consectetur adipiscing elit dolor
        </p>
        <div className="mt-auto">
          <button className="bg-[#009F7F] text-white rounded-md px-5 py-1 mb-16">
            Shop now
          </button>
        </div>
      </div>
      <div className="promo4 bg-gray-600 h-[50vh] md:h-[100%] col-span-12 md:col-span-8 rounded-lg px-6 pt-8 flex flex-col items-start2 justify-center">
        <h2 className="text-2xl font-bold">Natural Anti-age skin foam</h2>
        <p className="py-4 max-w-[200px]">
          Lorem ipsum dolor sit amet consectetur adipiscing elit dolor
        </p>
        <div className="mt-auto">
          <button className="bg-[#009F7F] text-white rounded-md px-5 py-1 mb-16">
            Shop now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Promo;
