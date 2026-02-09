import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";

// Icons
import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaPython,
  FaNodeJs,
  FaFigma,
  FaDatabase,
} from "react-icons/fa";

import {
  SiNextdotjs,
  SiDjango,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiExpress,
} from "react-icons/si";

import { TbBrandReactNative } from "react-icons/tb";

// Placeholder components
const Circles = () => <div className="fixed bottom-0 right-0 w-64 h-64 opacity-20 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-3xl"></div>;

const fadeIn = (direction, delay) => ({
  hidden: {
    y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
    x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    opacity: 0,
  },
  show: {
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.8,
      delay: delay,
      ease: [0.25, 0.25, 0.25, 0.75],
    },
  },
  exit: {
    y: direction === "up" ? -40 : direction === "down" ? 40 : 0,
    x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
    opacity: 0,
    transition: {
      type: "tween",
      duration: 0.8,
      delay: 0,
      ease: [0.25, 0.25, 0.25, 0.75],
    },
  },
});

// Updated data structure
const aboutData = [
  {
    title: "skills",
    info: [
      {
        title: "Frontend Development",
        icons: [
          { icon: <FaHtml5 />, name: "HTML5" },
          { icon: <FaCss3 />, name: "CSS3" },
          { icon: <FaJs />, name: "JavaScript" },
          { icon: <FaReact />, name: "React" },
          { icon: <TbBrandReactNative />, name: "React Native" },
          { icon: <SiNextdotjs />, name: "Next.js" },
          { icon: <SiTailwindcss />, name: "Tailwind" },
          { icon: <FaFigma />, name: "Figma" },
        ],
      },
      {
        title: "Backend Development",
        icons: [
          { icon: <FaPython />, name: "Python" },
          { icon: <SiDjango />, name: "Django" },
          { icon: <FaNodeJs />, name: "Node.js" },
          { icon: <SiExpress />, name: "Express" },
          { icon: <SiPostgresql />, name: "PostgreSQL" },
          { icon: <SiMongodb />, name: "MongoDB" },
          { icon: <FaDatabase />, name: "REST API" },
        ],
      },
    ],
  },
];

const About = () => {
  const [index, setIndex] = useState(0);
  const [skillTab, setSkillTab] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const scrollContainerRef = useRef(null);
  const autoScrollIntervalRef = useRef(null);
  const scrollPositionRef = useRef(0);

  // Auto-scroll functionality with smooth loop
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !isAutoScrolling) return;

    const startAutoScroll = () => {
      autoScrollIntervalRef.current = setInterval(() => {
        if (container) {
          const maxScroll = container.scrollWidth - container.clientWidth;
          
          // Increment the scroll position
          scrollPositionRef.current += 2;
          
          // Smooth reset when reaching the end
          if (scrollPositionRef.current >= maxScroll) {
            scrollPositionRef.current = 0;
          }
          
          container.scrollLeft = scrollPositionRef.current;
        }
      }, 20);
    };

    // Reset scroll position when tab changes
    scrollPositionRef.current = 0;
    if (container) {
      container.scrollLeft = 0;
    }

    startAutoScroll();

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [isAutoScrolling, skillTab]);

  // Stop auto-scroll on user interaction
  const handleUserInteraction = () => {
    setIsAutoScrolling(false);
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }
    // Update the ref to current scroll position when user takes control
    if (scrollContainerRef.current) {
      scrollPositionRef.current = scrollContainerRef.current.scrollLeft;
    }
  };

  // Reset auto-scroll when changing tabs
  const handleTabChange = (newTab) => {
    setSkillTab(newTab);
    setIsAutoScrolling(true);
    scrollPositionRef.current = 0;
  };

  return (
    <div className="h-full bg-primary/30 py-12 short:py-8 sm:py-32 text-center xl:text-left">
      <Circles />

      <div className="container mx-auto h-full flex flex-col items-center xl:flex-row gap-x-6 pt-24 short:pt-16 sm:pt-0">
        {/* text */}
        <div className="flex-1 flex flex-col justify-center">
          <motion.h2
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            animate="show"
            exit="exit"
            className="h2 text-[24px] short:text-[20px] sm:text-[32px]"
          >
            Captivating <span className="text-accent">stories birth</span>
            <br />
            magnificent <span className="text-accent">designs.</span>
          </motion.h2>
          <motion.p
            variants={fadeIn("right", 0.4)}
            initial="hidden"
            animate="show"
            exit="exit"
            className="max-w-[500px] text-[13px] short:text-[12px] sm:text-[16px] mx-auto xl:mx-0 mb-6 short:mb-4 xl:mb-12 px-2 xl:px-0"
          >
            I build responsive interfaces with HTML, CSS, JavaScript, React,
            React Native, Next.js, and Tailwind CSS. On the backend, I develop scalable
            systems using Python, Django, Node.js, REST APIs, and PostgreSQL to
            deliver full-stack web applications with strong performance.
          </motion.p>

          {/* counters */}
          <motion.div
            variants={fadeIn("right", 0.6)}
            initial="hidden"
            animate="show"
            exit="exit"
            className="hidden md:flex md:max-w-xl xl:max-w-none mx-auto xl:mx-0 mb-8 short:mb-6"
          >
            <div className="flex flex-1 xl:gap-x-4">
              {/* experience */}
              <div className="relative flex-1 after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0">
                <div className="text-3xl short:text-2xl xl:text-4xl font-extrabold text-accent mb-2 short:mb-1">
                  <CountUp start={0} end={3} duration={5} /> +
                </div>
                <div className="text-xs short:text-[10px] uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                  Years of Experience
                </div>
              </div>

              {/* clients */}
              <div className="relative flex-1 after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0">
                <div className="text-3xl short:text-2xl xl:text-4xl font-extrabold text-accent mb-2 short:mb-1">
                  <CountUp start={0} end={20} duration={5} /> +
                </div>
                <div className="text-xs short:text-[10px] uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                  Satisfied clients
                </div>
              </div>

              {/* projects */}
              <div className="relative flex-1 after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0 last:after:hidden">
                <div className="text-3xl short:text-2xl xl:text-4xl font-extrabold text-accent mb-2 short:mb-1">
                  <CountUp start={0} end={40} duration={5} /> +
                </div>
                <div className="text-xs short:text-[10px] uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                  Finished Projects
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* info */}
        <motion.div
          variants={fadeIn("left", 0.4)}
          initial="hidden"
          animate="show"
          exit="exit"
          className="flex flex-col w-full xl:max-w-[48%] h-[480px] short:h-[380px] sm:h-[480px]"
        >
          <div className="flex gap-x-4 xl:gap-x-8 mx-auto xl:mx-0 mb-4 short:mb-3">
            {aboutData.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className={`${
                  index === itemIndex &&
                  "text-accent after:w-[100%] after:bg-accent after:transition-all after:duration-300"
                } cursor-pointer capitalize text-base short:text-sm xl:text-lg relative after:w-8 after:h-[2px] after:bg-white after:absolute after:-bottom-1 after:left-0`}
                onClick={() => setIndex(itemIndex)}
              >
                {item.title}
              </div>
            ))}
          </div>

          <div className="py-2 xl:py-6 flex flex-col gap-y-2 xl:gap-y-4 items-center xl:items-start">
            {/* Frontend/Backend Switch */}
            <div className="flex gap-x-3 short:gap-x-2 mb-2 short:mb-1 relative z-20">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleTabChange(0);
                }}
                className={`px-4 short:px-3 py-2 short:py-1.5 rounded-lg text-sm short:text-xs font-medium transition-all duration-300 cursor-pointer select-none ${
                  skillTab === 0
                    ? "bg-accent text-white"
                    : "bg-white/5 text-white/60 hover:bg-white/10"
                }`}
              >
                Frontend
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleTabChange(1);
                }}
                className={`px-4 short:px-3 py-2 short:py-1.5 rounded-lg text-sm short:text-xs font-medium transition-all duration-300 cursor-pointer select-none ${
                  skillTab === 1
                    ? "bg-accent text-white"
                    : "bg-white/5 text-white/60 hover:bg-white/10"
                }`}
              >
                Backend
              </button>
            </div>

            {/* Skills Display */}
            <div className="w-full relative z-10">
              <div className="hidden sm:block font-light mb-3 short:mb-2 text-white/80 text-sm short:text-xs">
                {aboutData[index].info[skillTab].title}
              </div>

              {/* Icons Grid with Horizontal Scroll */}
              <div className="relative group">
                {/* Gradient Overlays for Scroll Indication */}
                <div className="sm:hidden absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-primary/90 to-transparent z-10 pointer-events-none" />
                <div className="sm:hidden absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-primary/90 to-transparent z-10 pointer-events-none" />
                
                {/* Scrollable Container */}
                <div 
                  ref={scrollContainerRef}
                  className="overflow-x-auto scrollbar-hide pb-2 sm:pr-6"
                  style={{ scrollBehavior: 'auto' }}
                  onTouchStart={handleUserInteraction}
                  onMouseDown={handleUserInteraction}
                  onWheel={handleUserInteraction}
                >
                  <div className="grid grid-flow-col auto-cols-[calc(25%-9px)] sm:grid-flow-row sm:grid-cols-4 gap-3 short:gap-2 sm:gap-4 min-w-min sm:min-w-0">
                    {aboutData[index].info[skillTab].icons?.map((iconData, iconIndex) => (
                      <motion.div
                        key={iconIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: iconIndex * 0.05 }}
                        className="flex flex-col items-center justify-center p-3 short:p-2 bg-white/5 hover:bg-accent/10 rounded-lg transition-all duration-300 hover:scale-105 border border-white/5 hover:border-accent/30 min-w-[70px] short:min-w-[60px] sm:min-w-0"
                      >
                        <div className="text-2xl short:text-xl sm:text-3xl text-white hover:text-accent transition-colors duration-300 mb-1 short:mb-0.5">
                          {iconData.icon}
                        </div>
                        <span className="text-[9px] short:text-[8px] sm:text-[10px] text-white/60 text-center font-medium whitespace-nowrap">
                          {iconData.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Scroll Hint (visible only on mobile) */}
                {isAutoScrolling && (
                  <div className="sm:hidden text-center mt-2 short:mt-1">
                    <span className="text-[10px] short:text-[9px] text-white/40 animate-pulse">
                      Touch to pause auto-scroll
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default About;