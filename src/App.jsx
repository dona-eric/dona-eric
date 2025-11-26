import React, { useState, Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Sun, Moon,Linkedin, Twitter, Mail, Github,Sparkles, Brain, Zap} from "lucide-react";
import logo from "./assets/pro.png";
import AIChat from "./components/AIChat";

// Lazy loading (inchangé)
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Projects = lazy(() => import("./pages/Projects"));
const Blog = lazy(() => import("./pages/Blog"));
const Contacts = lazy(() => import("./pages/Contact"));
const Signup = lazy(() => import("./pages/Signup"));

// ScrollToTop (inchangé)
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Nav améliorée : plus moderne, plus pro, plus "IA"
function Nav() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Skills", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Blog", path: "/blog" },
    { name: "Contacts", path: "/contact" },
    { name: "Prendre RDV", path: "/signup", cta: true },
  ];

  return (
    <nav className="fixed w-full z-50 backdrop-blur-2xl bg-black/80 border-b border-white/10">
      <div className="container mx-auto flex items-center justify-between p-5">
        {/* Logo + Titre pro */}
        <Link to="/" className="flex items-center gap-4 group">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 blur-xl opacity-70 group-hover:opacity-100 transition" />
            <img
              src={logo}
              alt="Dona Eric"
              className="relative w-12 h-12 rounded-full border-2 border-white/20 shadow-2xl"
            />
          </div>
          <div>
            <h1 className="text-xl font-black bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Dona Eric
            </h1>
            {/* <p className="text-xs text-purple-300 font-medium tracking-wider">
              Data Scientist • ML Engineer • IA Passionnate
            </p> */}
          </div>
        </Link>

        <div className="flex items-center gap-6">
          {/* Dark Mode */}
          <button
            onClick={toggleDark}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition backdrop-blur"
          >
            {dark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-purple-400" />}
          </button>

          {/* Hamburger */}
          <button
            className="sm:hidden p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
            onClick={() => setOpen(!open)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={
                  link.cta
                    ? "px-8 py-3 bg-gradient-to-r from-violet-600 to-pink-600 text-white font-bold rounded-full shadow-xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-2"
                    : "px-5 py-2.5 text-gray-300 hover:text-white font-medium hover:bg-white/10 rounded-full transition-all duration-300"
                }
              >
                {link.name}
                {link.cta && <Zap className="w-4 h-4" />}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="sm:hidden border-t border-white/10 bg-black/95 backdrop-blur-2xl"
          >
            <div className="container mx-auto px-5 py-6 space-y-3">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className={
                      link.cta
                        ? "block text-center py-4 bg-gradient-to-r from-violet-600 to-pink-600 text-white font-bold rounded-2xl shadow-xl"
                        : "block text-center py-4 text-gray-300 hover:text-white hover:bg-white/10 rounded-2xl transition"
                    }
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// Footer amélioré : plus pro, plus moderne
function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await fetch("https://formspree.io/f/mldpjgwd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus(null), 5000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer className="bg-black/50 backdrop-blur-2xl border-t border-white/10 py-10 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
              Dona Eric
            </h3>
            <p className="text-gray-400 mt-3 text-sm">
              Construire l'intelligence artificielle du futur, un modèle à la fois.
            </p>
          </div>

          <div className="flex justify-center md:justify-center gap-4">
            <a href="https://linkedin.com/in/dona-erick" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="https://x.com/ericschrodinger" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="https://github.com/dona-eric" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition">
              <Github className="w-6 h-6" />
            </a>
            <a href="mailto:donaerickoulodji@gmail.com" className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition">
              <Mail className="w-6 h-6" />
            </a>
          </div>

          <div>
            <p className="text-sm text-gray-400 mb-4">Rejoindre la révolution IA</p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto md:mx-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ton@email.com"
                required
                className="px-5 py-3 rounded-full bg-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button className="px-3 py-3 bg-gradient-to-r from-violet-600 to-pink-600 rounded-full font-bold hover:opacity-90 transition flex items-center justify-center gap-2">
                {status === "loading" ? "..." : "S’abonner"} <Sparkles className="w-4 h-4" />
              </button>
            </form>
            {status === "success" && <p className="text-green-400 text-sm mt-3">Inscrit avec succès !</p>}
          </div>
        </div>

        <div className="text-center mt-12 text-gray-500 text-sm">
          © 2025 Dona Eric • Fait avec <Brain className="inline w-4 h-4 text-purple-400" /> et Passion
        </div>
      </div>
    </footer>
  );
}

// App principale (légèrement améliorée)
function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white">
      <ScrollToTop />
      <Nav />

      {/* Navigation flottante simplifiée */}
      <AnimatePresence>
        {location.pathname === "/" && (
          <NavigationGuide to="/about" label="Découvrir mon parcours" position="right-8 top-1/3" icon={ArrowRight} />
        )}
      </AnimatePresence>

      <main className="pt-24">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
              <p className="mt-6 text-purple-300">Just 1s.....</p>
            </div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contacts />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Suspense>
      </main>
      <AIChat />
      <Footer />
    </div>
  );
}

// Composant NavigationGuide (inchangé, juste déplacé)
function NavigationGuide({ to, label, position = "right-4 top-1/3", icon: Icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className={`fixed z-30 ${position}`}
    >
      <Link
        to={to}
        className="flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-purple-600/80 to-pink-600/80 backdrop-blur-xl border border-white/20 text-white shadow-2xl hover:scale-110 transition-all duration-300"
      >
        <Icon className="w-5 h-5" />
        <span className="font-medium">{label}</span>
      </Link>
    </motion.div>
  );
}

export default App;