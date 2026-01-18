import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { ChevronLeft, ChevronRight } from 'lucide-react';

/* Service data (kept identical) */
const serviceData = [
  {
    icon: <RxDesktop />,
    title: "Web Applications",
    description:
      "Full-stack web apps built with React and modern frameworks, powered by Python/Django backends for scalability, performance, and seamless user experiences that grow with your business.",
  },
  {
    icon: <RxMobile />,
    title: "Mobile Apps",
    description:
      "Cross-platform mobile applications with smooth UX and intuitive design, built using React Native and integrated with robust backend systems for native-like performance.",
  },
  {
    icon: <RxGlobe />,
    title: "Landing Pages",
    description:
      "High-converting, responsive landing pages designed to capture attention, drive engagement, and boost conversions with stunning visuals and optimized performance across all devices.",
  },
  {
    icon: <RxCode />,
    title: "Backend Development",
    description:
      "Secure, scalable APIs and server-side solutions using Python and Django, optimized for speed, reliability, and handling complex business logic with enterprise-grade architecture.",
  },
  {
    icon: <RxDashboard />,
    title: "Admin Dashboards",
    description:
      "Custom admin panels and dashboards with real-time data visualization, analytics, and intuitive controls built for seamless management and informed decision-making.",
  },
  {
    icon: <RxLayers />,
    title: "API Integration",
    description:
      "Seamless third-party API integration and custom API development to connect your apps with powerful external services, payment gateways, and modern cloud platforms.",
  },
  {
    icon: <RxRocket />,
    title: "MVP Development",
    description:
      "Rapid MVP development to validate your ideas quickly with fully functional prototypes, core features, and market-ready solutions that get you to launch faster.",
  },
];

/* Reusable fade variant (matched to ProjectsPage) */
const fadeIn = (direction = 'left', delay = 0) => ({
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
  exit: {
    opacity: 0,
    y: 12,
    transition: { duration: 0.6, ease: 'easeInOut' },
  },
});

/* Card motion for desktop single-slide animations */
const cardMotion = {
  initial: { opacity: 0, y: 12, scale: 0.995, transition: { duration: 0.45, ease: 'easeOut' }, willChange: 'transform, opacity' },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' }, willChange: 'transform, opacity' },
  exit: { opacity: 0, y: 12, scale: 0.995, transition: { duration: 0.45, ease: 'easeIn' }, willChange: 'transform, opacity' },
};

const Circles = () => <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-20" />;
const Bulb = () => <div className="fixed bottom-10 left-10 w-20 h-20 opacity-30 pointer-events-none" />;

/* Services component */
const Services = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  const handlePrev = () => {
    const newIndex = currentIndex === 0 ? serviceData.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    scrollToIndexOnMobile(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex === serviceData.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    scrollToIndexOnMobile(newIndex);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    scrollToIndexOnMobile(index);
  };

  const scrollToIndexOnMobile = (index) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.offsetWidth;
    scrollRef.current.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.offsetWidth;
    const scrollLeft = scrollRef.current.scrollLeft;
    const newIndex = Math.round(scrollLeft / cardWidth);
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < serviceData.length) {
      setCurrentIndex(newIndex);
    }
  };

  return (
    <motion.section
      variants={fadeIn('left', 0.1)}
      initial="hidden"
      animate="show"
      exit="exit"
      className="min-h-screen bg-primary/30 py-24 sm:py-36 flex items-center relative"
      style={{ willChange: 'transform, opacity' }}
    >
      <Circles />
      <div className="container mx-auto px-4">
        <div className="flex flex-col xl:flex-row gap-x-8">
          {/* Text */}
          <div className="text-center flex xl:w-[30vw] relative top-3 flex-col lg:text-left mb-8 xl:mb-0">
            <motion.h2
              variants={fadeIn('left', 0.3)}
              initial="hidden"
              animate="show"
              exit="exit"
              className="text-3xl sm:text-4xl xl:text-5xl font-bold xl:mt-8 mb-3 sm:mb-4"
              style={{ willChange: 'transform, opacity' }}
            >
              My <span className="text-accent">Services</span><span className="text-accent">.</span>
            </motion.h2>
            <motion.p
              variants={fadeIn('left', 0.4)}
              initial="hidden"
              animate="show"
              exit="exit"
              className="text-base sm:text-base mb-4 max-w-[400px] mx-auto lg:mx-0 text-white/90 leading-relaxed"
              style={{ willChange: 'transform, opacity' }}
            >
              Full-stack development services specializing in web and mobile applications, from sleek landing pages to scalable backends built with Python and Django.
            </motion.p>
          </div>

          {/* Slider area */}
          <motion.div
            variants={fadeIn('right', 0.6)}
            initial="hidden"
            animate="show"
            exit="exit"
            className="w-full xl:max-w-[65%] xl:pr-8"
            style={{ overflow: 'hidden', willChange: 'transform, opacity' }}
          >
            <div className="relative flex items-center w-full max-w-full">
              {/* Prev/Next buttons (desktop only) */}
              <button
                onClick={handlePrev}
                className="hidden md:block absolute -left-4 xl:-left-20 z-30 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-accent hover:border-accent transition-all duration-300 shadow-lg"
                aria-label="Previous service"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Mobile: horizontal scroll container with snaps */}
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex-1 overflow-x-auto overflow-y-hidden md:overflow-hidden px-0 md:px-4 xl:px-0 snap-x snap-mandatory scrollbar-hide"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                <div className="flex md:block gap-4 md:gap-0">
                  {serviceData.map((item, idx) => (
                    <div key={idx} className="w-full flex-shrink-0 snap-center md:hidden">
                      <div
                        className="bg-[rgba(65,47,123,0.15)] h-[257px] sm:h-[380px] rounded-lg px-5 py-6 sm:px-6 sm:py-8 flex sm:flex-col gap-x-4 sm:gap-x-0 group cursor-pointer hover:bg-[rgba(89,65,169,0.15)] transition-all duration-300 border border-white/5 hover:border-white/10"
                        style={{ willChange: 'transform, opacity' }}
                      >
                        <div className="text-4xl sm:text-4xl text-accent mb-3 sm:mb-4 shrink-0">{item.icon}</div>
                        <div className="mb-3 sm:mb-4 flex-1">
                          <h3 className="text-lg sm:text-lg mb-1.5 sm:mb-2 font-semibold">{item.title}</h3>
                          <p className="text-sm sm:text-sm leading-relaxed text-white/80">{item.description}</p>
                        </div>
                        <div className="text-3xl sm:text-3xl shrink-0">
                          <RxArrowTopRight className="group-hover:rotate-45 group-hover:text-accent transition-all duration-300" />
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Desktop: single card area (only currentIndex rendered) */}
                  <div className="hidden md:block w-full">
                    <div className="relative">
                      <AnimatePresence initial={false} mode="wait">
                        <motion.div
                          key={currentIndex}
                          variants={cardMotion}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          className="w-full"
                        >
                          <div className="bg-[rgba(65,47,123,0.15)] h-[257px] sm:h-[380px] rounded-lg px-5 py-6 sm:px-6 sm:py-8 flex sm:flex-col gap-x-4 sm:gap-x-0 group cursor-pointer hover:bg-[rgba(89,65,169,0.15)] transition-all duration-300 border border-white/5 hover:border-white/10">
                            <div className="text-4xl sm:text-4xl text-accent mb-3 sm:mb-4 shrink-0">
                              {serviceData[currentIndex].icon}
                            </div>
                            <div className="mb-3 sm:mb-4 flex-1">
                              <h3 className="text-lg sm:text-lg mb-1.5 sm:mb-2 font-semibold">{serviceData[currentIndex].title}</h3>
                              <p className="text-sm sm:text-sm leading-relaxed text-white/80">{serviceData[currentIndex].description}</p>
                            </div>
                            <div className="text-3xl sm:text-3xl shrink-0">
                              <RxArrowTopRight className="group-hover:rotate-45 group-hover:text-accent transition-all duration-300" />
                            </div>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next button desktop */}
              <button
                onClick={handleNext}
                className="hidden md:block absolute -right-4 xl:-right-20 z-30 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-accent hover:border-accent transition-all duration-300 shadow-lg"
                aria-label="Next service"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Pagination dots */}
            <div className="flex gap-2 mt-6 md:mt-8 justify-center md:justify-start">
              {serviceData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`transition-all duration-300 rounded-full ${idx === currentIndex ? 'w-8 md:w-10 h-2 md:h-2.5 bg-accent' : 'w-2 md:w-2.5 h-2 md:h-2.5 bg-white/30 hover:bg-white/50'}`}
                  aria-label={`Go to service ${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <Bulb />

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        /* Improve GPU compositing for horizontal scroll */
        .snap-center { scroll-snap-align: center; }
      `}</style>
    </motion.section>
  );
};

export default Services;