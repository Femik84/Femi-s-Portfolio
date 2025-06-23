// data
const workSlides = {
  slides: [
    {
      images: [
        {
          title: "title",
          path: "/movie.png",
          link: "https://moviebox-yo7e.onrender.com/",
        },
        {
          title: "title",
          path: "/portfolio.png",
          link: "https://portfolio-gqbn.onrender.com",
        },
        {
          title: "title",
          path: "/movie.png",
          link: "https://moviebox-yo7e.onrender.com/",
        },
        {
          title: "title",
          path: "/blogistry.png",
          link: "https://blogistry.onrender.com/",
        },
      ],

    },
    {
      images: [
        {
          title: "title",
          path: "/movie.png",
          link: "https://moviebox-yo7e.onrender.com/",
        },
        {
          title: "title",
          path: "/portfolio.png",
          link: "https://portfolio-gqbn.onrender.com",
        },
        {
          title: "title",
          path: "/movie.png",
          link: "https://moviebox-yo7e.onrender.com/",
        },
        {
          title: "title",
          path: "/blogistry.png",
          link: "https://blogistry.onrender.com/",
        },
      ],

    },
  ],
};

// Import Swiper components (✅ Correct)
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper modules (✅ Correct)
import { Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

//Icons
import { BsArrowRight } from "react-icons/bs";
import Image from "next/image";

const WorkSlider = () => {
  return (
    <Swiper
      spaceBetween={10}
      pagination={{ clickable: true }}
      modules={[Pagination]}
      className="h-[280px] sm:h-[480px]"
    >
      {workSlides.slides.map((slide, index) => {
        return (
          <SwiperSlide key={index}>
            <div className="grid grid-cols-2 grid-rows-2 gap-4 cursor-pointer  ">
              {slide.images.map((image, index) => {
                const handleClick = () => {
                  if (image.link) {
                    // Trigger hover effect manually by adding class
                    const card = document.getElementById(
                      `project-card-${index}`
                    );
                    card?.classList.add("hover-trigger");

                    // Delay navigation by 300ms
                    setTimeout(() => {
                      window.open(image.link, "_blank", "noopener,noreferrer");
                    }, 400);
                  }
                };

                return (
                  <div
                    key={index}
                    id={`project-card-${index}`}
                    onClick={handleClick}
                    className="relative rounded-lg overflow-hidden flex items-center justify-center group cursor-pointer"
                  >
                    <div className="flex items-center justify-center relative overflow-hidden group w-full h-full">
                      {/* Image */}
                      <Image
                        src={image.path}
                        width={500}
                        height={300}
                        alt={image.title}
                        className="object-cover w-full h-full"
                      />

                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#e838cc] to-[#4a22bd] opacity-0 group-hover:opacity-80 transition-all duration-700" />

                      {/* Title & Arrow */}
                      <div className="absolute bottom-0 translate-y-full group-hover:-translate-y-10 group-hover:xl:-translate-y-20 transition-all duration-300">
                        <div className="flex items-center gap-x-2 text-[13px] tracking-[0.2em]">
                          <div className="delay-100">LIVE</div>
                          <div className="translate-y-[500%] group-hover:translate-y-0 transition-all duration-300 delay-150">
                            PROJECT
                          </div>
                          <div className="text-xl translate-y-[500%] group-hover:translate-y-0 transition-all duration-300 delay-200">
                            <BsArrowRight />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default WorkSlider;
