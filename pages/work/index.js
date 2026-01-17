import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ChevronDown, X } from 'lucide-react';
import portfolioData from '../../components/portfolioData';

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

/* Project Details Modal */
const ProjectModal = ({ project, isOpen, onClose, type }) => {
  if (!isOpen) return null;

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
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-black rounded-full text-white hover:bg-black transition-all shadow-lg"
            >
              <X size={24} />
            </motion.button>

            <div className="overflow-y-auto max-h-[90vh] p-6 md:p-8 scrollbar-hide">
              {/* Mobile Layout (Image Top, Details Bottom) */}
              <div className="md:hidden">
                {/* Project Image */}
                <div className="relative h-64 rounded-2xl overflow-hidden mb-6 shadow-2xl">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* Project Title */}
                <h2 className="text-3xl font-bold text-white mb-4">
                  {project.name}
                </h2>

                {/* Project Description */}
                <p className="text-white/80 text-base leading-relaxed mb-6">
                  {project.fullDescription}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  {type === 'web' ? (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-accent text-white rounded-xl font-semibold hover:bg-accent/80 transition-colors shadow-lg"
                    >
                      Visit Live Site
                    </motion.a>
                  ) : (
                    <>
                      <motion.a
                        href={project.apkUrl}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-accent text-white rounded-xl font-semibold hover:bg-accent/80 transition-colors shadow-lg"
                      >
                        Download APK
                      </motion.a>
                      <motion.a
                        href={project.playStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-white/10 border-2 border-white/30 text-white rounded-xl font-semibold hover:border-accent hover:bg-accent/20 transition-colors"
                      >
                        Play Store
                      </motion.a>
                    </>
                  )}
                </div>
              </div>

              {/* Desktop Layout (Image Left, Details Right) */}
              <div className="hidden md:flex gap-8">
                {/* Left Side - Image */}
                <div className="w-1/2 flex-shrink-0">
                  <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl sticky top-0">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                </div>

                {/* Right Side - Details */}
                <div className="w-1/2 flex flex-col">
                  {/* Project Title */}
                  <h2 className="text-4xl font-bold text-white mb-4">
                    {project.name}
                  </h2>

                  {/* Project Description */}
                  <p className="text-white/80 text-lg leading-relaxed mb-6">
                    {project.fullDescription}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 mt-auto">
                    {type === 'web' ? (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-accent text-white rounded-xl font-semibold hover:bg-accent/80 transition-colors shadow-lg"
                      >
                        Visit Live Site
                      </motion.a>
                    ) : (
                      <>
                        <motion.a
                          href={project.apkUrl}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-6 py-3 bg-accent text-white rounded-xl font-semibold hover:bg-accent/80 transition-colors shadow-lg"
                        >
                          Download APK
                        </motion.a>
                        <motion.a
                          href={project.playStoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* Web project card */
const WebProjectCard = ({ project, onViewDetails, showDescription = false }) => (
  <div className="group bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-accent/20 transition-all duration-300 w-full border border-white/20">
    <div className="relative h-36 md:h-48 overflow-hidden bg-gray-900/50">
      <img
        src={project.image}
        alt={project.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-accent/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
    <div className="p-4 md:p-5">
      <h3 className="text-base md:text-lg font-bold text-white mb-1 md:mb-2">{project.name}</h3>
      {showDescription && (
        <p className="hidden md:block text-sm text-white/70 mb-4 line-clamp-2">{project.description}</p>
      )}
      <div className="flex gap-2 mt-3 md:mt-4">
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
);

/* Mobile project card (includes download dropdown) */
const MobileProjectCard = ({ project, isOpen, onToggle, onViewDetails, showDescription = false }) => (
  <div className="group bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-accent/20 transition-all duration-300 w-full border border-white/20">
    <div className="flex h-48 md:h-[370px]">
      {/* Left Side - Image */}
      <div className="w-2/5 md:w-2/5 relative overflow-hidden bg-gradient-to-br from-accent/10 to-secondary/10 flex items-center justify-center p-3 md:p-5">
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-[90%] object-cover rounded-2xl md:rounded-3xl shadow-xl transition-transform duration-500 group-hover:scale-105"
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
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                    className="flex items-center justify-between px-3 md:px-4 py-2 md:py-2.5 text-white hover:text-accent transition-colors border-b border-white/10"
                  >
                    <span className="text-xs md:text-sm font-medium">APK File</span>
                    <span className="text-lg">📦</span>
                  </motion.a>
                  <motion.a
                    href={project.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
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

  const currentProjects = activeTab === 'web' ? portfolioData.web : portfolioData.mobile;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? currentProjects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === currentProjects.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index) => setCurrentIndex(index);

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

  return (
    <div className="min-h-screen bg-primary/30 py-1 md:py-36 flex items-center relative overflow-hidden">
      <Circles />
      <div className="container mx-auto relative z-20 px-4">
        <div className="flex flex-col xl:flex-row gap-x-8">
          {/* Text Section */}
          <div className="text-center flex xl:w-[30vw] flex-col lg:text-left mb-4 md:mb-4 xl:mb-0">
            <motion.h2
              variants={fadeIn("up", 0.3)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="h2 xl:mt-8 text-white"
            >
              Selected Works <span className="text-accent">.</span>
            </motion.h2>
            <motion.p
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="mb-2 md:mb-4 max-w-[400px] mx-auto lg:mx-0 text-white/80 text-sm md:text-base"
            >
              <span className="hidden md:inline">My projects blend creativity and functionality, delivering responsive designs, clean code, smooth performance, and user-centric solutions tailored for real-world impact.</span>
              <span className="md:hidden">Projects that blend creativity with functionality for real-world impact.</span>
            </motion.p>

            {/* Tab Switcher */}
            <motion.div
              variants={fadeIn("up", 0.5)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="flex justify-center lg:justify-start mt-1 md:mt-6"
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
            variants={fadeIn("down", 0.6)}
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

              {/* Projects Container */}
              <div className="flex-1 overflow-hidden px-0 md:px-4 xl:px-0">
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
            <div className="flex gap-2 mt-4 md:mt-8">
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
    </div>
  );
};

export default ProjectsPage;