// src/pages/Services.jsx
import React from "react";
import { motion } from "framer-motion";
import { LineChart, Brain, Presentation, Cpu } from "lucide-react";

const services = [
  {
    title: "Data Analysis & Intelligence",
    description: "Analyse approfondie, modélisation statistique avancée et dashboards décisionnels interactifs.",
    icon: LineChart,
    color: "text-purple-400",
  },
  {
    title: "Machine Learning & IA",
    description: "Conception, entraînement et déploiement de modèles performants : LLM, vision, prédictif.",
    icon: Brain,
    color: "text-indigo-400",
  },
  {
    title: "Formations & Bootcamps",
    description: "Programmes intensifs en Data Science, Machine Learning et MLOps – pratique et orientés production.",
    icon: Presentation,
    color: "text-pink-400",
  },
  {
    title: "Conseil & Mentorat",
    description: "Accompagnement stratégique et technique pour vos projets IA et le développement de vos équipes.",
    icon: Cpu,
    color: "text-emerald-400",
  },
];

export default function Services() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Fond premium discret */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-black" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-900/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom px-6">
        {/* Header propre et élégant */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <span className="inline-block px-6 py-2 bg-white/10 backdrop-blur border border-white/20 rounded-full text-sm font-medium text-zinc-400 mb-8">
            Services
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
            Mes domaines d’expertise
          </h2>
        </motion.div>

        {/* Cartes sobres et premium */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative card p-8 text-center"
              >
                {/* Icône */}
                <div className="inline-flex p-5 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Icon className={`w-10 h-10 ${service.color}`} />
                </div>

                {/* Titre */}
                <h3 className="text-xl font-bold text-white mb-4">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA discret et élégant */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-20"
        >
          <a
            href="https://wa.me/2290141730240"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Discuter de votre projet
          </a>
        </motion.div>
      </div>
    </section>
  );
}

