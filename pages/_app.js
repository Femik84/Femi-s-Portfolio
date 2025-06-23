import "../styles/globals.css";


//components
import Layout from "../components/Layout";
import Transition from "../components/Transition";

//router
import { useRouter } from "next/router";

//FRAMER MOTION
import { AnimatePresence, motion } from "framer-motion";

function MyApp({ Component, pageProps }) {
   const router = useRouter(); // ✅ Add this line
  return (
    <Layout>
      <AnimatePresence mode="wait">
        <motion.div key={router.route} className="h-full">
          <Transition />
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}

export default MyApp;
