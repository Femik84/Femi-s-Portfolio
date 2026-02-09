import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import {
  RxDesktop,
  RxMobile,
  RxRocket,
  RxLayers,
  RxCode,
  RxDashboard,
  RxGlobe,
  RxArrowTopRight,
} from 'react-icons/rx';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// Smooth fade animation variants
const fadeIn = (direction, delay) => {
  return {
    hidden: {
      x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 1.2,
        delay: delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
    exit: {
      x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
      opacity: 0,
      transition: {
        type: 'tween',
        duration: 1.2,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};

// Service data
const serviceData = [
  {
    icon: <RxDesktop />,
    title: "Web Applications",
    description: "Full-stack web apps built with React and modern frameworks, powered by Python/Django backends for scalability, performance, and seamless user experiences that grow with your business.",
  },
  {
    icon: <RxMobile />,
    title: "Mobile Apps",
    description: "Cross-platform mobile applications with smooth UX and intuitive design, built using React Native and integrated with robust backend systems for native-like performance.",
  },
  {
    icon: <RxGlobe />,
    title: "Landing Pages",
    description: "Responsive landing pages designed to capture attention, drive engagement, and boost conversions with stunning visuals and optimized performance across all devices.",
  },
  {
    icon: <RxCode />,
    title: "Backend Development",
    description: "Secure, scalable APIs and server-side solutions using Python and Django, optimized for speed and handling complex business logic with enterprise-grade architecture.",
  },
  {
    icon: <RxDashboard />,
    title: "Admin Dashboards",
    description: "Custom admin panels and dashboards with real-time data visualization, analytics, and intuitive controls built for seamless management and informed decision-making.",
  },
  {
    icon: <RxLayers />,
    title: "API Integration",
    description: "Seamless third-party API integration and custom API development to connect your apps with powerful external services, payment gateways, and modern cloud platforms.",
  },
  {
    icon: <RxRocket />,
    title: "MVP Development",
    description: "Rapid MVP development to validate your ideas quickly with fully functional prototypes, core features, and market-ready solutions that get you to launch faster.",
  },
];

// Service Slider Component
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
      className="h-[300px] short:h-[280px] sm:h-[440px]"
      style={{
        '--swiper-pagination-bottom': '0px',
        '--swiper-pagination-color': '#f13024',
        paddingBottom: '25px',
      }}
    >
      {serviceData.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="bg-[rgba(65,47,123,0.15)] h-[247px] short:h-[227px]  sm:h-[380px] rounded-lg px-5 py-6 sm:px-6 sm:py-8 flex sm:flex-col gap-x-4 sm:gap-x-0 group cursor-pointer hover:bg-[rgba(89,65,169,0.15)] transition-all duration-300 border border-white/5 hover:border-white/10">
            {/* icon */}
            <div className="text-3xl sm:text-4xl text-accent mb-3 sm:mb-4 shrink-0">{item.icon}</div>

            {/* title & description */}
            <div className="mb-3 sm:mb-4 flex-1">
              <h3 className="text-[17px] sm:text-lg mb-1.5 sm:mb-2 font-semibold">{item.title}</h3>
              <p className="text-[13px] sm:text-sm leading-relaxed text-white/80">{item.description}</p>
            </div>

            {/* arrow */}
            <div className="text-3xl sm:text-3xl shrink-0">
              <RxArrowTopRight className="group-hover:rotate-45 group-hover:text-accent transition-all duration-300" />
            </div>
          </div>
        </SwiperSlide>
      ))}
      <style jsx>{`
        @media (max-width: 639px) {
          :global(.swiper-pagination) {
            bottom: 20px !important;
          }
        }
        :global(.swiper-wrapper) {
          transition-timing-function: linear !important;
        }
      `}</style>
    </Swiper>
  );
};

// Simple placeholder components
const Circles = () => <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-20" />;
const Bulb = () => <div className="fixed bottom-10 left-10 w-20 h-20 opacity-30 pointer-events-none" />;

// Main Services Component
const Services = () => {
  return (
    <div className="min-h-screen bg-primary/30 py-24 sm:py-36 flex items-center">
      <Circles />
      <div className="container mx-auto px-4">
        <div className="flex flex-col xl:flex-row gap-x-8 relative xshort:bottom-0 short:bottom-10">
          {/* Text */}
          <div className="text-center flex xl:w-[30vw] relative top-3 flex-col lg:text-left mb-8 xl:mb-0">
            <motion.h2
              variants={fadeIn('left', 0.3)}
              initial="hidden"
              animate="show"
              exit="exit"
              className="text-[27px] short:text-[25px] sm:text-4xl xl:text-5xl font-bold xl:mt-8 mb-3 sm:mb-4"
            >
              My <span className="text-accent">Services</span><span className="text-accent">.</span>
            </motion.h2>
            <motion.p
              variants={fadeIn('left', 0.4)}
              initial="hidden"
              animate="show"
              exit="exit"
              className="text-[15px] short:text-[13px] sm:text-base mb-4 max-w-[400px] mx-auto lg:mx-0 text-white/90 leading-relaxed"
            >
              Full-stack development services specializing in web and mobile applications, from sleek landing pages to scalable backends built with Python and Django.
            </motion.p>
          </div>

          <motion.div
            variants={fadeIn('right', 0.6)}
            initial="hidden"
            animate="show"
            exit="exit"
            className="w-full xl:max-w-[65%] xl:pr-8"
            style={{ overflow: 'hidden' }}
          >
            {/* slider */}
            <ServiceSlider />
          </motion.div>
        </div>
      </div>
      <Bulb />
    </div>
  );
};

export default Services;