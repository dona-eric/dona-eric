import React from "react";
import { motion } from "framer-motion";
import { 
  LineChart, 
  Brain, 
  Presentation, 
  Cpu,
  Sparkles,
  Rocket,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

const mainServices = [
  {
    title: "Data Analysis & Intelligence",
    description: "Analyse approfondie, modélisation statistique avancée et dashboards décisionnels interactifs qui transforment vos données en insights actionnables.",
    icon: LineChart,
    gradient: "from-purple-500 to-purple-700",
    features: [
      "Exploration et nettoyage de données complexes",
      "Dashboards interactifs (Plotly, Streamlit, Power BI)",
      "Modélisation statistique et tests d'hypothèses",
      "Reporting automatisé et visualisations sur-mesure"
    ]
  },
  {
    title: "Machine Learning & IA",
    description: "Conception, entraînement et déploiement de modèles IA performants adaptés à vos besoins métier spécifiques.",
    icon: Brain,
    gradient: "from-indigo-500 to-blue-600",
    features: [
      "Fine-tuning de LLMs (Llama, Mistral, GPT)",
      "Systèmes RAG avec bases vectorielles",
      "Computer Vision (détection, segmentation)",
      "Modèles prédictifs (churn, scoring, forecast)"
    ]
  },
  {
    title: "Formations & Bootcamps",
    description: "Programmes intensifs orientés pratique en Data Science, Machine Learning et MLOps pour vos équipes.",
    icon: Presentation,
    gradient: "from-pink-500 to-rose-600",
    features: [
      "Bootcamps de 2 à 12 semaines",
      "Python, PyTorch, TensorFlow, Scikit-learn",
      "MLOps complet (Docker, MLflow, CI/CD)",
      "Projets réels et certification finale"
    ]
  },
  {
    title: "Conseil & Mentorat",
    description: "Accompagnement stratégique et technique pour structurer vos projets IA et développer vos équipes data.",
    icon: Cpu,
    gradient: "from-emerald-500 to-teal-600",
    features: [
      "Audit de maturité IA et data",
      "Roadmap stratégique et priorisation",
      "Choix d'architecture et stack technique",
      "Mentorat technique et leadership"
    ]
  },
];

const processSteps = [
  {
    number: "01",
    title: "Découverte",
    description: "Analyse de vos besoins, objectifs métier et contraintes techniques"
  },
  {
    number: "02",
    title: "Stratégie",
    description: "Définition de l'approche, choix des technologies et planning"
  },
  {
    number: "03",
    title: "Développement",
    description: "Implémentation itérative avec feedback continu et ajustements"
  },
  {
    number: "04",
    title: "Déploiement",
    description: "Mise en production, monitoring, documentation et formation"
  }
];

const ServiceMainCard = ({ service, index }) => {
  const Icon = service.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="group relative"
    >
      <div className="relative h-full p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden transition-all duration-500 hover:border-white/25 hover:bg-white/8 hover:shadow-2xl">
        
        {/* Gradient background animé */}
        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 blur-3xl transition-all duration-700`} />
        
        <div className="relative z-10">
          {/* Header avec icône */}
          <div className="flex items-start gap-6 mb-8">
            <div className={`p-5 rounded-2xl bg-gradient-to-br ${service.gradient} shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
              <Icon className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-gradient transition-all duration-300">
                {service.title}
              </h3>
              <p className="text-zinc-400 text-lg leading-relaxed group-hover:text-zinc-300 transition-colors">
                {service.description}
              </p>
            </div>
          </div>

          {/* Features list */}
          <div className="space-y-3 mt-8">
            {service.features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="flex items-start gap-3 group/item"
              >
                <CheckCircle2 className="w-5 h-5 mt-0.5 text-purple-400 flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                <span className="text-zinc-400 group-hover/item:text-white transition-colors">
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Services() {
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
              <span className="text-sm font-semibold text-purple-300">Services Premium</span>
            </motion.div>

            {/* Titre avec animation rotation */}
            <motion.h1
              initial={{ opacity: 0, rotateY: -180 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] mb-8"
              style={{ transformStyle: "preserve-3d" }}
            >
              Mes domaines
              <br />
              <span className="text-gradient text-5xl md:text-6xl lg:text-7xl font-light">
                d'expertise
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed"
            >
              Je transforme vos défis data en solutions IA concrètes, 
              <span className="text-white font-semibold"> déployées</span> et 
              <span className="text-white font-semibold"> mesurables</span>.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-12 mt-16"
            >
              {[
                { value: "7+", label: "Modèles en prod" },
                { value: "90%", label: "Précision moyenne" },
                { value: "24h", label: "Temps de réponse" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-5xl font-black text-gradient mb-2">{stat.value}</div>
                  <div className="text-sm text-zinc-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ESPACEUR */}
      <div className="h-32 md:h-48" />

      {/* Services principaux */}
      <section className="py-20 relative">
        <div className="container-custom px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {mainServices.map((service, index) => (
              <ServiceMainCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ESPACEUR */}
      <div className="h-32 md:h-48" />

      {/* Processus */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />
        </div>

        <div className="container-custom px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            {/* Titre avec animation rotation */}
            <motion.h2
              initial={{ opacity: 0, rotateY: -180 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-4xl md:text-5xl font-black text-white mb-6"
              style={{ transformStyle: "preserve-3d" }}
            >
              Mon processus de travail
            </motion.h2>
            <p className="text-xl text-zinc-400">
              Une approche structurée pour garantir des résultats de qualité
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="text-6xl font-black text-gradient mb-6 opacity-50">
                    {step.number}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">
                    {step.title}
                  </h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {/* Connecteur */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-white/20 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ESPACEUR */}
      <div className="h-32 md:h-48" />

      {/* CTA Final */}
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
            <motion.h2
              initial={{ opacity: 0, rotateY: -180 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-12 leading-[1.1]"
              style={{ transformStyle: "preserve-3d" }}
            >
              Prêt à démarrer
              <br />
              <span className="text-gradient">votre projet ?</span>
            </motion.h2>

            {/* ESPACEUR */}
            <div className="h-12" />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto"
            >
              Discutons de vos objectifs et voyons comment je peux vous aider à les atteindre
            </motion.p>

            {/* ESPACEUR */}
            <div className="h-16" />

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/2290141730240"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                <span className="relative z-10">Discuter sur WhatsApp</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:donaerickoulodji@gmail.com"
                className="inline-flex items-center gap-3 px-8 py-5 glass border-2 border-white/20 text-white font-semibold text-lg rounded-full hover:bg-white/10 transition-all duration-300"
              >
                <span>Envoyer un email</span>
              </motion.a>
            </motion.div>

            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30"
            >
              {/* <div className="relative">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping" />
              </div>
              <div className="text-left">
                <p className="text-base font-bold text-white">
                  Actuellement disponible pour nouveaux projets
                </p>
                <p className="text-sm text-green-300">
                  Freelance • Consulting • Collaborations long terme
                </p>
              </div> */}
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