import React from "react";
import { motion } from "framer-motion";
import { 
  Github, 
  ExternalLink, 
  Brain, 
  Zap, 
  Shield, 
  Activity, 
  TrendingUp, 
  Target,
  Rocket,
  Sparkles
} from "lucide-react";

const PROJECTS = [
  {
    title: "VeritaAI",
    subtitle: "Détection intelligente de fake news",
    description: "Système RAG + BERT pour analyser et scorer l'authenticité des informations en temps réel.",
    stack: ["BERT", "Transformers", "FastAPI", "Streamlit"],
    impact: "90% précision • 3 médias utilisateurs",
    github: "https://github.com/dona-eric/veritaai",
    demo: "https://verita-ai.streamlit.app",
    gradient: "from-emerald-500 to-teal-600",
    icon: Shield,
    status: "En production",
    featured: true
  },
  {
    title: "CoachAI",
    subtitle: "Générateur IA de programmes sportifs",
    description: "Application LLM qui génère des entraînements personnalisés, plans de récupération et nutrition.",
    stack: ["OpenAI", "GroqCloud", "RAG", "Streamlit"],
    impact: "20% temps gagné pour les coachs",
    github: "https://github.com/dona-eric/CoachAI",
    demo: "https://coach-ai.streamlit.app",
    gradient: "from-purple-600 to-pink-600",
    icon: Activity,
    status: "En production",
    featured: true
  },
  {
    title: "Credit Risk Engine",
    subtitle: "Scoring de crédit automatisé",
    description: "Modèle prédictif avec explicabilité SHAP déployé chez une fintech béninoise.",
    stack: ["Scikit-Learn", "FastAPI", "SHAP", "MLflow"],
    impact: "Production • +15% précision",
    github: "https://github.com/dona-eric/Hack2Hiere_TechTech_DataScience_20",
    demo: "https://risk-score.streamlit.app",
    gradient: "from-blue-600 to-cyan-600",
    icon: TrendingUp,
    status: "En production",
    featured: true
  },
  {
    title: "RAG Document Intelligence",
    subtitle: "Recherche sémantique multi-documents",
    description: "Système RAG multi-format (PDF, Word, Excel) avec Groq + ChromaDB.",
    stack: ["Groq", "LangChain", "ChromaDB", "Llama 3"],
    impact: "Réponses <2s sur 1000+ docs",
    github: "https://huggingface.co/spaces/donerick",
    demo: "https://huggingface.co/spaces/donerick/Projects",
    gradient: "from-indigo-600 to-purple-600",
    icon: Brain,
    status: "En production"
  },
  {
    title: "EV Dashboard Pro",
    subtitle: "Optimisation recharge véhicules électriques",
    description: "Dashboard prédictif avec Prophet + XGBoost pour réduire les coûts énergétiques.",
    stack: ["Prophet", "XGBoost", "Plotly Dash", "Docker"],
    impact: "-30% facture énergétique",
    github: "https://github.com/dona-eric/dashboard-ve",
    demo: null,
    gradient: "from-amber-600 to-orange-600",
    icon: Zap,
    status: "Terminé"
  },
  {
    title: "SafeRoute Bénin",
    subtitle: "Sécurité routière communautaire",
    description: "Alertes temps réel + crowdsourcing d'accidents + prédiction de zones à risque.",
    stack: ["React Native", "Node.js", "MongoDB", "ML"],
    impact: "Réduction accidents ciblée",
    github: "https://github.com/dona-eric/saferoute-benin",
    demo: null,
    gradient: "from-rose-600 to-pink-600",
    icon: Target,
    status: "En cours"
  },
];

const ProjectCard = ({ project, index }) => {
  const Icon = project.icon;

  return (
    <motion.a
      href={project.demo || project.github}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      className="group relative block"
    >
      <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/25 transition-all duration-500 hover:shadow-2xl h-full">
        
        {/* Gradient header - réduit */}
        <div className={`h-36 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          {/* Icon - plus petit */}
          <div className="absolute top-5 left-5">
            <div className="p-3 bg-white/20 backdrop-blur-xl rounded-xl border border-white/30 group-hover:scale-110 transition-transform">
              <Icon className="w-7 h-7 text-white" />
            </div>
          </div>

          {/* Status badge - plus compact */}
          <div className="absolute top-5 right-5">
            <div className={`px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-xl border ${
              project.status === "En production" 
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                : project.status === "En cours"
                ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                : "bg-zinc-500/20 text-zinc-300 border-zinc-500/40"
            }`}>
              {project.status}
            </div>
          </div>

          {/* Impact - plus compact */}
          <div className="absolute bottom-4 left-5 right-5">
            <div className="text-white text-xs font-semibold backdrop-blur-sm bg-white/10 px-3 py-1.5 rounded-full inline-block">
              {project.impact}
            </div>
          </div>
        </div>

        {/* Content - plus compact */}
        <div className="p-6">
          <h3 className="text-xl font-black text-white mb-1.5 group-hover:text-gradient transition-all duration-300">
            {project.title}
          </h3>
          <p className="text-base text-purple-300 mb-3 font-medium">{project.subtitle}</p>
          <p className="text-sm text-zinc-400 leading-relaxed mb-4">{project.description}</p>

          {/* Stack - plus compact */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.stack.map((tech) => (
              <span key={tech} className="px-2.5 py-1 bg-white/10 rounded-lg text-xs text-zinc-400 border border-white/10">
                {tech}
              </span>
            ))}
          </div>

          {/* Links - plus compact */}
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition">
              <Github className="w-4 h-4" />
              <span className="text-xs">Code</span>
            </div>
            {project.demo && (
              <>
                <div className="w-1 h-1 bg-zinc-600 rounded-full" />
                <div className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition">
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-xs">Demo</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Hover indicator - plus petit */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
          <Rocket className="w-6 h-6 text-zinc-500 rotate-45" />
        </div>
      </div>
    </motion.a>
  );
};

export default function Projects() {
  const featuredProjects = PROJECTS.filter(p => p.featured);
  const otherProjects = PROJECTS.filter(p => !p.featured);

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
              <span className="text-sm font-semibold text-purple-300">Projets en production</span>
            </motion.div>

            {/* Titre avec animation rotation */}
            <motion.h1
              initial={{ opacity: 0, rotateY: -180 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] mb-8"
              style={{ transformStyle: "preserve-3d" }}
            >
              Des modèles qui
              <br />
              <span className="text-gradient text-5xl md:text-6xl lg:text-7xl font-light">
                tournent vraiment
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-zinc-400"
            >
              Pas juste des notebooks. Des systèmes utilisés tous les jours par des entreprises, coachs, médias et institutions.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ESPACEUR MODÉRÉ */}
      <div className="h-20 md:h-24" />

      {/* Featured Projects Section */}
      <section className="py-12 relative">
        <div className="container-custom px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            {/* Header section avec animation */}
            <motion.h2
              initial={{ opacity: 0, rotateY: -180 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-3xl md:text-4xl font-black text-white text-center mb-12"
              style={{ transformStyle: "preserve-3d" }}
            >
              Projets phares
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-16">
              {featuredProjects.map((project, i) => (
                <ProjectCard key={project.title} project={project} index={i} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ESPACEUR MODÉRÉ */}
      <div className="h-20 md:h-24" />

      {/* Other Projects Section */}
      {otherProjects.length > 0 && (
        <>
          <section className="py-12 relative overflow-hidden">
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />
            </div>

            <div className="container-custom px-6">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="max-w-7xl mx-auto"
              >
                {/* Header avec animation */}
                <motion.h2
                  initial={{ opacity: 0, rotateY: -180 }}
                  whileInView={{ opacity: 1, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="text-3xl md:text-4xl font-black text-white text-center mb-12"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  Autres projets
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {otherProjects.map((project, i) => (
                    <ProjectCard key={project.title} project={project} index={i + featuredProjects.length} />
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* ESPACEUR MODÉRÉ */}
          <div className="h-20 md:h-24" />
        </>
      )}

      {/* CTA Final Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/20 rounded-full blur-[120px] animate-pulse" />
        </div>

        <div className="container-custom px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            {/* Titre avec animation */}
            <motion.p
              initial={{ opacity: 0, rotateY: -180 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-2xl md:text-3xl text-zinc-400 mb-10"
              style={{ transformStyle: "preserve-3d" }}
            >
              Un projet IA en tête ?
            </motion.p>

            {/* ESPACEUR MODÉRÉ */}
            <div className="h-8" />

            {/* CTA Button */}
            <motion.a
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/contact"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white font-bold text-lg rounded-full hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 relative overflow-hidden"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              <span className="relative z-10">Contactez-moi directement</span>
              <Rocket className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </motion.a>

            {/* ESPACEUR MODÉRÉ */}
            <div className="h-12 md:h-16" />

            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30"
            >
              <div className="relative">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-white">
                  Disponible pour nouveaux projets
                </p>
                {/* <p className="text-xs text-green-300">
                  Freelance • Consulting • Long terme
                </p> */}
              </div>
            </motion.div>
          </motion.div>

          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-20 h-20 border-2 border-purple-500/20 rounded-full animate-float" />
          <div className="absolute bottom-20 right-10 w-32 h-32 border-2 border-pink-500/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        </div>
      </section>
    </div>
  );
}