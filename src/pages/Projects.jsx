import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  Github, 
  ExternalLink, 
  Brain, 
  Zap, 
  Shield, 
  Activity, 
  TrendingUp, 
  BarChart3, 
  BookOpen, 
  Target,
  Rocket,
  CheckCircle2,
  Clock,
  GitBranch
} from "lucide-react";

const PROJECTS = [
  {
    title: "VeritaAI",
    subtitle: "Détection intelligente de fake news",
    description: "Système RAG + BERT pour analyser et scorer l’authenticité des informations en temps réel.",
    stack: ["BERT", "Transformers", "FastAPI", "Streamlit", "Supabase"],
    impact: "90% précision • Utilisé par 3 médias",
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
    stack: ["OpenAI", "GroqCloud", "RAG", "Streamlit", "LangChain"],
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
    subtitle: "Scoring de crédit bancaire automatisé",
    description: "Modèle prédictif avec explicabilité SHAP déployé chez une fintech béninoise.",
    stack: ["Scikit-Learn", "FastAPI", "SHAP", "Streamlit", "MLflow"],
    impact: "Déployé en production • +15% précision",
    github: "https://github.com/dona-eric/Hack2Hiere_TechTech_DataScience_20",
    demo: "https://risk-score.streamlit.app",
    gradient: "from-blue-600 to-cyan-600",
    icon: TrendingUp,
    status: "En production",
    featured: true
  },
  {
    title: "RAG Document Intelligence",
    subtitle: "Recherche sémantique dans tous vos documents",
    description: "Système RAG multi-format (PDF, Word, Excel) avec Groq + ChromaDB.",
    stack: ["Groq", "LangChain", "ChromaDB", "Gradio", "Llama 3"],
    impact: "Réponses en <2s sur 1000+ documents",
    github: "https://huggingface.co/spaces/donerick",
    demo: "https://huggingface.co/spaces/donerick/Projects",
    gradient: "from-indigo-600 to-purple-600",
    icon: Brain,
    status: "En production"
  },
  {
    title: "EV Dashboard Pro",
    subtitle: "Optimisation de recharge véhicules électriques",
    description: "Dashboard prédictif avec Prophet + XGBoost pour réduire les coûts énergétiques.",
    stack: ["Prophet", "XGBoost", "Plotly Dash", "Docker"],
    impact: "-30% facture énergétique moyenne",
    github: "https://github.com/dona-eric/dashboard-ve",
    demo: null,
    gradient: "from-amber-600 to-orange-600",
    icon: Zap,
    status: "Terminé"
  },
  {
    title: "SafeRoute Bénin",
    subtitle: "Application de sécurité routière communautaire",
    description: "Alertes en temps réel + crowdsourcing d’accidents + prédiction de zones à risque.",
    stack: ["React Native", "Node.js", "MongoDB", "ML", "Maps API"],
    impact: "Réduction des accidents ciblée",
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative block"
    >
      <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10">
        {/* Gradient header */}
        <div className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          {/* Icon */}
          <div className="absolute top-8 left-8">
            <div className="p-5 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30">
              <Icon className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Status badge */}
          <div className="absolute top-8 right-8">
            <div className={`px-4 py-2 rounded-full text-xs font-bold backdrop-blur-xl border ${
              project.status === "En production" 
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                : project.status === "En cours"
                ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                : "bg-zinc-500/20 text-zinc-300 border-zinc-500/40"
            }`}>
              {project.status}
            </div>
          </div>

          {/* Impact */}
          <div className="absolute bottom-6 left-8 right-8">
            <div className="text-white/90 text-sm font-medium backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full inline-block">
              {project.impact}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <h3 className="text-2xl font-black text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-300 transition-all duration-500">
            {project.title}
          </h3>
          <p className="text-lg text-zinc-400 mb-4">{project.subtitle}</p>
          <p className="text-zinc-400 leading-relaxed mb-6">{project.description}</p>

          {/* Stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.stack.map((tech) => (
              <span key={tech} className="px-3 py-1.5 bg-white/10 rounded-lg text-xs text-zinc-300 border border-white/10">
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4">
            <div className="flex items-center gap-2 text-zinc-400 hover:text-white transition">
              <Github className="w-5 h-5" />
              <span className="text-sm">Code source</span>
            </div>
            {project.demo && (
              <>
                <div className="w-1 h-1 bg-zinc-600 rounded-full" />
                <div className="flex items-center gap-2 text-zinc-400 hover:text-white transition">
                  <ExternalLink className="w-5 h-5" />
                  <span className="text-sm">Live demo</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Hover arrow */}
        <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
          <Rocket className="w-8 h-8 text-zinc-500 rotate-45" />
        </div>
      </div>
    </motion.a>
  );
};

export default function Projects() {
  const featuredProjects = PROJECTS.filter(p => p.featured);
  const otherProjects = PROJECTS.filter(p => !p.featured);

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background premium */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-black" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-900/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 max-w-5xl mx-auto"
        >
          <span className="inline-block px-6 py-2 bg-white/10 backdrop-blur border border-white/20 rounded-full text-sm font-medium text-zinc-400 mb-8">
            Projets en production
          </span>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight">
            Des modèles qui<br />
            <span className="text-5xl md:text-6xl lg:text-7xl font-light text-zinc-400">
              tournent vraiment
            </span>
          </h1>
          <p className="mt-8 text-xl text-zinc-400">
            Pas juste des notebooks. Des systèmes utilisés tous les jours par des entreprises, coachs, médias et institutions.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 max-w-7xl mx-auto mb-20">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white">Autres projets</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {otherProjects.map((project, i) => (
                <ProjectCard key={project.title} project={project} index={i} />
              ))}
            </div>
          </>
        )}

        {/* CTA final */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-24"
        >
          <p className="text-xl text-zinc-400">
            Un projet IA en tête ?{" "}
            <a href="/contact" className="text-white font-bold hover:underline">
              Contactez-moi directement →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}