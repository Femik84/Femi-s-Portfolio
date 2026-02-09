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
  ],
  mobile: [
    {
      id: 1,
      name: 'Chattr',
      description: 'Social media app to post, follow, message and get instant notifications',
      fullDescription:
        'Chattr is a real-time social media experience where users can create posts, follow friends, maintain profiles, and message each other instantly. The app includes push notifications for new messages and interactions, clean feed and profile views, and a fast messaging flow so conversations stay snappy and engaging.',
      image: '/chattr2.jpg',
      apkUrl: 'https://pub-77bd1bed47ae42bc8acaac50a411c9ef.r2.dev/Chattr.apk',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.femik.chattr'
    },
    {
      id: 2,
      name: 'Ledgerly',
      description: 'Expense & budget tracker with spending insights and alerts',
      fullDescription:
        'Ledgerly helps users create budgets, record and categorize expenses, and visualize spending trends with clear charts and statistics. It provides budget alerts and notifications tied to spending thresholds, helping users stay on track financially with insightful summaries and easy transaction entry.',
      image: '/ledgerly2.jpg',
      apkUrl: 'https://pub-77bd1bed47ae42bc8acaac50a411c9ef.r2.dev/Ledgerly.apk',
      playStoreUrl: ''
    },
    {
      id: 3,
      name: 'FastCart',
      description: 'E‑commerce app for gadgets with Stripe payments and order tracking',
      fullDescription:
        'FastCart is a streamlined e‑commerce app focused on gadgets and electronics. Users can browse products, search for items, complete secure Stripe-powered checkouts, and view order details and status updates. FastCart emphasizes quick product discovery, clear order flows, and easy post-purchase tracking.',
      image: '/FastCart.jpg',
      apkUrl: 'https://pub-77bd1bed47ae42bc8acaac50a411c9ef.r2.dev/FastCart.apk',
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

  const modalMaxClass =
    type === 'web' ? 'max-w-full md:max-w-[700px]' : 'max-w-5xl';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 short:p-2 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`relative bg-gradient-to-br from-[#0f1724] to-[#071029] rounded-3xl short:rounded-2xl ${modalMaxClass} w-full max-h-[90vh] overflow-hidden border border-white/10 shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              whileHover={{ scale: 1.05, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="absolute top-4 short:top-3 right-4 short:right-3 z-20 p-2 short:p-1.5 bg-black/60 rounded-full text-white hover:bg-black transition-all shadow-lg"
            >
              <X size={22} className="short:w-5 short:h-5" />
            </motion.button>

            <div className="overflow-y-auto max-h-[90vh] p-4 short:p-3 md:p-8 short:md:p-6 scrollbar-hide">
              {/* Mobile Layout */}
              <div className="md:hidden">
                {type === 'mobile' ? (
                  <div className="flex justify-center mb-4 short:mb-3">
                    <div className="w-44 short:w-40 sm:w-52 md:w-60 bg-black/80 rounded-3xl short:rounded-2xl p-2 short:p-1.5 shadow-2xl border border-white/10">
                      <div className="bg-[#05061a] rounded-2xl short:rounded-xl overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.name}
                          className="w-full h-[290px] short:h-[240px] object-[center_20%] sm:h-[290px] object-cover"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative h-36 short:h-28 rounded-xl short:rounded-lg overflow-hidden mb-4 short:mb-3 shadow-2xl">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                )}

                <h2 className="text-2xl short:text-xl font-bold text-white mb-3 short:mb-2">{project.name}</h2>
                <p className="text-white/80 text-sm short:text-xs leading-relaxed mb-5 short:mb-4">{project.fullDescription}</p>

                <div className="flex flex-wrap gap-2 short:gap-1.5">
                  {type === 'web' ? (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 px-4 short:px-3 py-2.5 short:py-2 bg-accent text-white rounded-lg short:rounded-md font-semibold text-sm short:text-xs hover:bg-accent/80 transition-colors shadow-lg text-center"
                    >
                      Visit Live Site
                    </motion.a>
                  ) : (
                    <>
                      <motion.a
                        href={project.apkUrl}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 px-4 short:px-3 py-2.5 short:py-2 bg-accent text-white rounded-lg short:rounded-md font-semibold text-sm short:text-xs hover:bg-accent/80 transition-colors shadow-lg text-center"
                      >
                        Download APK
                      </motion.a>
                      {project.playStoreUrl && project.playStoreUrl !== '' && (
                        <motion.a
                          href={project.playStoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 px-4 short:px-3 py-2.5 short:py-2 bg-white/10 border-2 border-white/30 text-white rounded-lg short:rounded-md font-semibold text-sm short:text-xs hover:border-accent hover:bg-accent/20 transition-colors text-center"
                        >
                          Play Store
                        </motion.a>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:flex gap-8 short:gap-6">
                {type === 'web' ? (
                  <div className="w-full flex flex-col items-center">
                    <div
                      className="relative rounded-2xl short:rounded-xl overflow-hidden shadow-2xl max-w-[640px] w-full mx-auto"
                      style={{ aspectRatio: '1334/634', maxWidth: '640px', maxHeight: '320px' }}
                    >
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-contain block"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                    </div>

                    <div className="mt-4 short:mt-3 flex flex-col max-w-[640px] w-full mx-auto px-4 short:px-3">
                      <h2 className="text-xl short:text-lg sm:text-2xl font-bold text-white mb-2 short:mb-1.5">
                        {project.name}
                      </h2>
                      <p className="text-white/80 text-sm short:text-xs leading-relaxed mb-4 short:mb-3">
                        {project.fullDescription}
                      </p>

                      <div className="flex flex-wrap gap-3 short:gap-2 mt-auto">
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-6 short:px-4 py-3 short:py-2 bg-accent text-white rounded-xl short:rounded-lg font-semibold text-sm short:text-xs hover:bg-accent/80 transition-colors shadow-lg"
                        >
                          Visit Live Site
                        </motion.a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-1/2 flex-shrink-0">
                      <div className="relative h-full min-h-[420px] short:min-h-[340px] rounded-2xl short:rounded-xl overflow-hidden shadow-2xl top-0">
                        {type === 'mobile' ? (
                          <div className="flex items-center justify-center p-6 short:p-4 w-full h-full">
                            <div className="w-[260px] short:w-[220px] sm:w-[320px] bg-black/80 rounded-3xl short:rounded-2xl p-3 short:p-2 shadow-xl border border-white/10">
                              <div className="bg-[#05061a] rounded-2xl short:rounded-xl overflow-hidden">
                                <img
                                  src={project.image}
                                  alt={project.name}
                                  className="w-full h-[460px] short:h-[380px] object-[center_13%] sm:h-[460px] md:h-[460px] object-cover"
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>
                            <img
                              src={project.image}
                              alt={project.name}
                              className="w-full h-[260px] short:h-[220px] object-contain"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          </>
                        )}
                      </div>
                    </div>

                    <div className="w-1/2 flex flex-col">
                      <h2 className="text-4xl short:text-3xl font-bold text-white mb-4 short:mb-3">{project.name}</h2>
                      <p className="text-white/80 text-lg short:text-base leading-relaxed mb-6 short:mb-4">{project.fullDescription}</p>

                      <div className="flex flex-wrap gap-3 short:gap-2 mt-auto">
                        {type === 'web' ? (
                          <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-6 short:px-4 py-3 short:py-2 bg-accent text-white rounded-xl short:rounded-lg font-semibold text-sm short:text-xs hover:bg-accent/80 transition-colors shadow-lg"
                          >
                            Visit Live Site
                          </motion.a>
                        ) : (
                          <>
                            <motion.a
                              href={project.apkUrl}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.98 }}
                              className="px-6 short:px-4 py-3 short:py-2 bg-accent text-white rounded-xl short:rounded-lg font-semibold text-sm short:text-xs hover:bg-accent/80 transition-colors shadow-lg"
                            >
                              Download APK
                            </motion.a>
                            {project.playStoreUrl && project.playStoreUrl !== '' && (
                              <motion.a
                                href={project.playStoreUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-6 short:px-4 py-3 short:py-2 bg-white/10 border-2 border-white/30 text-white rounded-xl short:rounded-lg font-semibold text-sm short:text-xs hover:border-accent hover:bg-accent/20 transition-colors"
                              >
                                Play Store
                              </motion.a>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}
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

/* Web project card */
const WebProjectCard = ({ project, onViewDetails, showDescription = false }) => {
  return (
    <div className="relative rounded-2xl short:rounded-xl overflow-hidden shadow-lg border border-white/10 w-full h-[245px] short:h-[200px] md:h-64 short:md:h-56 lg:h-[350px] short:lg:h-[300px]">
      <img
        src={project.image}
        alt={project.name}
        className="absolute top-[-42px] short:top-[-36px] lg:top-[-54px] short:lg:top-[-46px] left-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent" />

      <div className="absolute left-0 right-0 bottom-0 p-4 short:p-3 md:p-5 short:md:p-4 z-10">
        <div className="absolute left-4 short:left-3 right-4 short:right-3 -bottom-2 h-24 short:h-20 rounded-t-xl short:rounded-t-lg bg-black/40 blur-sm pointer-events-none" />

        <div className="relative z-20">
          <h3 className="text-base short:text-sm md:text-lg short:md:text-base font-bold text-white mb-1 short:mb-0.5 md:mb-2 short:md:mb-1.5">{project.name}</h3>
          {showDescription && (
            <p className="text-sm short:text-xs text-white/80 hidden md:block mb-3 short:mb-2 line-clamp-2">{project.description}</p>
          )}

          <div className="flex gap-2 short:gap-1.5 mt-2 short:mt-1.5">
            <motion.button
              onClick={onViewDetails}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 px-3 short:px-2 py-1.5 short:py-1 md:py-2 short:md:py-1.5 bg-accent text-white rounded-lg short:rounded-md font-medium text-center text-xs short:text-[10px] md:text-sm short:md:text-xs hover:bg-accent/80 transition-colors"
            >
              View Details
            </motion.button>
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 px-3 short:px-2 py-1.5 short:py-1 md:py-2 short:md:py-1.5 border-2 border-accent text-accent rounded-lg short:rounded-md font-medium text-center text-xs short:text-[10px] md:text-sm short:md:text-xs hover:bg-accent hover:text-white transition-colors"
            >
              Visit Live
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Mobile project card */
const MobileProjectCard = ({ project, isOpen, onToggle, onViewDetails, showDescription = false }) => (
  <div className="group bg-white/5 backdrop-blur-sm rounded-2xl short:rounded-xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-accent/20 transition-all duration-300 w-full border border-white/10">
    <div className="flex h-60 short:h-56 md:h-[370px] short:md:h-[320px]">
      <div className="w-2/5 md:w-2/5 relative overflow-hidden bg-gradient-to-br from-accent/10 to-secondary/10 flex items-center justify-center p-3 short:p-2 md:p-5 short:md:p-4">
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-[100%] object-[center_20%] lg:object-[center_40%] object-cover rounded-2xl short:rounded-xl md:rounded-3xl short:md:rounded-2xl shadow-xl transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      <div className="w-3/5 md:w-3/5 p-4 short:p-3 md:p-6 short:md:p-5 flex flex-col justify-between">
        <div>
          <h3 className="text-sm short:text-xs md:text-lg short:md:text-base font-bold text-white mb-1.5 short:mb-1 md:mb-2 short:md:mb-1.5 line-clamp-2">{project.name}</h3>
          <p className="text-xs short:text-[10px] md:text-sm short:md:text-xs text-white/60 md:text-white/70 line-clamp-2 md:line-clamp-3 mb-3 short:mb-2 md:mb-4 short:md:mb-3">{project.description}</p>
        </div>

        <div className="flex flex-col gap-1.5 short:gap-1 md:gap-2 short:md:gap-1.5">
          <motion.button
            onClick={onViewDetails}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-2.5 short:px-2 md:px-3 short:md:px-2.5 py-1.5 short:py-1 md:py-2 short:md:py-1.5 bg-accent text-white rounded-lg short:rounded-md font-medium text-xs short:text-[10px] md:text-sm short:md:text-xs hover:bg-accent/80 transition-colors"
          >
            View Details
          </motion.button>

          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onToggle}
              className="w-full px-2.5 short:px-2 md:px-3 short:md:px-2.5 py-1.5 short:py-1 md:py-2 short:md:py-1.5 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-lg short:rounded-md font-medium text-xs short:text-[10px] md:text-sm short:md:text-xs hover:border-accent hover:bg-accent/20 transition-colors flex items-center justify-center gap-2 short:gap-1.5"
            >
              <span>Download</span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={16} className="short:w-3.5 short:h-3.5" />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-full left-0 right-0 mb-1.5 short:mb-1 md:mb-2 short:md:mb-1.5 bg-[rgb(15,23,42)] backdrop-blur-md border border-white/20 rounded-lg short:rounded-md overflow-hidden shadow-xl z-50"
                >
                  <motion.a
                    href={project.apkUrl}
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
                    className="flex items-center justify-between px-3 short:px-2.5 md:px-4 short:md:px-3 py-2 short:py-1.5 md:py-2.5 short:md:py-2 text-white hover:text-accent transition-colors border-b border-white/10"
                  >
                    <span className="text-xs short:text-[10px] md:text-sm short:md:text-xs font-medium">APK File</span>
                    <span className="text-lg short:text-base">📦</span>
                  </motion.a>
                  {project.playStoreUrl && project.playStoreUrl !== '' && (
                    <motion.a
                      href={project.playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
                      className="flex items-center justify-between px-3 short:px-2.5 md:px-4 short:md:px-3 py-2 short:py-1.5 md:py-2.5 short:md:py-2 text-white hover:text-accent transition-colors"
                    >
                      <span className="text-xs short:text-[10px] md:text-sm short:md:text-xs font-medium">Play Store</span>
                      <span className="text-lg short:text-base">▶️</span>
                    </motion.a>
                  )}
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
    <div className="min-h-screen bg-primary/30 md:pt-36 short:md:pt-28 pb-8 short:pb-6 md:pb-12 short:md:pb-10 flex items-center relative overflow-hidden">
      <Circles />
      <div className="container mx-auto relative z-20 px-4 short:px-3">
        <div className="flex flex-col xl:flex-row gap-x-8 short:gap-x-6">
          {/* Text Section */}
          <div className="text-center relative flex xl:w-[30vw] flex-col lg:text-left mb-6 short:mb-4 md:mb-8 short:md:mb-6 xl:bottom-10 short:xl:bottom-8">
            <motion.h2
              variants={fadeIn("right", 0.3)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="h2 xl:mt-8 short:xl:mt-6 text-white text-[30px] short:text-[30px] md:text-[32px]"
            >
              Selected <span className="text-accent">Works.</span>
            </motion.h2>
            <motion.p
              variants={fadeIn("right", 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="mb-4 short:mb-3 md:mb-6 short:md:mb-4 max-w-[400px] mx-auto lg:mx-0 text-white/80 text-sm short:text-xs md:text-base short:md:text-sm"
            >
              <span className="hidden md:inline">My projects blend creativity and functionality, delivering responsive designs, clean code, smooth performance, and user-centric solutions tailored for real-world impact.</span>
              <span className="md:hidden">Projects that blend creativity with functionality for real-world impact.</span>
            </motion.p>

            <motion.div
              variants={fadeIn("right", 0.5)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="flex justify-center lg:justify-start mt-2 short:mt-1 md:mt-6 short:md:mt-4"
            >
              <div className="inline-flex bg-white/5 backdrop-blur-sm rounded-full p-1.5 short:p-1 shadow-lg border border-white/10">
                <button
                  onClick={() => { setActiveTab('web'); setCurrentIndex(0); }}
                  className={`relative px-4 short:px-3 md:px-6 short:md:px-5 py-2 short:py-1.5 md:py-2.5 short:md:py-2 rounded-full font-semibold text-xs short:text-[10px] md:text-sm short:md:text-xs transition-colors duration-300 ${activeTab === 'web' ? 'text-white' : 'text-white/60 hover:text-white'}`}
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
                  className={`relative px-4 short:px-3 md:px-6 short:md:px-5 py-2 short:py-1.5 md:py-2.5 short:md:py-2 rounded-full font-semibold text-xs short:text-[10px] md:text-sm short:md:text-xs transition-colors duration-300 ${activeTab === 'mobile' ? 'text-white' : 'text-white/60 hover:text-white'}`}
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
            className="w-full xl:flex-1 flex flex-col relative lg:bottom-10  items-center"
          >
            <div className="relative flex items-center w-full  max-w-md md:max-w-lg xl:max-w-lg">
              {/* Left Navigation Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrev}
                className="hidden md:block absolute -left-4 xl:-left-20 short:xl:-left-16 z-30 p-3 short:p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-accent hover:border-accent transition-all duration-300 shadow-lg"
              >
                <ChevronLeft size={24} className="short:w-5 short:h-5" />
              </motion.button>

              {/* Projects Container */}
              <div 
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex-1 overflow-x-auto overflow-y-hidden md:overflow-hidden px-0 md:px-4 short:md:px-3 xl:px-0 snap-x snap-mandatory scrollbar-hide"
              >
                <div className="flex md:block gap-4 short:gap-3 md:gap-0">
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

              {/* Right Navigation Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="hidden md:block absolute -right-4 xl:-right-20 short:xl:-right-16 z-30 p-3 short:p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-accent hover:border-accent transition-all duration-300 shadow-lg"
              >
                <ChevronRight size={24} className="short:w-5 short:h-5" />
              </motion.button>
            </div>

            {/* Pagination Dots */}
            <div className="flex gap-2 short:gap-1.5 mt-6 short:mt-4 md:mt-8 short:md:mt-6">
              {currentProjects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${index === currentIndex ? 'w-8 short:w-6 md:w-10 short:md:w-8 h-2 short:h-1.5 md:h-2.5 short:md:h-2 bg-accent' : 'w-2 short:w-1.5 md:w-2.5 short:md:w-2 h-2 short:h-1.5 md:h-2.5 short:md:h-2 bg-white/30 hover:bg-white/50'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <Bulb />

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
        type={activeTab}
      />

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