import { useState } from "react";

// testimonial data
const testimonialData = [
  {
    image: "/t-avt-1.png",
    name: "Anne Smith",
    position: "Customer",
    message: "Working with him was seamless. The website looks amazing, performs great, and our users love it. Would gladly hire again.",
  },
  {
    image: "/t-avt-2.png",
    name: "Jane Doe",
    position: "Customer",
    message:
      "He delivered beyond expectations. Communication was clear and the project was completed ahead of schedule. ",
  },
  {
    image: "/t-avt-3.png",
    name: "Jhon Doe",
    position: "Customer",
    message:
      "Working with him was great. He understood our vision quickly and turned it into a functional product. Truly exceptional talent.",
  },
];

// Import Swiper components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper modules
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

//Icons
import { FaQuoteLeft } from "react-icons/fa";
import Image from "next/image";

const TestimonialSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative overflow-hidden">
      <Swiper
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className="h-[400px]"
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        slidesPerView={1}
        watchOverflow={true}
      >
        {testimonialData.map((person, index) => {
          return (
            <SwiperSlide key={index}>
              {({ isActive }) => (
                <div 
                  className={`flex flex-col items-center md:flex-row gap-x-8 h-full px-16 transition-opacity duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {/* avatar, name, position */}
                  <div className="w-full max-w-[300px] flex flex-col xl:justify-center items-center relative mx-auto xl:mx-0">
                    <div className="flex flex-col justify-center text-center">
                      {/* avatar */}
                      <div className="mb-2 mx-auto"> 
                        <Image
                          src={person.image}
                          width={100}
                          height={100}
                          alt=""
                          priority={index === 0}
                        />
                      </div>
                      {/* name */}
                      <div className="text-lg">{person.name}</div>
                      {/* postion */}
                      <div className="text-[12px] uppercase font-extralight tracking-widest">{person.position}</div>
                    </div>
                  </div>

                  {/* quote & message */}
                  <div className="flex-1 flex flex-col justify-center before:w-[1px] xl:before:bg-white/20 xl:before:absolute xl:before:left-0 xl:before:h-[200px] relative xl:pl-20">
                    {/* quote icon */}
                    <div className="mb-4">
                      <FaQuoteLeft className="text-4xl xl:text-6xl text-white/20 mx-auto md:mx-0" />
                    </div>
                    {/* message */}
                    <div className="xl:text-lg text-[14px] text-center md:text-left">
                      {person.message}
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default TestimonialSlider;