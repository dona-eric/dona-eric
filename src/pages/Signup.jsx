// src/pages/Signup.jsx
import React from "react";
import { motion } from "framer-motion";
import SignupForm from "../components/SignupForm";
import { Brain, Rocket, Target, Zap, Users, Trophy } from "lucide-react";

const PROGRAMS = [
  {
    title: "Bootcamp Fine-tuning LLM",
    subtitle: "De zéro à expert en 8 semaines",
    desc: "Fine-tuning Llama 3, Mistral, Phi-3 • RAG • LoRA • Quantization • Déploiement",
    gradient: "from-purple-600 to-pink-600",
    icon: Brain,
    places: "8 places restantes",
    level: "Intermédiaire → Expert"
  },
  {
    title: "MLOps & Production Masterclass",
    subtitle: "Du notebook à la production scalable",
    desc: "Docker • FastAPI • MLflow • CI/CD • Monitoring • Kubernetes basics",
    gradient: "from-blue-600 to-cyan-600",
    icon: Rocket,
    places: "6 places restantes",
    level: "Intermédiaire → Senior"
  },
  {
    title: "Mentorat 1-to-1 (3 mois)",
    subtitle: "Accompagnement personnalisé intensif",
    desc: "Projet réel • Code review hebdo • Portfolio pro • Prépa entretien tech",
    gradient: "from-emerald-600 to-teal-600",
    icon: Target,
    places: "2 places seulement",
    level: "Tous niveaux"
  }
];

export default function Signup() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Fond premium */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-black" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-900/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom px-6">
        {/* Header puissant */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-5xl mx-auto mb-20"
        >
          <div className="flex justify-center items-center gap-4 mb-8">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <span className="text-yellow-400 font-bold text-lg">Sessions Janvier & Mars 2026</span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-6">
            Rejoignez l’élite<br />
            <span className="text-5xl md:text-6xl lg:text-7xl font-light text-zinc-400">
              IA africaine
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto">
            Formations intensives • Projets réels • Mentorat individuel • Déploiement en production
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto items-start">
          {/* Programmes */}
          <div className="space-y-8">
            {PROGRAMS.map((prog, i) => {
              const Icon = prog.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all duration-500"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${prog.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-700`} />
                  
                  <div className="p-8 relative">
                    <div className="flex items-start justify-between mb-6">
                      <div className="p-4 bg-white/10 rounded-2xl border border-white/20">
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-white">{prog.places}</div>
                        <div className="text-xs text-zinc-500 uppercase tracking-wider">places</div>
                      </div>
                    </div>

                    <h3 className="text-2xl font-black text-white mb-2">
                      {prog.title}
                    </h3>
                    <p className="text-lg text-zinc-400 mb-4">{prog.subtitle}</p>
                    <p className="text-zinc-300 leading-relaxed mb-6">{prog.desc}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-zinc-500">{prog.level}</span>
                      <Zap className="w-6 h-6 text-yellow-400" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Formulaire */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-black text-white mb-4">
                  Réservez votre place
                </h2>
                <p className="text-zinc-400 text-lg">
                  Inscription immédiate • Places très limitées
                </p>
              </div>
              <SignupForm />
            </div>

            {/* Badge exclusivité */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-br from-yellow-400 to-orange-500 text-black font-bold px-6 py-3 rounded-full shadow-2xl">
              EXCLUSIF 2026
            </div>
          </motion.div>
        </div>

        {/* Trust indicators */}
        <div className="mt-20 text-center max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-8">
            {[
              { value: "94%", label: "Taux de placement" },
              { value: "7+", label: "Anciens en prod" },
              { value: "100%", label: "Satisfaction" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-5xl font-black text-white mb-2">{stat.value}</div>
                <div className="text-zinc-500 text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA final */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-20"
        >
          <p className="text-2xl text-zinc-400 mb-6">
            Les places partent vite.<br />
            <span className="text-white font-bold">Ne ratez pas votre chance.</span>
          </p>
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-bold text-xl shadow-2xl shadow-purple-500/30">
            <Users className="w-6 h-6" />
            Session limitée à 12 participants max
          </div>
        </motion.div>
      </div>
    </section>
  );
}