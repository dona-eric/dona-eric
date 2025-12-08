import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Download, Github, Linkedin } from "lucide-react";
import heroImage from "../assets/team-eric.jpg";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fond subtil avec effet profondeur */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-black" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-900/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container-custom px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Texte – sobre, puissant, pro */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 text-center lg:text-left"
          >
            {/* Titre principal */}
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white">
                Dona Éric
                <span className="block text-5xl md:text-7xl lg:text-6xl font-light text-white-400 mt-2">
                  KOULODJI
                </span>
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-6 mx-auto lg:mx-0" />
            </div>

            {/* Métier – sobre et classe */}
            <p className="text-2xl md:text-3xl font-medium text-zinc-300">
              Ingénieur Machine Learning
              <span className="text-white-500"> • </span>
              Data Scientist
            </p>

            {/* Description – directe, impactante */}
            <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Je conçois et déploie des modèles d'intelligence artificielle qui réponds à vos besoins concrets.
            </p>

            {/* CTA – épurés, professionnels */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-6">
              <Link
                to="/projects"
                className="group flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Voir mes projets
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </Link>

              <a
                href="https://drive.google.com/file/d/1KRnhQJWRPLeAaaz9kXvy8WJZmEByjnBb/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-4 border border-zinc-700 text-white font-medium rounded-full hover:border-zinc-500 hover:bg-white/5 transition-all duration-300 backdrop-blur"
              >
                <Download className="w-5 h-5" />
                Télécharger CV
              </a>

              <div className="flex gap-3">
                <a
                  href="https://github.com/dona-eric"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white/10 backdrop-blur rounded-full hover:bg-white/20 transition"
                  aria-label="GitHub"
                >
                  <Github className="w-6 h-6 text-white" />
                </a>
                <a
                  href="https://linkedin.com/in/dona-erick"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white/10 backdrop-blur rounded-full hover:bg-white/20 transition"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6 text-white" />
                </a>
              </div>
            </div>

            {/* Stats discrètes */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-10 text-sm text-white-500">
              <div>
                <div className="text-2xl font-bold text-white">7+</div>
                <div>Modèles en production</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">90%</div>
                <div>Précision moyenne</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">Afrique</div>
                <div>Impact local prioritaire</div>
              </div>
            </div>
          </motion.div>

          {/* Photo – élégante, moderne, pro */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center"
          >
            <div className="relative group">
              {/* Halo subtil */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl group-hover:blur-xl transition duration-1000" />
              
              {/* Cadre photo */}
              <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-zinc-800 shadow-2xl">
                <img
                  src={heroImage}
                  alt="Dona Éric KOULODJI"
                  className="w-full h-130 object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                {/* Overlay discret */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
              </div>

              {/* Badge discret */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg">
                Disponible pour mission
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}