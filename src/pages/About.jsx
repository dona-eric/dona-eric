import React from "react";
import { motion } from "framer-motion";
import { 
  Brain, 
  Rocket, 
  Target, 
  Zap, 
  Award, 
  Users,
  Sparkles,
  CheckCircle2,
  Code2,
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
  { value: "7+", label: "Modèles en production", icon: Brain },
  { value: "90%", label: "Précision moyenne", icon: Target },
  { value: "24h", label: "Réponse garantie", icon: Zap },
  { value: "3", label: "Pays touchés", icon: TrendingUp },
];

const VALUES = [
  {
    icon: Zap,
    title: "Excellence technique",
    desc: "Je ne livre que des systèmes robustes, monitorés, et qui tiennent la masse."
  },
  {
    icon: Users,
    title: "Partage de connaissance",
    desc: "Formations, mentorat, open-source : je construis l'écosystème IA africain."
  },
  {
    icon: Target,
    title: "Impact réel",
    desc: "Pas de POC. Que des solutions utilisées tous les jours par des vraies personnes."
  }
];

export default function About() {
  return (
    <div className="bg-mesh text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-20 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-20 right-20 w-[600px] h-[600px] bg-pink-900/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container-custom px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full mb-12 group cursor-default"
            >
              <Sparkles className="w-4 h-4 text-purple-400 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-sm font-semibold text-purple-300">À propos</span>
            </motion.div>

            {/* Titre avec animation de rotation 360° */}
            <motion.h1
              initial={{ opacity: 0, rotateY: -180 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] mb-8"
              style={{ transformStyle: "preserve-3d" }}
            >
              Dona Éric
              <br />
              <span className="text-gradient text-4xl md:text-5xl lg:text-6xl font-light">
                KOULODJI
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-zinc-400"
            >
              Ingénieur Machine Learning • Spécialisé MLOps • Bénin
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ESPACEUR */}
      <div className="h-20 md:h-20" />

      {/* Bio Section */}
      <section className="py-20 relative">
        <div className="container-custom px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto text-center"
          >
            <p className="text-xl md:text-2xl leading-relaxed text-zinc-300">
              Je transforme vos <span className="text-white font-bold">idées de projet ML et IA</span> en{" "}
              <span className="text-white font-bold">systèmes qui tournent en production</span>.
              <br /><br />
              Du développement RAG Complets au Fine-tuning,
              je construis des solutions qui <span className="text-gradient font-bold">accélère votre productivité au quotidien</span>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ESPACEUR */}
      <div className="h-20 md:h-30" />

      {/* Compétences Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />
        </div>

        <div className="container-custom px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            {/* Header avec animation rotation */}
            <motion.h2
              initial={{ opacity: 0, rotateY: -180 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-4xl md:text-5xl font-black text-white text-center mb-16"
              style={{ transformStyle: "preserve-3d" }}
            >
              Ce que je maîtrise vraiment
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SKILLS.map((skill, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-white/30 transition-all duration-300 group"
                >
                  <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-zinc-300 text-lg group-hover:text-white transition-colors">{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ESPACEUR */}
      <div className="h-20 md:h-30" />

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="container-custom px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            {/* Header */}
            <motion.h2
              initial={{ opacity: 0, rotateY: -180 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-4xl md:text-5xl font-black text-white text-center mb-16"
              style={{ transformStyle: "preserve-3d" }}
            >
              Chiffres clés
            </motion.h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {ACHIEVEMENTS.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all group"
                  >
                    <Icon className="w-10 h-10 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <div className="text-4xl md:text-5xl font-black text-gradient mb-2">
                      {stat.value}
                    </div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ESPACEUR */}
      <div className="h-20 md:h-30" />

      {/* Valeurs Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-900/5 to-transparent" />
        </div>

        <div className="container-custom px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            {/* Header avec animation rotation */}
            <motion.h2
              initial={{ opacity: 0, rotateY: -180 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-4xl md:text-5xl font-black text-white text-center mb-16"
              style={{ transformStyle: "preserve-3d" }}
            >
              Ce qui me drive
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-10">
              {VALUES.map((value, i) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="text-center group"
                  >
                    <div className="inline-flex p-6 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="w-12 h-12 text-purple-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gradient transition-all">
                      {value.title}
                    </h3>
                    <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                      {value.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ESPACEUR */}
      <div className="h-20 md:h-30" />

      {/* CTA Final Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/20 rounded-full blur-[120px] animate-pulse" />
        </div>

        <div className="container-custom px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Titre avec animation rotation */}
            <motion.p
              initial={{ opacity: 0, rotateY: -180 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-3xl md:text-4xl text-zinc-400 mb-12"
              style={{ transformStyle: "preserve-3d" }}
            >
              Prêt à travailler avec quelqu'un qui{" "}
              <span className="text-white font-bold">livre vraiment</span> ?
            </motion.p>

            {/* ESPACEUR */}
            <div className="h-16 md:h-20" />

            {/* CTA Button */}
            <motion.a
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/contact"
              className="group inline-flex items-center gap-4 px-8 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white font-bold text-xl rounded-full hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 relative overflow-hidden"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              <span className="relative z-10">Discutons de votre projet</span>
              <Rocket className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
            </motion.a>

            {/* ESPACEUR */}
            <div className="h-20 md:h-24" />

            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30"
            >
              {/* <div className="relative">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping" />
              </div> */}
              {/* <div className="text-left">
                <p className="text-base font-bold text-white">
                  Actuellement disponible pour nouveaux projets
                </p>
                {/* <p className="text-sm text-green-300">
                  Freelance • Consulting • Collaborations long terme
                </p> 
              </div> */}
            </motion.div>
          </motion.div>

          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-20 h-20 border-2 border-purple-500/20 rounded-full animate-float" />
          <div className="absolute bottom-20 right-10 w-32 h-32 border-2 border-pink-500/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 right-20 w-16 h-16 border-2 border-cyan-500/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        </div>
      </section>
    </div>
  );
}