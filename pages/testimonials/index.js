//components
import TestimonialSlider from "../../components/TestimonialSlider";

//framer motion
import { motion } from "framer-motion";
import {fadeIn} from '../../variants'

const Testimonials = () => {
  return (
    <motion.div 
      className="h-full bg-primary/30 py-32 text-center overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    > 
      <div className="container mx-auto h-full flex flex-col justify-center">
         {/* title */}
        <motion.h2 
         variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
        className="h2 mb-8 xl:mb-0"> 
           What clients <span className="text-accent"> say.</span>
        </motion.h2>

         {/* slider */}
         <motion.div 
           variants={fadeIn("up", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
         > 
           <TestimonialSlider />
         </motion.div>
      </div>
    </motion.div>
  )
};

export default Testimonials;