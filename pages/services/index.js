import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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

/* Decorative */ 
const Bulb = () => (
  <div className="absolute -left-36 -bottom-12 mix-blend-color-dodge animate-pulse duration-75 z-10 w-[200px] xl:w-[260px]">
    <svg width="260" height="260" viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="130" cy="130" r="130" fill="url(#bulbGradient)" opacity="0.4"/>
      <defs>
        <radialGradient id="bulbGradient">
          <stop offset="0%" stopColor="#FCD34D" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0"/>
        </radialGradient>
      </defs>
    </svg>
  </div>
);

const Circles = () => (
  <div className="w-[200px] xl:w-[300px] absolute -right-16 -bottom-2 mix-blend-color-dodge animate-pulse duration-75 z-10">
    <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="150" cy="150" r="150" stroke="rgba(131, 58, 180, 0.1)" strokeWidth="2"/>
      <circle cx="150" cy="150" r="120" stroke="rgba(131, 58, 180, 0.15)" strokeWidth="2"/>
      <circle cx="150" cy="150" r="90" stroke="rgba(131, 58, 180, 0.2)" strokeWidth="2"/>
      <circle cx="150" cy="150" r="60" stroke="rgba(253, 29, 29, 0.25)" strokeWidth="2"/>
      <circle cx="150" cy="150" r="30" stroke="rgba(252, 176, 69, 0.3)" strokeWidth="2"/>
    </svg>
  </div>
);

/* Use the same fadeIn timing/feel as your ProjectsPage */
const fadeIn = (direction, delay) => ({
  hidden: {
    y: direction === 'up' ? 80 : direction === 'down' ? -80 : 0,
    opacity: 0,
    x: direction === 'left' ? 80 : direction === 'right' ? -80 : 0,
    transition: {
      type: 'tween',
      duration: 1.5,
      delay,
      ease: [0.25, 0.6, 0.3, 0.8],
    },
  },
  show: {
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 1.4,
      delay,
      ease: [0.25, 0.25, 0.25, 0.75],
    },
  },
});

/* Service data */
const serviceData = [
  {
    id: 1,
    icon: <RxDesktop />,
    title: "Web Applications",
    description:
      "Full-stack web apps built with React and modern frameworks, powered by Python/Django backends for scalability, performance, and seamless user experiences that grow with your business.",
  },
  {
    id: 2,
    icon: <RxMobile />,
    title: "Mobile Apps",
    description:
      "Cross-platform mobile applications with smooth UX and intuitive design, built using React Native and integrated with robust backend systems for native-like performance.",
  },
  {
    id: 3,
    icon: <RxGlobe />,
    title: "Landing Pages",
    description:
      "High-converting, responsive landing pages designed to capture attention, drive engagement, and boost conversions with stunning visuals and optimized performance across all devices.",
  },
  {
    id: 4,
    icon: <RxCode />,
    title: "Backend Development",
    description:
      "Secure, scalable APIs and server-side solutions using Python and Django, optimized for speed, reliability, and handling complex business logic with enterprise-grade architecture.",
  },
  {
    id: 5,
    icon: <RxDashboard />,
    title: "Admin Dashboards",
    description:
      "Custom admin panels and dashboards with real-time data visualization, analytics, and intuitive controls built for seamless management and informed decision-making.",
  },
  {
    id: 6,
    icon: <RxLayers />,
    title: "API Integration",
    description:
      "Seamless third-party API integration and custom API development to connect your apps with powerful external services, payment gateways, and modern cloud platforms.",
  },
  {
    id: 7,
    icon: <RxRocket />,
    title: "MVP Development",
    description:
      "Rapid MVP development to validate your ideas quickly with fully functional prototypes, core features, and market-ready solutions that get you to launch faster.",
  },
];

/* Reusable Service Card */
const ServiceCard = ({ item }) => (
  <div className="group bg-[rgba(65,47,123,0.15)] rounded-lg px-5 py-6 sm:px-6 sm:py-8 flex sm:flex-col gap-x-4 sm:gap-x-0 cursor-pointer hover:bg-[rgba(89,65,169,0.15)] transition-all duration-300 border border-white/5 hover:border-white/10">
    <div className="text-4xl sm:text-4xl text-accent mb-3 sm:mb-4 shrink-0">{item.icon}</div>
    <div className="mb-3 sm:mb-4 flex-1">
      <h3 className="text-lg sm:text-lg mb-1.5 sm:mb-2 font-semibold">{item.title}</h3>
      <p className="text-sm sm:text-sm leading-relaxed text-white/80">{item.description}</p>
    </div>
    <div className="text-3xl sm:text-3xl shrink-0">
      <RxArrowTopRight className="group-hover:rotate-45 group-hover:text-accent transition-all duration-300" />
    </div>
  </div>
);

const Services = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  const handlePrev = () => {
    const newIndex = currentIndex === 0 ? serviceData.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollTo({
        left: newIndex * cardWidth,
        behavior: 'smooth',
      });
    }
  };

  const handleNext = () => {
    const newIndex = currentIndex === serviceData.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollTo({
        left: newIndex * cardWidth,
        behavior: 'smooth',
      });
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth;
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const newIndex = Math.round(scrollLeft / cardWidth);
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < serviceData.length) {
        setCurrentIndex(newIndex);
      }
    }
  };

  return (
    <div className="min-h-screen bg-primary/30 md:pt-36 pb-8 md:pb-12 flex items-center relative overflow-hidden">
      <Circles />
      <motion.div
        variants={fadeIn('down', 0.1)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="container mx-auto relative z-20 px-4"
      >
        <div className="flex flex-col xl:flex-row gap-x-8">
          {/* Text */}
          <div className="text-center relative flex xl:w-[30vw] flex-col lg:text-left mb-6 md:mb-8 xl:mb-0">
            <motion.h2
              variants={fadeIn('up', 0.3)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="h2 xl:mt-8 text-white text-3xl sm:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4"
            >
              My <span className="text-accent">Services</span><span className="text-accent">.</span>
            </motion.h2>

            <motion.p
              variants={fadeIn('up', 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="mb-4 md:mb-6 max-w-[400px] mx-auto lg:mx-0 text-white/80 text-sm md:text-base leading-relaxed"
            >
              Full-stack development services specializing in web and mobile applications, from sleek landing pages to scalable backends built with Python and Django.
            </motion.p>
          </div>

          {/* Services Section */}
          <motion.div
            variants={fadeIn('down', 0.6)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="w-full xl:flex-1 flex flex-col items-center"
          >
            <div className="relative flex items-center w-full max-w-md md:max-w-lg xl:max-w-lg">
              {/* Prev button (desktop) */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePrev}
                className="hidden md:block absolute -left-4 xl:-left-20 z-30 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-accent hover:border-accent transition-all duration-300 shadow-lg"
              >
                <ChevronLeft size={20} />
              </motion.button>

              {/* Scroll container - mobile shows horizontal list, desktop uses single active card */}
              <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex-1 overflow-x-auto overflow-y-hidden md:overflow-hidden px-0 md:px-4 xl:px-0 snap-x snap-mandatory scrollbar-hide"
                aria-roledescription="carousel"
              >
                <div className="flex md:block gap-4 md:gap-0">
                  {/* Mobile - all cards horizontally scrollable */}
                  {serviceData.map((item) => (
                    <div key={item.id} className="w-full flex-shrink-0 snap-center md:hidden">
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="h-[257px] sm:h-[380px] px-5 py-6"
                      >
                        <ServiceCard item={item} />
                      </motion.div>
                    </div>
                  ))}

                  {/* Desktop - show just the current card */}
                  <div className="hidden md:block w-full">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`service-${serviceData[currentIndex].id}`}
                        initial={{ opacity: 0, y: 12, scale: 0.995 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.995 }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                      >
                        <div className="h-[320px] md:h-[420px] px-4">
                          <ServiceCard item={serviceData[currentIndex]} />
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Next button (desktop) */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                className="hidden md:block absolute -right-4 xl:-right-20 z-30 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-accent hover:border-accent transition-all duration-300 shadow-lg"
              >
                <ChevronRight size={20} />
              </motion.button>
            </div>

            {/* Dots */}
            <div className="flex gap-2 mt-6 md:mt-8">
              {serviceData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${index === currentIndex ? 'w-8 md:w-10 h-2 md:h-2.5 bg-accent' : 'w-2 md:w-2.5 h-2 md:h-2.5 bg-white/30 hover:bg-white/50'}`}
                  aria-label={`Go to service ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
      <Bulb />

      {/* CSS to hide scrollbar when needed */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Services;