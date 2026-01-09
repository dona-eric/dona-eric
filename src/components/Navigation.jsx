import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { NAVIGATION } from "../config/constants";


const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 relative overflow-hidden ${
      scrolled 
        ? "backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-purple-500/10" 
        : "backdrop-blur-md border-b border-white/5"
    }`}>
      {/* Background mesh grid violet/rose */}
      <div className="absolute inset-0 -z-10 opacity-95">
        <div className="absolute inset-0 bg-black" />
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 40px,
                rgba(168, 85, 247, 0.1) 40px,
                rgba(168, 85, 247, 0.1) 41px
              ),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 40px,
                rgba(236, 72, 153, 0.1) 40px,
                rgba(236, 72, 153, 0.1) 41px
              ),
              radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, rgba(236, 72, 153, 0.2) 0%, transparent 50%)
            `,
            backgroundSize: '40px 40px, 40px 40px, 100% 100%, 100% 100%'
          }}
        />
        {/* Vignette subtle */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.3) 100%)'
          }}
        />
      </div>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo avec gradient */}
          <Link to="/" className="flex items-center gap-2 group relative">
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="text-xl font-black text-gradient relative"
            >
              Dona Éric
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {NAVIGATION.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="relative group px-4 py-2"
              >
                <span className={`text-sm font-semibold transition-colors duration-300 relative z-10 ${
                  isActive(item.path)
                    ? "text-white"
                    : "text-zinc-400 group-hover:text-white"
                }`}>
                  {item.name}
                </span>
                
                {/* Active indicator avec animation */}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                {/* Hover effect */}
                {!isActive(item.path) && (
                  <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button avec gradient */}
          <div className="hidden md:block">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white font-bold text-sm rounded-full overflow-hidden shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              <Sparkles className="w-4 h-4 relative z-10 group-hover:rotate-12 transition-transform" />
              <span className="relative z-10">Prendre RDV</span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2.5 text-white hover:bg-white/10 rounded-xl transition-colors relative"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu avec animations sophistiquées */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden border-t border-white/10 overflow-hidden"
            >
              <motion.div 
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                className="py-6 space-y-2"
              >
                {NAVIGATION.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        isActive(item.path)
                          ? "bg-white/10 backdrop-blur-xl border border-white/20 text-white"
                          : "text-zinc-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {/* Active indicator dot */}
                      <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        isActive(item.path) 
                          ? "bg-gradient-to-r from-purple-500 to-pink-500" 
                          : "bg-transparent group-hover:bg-white/30"
                      }`} />
                      <span className="font-semibold">{item.name}</span>
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: NAVIGATION.length * 0.05 }}
                  className="pt-4"
                >
                  <a
                    href="https://wa.me/2290141730240"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white font-bold rounded-xl shadow-lg hover:shadow-purple-500/50 transition-all duration-300 group"
                  >
                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <span>Démarrer une conversation</span>
                  </a>
                </motion.div>

                {/* Mobile status badge */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="pt-4 flex justify-center"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30">
                    <div className="relative">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping" />
                    </div>
                    <span className="text-xs font-semibold text-green-300">
                      Disponible pour projets
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative gradient line */}
      <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent transition-opacity duration-300 ${
        scrolled ? "opacity-100" : "opacity-0"
      }`} />
    </nav>
  );
};

export default Navigation;