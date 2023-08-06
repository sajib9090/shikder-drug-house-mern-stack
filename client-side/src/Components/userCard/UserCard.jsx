import { BsThreeDotsVertical, BsTrashFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

const UserCard = (props) => {
  return (
    <div className="md:h-[140px] shadow-2xl bg-[#F2F2F2] flex flex-col md:flex-row pl-2 md:pl-4 rounded-md py-4 md:py-0">
      <div className="h-full flex items-center justify-center relative">
        <div className="avatar">
          <div className="w-16 md:w-20 rounded-full ring ring-[#009e7e]">
            <img src={props.image} />
          </div>
        </div>
        <div className="absolute top-0 md:top-2 left-0">
          <p className="font-semibold text-[8px] text-[#bebebe]">
            {props.index}
          </p>
        </div>
      </div>
      <div className="h-full flex items-center justify-center text-center md:text-start">
        <div className="space-y-1 md:space-y-2 ml-2 md:ml-4">
          <h3 className="font-semibold text-gray-500">{props.name}</h3>
          <p className="text-gray-400 text-sm">{props.email}</p>
          <p className="font-extrabold">{props.role}</p>
        </div>
      </div>
      <div className="ml-auto hidden md:block">
        <details className="dropdown dropdown-end">
          <summary className="btn hover:bg-[#F2F2F2]">
            <BsThreeDotsVertical />
          </summary>
          <ul className="p-2 shadow  menu dropdown-content z-[1] bg-[#F2F2F2] w-28">
            <li>
              <p className="hover:bg-[#F2F2F2] hover:underline text-sh duration-700">
                {props.edit} <FaEdit />
              </p>
            </li>
            <li>
              <p className="hover:bg-[#F2F2F2] hover:underline text-red-600 duration-700">
                {props.delete} <BsTrashFill />
              </p>
            </li>
          </ul>
        </details>
      </div>
      <div className="ml-auto md:hidden block absolute right-7 ">
        <details className="dropdown dropdown-end">
          <summary className="btn hover:bg-[#F2F2F2]">
            <BsThreeDotsVertical />
          </summary>
          <ul className="p-2 shadow  menu dropdown-content z-[1] bg-[#F2F2F2] w-28">
            <li>
              <p className="hover:bg-[#F2F2F2] hover:underline text-sh duration-700">
                {props.edit} <FaEdit />
              </p>
            </li>
            <li>
              <p className="hover:bg-[#F2F2F2] hover:underline text-red-600 duration-700">
                {props.delete} <BsTrashFill />
              </p>
            </li>
          </ul>
        </details>
      </div>
    </div>
  );
};

export default UserCard;
