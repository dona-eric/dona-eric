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
                <CheckCircle2 className={`w-5 h-5 mt-0.5 text-${service.gradient.split('-')[1]}-400 flex-shrink-0 group-hover/item:scale-110 transition-transform`} />
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-mesh">
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
            <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-sm font-semibold text-purple-300 mb-8">
              <Sparkles className="w-4 h-4" />
              <span>Services Premium</span>
            </div>

            {/* Titre */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] mb-8">
              Mes domaines
              <br />
              <span className="text-gradient">d'expertise</span>
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed mb-12">
              Je transforme vos défis data en solutions IA concrètes, 
              <span className="text-white font-semibold"> déployées</span> et 
              <span className="text-white font-semibold"> mesurables</span>.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-12 mt-16">
              <div className="text-center">
                <div className="text-5xl font-black text-gradient mb-2">7+</div>
                <div className="text-sm text-zinc-500 uppercase tracking-wider">Modèles en prod</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black text-gradient mb-2">90%</div>
                <div className="text-sm text-zinc-500 uppercase tracking-wider">Précision moyenne</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black text-gradient mb-2">24h</div>
                <div className="text-sm text-zinc-500 uppercase tracking-wider">Temps de réponse</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

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
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Mon processus de travail
            </h2>
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

      {/* CTA Final */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20" />
        </div>

        <div className="container-custom px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative p-1 rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600">
              <div className="p-12 md:p-16 rounded-[calc(1.5rem-4px)] bg-black text-center">
                <Rocket className="w-16 h-16 text-purple-400 mx-auto mb-6" />
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                  Prêt à démarrer votre projet ?
                </h2>
                <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
                  Discutons de vos objectifs et voyons comment je peux vous aider à les atteindre
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://wa.me/2290141730240"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center gap-3"
                  >
                    <span>Discuter sur WhatsApp</span>
                    <ArrowRight className="w-5 h-5" />
                  </a>
                  <a
                    href="mailto:donaerickoulodji@gmail.com"
                    className="btn-secondary inline-flex items-center gap-3"
                  >
                    <span>Envoyer un email</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}