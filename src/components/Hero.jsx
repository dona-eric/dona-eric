import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Download, 
  Github, 
  Linkedin, 
  Sparkles,
  Zap,
  Target,
  TrendingUp
} from "lucide-react";
import heroImage from "../assets/team-eric.jpg";

export default function Hero() {
  const stats = [
    { icon: Zap, value: "7+", label: "Modèles en production" },
    { icon: Target, value: "90%", label: "Précision moyenne" },
    { icon: TrendingUp, value: "Afrique", label: "Impact local prioritaire" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background avec mesh gradient animé */}
      <div className="absolute inset-0 -z-10 bg-mesh">
        {/* Orbes lumineux animés */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-pink-600/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-600/10 rounded-full blur-[140px] animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container-custom px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Colonne gauche : Texte */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-10 text-center lg:text-left"
          >
            {/* Badge animé */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full group cursor-default"
            >
              <Sparkles className="w-4 h-4 text-purple-400 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-sm font-semibold text-purple-300">Disponible pour mission</span>
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </motion.div>

            {/* Titre principal */}
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight"
              >
                <span className="text-white">Dona Éric</span>
                <br />
                <span className="text-gradient text-4xl md:text-5xl lg:text-6xl font-light">
                  KOULODJI
                </span>
              </motion.h1>
              
              {/* Ligne décorative animée */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "8rem" }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full mx-auto lg:mx-0"
              />
            </div>

            {/* Sous-titre */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-3"
            >
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-zinc-300">
                Ingénieur Machine Learning
              </p>
              <p className="text-xl md:text-2xl font-medium text-zinc-500">
                Data Scientist • Spécialiste IA
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              Je conçois et déploie des{" "}
              <span className="text-white font-semibold">modèles d'intelligence artificielle</span>{" "}
              qui répondent à vos besoins concrets et génèrent un{" "}
              <span className="text-gradient font-semibold">impact mesurable</span>.
            </motion.p>
            <div className="h-10 md:h-15" />
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start pt-6"
            >
              <Link
                to="/projects"
                className="group btn-primary inline-flex items-center p-4 glass rounded-full hover-scale hover-glow group"
              >
                <span>Voir mes projets</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform " />
              </Link>

              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center p-4 glass rounded-full hover-scale hover-glow group"
              >
                <Download className="w-5 h-5" />
                <span>Télécharger CV</span>
              </a>
            </motion.div>
            
            <div className="h-10 md:h-12" />

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex gap-4 justify-center lg:justify-start"
            >
              <a
                href="https://github.com/dona-eric"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 glass rounded-full hover-scale hover-glow group"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://linkedin.com/in/dona-erick"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 glass rounded-full hover-scale hover-glow group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors" />
              </a>
            </motion.div>
            <div className="h-10 md:h-12" />

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="grid grid-cols-3 gap-6 pt-10"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center lg:text-left group">
                    <div className="flex items-center gap-2 justify-center lg:justify-start mb-2">
                      <Icon className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                      <div className="text-2xl md:text-3xl font-black text-gradient">
                        {stat.value}
                      </div>
                    </div>
                    <div className="text-sm text-zinc-500">{stat.label}</div>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Colonne droite : Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative group">
              {/* Halo lumineux principal */}
              <div className="absolute -inset-8 bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-cyan-600/30 rounded-full blur-[60px] group-hover:blur-[80px] transition-all duration-1000 animate-pulse" />
              
              {/* Anneaux orbitaux */}
              <div className="absolute -inset-4 rounded-full border-2 border-purple-500/20 animate-pulse" />
              <div className="absolute -inset-8 rounded-full border border-pink-500/10 animate-pulse" style={{ animationDelay: '1s' }} />
              
              {/* Conteneur photo */}
              <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px]">
                {/* Border gradient animé */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 p-1 animate-glow">
                  <div className="w-full h-full rounded-full bg-black p-2">
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <img
                        src={heroImage}
                        alt="Dona Éric KOULODJI"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>
                  </div>
                </div>

                {/* Particules flottantes */}
                <div className="absolute top-10 -right-4 w-3 h-3 rounded-full bg-purple-500 blur-sm animate-float" />
                <div className="absolute bottom-20 -left-4 w-2 h-2 rounded-full bg-pink-500 blur-sm animate-float" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 -right-6 w-2 h-2 rounded-full bg-cyan-500 blur-sm animate-float" style={{ animationDelay: '2s' }} />
              </div>

              {/* Badge status flottant */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 glass rounded-full backdrop-blur-xl shadow-2xl border-2 border-white/20"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping" />
                  </div>
                  <span className="text-sm font-bold text-white whitespace-nowrap">
                    Disponible immédiatement
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-3 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}