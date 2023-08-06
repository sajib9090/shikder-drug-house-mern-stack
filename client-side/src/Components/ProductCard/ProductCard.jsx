import { Link } from "react-router-dom";

const ProductCard = (props) => {
  const disabledClass = props.isDisabled ? "grayscale" : "";
  const linkProps = props.isDisabled ? {} : { to: props.to };
  return (
    <div
      className={`flex flex-col mb-12 md:mb-0 p-2 shadow-2xl pb-4 ${disabledClass}`}
    >
      <div>
        <img
          className="max-h-[200px] md:max-h-[300px] hover:scale-105 duration-500"
          src={props.img}
          alt=""
        />
      </div>
      <div>
        <Link to={props.to} className="block">
          <h3 className="text-base md:text-xl font-semibold my-6 dark:text-white ">
            {props.title}
          </h3>
        </Link>
        <h4 className="underline text-[#009F7F] text-lg mb-4">
          TK. {props.price}
        </h4>
      </div>
      <div className="mt-auto">
        <button
          onClick={props.handleButtonClick}
          disabled={props.isDisabled}
          className="bg-[#009F7F] border-none text-xs md:text-sm hover:bg-sh duration-700 text-white px-5 py-2 md:py-3 hover:bg-sh hover:bg-opacity-sh-75 rounded-3xl w-[100px] "
        >
          {props.button}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
