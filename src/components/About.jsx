import React from "react";
import { motion } from "framer-motion";
import { Brain, Zap, Target,Users,Github, ExternalLink } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Brain className="w-12 h-12" />,
      title: "Expertise IA",
      desc: "Physicien devenu Ingénieur Machine Learning. J'entraîne des modèles qui pensent, apprennent et résolvent des problèmes réels.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: "Impact Social",
      desc: "Je crois que l’IA doit servir l’humain. Tous mes projets ont un objectif : améliorer la santé, l’éducation ou l’accès à l’information.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Communauté",
      desc: "Formateur, mentor, contributeur open source. Je forme la prochaine génération d’experts IA en Afrique.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Exécution Rapide",
      desc: "Du prototype en 48h au modèle en production. Je livre des solutions qui marchent, pas juste des notebooks.",
      gradient: "from-orange-500 to-red-500"
    },
  ];

  const projects = [
    {
      title: "VeritaAI",
      tagline: "Détecteur de fake news en temps réel",
      stack: "BERT • Transformers • FastAPI • Streamlit",
      impact: "90% précision • Utilisé par 3 médias africains",
      github: "https://github.com/dona-eric/veritaai",
      demo: "https://verita-ai.streamlit.app",
      color: "from-purple-600 to-pink-600"
    },
    {
      title: "EV Dashboard Pro",
      tagline: "Optimisation intelligente de recharge VE",
      stack: "Prophet • XGBoost • Plotly Dash • Docker",
      impact: "-30% sur la facture énergétique moyenne",
      github: "https://github.com/dona-eric/dashboard-ve",
      demo: null,
      color: "from-cyan-600 to-blue-600"
    },
    {
      title: "Credit Risk Engine",
      tagline: "Scoring de crédit bancaire automatisé",
      stack: "Logistic Regression • SHAP • Streamlit • MLflow",
      impact: "Déployé chez une fintech béninoise",
      github: "https://github.com/dona-eric/Hack2Hiere_TechTech_DataScience_20",
      demo: "https://risk-score.streamlit.app",
      color: "from-emerald-600 to-green-600"
    },
  ];

  return (
    <>
      {/* Hero About */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="container-custom z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">
              Je ne code pas.<br />
              <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                J'entraîne l'intelligence.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mt-8 leading-relaxed">
              <span className="font-bold text-white">Dona Éric KOULODJI</span> — 
              Ingénieur Machine Learning • Data Scientist • Créateur de solutions IA à impact réel
            </p>
            <p className="text-lg text-white-300 mt-6 max-w-3xl mx-auto">
              De la Physique théorique et des mathématiques au Machine Learning et IA, j’ai choisi de mettre mes compétences en analyse, impact, prise de décision au service de l’humain. 
              Aujourd’hui, je développe, je conçois et je déploie des modèles d'IA en production capable de créer un impact conséquent sur le marché et dans les industries..
            </p>
          </motion.div>
        </div>

        {/* Background gradient animé */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-black to-cyan-900/50" />
          <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-20 animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-600 rounded-full filter blur-3xl opacity-20 animate-pulse delay-1000" />
        </div>
      </section>

      {/* Mes Valeurs */}
      <section className="py-24">
        <div className="container-custom">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Ce qui me drive
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 hover:bg-white/10 transition-all duration-500"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${item.gradient} text-white mb-6`}>
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projets Phare */}
      <section className="py-24 bg-black/40">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-4">
              Projets qui ont un impact réel
            </h2>
            <p className="text-xl text-gray-400">
              Pas juste des démos. Des systèmes utilisés tous les jours.
            </p>
          </motion.div>

          {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {projects.map((proj, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-500"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${proj.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                
                <div className="relative p-10">
                  <h3 className="text-3xl font-black text-white mb-3">{proj.title}</h3>
                  <p className="text-lg text-purple-300 mb-6">{proj.tagline}</p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <span>{proj.stack}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-semibold text-green-400">
                      <Target className="w-4 h-4" />
                      <span>{proj.impact}</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition backdrop-blur"
                    >
                      <Github className="w-5 h-5" /> Code
                    </a>
                    {proj.demo && (
                      <a
                        href={proj.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:scale-105 transition"
                      >
                        <ExternalLink className="w-5 h-5" /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div> */}
        </div>
      </section>
    </>
  );
};

export default About;