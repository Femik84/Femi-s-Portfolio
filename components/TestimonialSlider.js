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
    name: "Esther Howard",
    position: "Customer",
    message:
      "He delivered beyond expectations. Communication was clear and the project was completed ahead of schedule. ",
  },
  {
    image: "/t-avt-3.png",
    name: "James Lase",
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
    <div className="relative overflow-hidden testimonial-slider">
      <Swiper
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className="h-[400px] short:h-[320px]"
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        slidesPerView={1}
        watchOverflow={true}
      >
        {testimonialData.map((person, index) => {
          return (
            <SwiperSlide key={index}>
              {({ isActive }) => (
                <div 
                  className={`flex flex-col items-center md:flex-row gap-x-8 short:gap-x-6 h-full px-16 short:px-12 transition-opacity duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {/* avatar, name, position */}
                  <div className="w-full max-w-[300px] short:max-w-[260px] flex flex-col xl:justify-center items-center relative mx-auto xl:mx-0">
                    <div className="flex flex-col justify-center text-center">
                      {/* avatar */}
                      <div className="mb-2 short:mb-1.5 mx-auto"> 
                        <Image
                          src={person.image}
                          width={100}
                          height={100}
                          alt=""
                          priority={index === 0}
                          className="short:w-[80px] short:h-[80px]"
                        />
                      </div>
                      {/* name */}
                      <div className="text-lg short:text-base">{person.name}</div>
                      {/* position */}
                      <div className="text-[12px] short:text-[10px] uppercase font-extralight tracking-widest">{person.position}</div>
                    </div>
                  </div>

                  {/* quote & message */}
                  <div className="flex-1 flex flex-col justify-center before:w-[1px] xl:before:bg-white/20 xl:before:absolute xl:before:left-0 xl:before:h-[200px] short:xl:before:h-[160px] relative xl:pl-20 short:xl:pl-16">
                    {/* quote icon */}
                    <div className="mb-4 short:mb-3">
                      <FaQuoteLeft className="text-4xl short:text-3xl xl:text-6xl short:xl:text-5xl text-white/20 mx-auto md:mx-0" />
                    </div>
                    {/* message */}
                    <div className="xl:text-lg short:xl:text-base text-[14px] short:text-[12px] text-center md:text-left">
                      {person.message}
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>

      <style jsx>{`
        @media (max-height: 768px) {
          :global(.testimonial-slider .swiper-button-next),
          :global(.testimonial-slider .swiper-button-prev) {
            width: 32px;
            height: 32px;
          }
          
          :global(.testimonial-slider .swiper-button-next:after),
          :global(.testimonial-slider .swiper-button-prev:after) {
            font-size: 27px;
          }
        }
      `}</style>
    </div>
  );
};

export default TestimonialSlider;