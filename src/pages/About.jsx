// src/pages/About.jsx
import React from "react";
import { motion } from "framer-motion";
import { 
  Brain, 
  Rocket, 
  Target, 
  Zap, 
  Award, 
  GraduationCap,
  Code2,
  Globe,
  Users,
  TrendingUp
} from "lucide-react";

const SKILLS = [
  "Fine-tuning LLM (Llama 3, Mistral, Phi-3)",
  "RAG & Vector Databases (Chroma, Pinecone)",
  "MLOps complet (Docker, MLflow, FastAPI, CI/CD)",
  "Computer Vision (YOLO, Segment Anything)",
  "Time Series & Predictive Modeling",
  "Prompt Engineering & Agentic Systems",
  "Production Deployment (GCP, AWS, Vercel)",
  "Data Pipeline (Airflow, Spark)",
  "LangChain, LlamaIndex, Groq, Hugging Face"
];

const ACHIEVEMENTS = [
  { value: "7+", label: "Modèles en production" },
  { value: "90%", label: "Précision moyenne" },
  { value: "24h", label: "Réponse garantie" },
  { value: "3", label: "Continents touchés" },
];

const VALUES = [
  {
    icon: Zap,
    title: "Excellence technique",
    desc: "Je ne livre que des systèmes robustes, monitorés, et qui tiennent la charge."
  },
  {
    icon: Users,
    title: "Partage de connaissance",
    desc: "Formations, mentorat, open-source : je construis l’écosystème IA africain."
  },
  {
    icon: Target,
    title: "Impact réel",
    desc: "Pas de POC. Que des solutions utilisées tous les jours par des vraies personnes."
  }
];

export default function About() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Fond premium */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-black" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-900/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-5xl mx-auto mb-20"
        >
          <span className="inline-block px-6 py-2 bg-white/10 backdrop-blur border border-white/20 rounded-full text-sm font-medium text-zinc-400 mb-8">
            À propos
          </span>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-6">
            Dona Éric<br />
            <span className="text-5xl md:text-6xl lg:text-7xl font-light text-zinc-400">
              KOULODJI
            </span>
          </h1>
          <p className="text-2xl text-zinc-400">
            Ingénieur Machine Learning • Spécialiste LLM & MLOps • Bénin
          </p>
        </motion.div>

        {/* Bio puissante */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <p className="text-xl md:text-2xl leading-relaxed text-zinc-300">
            Je transforme des <span className="text-white font-bold">idées complexes</span> en{" "}
            <span className="text-white font-bold">systèmes IA qui tournent en production</span>.
            <br /><br />
            Du fine-tuning de Llama 3 au déploiement d’un RAG médical critique,
            je construis des solutions qui <span className="text-purple-400 font-bold">changent la donne</span>.
          </p>
        </motion.div>

        {/* Compétences clés */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="max-w-6xl mx-auto mb-20"
        >
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Ce que je maîtrise vraiment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SKILLS.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-white/30 transition-all duration-300"
              >
                <div className="w-2 h-2 bg-purple-400 rounded-full" />
                <span className="text-zinc-300 text-lg">{skill}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Chiffres clés */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto mb-20">
          {ACHIEVEMENTS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl md:text-6xl font-black text-white mb-2">
                {stat.value}
              </div>
              <div className="text-zinc-500 text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Valeurs */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Ce qui me drive
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {VALUES.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex p-6 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 mb-6">
                    <Icon className="w-12 h-12 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {value.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">
                    {value.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA final */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-24"
        >
          <p className="text-2xl text-zinc-400 mb-8">
            Prêt à travailler avec quelqu’un qui livre vraiment ?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-4 px-8 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xl rounded-full hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300"
          >
            Discutons de votre projet
            <Rocket className="w-6 h-6" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}