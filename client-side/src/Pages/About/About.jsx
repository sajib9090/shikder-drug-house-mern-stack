import Pharmacy from "../../Components/Pharmacy/Pharmacy";
import pharmacy from "../../assets/shikder-drug-house-resources/images/pharmacy-store.jpg";
import drugStore from "../../assets/shikder-drug-house-resources/images/drug-store.jpg";
const About = () => {
  return (
    <div className="max-w-7xl mx-auto dark:bg-dark pb-8">
      <div className="h-[50vh] md:h-[80vh] md:max-h-[400px] shop">
        <div className="bg-sh h-full w-full bg-opacity-sh-70 dark:bg-deep-sh dark:bg-opacity-sh-90 bg-opacity-75 flex justify-center items-center"></div>
      </div>
      <div className="md:h-[80vh] md:max-h-[500px] mt-24 grid md:grid-cols-3 gap-4 px-2">
        <Pharmacy
          image={pharmacy}
          title={"Pharmacy Store"}
          description="Lorem ipsum dolor sit amet consectetur adipiscing elit dolor"
        />
        <Pharmacy
          image={drugStore}
          title="Drug Store"
          description="Lorem ipsum dolor sit amet consectetur adipiscing elit dolor"
        />
        <div className="h-full bg-sh rounded-lg">
          <h2 className="text-3xl text-white font-bold ml-3 md:ml-6 mt-8 tracking-wider">
            Opening Hours
          </h2>
          <div className="px-4 md:px-8 mt-8 space-y-1 mb-8 md:mb-0">
            <div className="flex items-center justify-between">
              <p className="text-gray-300">Friday</p>
              <p className="text-gray-300">10:00 AM to 7:00 PM</p>
            </div>
            <div className="divider my-0 py-0"></div>
            <div className="flex items-center justify-between">
              <p className="text-gray-300">Saturday</p>
              <p className="text-gray-300">10:00 AM to 7:00 PM</p>
            </div>
            <div className="divider my-0 py-0"></div>
            <div className="flex items-center justify-between">
              <p className="text-gray-300">Sunday</p>
              <p className="text-gray-300">10:00 AM to 7:00 PM</p>
            </div>
            <div className="divider my-0 py-0"></div>
            <div className="flex items-center justify-between">
              <p className="text-gray-300">Monday</p>
              <p className="text-gray-300">10:00 AM to 7:00 PM</p>
            </div>
            <div className="divider my-0 py-0"></div>
            <div className="flex items-center justify-between">
              <p className="text-gray-300">Tuesday</p>
              <p className="text-gray-300">10:00 AM to 7:00 PM</p>
            </div>
            <div className="divider my-0 py-0"></div>
            <div className="flex items-center justify-between">
              <p className="text-gray-300">Wednesday</p>
              <p className="text-gray-300">10:00 AM to 7:00 PM</p>
            </div>
            <div className="divider my-0 py-0"></div>
            <div className="flex items-center justify-between">
              <p className="text-gray-300">Thursday</p>
              <p className="text-gray-300">10:00 AM to 7:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
