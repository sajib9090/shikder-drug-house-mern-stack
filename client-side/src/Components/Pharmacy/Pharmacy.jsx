const Pharmacy = (props) => {
  return (
    <div className="h-full rounded-lg shadow-2xl dark:bg-dark-1">
      <div>
        <img className="rounded-t-lg" src={props.image} alt="" />
      </div>
      <div className="flex flex-col justify-center items-center mt-5">
        <h2 className="text-3xl text-[#55595C] font-semibold tracking-wider">
          {props.title}
        </h2>
        <p className="text-center max-w-xs my-3 dark:text-white">
          {props.description}
        </p>
        <button className="bg-sh px-4 py-2 text-white rounded-3xl hover:bg-opacity-sh-70 duration-700 mb-4">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Pharmacy;
