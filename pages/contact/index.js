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
  const [buttonText, setButtonText] = useState("Let's talk");
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
        setButtonText("Let's talk");
      }, 2000);
    } catch (error) {
      console.error("EmailJS Error Details:", error);
      console.error("Error message:", error.text || error.message);
      console.error("Error status:", error.status);
      setStatus(`Error: ${error.text || error.message || "Please try again"}`);
      setButtonText("Let's talk");
    }

    setIsSending(false);

    setTimeout(() => {
      setStatus("");
    }, 5000);
  };

  return (
    <div className="h-full bg-primary/30">
      <div className="container mx-auto pt-4 py-8 md:py-32 px-4 xl:text-left flex items-center justify-center h-full">
        <div className="flex flex-col w-full max-w-[700px]">
          <motion.h2
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            exit="exit"
            className="h2 text-[33px] md:text-[36px] mb-6 text-center xl:text-left"
          >
            Let&apos;s <span className="text-accent">connect.</span>
          </motion.h2>

          <motion.form
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            animate="show"
            exit="exit"
            onSubmit={handleSubmit}
            className="flex-1 flex flex-col gap-5 w-full mx-auto"
          >
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

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="textarea w-full h-28 bg-transparent border border-white/20 rounded-lg px-6 py-3 text-white placeholder:text-white/60 focus:border-accent outline-none transition-all resize-none"
              required
              disabled={isSending}
            />
            
            <button
              type="submit"
              className="btn relative rounded-full 
    h-12 sm:h-14
    w-full sm:w-[180px]
    px-8
    font-medium text-base
    transition-all duration-300
    flex items-center justify-center gap-2
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
                <BsArrowRight className="relative z-10 text-xl group-hover:translate-x-1 transition-transform duration-300" />
              )}
              
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-white/20 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </button>

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