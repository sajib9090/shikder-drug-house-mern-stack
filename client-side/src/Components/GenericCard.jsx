import { BsThreeDotsVertical } from "react-icons/bs";

const GenericCard = (props) => {
  return (
    <div className="px-4">
      <div className="shadow-2xl bg-gray-100 md:w-[300px] md:h-[40vh] p-4 relative">
        <h3>
          {props.title}: <span className="font-bold">{props.name}</span>
        </h3>
        <p className="text-xs">
          Creator Email: <br /> {props.email}
        </p>
        <p>
          <span className="text-blue-600">Status:</span>{" "}
          <span className="animate-pulse">{props.status}</span>
        </p>
        <div className="mt-2">
          <p className="text-xs">
            <span className="text-sh font-bold">Created Date:</span>{" "}
            {props.createdDate}
          </p>
        </div>
        <div className="dropdown dropdown-hover dropdown-left absolute top-2 right-2">
          <label tabIndex={0} className="cursor-pointer">
            <BsThreeDotsVertical />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-[2px] w-32 space-y-2"
          >
            <li
              onClick={props.onApproved}
              className="cursor-pointer text-sh font-semibold"
            >
              {props.approved}
            </li>
            <li
              onClick={props.onDenied}
              className="cursor-pointer text-red-600 font-semibold"
            >
              {props.denied}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GenericCard;
