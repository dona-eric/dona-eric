import React from "react";
import { motion } from "framer-motion";
import { 
  Brain, 
  Rocket, 
  Target, 
  Zap, 
  GraduationCap, 
  BarChart3, 
  Shield,
  Sparkles,
  ArrowUpRight
} from "lucide-react";

const services = [
  {
    title: "Fine-tuning & RAG",
    description: "Adaptation de LLMs (Llama 3, Mistral, Phi-3) et création de systèmes RAG performants pour vos données propriétaires.",
    icon: Brain,
    gradient: "from-purple-500 via-purple-600 to-pink-500",
    glowColor: "purple",
    tags: ["LLM", "RAG", "Vector DB"]
  },
  {
    title: "MLOps & Déploiement",
    description: "Pipeline CI/CD complet, containerisation, monitoring en temps réel. Du notebook à la production scalable.",
    icon: Rocket,
    gradient: "from-blue-500 via-cyan-500 to-blue-600",
    glowColor: "cyan",
    tags: ["Docker", "K8s", "MLflow"]
  },
  {
    title: "Computer Vision",
    description: "Détection d'objets, segmentation sémantique, OCR intelligent, reconnaissance faciale pour applications critiques.",
    icon: Target,
    gradient: "from-emerald-500 via-teal-500 to-green-600",
    glowColor: "emerald",
    tags: ["YOLO", "SAM", "OCR"]
  },
  {
    title: "Prédictif & Scoring",
    description: "Modèles de scoring crédit, prédiction de churn, maintenance prédictive avec explicabilité complète (SHAP, LIME).",
    icon: BarChart3,
    gradient: "from-orange-500 via-red-500 to-pink-600",
    glowColor: "orange",
    tags: ["XGBoost", "SHAP", "Time Series"]
  },
  {
    title: "Formation & Mentoring",
    description: "Bootcamps intensifs, accompagnement d'équipes, montée en compétences sur PyTorch, Transformers et MLOps.",
    icon: GraduationCap,
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
    glowColor: "indigo",
    tags: ["Bootcamp", "Coaching", "Upskilling"]
  },
  {
    title: "Audit & Conseil IA",
    description: "Audit de stack technique, roadmap IA stratégique, optimisation de coûts cloud, architecture scalable.",
    icon: Shield,
    gradient: "from-slate-500 via-zinc-500 to-slate-600",
    glowColor: "slate",
    tags: ["Strategy", "Architecture", "ROI"]
  },
];

const ServiceCard = ({ service, index }) => {
  const Icon = service.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ y: -12 }}
      className="group relative"
    >
      {/* Card avec glassmorphism */}
      <div className="relative h-full p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/8">
        
        {/* Gradient animé au hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-2xl`} />
        
        {/* Effet de scan lumineux */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className={`absolute inset-0 bg-gradient-to-b ${service.gradient} opacity-10 animate-pulse`} />
        </div>

        <div className="relative z-10">
          {/* Icône avec halo néon */}
          <div className={`inline-flex p-5 rounded-2xl bg-gradient-to-br ${service.gradient} text-white mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
            <Icon className="w-8 h-8" />
          </div>

          {/* Titre avec effet gradient au hover */}
          <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-purple-200 group-hover:to-pink-200 transition-all duration-500">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-zinc-400 leading-relaxed mb-6 group-hover:text-zinc-300 transition-colors duration-300">
            {service.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {service.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-zinc-400 group-hover:border-white/20 group-hover:text-white transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Flèche interactive */}
          <div className="flex items-center gap-2 text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
            <span>En savoir plus</span>
            <ArrowUpRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </div>
        </div>

        {/* Bordure lumineuse animée */}
        <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
          style={{
            background: `linear-gradient(135deg, transparent 0%, rgba(168, 85, 247, 0.1) 50%, transparent 100%)`,
            animation: 'shimmer 2s ease-in-out infinite'
          }}
        />
      </div>
    </motion.div>
  );
};

export default function Services() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Fond avec mesh gradient animé */}
      <div className="absolute inset-0 -z-10 bg-mesh">
        <div className="absolute top-20 left-20 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-20 right-20 w-[600px] h-[600px] bg-pink-900/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-900/10 rounded-full blur-[140px] animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container-custom px-6">
        {/* Header épique */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24 max-w-5xl mx-auto"
        >
          {/* Badge animé */}
          {/* <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-sm font-semibold text-purple-300 mb-8 group cursor-default"
          >
            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
            <span>Expertise</span>
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          </motion.div> */}

          {/* Titre principal avec gradient animé */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6">
            Ce que je maîtrise
            <br />
            <span className="text-gradient text-4xl md:text-5xl lg:text-6xl font-light">
              et que je livre en production
            </span>
          </h2>

          {/* Description */}
          <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Des solutions IA <span className="text-white font-semibold">concrètes</span>, 
            <span className="text-white font-semibold"> déployées</span> et 
            <span className="text-white font-semibold"> mesurables</span> — utilisées au quotidien par des entreprises réelles.
          </p>
        </motion.div>

        {/* Grille de services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <div className="inline-block p-1 rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600">
            <div className="px-8 py-6 rounded-[calc(1.5rem-4px)] bg-black">
              <p className="text-xl text-zinc-300 mb-4">
                Besoin d'un expert pour un projet précis ?
              </p>
              <a 
                href="/contact" 
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 group"
              >
                <span>Parlons-en directement</span>
                <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </motion.div> */}
      </div>

      {/* Animation CSS pour l'effet shimmer */}
      <style jsx>{`
        @keyframes shimmer {
          0%, 100% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          50% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }
      `}</style>
    </section>
  );
}