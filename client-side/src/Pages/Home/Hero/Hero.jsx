import "./Hero.css";

const Hero = () => {
  return (
    <>
      <div className="hero min-h-screen md:min-h-[650px] shbg">
        <div className="hero-content text-center bg-[#009e7e] dark:bg-deep-sh dark:bg-opacity-sh-90 bg-opacity-75 h-[100%] w-[100%]">
          <div className="max-w-lg pt-8">
            <h1 className="text-3xl md:text-5xl font-bold text-white">
              Our only priority is to keep you healthy.
            </h1>
            <p className="py-6 text-white">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
            </p>
            <button className="btn hover:animate-none bg-black bg-opacity-100 hover:bg-sh animate-bounce duration-700 text-white rounded-3xl border-none">
              Discover More
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
