import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ChevronDown, X } from 'lucide-react';


const portfolioData = {
  web: [
    {
      id: 1,
      name: 'Fade & Finishes',
      description: 'Modern salon & barber booking with gallery and appointment scheduling',
      fullDescription:
        'Fade & Finishes is a polished beauty and barber salon web experience that allows clients to browse services (hair styling, barbering, pedicures, manicures, etc.), explore high-quality service galleries, check availability, and book appointments online. Built for responsiveness and conversion, it focuses on clear service presentation, smooth booking flows, and visual inspiration to help users pick the right stylist or treatment.',
      image: '/Fade%20%26%20Finishes.png',
      liveUrl: 'https://fade-and-finishes-frontend-f1ys.vercel.app/'
    },
    {
      id: 2,
      name: 'Wavify',
      description: 'Music discovery & playlist experience with clean, immersive UI',
      fullDescription:
        'Wavify is a modern music app centered on discovery, playlists, and effortless listening. Users can explore new releases and curated picks, build and manage personal playlists, and enjoy a minimal, responsive player interface that keeps listening smooth and delightful. Wavify emphasizes curated recommendations, quick access to trending tracks, and a cohesive playback experience across devices.',
      image: '/Wavify2.png',
      liveUrl: 'https://wavify-alpha.vercel.app/'
    },
    {
      id: 3,
      name: 'Movie Landing Page',
      description: 'Cinematic landing page for showcasing movies, trailers and posters',
      fullDescription:
        'Movie Landing Page is a visually-driven film showcase focused on beautiful poster-first layouts, hero carousels, and sleek metadata cards. It helps visitors discover films, watch trailers, and explore cast/genre information in a gallery-like experience designed to highlight visual assets and drive engagement. Perfect for movie promos, festival lineups, or streaming previews.',
      image: '/Movies.png',
      liveUrl: 'https://moviebox-yo7e.onrender.com/'
    }
  ],
  mobile: [
    {
      id: 1,
      name: 'Chattr',
      description: 'Social media app to post, follow, message and get instant notifications',
      fullDescription:
        'Chattr is a real-time social media experience where users can create posts, follow friends, maintain profiles, and message each other instantly. The app includes push notifications for new messages and interactions, clean feed and profile views, and a fast messaging flow so conversations stay snappy and engaging.',
      image: '/chattr2.jpg',
      apkUrl: 'https://github.com/Femik84/Projects/releases/download/V1.0.0/application-f5d89495-c695-4dcc-ab5c-84f20c5369d2.apk',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.femik.chattr'
    },
    {
      id: 2,
      name: 'Ledgerly',
      description: 'Expense & budget tracker with spending insights and alerts',
      fullDescription:
        'Ledgerly helps users create budgets, record and categorize expenses, and visualize spending trends with clear charts and statistics. It provides budget alerts and notifications tied to spending thresholds, helping users stay on track financially with insightful summaries and easy transaction entry.',
      image: '/ledgerly2.jpg',
      apkUrl: 'https://github.com/Femik84/Ledgerly-Release/releases/download/V1.0.0/Ledgerly.apk',
      playStoreUrl: '#' // no Play Store release available
    },
    {
      id: 3,
      name: 'FastCart',
      description: 'E‑commerce app for gadgets with Stripe payments and order tracking',
      fullDescription:
        'FastCart is a streamlined e‑commerce app focused on gadgets and electronics. Users can browse products, search for items, complete secure Stripe-powered checkouts, and view order details and status updates. FastCart emphasizes quick product discovery, clear order flows, and easy post-purchase tracking.',
      image: '/FastCart.jpg',
      apkUrl: 'https://github.com/Femik84/Fast-art-Release-/releases/download/V1.0.0/FastCart.apk',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.ayo234.Fastcart_'
    }
  ]
};

/* Decorative Bulb */
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

/* Decorative concentric circles */
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

/* Reusable fade variant */
const fadeIn = (direction, delay) => ({
  hidden: {
    y: 0,
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

/* Project Details Modal */
const ProjectModal = ({ project, isOpen, onClose, type }) => {
  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-gradient-to-br from-[#0f1724] to-[#071029] rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              whileHover={{ scale: 1.05, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 bg-black/60 rounded-full text-white hover:bg-black transition-all shadow-lg"
            >
              <X size={22} />
            </motion.button>

            <div className="overflow-y-auto max-h-[90vh] p-4 md:p-8 scrollbar-hide">
              {/* Mobile Layout */}
              <div className="md:hidden">
                {/* If mobile project: show phone mock; else use full-width image */}
                {type === 'mobile' ? (
                  <div className="flex justify-center mb-4">
                    {/* Phone mock frame */}
                    <div className="w-44 sm:w-52 md:w-60 bg-black/80 rounded-3xl p-2 shadow-2xl border border-white/10">
                      <div className="bg-[#05061a] rounded-2xl overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.name}
                          className="w-full h-[290px] object-[center_20%] sm:h-[290px] object-cover"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative h-36 rounded-xl overflow-hidden mb-4 shadow-2xl">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                )}

                <h2 className="text-2xl font-bold text-white mb-3">{project.name}</h2>
                <p className="text-white/80 text-sm leading-relaxed mb-5">{project.fullDescription}</p>

                <div className="flex flex-wrap gap-2">
                  {type === 'web' ? (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 px-4 py-2.5 bg-accent text-white rounded-lg font-semibold text-sm hover:bg-accent/80 transition-colors shadow-lg text-center"
                    >
                      Visit Live Site
                    </motion.a>
                  ) : (
                    <>
                      <motion.a
                        href={project.apkUrl}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 px-4 py-2.5 bg-accent text-white rounded-lg font-semibold text-sm hover:bg-accent/80 transition-colors shadow-lg text-center"
                      >
                        Download APK
                      </motion.a>
                      <motion.a
                        href={project.playStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 px-4 py-2.5 bg-white/10 border-2 border-white/30 text-white rounded-lg font-semibold text-sm hover:border-accent hover:bg-accent/20 transition-colors text-center"
                      >
                        Play Store
                      </motion.a>
                    </>
                  )}
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:flex gap-8">
                {/* Left Side - If mobile project show phone mock on left; otherwise show large image */}
                <div className="w-1/2 flex-shrink-0">
                  <div className="relative h-full min-h-[420px] rounded-2xl overflow-hidden shadow-2xl sticky top-0">
                    {type === 'mobile' ? (
                      <div className="flex items-center justify-center p-6 w-full h-full">
                        <div className="w-[260px] sm:w-[320px] bg-black/80 rounded-3xl p-3 shadow-xl border border-white/10">
                          <div className="bg-[#05061a] rounded-2xl overflow-hidden">
                            <img
                              src={project.image}
                              alt={project.name}
                              className="w-full h-[460px] object-[center_13%] sm:h-[460px] md:h-[460px] object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <img
                          src={project.image}
                          alt={project.name}
                          className="w-full h-full object-contain"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </>
                    )}
                  </div>
                </div>

                {/* Right Side - Details */}
                <div className="w-1/2 flex flex-col">
                  <h2 className="text-4xl font-bold text-white mb-4">{project.name}</h2>
                  <p className="text-white/80 text-lg leading-relaxed mb-6">{project.fullDescription}</p>

                  <div className="flex flex-wrap gap-3 mt-auto">
                    {type === 'web' ? (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-3 bg-accent text-white rounded-xl font-semibold hover:bg-accent/80 transition-colors shadow-lg"
                      >
                        Visit Live Site
                      </motion.a>
                    ) : (
                      <>
                        <motion.a
                          href={project.apkUrl}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-6 py-3 bg-accent text-white rounded-xl font-semibold hover:bg-accent/80 transition-colors shadow-lg"
                        >
                          Download APK
                        </motion.a>
                        <motion.a
                          href={project.playStoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-6 py-3 bg-white/10 border-2 border-white/30 text-white rounded-xl font-semibold hover:border-accent hover:bg-accent/20 transition-colors"
                        >
                          Play Store
                        </motion.a>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <style>{`
              .scrollbar-hide::-webkit-scrollbar { display: none; }
              .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* Web project card - image fills whole card, content overlays with gradient under text */
const WebProjectCard = ({ project, onViewDetails, showDescription = false }) => {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg border border-white/10 w-full h-[245px] md:h-64 lg:h-[350px] ">
      {/* Background image fills entire card */}
     <img
  src={project.image}
  alt={project.name}
  className="absolute top-[-42px] lg:top-[-54px] left-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
/>

      {/* dark gradient overlay to ensure contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent" />

      {/* Content container sits on top */}
      <div className="absolute left-0 right-0 bottom-0 p-4 md:p-5 z-10">
        {/* subtle frosted bar (overlay under the text) */}
        <div className="absolute left-4 right-4 -bottom-2 h-24 rounded-t-xl bg-black/40 blur-sm pointer-events-none" />

        <div className="relative z-20">
          <h3 className="text-base md:text-lg font-bold text-white mb-1 md:mb-2">{project.name}</h3>
          {showDescription && (
            <p className="text-sm text-white/80 hidden md:block mb-3 line-clamp-2">{project.description}</p>
          )}

          <div className="flex gap-2 mt-2">
            <motion.button
              onClick={onViewDetails}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 px-3 py-1.5 md:py-2 bg-accent text-white rounded-lg font-medium text-center text-xs md:text-sm hover:bg-accent/80 transition-colors"
            >
              View Details
            </motion.button>
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 px-3 py-1.5 md:py-2 border-2 border-accent text-accent rounded-lg font-medium text-center text-xs md:text-sm hover:bg-accent hover:text-white transition-colors"
            >
              Visit Live
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Mobile project card (unchanged layout but tidy) */
const MobileProjectCard = ({ project, isOpen, onToggle, onViewDetails, showDescription = false }) => (
  <div className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-accent/20 transition-all duration-300 w-full border border-white/10">
    <div className="flex h-60 md:h-[370px]">
      {/* Left Side - Image */}
      <div className="w-2/5 md:w-2/5 relative overflow-hidden bg-gradient-to-br from-accent/10 to-secondary/10 flex items-center justify-center p-3 md:p-5">
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-[100%] object-[center_20%] lg:object-[center_40%] object-cover rounded-2xl md:rounded-3xl shadow-xl transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Right Side - Details */}
      <div className="w-3/5 md:w-3/5 p-4 md:p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-sm md:text-lg font-bold text-white mb-1.5 md:mb-2 line-clamp-2">{project.name}</h3>
          <p className="text-xs md:text-sm text-white/60 md:text-white/70 line-clamp-2 md:line-clamp-3 mb-3 md:mb-4">{project.description}</p>
        </div>

        <div className="flex flex-col gap-1.5 md:gap-2">
          <motion.button
            onClick={onViewDetails}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-2.5 md:px-3 py-1.5 md:py-2 bg-accent text-white rounded-lg font-medium text-xs md:text-sm hover:bg-accent/80 transition-colors"
          >
            View Details
          </motion.button>

          {/* Download Button with Dropdown */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onToggle}
              className="w-full px-2.5 md:px-3 py-1.5 md:py-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-lg font-medium text-xs md:text-sm hover:border-accent hover:bg-accent/20 transition-colors flex items-center justify-center gap-2"
            >
              <span>Download</span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={16} />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-full left-0 right-0 mb-1.5 md:mb-2 bg-[rgb(15,23,42)] backdrop-blur-md border border-white/20 rounded-lg overflow-hidden shadow-xl z-50"
                >
                  <motion.a
                    href={project.apkUrl}
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
                    className="flex items-center justify-between px-3 md:px-4 py-2 md:py-2.5 text-white hover:text-accent transition-colors border-b border-white/10"
                  >
                    <span className="text-xs md:text-sm font-medium">APK File</span>
                    <span className="text-lg">📦</span>
                  </motion.a>
                  <motion.a
                    href={project.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
                    className="flex items-center justify-between px-3 md:px-4 py-2 md:py-2.5 text-white hover:text-accent transition-colors"
                  >
                    <span className="text-xs md:text-sm font-medium">Play Store</span>
                    <span className="text-lg">▶️</span>
                  </motion.a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ProjectsPage = () => {
  const [activeTab, setActiveTab] = useState('web');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDownloadOptions, setShowDownloadOptions] = useState({});
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollContainerRef = useRef(null);

  const currentProjects = activeTab === 'web' ? portfolioData.web : portfolioData.mobile;

  const handlePrev = () => {
    const newIndex = currentIndex === 0 ? currentProjects.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollTo({
        left: newIndex * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const handleNext = () => {
    const newIndex = currentIndex === currentProjects.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollTo({
        left: newIndex * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const toggleDownloadOptions = (projectId) => {
    const key = `${activeTab}-${projectId}`;
    setShowDownloadOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth;
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const newIndex = Math.round(scrollLeft / cardWidth);
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < currentProjects.length) {
        setCurrentIndex(newIndex);
      }
    }
  };

  return (
    <div className="min-h-screen bg-primary/30 md:pt-36 pb-8 md:pb-12 flex items-center relative overflow-hidden">
      <Circles />
      <div className="container mx-auto relative z-20 px-4">
        <div className="flex flex-col xl:flex-row gap-x-8">
          {/* Text Section */}
          <div className="text-center relative flex xl:w-[30vw] flex-col lg:text-left mb-6 md:mb-8 xl:bottom-10">
            <motion.h2
              variants={fadeIn("right", 0.3)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="h2 xl:mt-8 text-white"
            >
              Selected <span className="text-accent">Works.</span>
            </motion.h2>
            <motion.p
              variants={fadeIn("right", 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="mb-4 md:mb-6 max-w-[400px] mx-auto lg:mx-0 text-white/80 text-sm md:text-base"
            >
              <span className="hidden md:inline">My projects blend creativity and functionality, delivering responsive designs, clean code, smooth performance, and user-centric solutions tailored for real-world impact.</span>
              <span className="md:hidden">Projects that blend creativity with functionality for real-world impact.</span>
            </motion.p>

            <motion.div
              variants={fadeIn("right", 0.5)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="flex justify-center lg:justify-start mt-2 md:mt-6"
            >
              <div className="inline-flex bg-white/5 backdrop-blur-sm rounded-full p-1.5 shadow-lg border border-white/10">
                <button
                  onClick={() => { setActiveTab('web'); setCurrentIndex(0); }}
                  className={`relative px-4 md:px-6 py-2 md:py-2.5 rounded-full font-semibold text-xs md:text-sm transition-colors duration-300 ${activeTab === 'web' ? 'text-white' : 'text-white/60 hover:text-white'}`}
                >
                  {activeTab === 'web' && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-accent rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">Web Apps</span>
                </button>

                <button
                  onClick={() => { setActiveTab('mobile'); setCurrentIndex(0); }}
                  className={`relative px-4 md:px-6 py-2 md:py-2.5 rounded-full font-semibold text-xs md:text-sm transition-colors duration-300 ${activeTab === 'mobile' ? 'text-white' : 'text-white/60 hover:text-white'}`}
                >
                  {activeTab === 'mobile' && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-accent rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">Mobile Apps</span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Projects Section */}
          <motion.div
            variants={fadeIn("left", 0.6)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="w-full xl:flex-1 flex flex-col items-center"
          >
            <div className="relative flex items-center w-full max-w-md md:max-w-lg xl:max-w-lg">
              {/* Left Navigation Button - Hidden on Mobile */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrev}
                className="hidden md:block absolute -left-4 xl:-left-20 z-30 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-accent hover:border-accent transition-all duration-300 shadow-lg"
              >
                <ChevronLeft size={24} />
              </motion.button>

              {/* Projects Container with Horizontal Scroll on Mobile */}
              <div 
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex-1 overflow-x-auto overflow-y-hidden md:overflow-hidden px-0 md:px-4 xl:px-0 snap-x snap-mandatory scrollbar-hide"
              >
                <div className="flex md:block gap-4 md:gap-0">
                  {currentProjects.map((project, index) => (
                    <div 
                      key={`${activeTab}-${project.id}`}
                      className="w-full flex-shrink-0 snap-center md:hidden"
                    >
                      {activeTab === 'web' ? (
                        <WebProjectCard 
                          project={project} 
                          showDescription={true}
                          onViewDetails={() => openModal(project)}
                        />
                      ) : (
                        <MobileProjectCard
                          project={project}
                          showDescription={true}
                          isOpen={!!showDownloadOptions[`${activeTab}-${project.id}`]}
                          onToggle={() => toggleDownloadOptions(project.id)}
                          onViewDetails={() => openModal(project)}
                        />
                      )}
                    </div>
                  ))}
                  
                  {/* Desktop view - only current slide */}
                  <div className="hidden md:block w-full">
                    <motion.div
                      key={`${activeTab}-${currentIndex}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="w-full"
                    >
                      {activeTab === 'web' ? (
                        <WebProjectCard 
                          project={currentProjects[currentIndex]} 
                          showDescription={true}
                          onViewDetails={() => openModal(currentProjects[currentIndex])}
                        />
                      ) : (
                        <MobileProjectCard
                          project={currentProjects[currentIndex]}
                          showDescription={true}
                          isOpen={!!showDownloadOptions[`${activeTab}-${currentProjects[currentIndex].id}`]}
                          onToggle={() => toggleDownloadOptions(currentProjects[currentIndex].id)}
                          onViewDetails={() => openModal(currentProjects[currentIndex])}
                        />
                      )}
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Right Navigation Button - Hidden on Mobile */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="hidden md:block absolute -right-4 xl:-right-20 z-30 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-accent hover:border-accent transition-all duration-300 shadow-lg"
              >
                <ChevronRight size={24} />
              </motion.button>
            </div>

            {/* Pagination Dots */}
            <div className="flex gap-2 mt-6 md:mt-8">
              {currentProjects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${index === currentIndex ? 'w-8 md:w-10 h-2 md:h-2.5 bg-accent' : 'w-2 md:w-2.5 h-2 md:h-2.5 bg-white/30 hover:bg-white/50'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <Bulb />

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
        type={activeTab}
      />

      {/* Custom CSS for hiding scrollbar */}
      <style>{`
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

export default ProjectsPage;