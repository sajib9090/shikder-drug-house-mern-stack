const SingleChoice = ({ choice }) => {
  return (
    <div className="flex flex-col mb-12 md:mb-0 p-2">
      <div>
        <img src={choice.img} alt="" />
      </div>
      <div>
        <h3 className="text-base md:text-xl font-semibold my-6 dark:text-white">
          {choice.title}
        </h3>
        <h4 className="underline text-[#009F7F] text-lg mb-4">
          $ {choice.price}
        </h4>
      </div>
      <div className="mt-auto">
        <button className="btn bg-[#009F7F] border-none">Add to cart</button>
      </div>
    </div>
  );
};

export default SingleChoice;
