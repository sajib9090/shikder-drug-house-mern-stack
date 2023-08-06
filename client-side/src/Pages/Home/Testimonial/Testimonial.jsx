import "./Testimonial.css";
import { Carousel } from "react-carousel-minimal";

const Testimonial = () => {
  const data = [
    {
      image:
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=873&q=80",
      caption: "Library",
    },
    {
      image:
        "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80",
      caption: "Class Room",
    },
    {
      image:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=932&q=80",
      caption: "Darjeeling",
    },
    {
      image:
        "https://images.unsplash.com/photo-1501349800519-48093d60bde0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      caption: "San Francisco",
    },
    {
      image:
        "https://images.unsplash.com/photo-1495727034151-8fdc73e332a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=865&q=80",
      caption: "Scotland",
    },
    {
      image:
        "https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=648&q=80",
      caption: "Darjeeling",
    },
    {
      image:
        "https://images.unsplash.com/photo-1509191436522-d296cf87d244?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=822&q=80",
      caption: "San Francisco",
    },
    {
      image:
        "https://images.unsplash.com/photo-1504275107627-0c2ba7a43dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      caption: "Scotland",
    },
    {
      image:
        "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80",
      caption: "Darjeeling",
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
                  Most important and beautiful place ever
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
