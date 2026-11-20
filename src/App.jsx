import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { MotionProvider, useMotion, fieldBus } from "./quantum/MotionContext";
import PageTransition from "./quantum/PageTransition";
import Intro from "./quantum/Intro";
import Cursor from "./quantum/Cursor";
import "./quantum/quantum.css";
import "./styles/legacy-align.css";

const QuantumField = lazy(() => import("./quantum/QuantumField"));

const pages = {
  Home: () => import("./pages/Home"),
  About: () => import("./pages/About"),
  Skills: () => import("./pages/Skills"),
  Projects: () => import("./pages/Projects"),
  Contact: () => import("./pages/Contact"),
  Blog: () => import("./pages/Blog"),
  MasterclassDetails: () => import("./pages/MasterclassDetails"),
  NotFound: () => import("./pages/NotFound"),
  Academy: () => import("./pages/Academy"),
  Bootcamp: () => import("./pages/Bootcamp"),
};

const Home = lazy(pages.Home);
const About = lazy(pages.About);
const Skills = lazy(pages.Skills);
const Projects = lazy(pages.Projects);
const Contact = lazy(pages.Contact);
const Blog = lazy(pages.Blog);
const MasterclassDetails = lazy(pages.MasterclassDetails);
const NotFound = lazy(pages.NotFound);
const Academy = lazy(pages.Academy);
const Bootcamp = lazy(pages.Bootcamp);

const ROUTES = [
  { path: "/", el: <Home /> },
  { path: "/projects", el: <Projects /> },
  { path: "/skills", el: <Skills /> },
  { path: "/about", el: <About /> },
  { path: "/contact", el: <Contact /> },
  { path: "/blog", el: <Blog /> },
  { path: "/masterclass/:id", el: <MasterclassDetails /> },
  { path: "/academy", el: <Academy /> },
  { path: "/academy/bootcamp", el: <Bootcamp /> },
  { path: "*", el: <NotFound /> },
];

function AnimatedRoutes() {
  const location = useLocation();
  const { lenis } = useMotion();

  const onExitComplete = () => {
    if (lenis.current) lenis.current.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    fieldBus.measure();
  };

  return (
    <AnimatePresence mode="wait" onExitComplete={onExitComplete}>
      <Routes location={location} key={location.pathname}>
        {ROUTES.map((r) => (
          <Route
            key={r.path}
            path={r.path}
            element={
              <PageTransition path={location.pathname}>
                <Suspense fallback={<div className="q-suspense" />}>{r.el}</Suspense>
              </PageTransition>
            }
          />
        ))}
      </Routes>
    </AnimatePresence>
  );
}

function SiteMeta() {
  const { tr, lang } = useLanguage();
  const title = `Dona Eric KOULODJI | ${tr("Statistician & AI Engineer", "Statisticien & AI Engineer")}`;
  const description = tr(
    "Portfolio of Dona Eric KOULODJI, Statistician & AI Engineer at Becotrac (Re) Assurances: statistical modelling, machine learning, LLM agents and MLOps. Deployed projects, public code and CV.",
    "Portfolio de Dona Eric KOULODJI, Statisticien & AI Engineer chez Becotrac (Re) Assurances : modélisation statistique, machine learning, agents LLM et MLOps. Projets déployés, code public et CV."
  );
  const short = tr(
    "Applied statistics and deployed AI systems: modelling, machine learning, LLM agents and MLOps.",
    "Statistique appliquée et systèmes IA déployés : modélisation, machine learning, agents LLM et MLOps."
  );
  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href="https://donerick.vercel.app" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://donerick.vercel.app" />
      <meta property="og:locale" content={lang === "fr" ? "fr_FR" : "en_US"} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={short} />
      <meta property="og:image" content="https://donerick.vercel.app/eric-donerick.jpg" />
      <meta property="og:image:alt" content={tr("Portrait of Dona Eric KOULODJI", "Portrait de Dona Eric KOULODJI")} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@EricSchrodinger" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={short} />
      <meta name="twitter:image" content="https://donerick.vercel.app/eric-donerick.jpg" />
    </Helmet>
  );
}

function Shell() {
  const { theme } = useTheme();
  const { reduced, introDone } = useMotion();
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Warm up every route chunk once the first screen is settled.
  useEffect(() => {
    if (!introDone) return;
    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 1200));
    const id = idle(() => Object.values(pages).forEach((load) => load().catch(() => {})));
    return () => (window.cancelIdleCallback || clearTimeout)(id);
  }, [introDone]);

  return (
    <div className="q-app">
      <SiteMeta />
      <Suspense fallback={null}>
        <QuantumField theme={theme} intensity={isHome ? 1 : 0.42} reduced={reduced} />
      </Suspense>
      <Intro />
      <Cursor />
      <Navigation />
      <main className="q-main">
        <AnimatedRoutes />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <MotionProvider>
          <Shell />
          <Analytics />
        </MotionProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
