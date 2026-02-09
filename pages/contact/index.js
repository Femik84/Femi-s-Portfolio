import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

// Updated fadeIn variant with slower exit
const fadeIn = (direction, delay) => ({
  hidden: { opacity: 0, y: direction === "up" ? 40 : -40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.5 },
  },
  exit: {
    opacity: 0,
    y: direction === "up" ? 40 : -40,
    transition: { duration: 0.5 },
  },
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
  const [buttonText, setButtonText] = useState("Send Message");
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setButtonText("Sending...");

    const templateParams = {
      firstName: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      message: `${formData.subject}\n\n${formData.message}`,
    };

    try {
      console.log("Sending to receiver...");
      await emailjs.send(
        "service_w27va0i",
        "template_nu1ti4f",
        templateParams,
        "0ZguZ331NCdgDPrpu",
      );
      console.log("Receiver email sent successfully");

      console.log("Sending to sender...");
      await emailjs.send(
        "service_w27va0i",
        "template_o8d38ie",
        templateParams,
        "0ZguZ331NCdgDPrpu",
      );
      console.log("Sender email sent successfully");

      setStatus("Message sent successfully!");
      setButtonText("Message sent!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });

      setTimeout(() => {
        setButtonText("Send Message");
      }, 2000);
    } catch (error) {
      console.error("EmailJS Error Details:", error);
      console.error("Error message:", error.text || error.message);
      console.error("Error status:", error.status);
      setStatus(`Error: ${error.text || error.message || "Please try again"}`);
      setButtonText("Send Message");
    }

    setIsSending(false);

    setTimeout(() => {
      setStatus("");
    }, 5000);
  };

  return (
    <div className="h-full bg-primary/30">
      <div className="container mx-auto pt-4 short:pt-3 py-8 short:py-6 md:py-32 short:md:py-24 px-4 short:px-3 xl:text-left flex items-center justify-center h-full">
        <div className="flex flex-col w-full max-w-[700px]">
          <motion.h2
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            exit="exit"
            className="h2 text-[33px] short:text-[28px] md:text-[36px] short:md:text-[32px] mb-6 short:mb-4 text-center xl:text-left"
          >
            Let&apos;s <span className="text-accent">connect.</span>
          </motion.h2>

          <motion.form
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            animate="show"
            exit="exit"
            onSubmit={handleSubmit}
            className="flex-1 flex flex-col gap-5 short:gap-3 w-full mx-auto"
          >
            <div className="flex gap-4 short:gap-3 w-full">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="input flex-1 bg-transparent border border-white/20 rounded-lg short:rounded-md px-4 short:px-3 sm:px-6 short:sm:px-5 py-3 short:py-2 text-white placeholder:text-white/60 focus:border-accent outline-none transition-all text-sm short:text-xs sm:text-base short:sm:text-sm"
                required
                disabled={isSending}
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="input flex-1 bg-transparent border border-white/20 rounded-lg short:rounded-md px-4 short:px-3 sm:px-6 short:sm:px-5 py-3 short:py-2 text-white placeholder:text-white/60 focus:border-accent outline-none transition-all text-sm short:text-xs sm:text-base short:sm:text-sm"
                required
                disabled={isSending}
              />
            </div>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="input w-full bg-transparent border border-white/20 rounded-lg short:rounded-md px-6 short:px-5 py-3 short:py-2 text-white placeholder:text-white/60 focus:border-accent outline-none transition-all text-sm short:text-xs sm:text-base short:sm:text-sm"
              required
              disabled={isSending}
            />

            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="input w-full bg-transparent border border-white/20 rounded-lg short:rounded-md px-6 short:px-5 py-3 short:py-2 text-white placeholder:text-white/60 focus:border-accent outline-none transition-all text-sm short:text-xs sm:text-base short:sm:text-sm"
              required
              disabled={isSending}
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="textarea w-full h-28 short:h-20 bg-transparent border border-white/20 rounded-lg short:rounded-md px-6 short:px-5 py-3 short:py-2 text-white placeholder:text-white/60 focus:border-accent outline-none transition-all resize-none text-sm short:text-xs sm:text-base short:sm:text-sm"
              required
              disabled={isSending}
            />
            
            <button
              type="submit"
              className="btn relative rounded-full short:rounded-lg
    h-12 short:h-10 sm:h-14 short:sm:h-12
    w-full sm:w-[180px] short:sm:w-[160px]
    px-8 short:px-6
    font-medium text-base short:text-sm
    transition-all duration-300
    flex items-center justify-center gap-2 short:gap-1.5
    overflow-hidden
    group
    disabled:opacity-50 disabled:cursor-not-allowed
    text-accent
    border-2 border-accent
    bg-transparent
    hover:bg-accent
    hover:text-white
    hover:shadow-lg hover:shadow-accent/50
    hover:scale-105
    active:scale-95"
              disabled={isSending}
            >
              <span className="relative z-10 font-semibold tracking-wide">
                {buttonText}
              </span>
              {!isSending && (
                <BsArrowRight className="relative z-10 text-xl short:text-lg group-hover:translate-x-1 transition-transform duration-300" />
              )}
              
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-white/20 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </button>

            {status && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-sm short:text-xs mt-2 short:mt-1 ${
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