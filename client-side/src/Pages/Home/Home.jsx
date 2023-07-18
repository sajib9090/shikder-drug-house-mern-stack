import CustomersChoice from "./CustomersChoice/CustomersChoice";
import Hero from "./Hero/Hero";
import Hero1 from "./Hero1/Hero1";
import LatestProducts from "./LatestProducts/LatestProducts";
import Promo from "./Promo/Promo";
import Testimonial from "./Testimonial/Testimonial";
import WhoWe from "./WhoWe/WhoWe";
import WhyChoseUs from "./WhyChoseUs/WhyChoseUs";

const Home = () => {
  return (
    <div className="dark:bg-dark">
      <Hero />
      <WhoWe />
      <CustomersChoice />
      <Hero1 />
      <LatestProducts />
      <Promo />
      <WhyChoseUs />
      <Testimonial />
    </div>
  );
};

export default Home;
