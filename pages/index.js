//next image
import Image from "next/image";

//components
import ParticlesContainer from "../components/ParticlesContainer";
import ProjectsBtn from "../components/ProjectsBtn";
import Avatar from "../components/Avatar";

//framer motion
import { motion } from "framer-motion";

//variants
import { fadeIn } from "../variants";
import ProjectsBtn2 from "../components/ProjectsBtn2";

const Home = () => {
  // Smooth entry and exit variants - matched to About page timing
  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: -60,
    },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "tween",
        duration: 0.8,
        ease: [0.25, 0.25, 0.25, 0.75],
      }
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: {
        type: "tween",
        duration: 0.8,
        ease: [0.25, 0.25, 0.25, 0.75],
      }
    }
  };

  const subtitleVariants = {
    hidden: { 
      opacity: 0, 
      y: -40,
    },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "tween",
        duration: 0.8,
        delay: 0.2,
        ease: [0.25, 0.25, 0.25, 0.75],
      }
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: {
        type: "tween",
        duration: 0.8,
        ease: [0.25, 0.25, 0.25, 0.75],
      }
    }
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
    },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "tween",
        duration: 0.8,
        delay: 0.4,
        ease: [0.25, 0.25, 0.25, 0.75],
      }
    },
    exit: {
      opacity: 0,
      x: 100,
      transition: {
        type: "tween",
        duration: 0.8,
        ease: [0.25, 0.25, 0.25, 0.75],
      }
    }
  };

  return (
    <div className="bg-primary/60 h-full">
      {/* text */}
      <div className="w-full h-full bg-gradient-to-r from-primary/10 via-black/30 to-black/10">
        <div className="text-center flex flex-col justify-center xl:pt-40 xl:text-left h-full container mx-auto">
          {/* title */}
          <motion.h1
            variants={titleVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="h1 xl:text-[40px]"
          >
            Transforming Ideas <br /> Into{" "}
            <span className="text-accent">Digital Reality</span>
          </motion.h1>

          {/* subtitle */}
          <motion.p
            variants={subtitleVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-10 xl:mb-16"
          >
            I&apos;m a passionate full-stack developer who builds dynamic web
            apps and mobile apps from start to finish, turning ideas into
            seamless digital experiences.
          </motion.p>

          {/* buttons */}
          <motion.div 
            variants={buttonVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="flex flex-col xl:flex-row gap-4 justify-center xl:justify-start items-center"
          >
            {/* mobile buttons */}
            <div className="flex flex-col gap-4 xl:hidden">
              <a
                href="/your-cv.pdf"
                download
                className="relative bottom-2 btn rounded-full border-2 border-accent/50 bg-gradient-to-r from-accent/10 to-accent/5 backdrop-blur-sm w-[180px] h-[50px] px-8 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-accent hover:shadow-lg hover:shadow-accent/50 group"
              >
                <span className="group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500 font-semibold text-white flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="whitespace-nowrap">Download CV</span>
                </span>
                <span className="absolute translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 font-semibold text-white items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                    />
                  </svg>
                  <span className="whitespace-nowrap">Get CV</span>
                </span>
              </a>
              <ProjectsBtn2 />
            </div>

            {/* desktop buttons */}
            <div className="hidden mb-10 xl:flex gap-4 items-end">
              <ProjectsBtn />
              <a
                href="/your-cv.pdf"
                download
                className="relative btn rounded-full border-2 border-accent/50 bg-gradient-to-r from-accent/10 to-accent/5 backdrop-blur-sm w-[200px] h-[60px] px-8 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-accent hover:shadow-lg hover:shadow-accent/50 group"
              >
                <span className="group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500 font-semibold text-white flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="whitespace-nowrap">Download CV</span>
                </span>
                <span className="absolute translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 font-semibold text-white items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                    />
                  </svg>
                  <span className="whitespace-nowrap">Get CV</span>
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* image */}
      <div className="w-[1200px] h-full absolute right-0 bottom-0">
        {/* bg image */}
        <div className="bg-none xl:bg-explosion xl:bg-cover xl:bg-right xl:bg-no-repeat w-full h-full absolute mix-blend-color-dodge translate-z-0"></div>

        {/* particles */}
        <div>
          <ParticlesContainer />
        </div>
      </div>
    </div>
  );
};

export default Home;