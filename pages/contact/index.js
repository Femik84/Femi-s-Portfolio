import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';

// You'll need to import these from your project
// import Circles from "../../components/Circles";
// import { fadeIn } from "../../variants";

// Temporary fadeIn variant for demo
const fadeIn = (direction, delay) => ({
  hidden: { opacity: 0, y: direction === "up" ? 40 : -40 },
  show: { opacity: 1, y: 0, transition: { delay, duration: 0.5 } }
});

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [buttonText, setButtonText] = useState("Let's talk");
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setButtonText("Sending...");

    // EmailJS template parameters
    const templateParams = {
      firstName: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      message: `${formData.subject}\n\n${formData.message}`,
    };

    try {
      // Send email to receiver (you)
      await emailjs.send(
        'service_w27va0i',
        'template_nu1ti4f',
        templateParams,
        '0ZguZ331NCdgDPrpu'
      );

      // Send confirmation email to sender
      await emailjs.send(
        'service_w27va0i',
        'template_o8d38ie',
        templateParams,
        '0ZguZ331NCdgDPrpu'
      );

      setStatus("Message sent successfully!");
      setButtonText("Message sent!");
      setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" });
      
      // Reset button text after 3 seconds
      setTimeout(() => {
        setButtonText("Let's talk");
      }, 2000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("Something went wrong. Please try again.");
      setButtonText("Let's talk");
    }

    setIsSending(false);

    setTimeout(() => {
      setStatus("");
    }, 5000);
  };

  return (
    <div className="h-full bg-primary/30">
      <div className="container mx-auto py-16 md:py-32 px-4 xl:text-left flex items-center justify-center h-full">
        <div className="flex flex-col w-full max-w-[700px]">
          <motion.h2
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2 text-[28px] md:text-[36px] mb-6 text-center xl:text-left"
          >
            Let&apos;s <span className="text-accent">connect.</span>
          </motion.h2>

          <motion.form
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            onSubmit={handleSubmit}
            className="flex-1 flex flex-col gap-5 w-full mx-auto"
          >
            {/* First Name and Last Name */}
            <div className="flex gap-4 w-full">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="input flex-1 bg-transparent border border-white/20 rounded-lg px-4 sm:px-6 py-3 text-white placeholder:text-white/60 focus:border-accent outline-none transition-all text-sm sm:text-base"
                required
                disabled={isSending}
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="input flex-1 bg-transparent border border-white/20 rounded-lg px-4 sm:px-6 py-3 text-white placeholder:text-white/60 focus:border-accent outline-none transition-all text-sm sm:text-base"
                required
                disabled={isSending}
              />
            </div>

            {/* Email */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="input w-full bg-transparent border border-white/20 rounded-lg px-6 py-3 text-white placeholder:text-white/60 focus:border-accent outline-none transition-all"
              required
              disabled={isSending}
            />

            {/* Subject */}
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="input w-full bg-transparent border border-white/20 rounded-lg px-6 py-3 text-white placeholder:text-white/60 focus:border-accent outline-none transition-all"
              required
              disabled={isSending}
            />

            {/* Message */}
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="textarea w-full h-36 bg-transparent border border-white/20 rounded-lg px-6 py-3 text-white placeholder:text-white/60 focus:border-accent outline-none transition-all resize-none"
              required
              disabled={isSending}
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="btn rounded-full border border-white/50 w-[170px] px-3 py-2 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-accent group relative disabled:opacity-60 disabled:cursor-not-allowed bg-transparent hover:bg-accent/10"
              disabled={isSending}
            >
              <span
                className={
                  isSending
                    ? "transition-all duration-500"
                    : "group-hover:translate-y-[120%] group-hover:opacity-0 transition-all duration-500"
                }
              >
                {buttonText}
              </span>
              {!isSending && (
                <BsArrowRight className="-translate-y-[120%] opacity-0 group-hover:flex group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute text-[22px]" />
              )}
            </button>

            {/* Status Message */}
            {status && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-sm mt-2 ${
                  status === "Message sent successfully!"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {status}
              </motion.p>
            )}
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default Contact;