import { useState } from "react";
import Circles from "../../components/Circles";
import { BsArrowRight } from "react-icons/bs";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
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

    const payload = {
      firstName: formData.name,
      lastName: "",
      email: formData.email,
      phone: "",
      message: `${formData.subject}\n\n${formData.message}`,
    };

    try {
      const res = await fetch(
        "https://porfolio-server-jokt.onrender.com/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        setStatus("Message sent successfully!");
        setButtonText("Message sent!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("Something went wrong. Please try again.");
        setButtonText("Let's talk");
      }
    } catch (err) {
      setStatus("Network error. Please try again later.");
      setButtonText("Let's talk");
    }
    setIsSending(false);

    setTimeout(() => {
      setStatus("");
      setButtonText("Let's talk");
    }, 5000);
  };

  return (
    <div className="h-full bg-primary/30">
      <div className="container mx-auto py-32 text-center xl:text-left flex items-center justify-center h-full">
        <div className="flex flex-col w-full max-w-[700px]">
          <motion.h2
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2 text-[28px] text-center mb-12"
          >
            Let&apos;s <span className="text-accent">connect.</span>
          </motion.h2>

          <motion.form
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            onSubmit={handleSubmit}
            className="flex-1 flex flex-col gap-6 w-full mx-auto"
          >
            <div className="flex gap-x-6 w-full">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="input"
                required
                disabled={isSending}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="input"
                required
                disabled={isSending}
              />
            </div>

            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="input"
              required
              disabled={isSending}
            />

            <textarea
  name="message"
  value={formData.message}
  onChange={handleChange}
  placeholder="Message"
  className="textarea  h-32  text-sm"
  required
  disabled={isSending}
/>

            <button
              type="submit"
              className="btn rounded-full border border-white/50 max-w-[170px] px-8 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-accent group relative"
              disabled={isSending || buttonText === "Message sent!"}
            >
              <span
                className={
                  (isSending || buttonText === "Message sent!")
                    ? "transition-all duration-500"
                    : "group-hover:translate-y-[120%] group-hover:opacity-0 transition-all duration-500"
                }
              >
                {buttonText}
              </span>
              {/* Only show arrow if NOT sending and NOT sent */}
              {!(isSending || buttonText === "Message sent!") && (
                <BsArrowRight className="-translate-y-[120%] opacity-0 group-hover:flex group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute text-[22px]" />
              )}
            </button>

            {status && (
              <p
                className={`text-sm mt-2 ${
                  status === "Message sent successfully!"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {status}
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default Contact;