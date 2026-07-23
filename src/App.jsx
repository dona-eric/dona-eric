import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import PageLoader from "./components/PageLoader";
import ChatWidget from "./components/ChatWidget";
import { Helmet } from 'react-helmet-async';
import { AnimatePresence, motion } from "framer-motion";

const TurbojetBg = lazy(() => import("./components/TurbojetBg"));

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Skills = lazy(() => import("./pages/Skills"));
const Projects = lazy(() => import("./pages/Projects"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const MasterclassDetails = lazy(() => import("./pages/MasterclassDetails"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Academy = lazy(() => import("./pages/Academy"));
const Bootcamp = lazy(() => import("./pages/Bootcamp"));

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <Home />
          </motion.div>
        } />
        <Route path="/about" element={
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <About />
          </motion.div>
        } />
        <Route path="/skills" element={
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <Skills />
          </motion.div>
        } />
        <Route path="/projects" element={
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <Projects />
          </motion.div>
        } />
        <Route path="/contact" element={
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <Contact />
          </motion.div>
        } />
        <Route path="/blog" element={
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <Blog />
          </motion.div>
        } />
        <Route path="/masterclass/:id" element={
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <MasterclassDetails />
          </motion.div>
        } />
        <Route path="/academy" element={
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <Academy />
          </motion.div>
        } />
        <Route path="/academy/bootcamp" element={
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <Bootcamp />
          </motion.div>
        } />
        <Route path="*" element={
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <NotFound />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [isDesktop, setIsDesktop] = React.useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Helmet>
        <title>Dona Eric | Machine Learning Engineer</title>
        <meta name="description" content="Portfolio de Dona Eric : Projets avancés en Machine Learning, Deep Learning et MLOps. Expert Python et déploiement de modèles IA au Bénin." />
        
        {/* Open Graph / Facebook / LinkedIn */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://donerick.vercel.app" />
        <meta property="og:title" content="Dona Eric | Data Scientist & ML Engineer" />
        <meta property="og:description" content="Explorez mes projets en Intelligence Artificielle et Computer Vision." />
        <meta property="og:image" content="https://donerick.vercel.app/og-image.png" /> 

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@EricSchrodinger" /> {/* Optionnel */}
        <meta name="twitter:title" content="Dona Eric | Data Scientist & ML Engineer" />
        <meta name="twitter:description" content="Portfolio de Dona Eric : Projets avancés en Machine Learning et IA." />
        <meta name="twitter:image" content="https://donerick.vercel.app/og-image.png" />
      </Helmet>

      <ScrollToTop />
      {isDesktop && (
        <Suspense fallback={null}>
          <TurbojetBg />
        </Suspense>
      )}
      <Navigation />

      <main className="flex-1 mt-20">
        <Suspense fallback={<PageLoader />}>
          <AnimatedRoutes />
        </Suspense>
      </main>

      <ChatWidget />

      <Footer />
    </div>
  );
}