import "./Testimonial.css";
import { Carousel } from "react-carousel-minimal";

const Testimonial = () => {
  const data = [
    {
      image: "https://i.ibb.co/pfkx5J0/shikder1.jpg",
      caption: "Middle",
    },
    {
      image:
        "https://images.unsplash.com/photo-1633638461141-93d979a79da8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      caption: "Services",
    },
    {
      image:
        "https://i.ibb.co/dfvKd71/kristine-wook-E1-RW3-HIb-Uw-unsplash.jpg",
      caption: "Medicine",
    },
    {
      image:
        "https://images.unsplash.com/photo-1576602976047-174e57a47881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80",
      caption: "Store",
    },
    {
      image:
        "https://images.unsplash.com/photo-1547489432-cf93fa6c71ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      caption: "Busy Hour",
    },
    {
      image:
        "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80",
      caption: "Capsules",
    },
    {
      image:
        "https://images.unsplash.com/photo-1642055514517-7b52288890ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      caption: "Behind Side",
    },
    {
      image:
        "https://images.unsplash.com/photo-1563213126-a4273aed2016?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      caption: "Time Management",
    },
    {
      image:
        "https://images.unsplash.com/photo-1556741533-e228ee50f8b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      caption: "Happy Customer",
    },
  ];

  const captionStyle = {
    fontSize: "2em",
    fontWeight: "bold",
  };
  // const slideNumberStyle = {
  //   fontSize: "15px",
  //   fontWeight: "bold",
  // };
  return (
    <div className="mt-40 mb-24 md:mb-40">
      <div className="hero min-h-screen md:min-h-[650px] shbg2 dark:shbg2-dark">
        <div className="hero-content text-center z-10 relative flex flex-col">
          <div>
            <div className="App">
              <div style={{ textAlign: "center" }}>
                <h2 className="text-white">My Pharmacy</h2>
                <p className="py-2 max-w-[43rem] font-bold text-white text-2xl md:text-5xl">
                  My Beautiful Shop
                </p>
                <div
                  style={{
                    padding: "0 20px",
                  }}
                >
                  <Carousel
                    data={data}
                    time={2000}
                    width="550px"
                    height="300px"
                    captionStyle={captionStyle}
                    radius="4px"
                    // slideNumber={true}
                    // slideNumberStyle={slideNumberStyle}
                    captionPosition="bottom"
                    automatic={true}
                    dots={true}
                    pauseIconColor="white"
                    pauseIconSize="40px"
                    slideBackgroundColor="darkgrey"
                    slideImageFit="cover"
                    style={{
                      textAlign: "center",
                      maxWidth: "550px",
                      maxHeight: "300px",
                      margin: "40px auto",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
