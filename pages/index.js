import React, { useState } from "react";
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
  // Smooth entry and exit variants
  const titleVariants = {
    hidden: { opacity: 0, y: -60 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.8,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: {
        type: "tween",
        duration: 0.8,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: -40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.8,
        delay: 0.2,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: {
        type: "tween",
        duration: 0.8,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.8,
        delay: 0.4,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
    exit: {
      opacity: 0,
      x: 100,
      transition: {
        type: "tween",
        duration: 0.8,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
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
            className="h1 text-[30px] short:text-[28px] xl:text-[40px]"
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
  className="text-[16px] short:text-[14px] xl:text-[20px] max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-10 xl:mb-16"
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
              <ProjectsBtn2 />
            </div>

            {/* desktop buttons */}
            <div className="hidden mb-10 xl:flex gap-4 items-end">
              <ProjectsBtn />
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