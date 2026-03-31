import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import PageLoader from "./components/PageLoader";
import { Helmet } from 'react-helmet-async';

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Skills = lazy(() => import("./pages/Skills"));
const Projects = lazy(() => import("./pages/Projects"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Helmet>
        <title>Dona Eric Data Scientist & Machine Learning Engineer</title>
        <meta name="description" content="Portfolio de Dona Eric : Projets avancés en Machine Learning, Deep Learning et MLOps. Expert Python et déploiement de modèles IA au Bénin." />
        
        {/* Open Graph / Facebook / LinkedIn */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://donerick.vercel.app/" />
        <meta property="og:title" content="Dona Eric | Data Scientist & ML Engineer" />
        <meta property="og:description" content="Explorez mes projets en Intelligence Artificielle et Computer Vision." />
        <meta property="og:image" content="https://donerick.vercel.app/og-image.png" /> 

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@EricSchrodinger" /> {/* Optionnel */}
        <meta name="twitter:title" content="Dona Eric | Data Scientist & ML Engineer" />
        <meta name="twitter:description" content="Portfolio de Don Erick : Projets avancés en Machine Learning et IA." />
        <meta name="twitter:image" content="https://donerick.vercel.app/og-image.png" />
      </Helmet>

      <ScrollToTop />
      <Navigation />

      <main className="flex-1 mt-20">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog/>}/>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}