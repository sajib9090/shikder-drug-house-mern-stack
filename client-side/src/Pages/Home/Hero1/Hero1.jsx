import "./Hero1.css";

const Hero1 = () => {
  return (
    <div className="mt-28">
      <div className="hero min-h-screen md:min-h-[650px] shbg1">
        <div className="hero-content text-center bg-[#009e7e] dark:bg-deep-sh dark:bg-opacity-sh-90 bg-opacity-75 h-[100%] w-[100%]">
          <div className="max-w-md">
            <h1 className="text-3xl md:text-5xl font-bold text-white">
              A pharmacy with world-class service.
            </h1>
            <p className="py-6 text-white">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn hover:animate-none bg-black bg-opacity-100 hover:bg-sh animate-bounce duration-700 text-white border-none rounded-3xl">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero1;
