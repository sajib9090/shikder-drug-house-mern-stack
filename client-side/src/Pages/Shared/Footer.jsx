import { BsFacebook, BsFillTelephoneFill } from "react-icons/bs";
import logo from "../../assets/shikder-drug-house-resources/images/shikderDrugHouse.png";
import {
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiFillYoutube,
  AiOutlineMail,
} from "react-icons/ai";
const Footer = () => {
  return (
    <div className="dark:bg-dark mt-12">
      <div className="max-w-7xl mx-auto dark:bg-dark-1 md:h-[60vh] md:max-h-[300px] bg-[#FAFAFA] shadow-inner">
        <div className="h-full grid grid-cols-12">
          <div className="h-full col-span-12 md:col-span-4 flex flex-col  items-center pt-12 px-2 md:px-4 ">
            <img className="h-10 md:h-12 mb-4" src={logo} alt="" />
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Molestiae eligendi harum voluptatum veniam, earum magnam? Suscipit
              quo maiores pariatur iusto consequuntur, exercitationem id at
              nihil asperiores rerum ullam. Reiciendis nemo enim saepe fugit
            </p>
          </div>
          <div className="h-full bg-[#FAFAFA] col-span-6 md:col-span-2 dark:bg-dark-1 pt-12 flex flex-col md:items-center px-2">
            <div>
              <h3 className="text-lg font-bold dark:text-white mb-3">
                Company
              </h3>
            </div>
            <div className="md:pl-4 space-y-1">
              <p className="text-gray-600">About Us</p>
              <p className="text-gray-600">Leadership</p>
              <p className="text-gray-600">Careers</p>
              <p className="text-gray-600">Article & News</p>
              <p className="text-gray-600">Legal Notice</p>
            </div>
          </div>
          <div className="h-full bg-[#FAFAFA] dark:bg-dark-1 flex flex-col md:items-center col-span-6 md:col-span-2 pt-12">
            <div className="">
              <h3 className="text-lg mb-3 font-bold dark:text-white md:pr-4">
                Support
              </h3>
            </div>
            <div className="md:pl-6 space-y-1">
              <p className="text-gray-600">Help Center</p>
              <p className="text-gray-600">FAQ</p>
              <p className="text-gray-600">Customer Center</p>
            </div>
          </div>
          <div className="h-full bg-[#FAFAFA] col-span-12 md:col-span-4 dark:bg-dark-1 pt-12 flex flex-col md:items-center px-2 pb-4 md:pb-0">
            <h3 className="text-lg mb-3 font-bold dark:text-white md:pr-24">
              Get In Touch
            </h3>
            <div className="space-y-1">
              <p className="text-gray-600">
                Bank er more jajira, Shariatpur, <br /> Bangladesh.
              </p>
              <p className="flex items-center text-gray-600">
                <AiOutlineMail className="mr-1" /> shikder@drughouse.com
              </p>
              <p className="flex items-center text-gray-600">
                <BsFillTelephoneFill className="mr-1 " /> +8801744175460
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="dark:bg-dark-1 bg-[#FAFAFA] h-[150px] md:h-[100px] border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row items-center justify-center md:justify-between space-y-4 max-w-7xl mx-auto px-4">
        <p className="text-center md:text-left text-gray-500 text-sm dark:text-white">
          Copyright © 2023 Shikder Drug House, All rights reserved.{" "}
          <br className="md:hidden" /> Powered by{" "}
          <a
            className="text-sh underline"
            target="blank"
            href="https://personal-portfolio-b100d.web.app/"
          >
            Sajib Hossain
          </a>
          .
        </p>
        <div className="flex items-center space-x-4">
          <BsFacebook className="h-4 w-4 cursor-pointer hover:scale-125 duration-700 dark:text-white" />
          <AiOutlineInstagram className="h-4 w-4 cursor-pointer hover:scale-125 duration-700 dark:text-white" />
          <AiOutlineTwitter className="h-4 w-4 cursor-pointer hover:scale-125 duration-700 dark:text-white" />
          <AiFillYoutube className="h-4 w-4 cursor-pointer hover:scale-125 duration-700 dark:text-white" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
