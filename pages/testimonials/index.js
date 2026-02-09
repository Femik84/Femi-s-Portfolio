import TestimonialSlider from "../../components/TestimonialSlider";

//framer motion
import { motion } from "framer-motion";
import {fadeIn} from '../../variants'

const Testimonials = () => {
  return (
    <div className="h-full bg-primary/30 py-32 short:py-24 text-center"> 
      <div className="container mx-auto h-full flex flex-col justify-center">
         {/* title */}
        <motion.h2 
         variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
        className="h2 mb-8 short:mb-6 xl:mb-0 text-[32px] short:text-[28px]"> 
           What clients <span className="text-accent"> say.</span>
        </motion.h2>

         {/* slider */}
         <motion.div 
           variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
         > 
           <TestimonialSlider />
         </motion.div>
      </div>
    </div>
  )
};

export default Testimonials;