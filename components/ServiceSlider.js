// icons
import {
  RxCrop,
  RxPencil2,
  RxDesktop,
  RxReader,
  RxRocket,
  RxArrowTopRight,
} from "react-icons/rx";

// data
const serviceData = [
  {
    icon: <RxCrop />,
    title: "Branding",
    description: "I craft bold brand identities that tell stories, build trust, and leave lasting impressions across visuals, voice, and strategy.",
  },
  {
    icon: <RxPencil2 />,
    title: "Design",
    description:"I design intuitive, sleek interfaces that blend aesthetics with function, ensuring every user interaction feels seamless, modern, and purpose-driven.",
  },
  {
    icon: <RxDesktop />,
    title: "Development",
    description: "I develop fast and scalable web applications with clean architecture and modern frameworks tailored for performance and growth.",
  },
  {
    icon: <RxReader />,
    title: "Copywriting",
    description: "I write clear, compelling, and persuasive copy that connects emotionally, drives action,  and aligns perfectly with your brand’s voice.",
  },
  {
    icon: <RxRocket />,
    title: "SEO",
    description: "I optimize content with smart keywords, metadata, and structure to boost visibility, rank higher, and drive organic traffic effortlessly.",
  },
];

// Import Swiper components (✅ Correct)
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper modules (✅ Correct)
import { FreeMode, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const ServiceSlider = () => {
  return (
    
    <Swiper
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
      }}
      freeMode={true}
      pagination={{ clickable: true }}
      modules={[FreeMode, Pagination]}
      className="h-[300px] sm:h-[400px] "
    >
      {serviceData.map((item, index) => (
        <SwiperSlide key={index}  >  
  <div className="bg-[rgba(65,47,123,0.15)] h-56 lg:h-80    rounded-lg px-6 py-8 flex sm:flex-col gap-x-6 sm:gap-x-0 group cursor-pointer hover:bg-[rgba(89,65,169,0.15)] transition-all duration-300 ">
    
    {/* icon */}
    <div className="text-4xl text-accent mb-4">{item.icon}</div>

    {/* title & description */}
    <div className="mb-4 flex-1">
      <h3 className="text-lg mb-2">{item.title}</h3>
      <p className="text-sm leading-normal">{item.description}</p>
    </div>

    {/* arrow */}
    <div className="text-3xl">
      <RxArrowTopRight className="group-hover:rotate-45 group-hover:text-accent transition-all duration-300"/>
    </div>
  </div>
</SwiperSlide>

      ))}
    </Swiper>
  );
};

export default ServiceSlider;
