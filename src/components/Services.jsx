import React from "react";
import { motion } from "framer-motion";
import { Brain, Rocket, Target, Zap, Code2, GraduationCap, BarChart3, Shield } from "lucide-react";

const services = [
  {
    title: "Fine-tuning & RAG",
    description: "Adaptation de LLMs (Llama 3, Mistral, Phi-3) et création de systèmes RAG performants (médical, juridique, entreprise).",
    icon: <Brain className="w-8 h-8" />,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "MLOps & Déploiement",
    description: "Pipeline CI/CD, Docker, Kubernetes, monitoring (MLflow, Prometheus), passage du notebook à la production scalable.",
    icon: <Rocket className="w-8 h-8" />,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Computer Vision",
    description: "Détection d’objets, segmentation, OCR, reconnaissance faciale, traitement d’images médical ou industriel.",
    icon: <Target className="w-8 h-8" />,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "Prédictif & Scoring",
    description: "Modèles de scoring crédit, churn, maintenance prédictive, optimisation de pricing avec explicabilité (SHAP).",
    icon: <BarChart3 className="w-8 h-8" />,
    gradient: "from-orange-500 to-red-500",
  },
  {
    title: "Formation & Mentoring",
    description: "Bootcamps intensifs, accompagnement d’équipes, formation continue en PyTorch, Transformers et MLOps.",
    icon: <GraduationCap className="w-8 h-8" />,
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    title: "Audit & Conseil IA",
    description: "Audit de stack technique, roadmap IA, choix d’architecture, réduction de coûts cloud, stratégie data.",
    icon: <Shield className="w-8 h-8" />,
    gradient: "from-zinc-400 to-zinc-600",
  },
];

const ServiceCard = ({ icon, title, description, gradient }) => (
  <motion.div
    whileHover={{ y: -12, scale: 1.03 }}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, ease: "easeOut" }}
    className="group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl  p-8 hover:border-white/0 transition-all duration-500 cursor-default"
  >
    {/* Gradient hover subtil */}
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />
    
    {/* Icône avec halo */}
    <div className={`relative inline-flex p-5 rounded-2xl bg-gradient-to-br ${gradient} text-white mb-8 shadow-2xl shadow-${gradient.split(" ")[1]}/20`}>
      {icon}
    </div>

    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-300 transition-all duration-500">
      {title}
    </h3>
    <p className="text-zinc-400 leading-relaxed text-base">
      {description}
    </p>

    {/* Petite flèche discrète au hover */}
    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
      <Zap className="w-5 h-5 text-zinc-500" />
    </div>
  </motion.div>
);

export default function Services() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Fond premium ultra discret */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-black" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-900/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 max-w-4xl mx-auto"
        >
          <span className="inline-block px-5 py-2 bg-white/10 backdrop-blur border border-white/20 rounded-full text-sm font-medium text-zinc-400 mb-6">
            Expertise
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
            Ce que je maîtrise<br />
            <span className="text-4xl md:text-5xl font-light text-zinc-400">
              et que je livre en production
            </span>
          </h2>
          <p className="mt-8 text-xl text-zinc-400 max-w-2xl mx-auto">
            Des solutions IA concrètes, déployées, mesurables et utilisées au quotidien par des entreprises et institutions.
          </p>
        </motion.div>

        {/* Grille de services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {services.map((service, i) => (
            <ServiceCard
              key={i}
              icon={service.icon}
              title={service.title}
              description={service.description}
              gradient={service.gradient}
            />
          ))}
        </div>

        {/* CTA discret en bas */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-20"
        >
          <p className="text-zinc-400 text-lg">
            Besoin d’un expert pour un projet précis ? 
            <a href="/contact" className="text-white font-semibold hover:underline ml-2">
              Parlons-en directement →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}