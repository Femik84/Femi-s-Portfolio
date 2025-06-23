import "../styles/globals.css";

// components
import Layout from "../components/Layout";

// router
import { useRouter } from "next/router";

// head
import Head from "next/head";

// framer motion
import { AnimatePresence, motion } from "framer-motion";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Head>
        {/* ✅ Fix for layout being too big */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My Portfolio</title> {/* Optional default title */}
      </Head>

      <Layout>
        <AnimatePresence mode="wait">
          <motion.div key={router.route} className="h-full">
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </Layout>
    </>
  );
}

export default MyApp;
