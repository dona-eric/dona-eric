import React from "react";
import { motion } from "framer-motion";
import SignupForm from "../components/SignupForm";
import { 
  Brain, 
  Rocket, 
  Target, 
  Zap, 
  Users, 
  Trophy,
  CheckCircle2,
  Clock,
  Award,
  TrendingUp,
  Sparkles,
  Star
} from "lucide-react";

const PROGRAMS = [
  {
    title: "Bootcamp Fine-tuning LLM",
    subtitle: "De zéro à expert en 8 semaines",
    desc: "Fine-tuning Llama 3, Mistral, Phi-3 • RAG avec LangChain • LoRA & Quantization • Déploiement API",
    gradient: "from-purple-600 to-pink-600",
    icon: Brain,
    places: "8 places restantes",
    level: "Intermédiaire → Expert",
    duration: "8 semaines",
    features: ["Projet fil rouge", "Code review hebdo", "Certificat reconnu"]
  },
  {
    title: "MLOps & Production Masterclass",
    subtitle: "Du notebook à la production scalable",
    desc: "Docker • FastAPI • MLflow • CI/CD GitHub Actions • Monitoring Prometheus • Kubernetes basics",
    gradient: "from-blue-600 to-cyan-600",
    icon: Rocket,
    places: "6 places restantes",
    level: "Intermédiaire → Senior",
    duration: "6 semaines",
    features: ["Pipeline complet", "Déploiement cloud", "Portfolio pro"]
  },
  {
    title: "Mentorat 1-to-1 (3 mois)",
    subtitle: "Accompagnement personnalisé intensif",
    desc: "Projet réel sur-mesure • Code review hebdomadaire • Portfolio professionnel • Préparation entretiens tech",
    gradient: "from-emerald-600 to-teal-600",
    icon: Target,
    places: "2 places seulement",
    level: "Tous niveaux",
    duration: "3 mois",
    features: ["100% personnalisé", "Support illimité", "Réseau pro"]
  }
];

const BENEFITS = [
  {
    icon: CheckCircle2,
    title: "Projets réels",
    desc: "Travaillez sur des cas d'usage concrets utilisés en entreprise"
  },
  {
    icon: Award,
    title: "Certification",
    desc: "Certificat reconnu par les entreprises tech africaines"
  },
  {
    icon: Users,
    title: "Communauté",
    desc: "Rejoignez un réseau de 50+ data scientists africains"
  },
  {
    icon: TrendingUp,
    title: "Suivi carrière",
    desc: "Accompagnement job hunting et négociation salariale"
  }
];

const STATS = [
  { value: "94%", label: "Taux de placement", icon: Trophy },
  { value: "50+", label: "Anciens formés", icon: Users },
  { value: "100%", label: "Satisfaction", icon: Star },
  { value: "24h", label: "Support réponse", icon: Clock }
];

const ProgramCard = ({ program, index }) => {
  const Icon = program.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.7 }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      <div className="relative h-full overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 transition-all duration-500 hover:border-white/25 hover:bg-white/8 hover:shadow-2xl">
        
        {/* Gradient animé au hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${program.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-700`} />
        
        <div className="p-8 relative z-10">
          {/* Header avec icône et places */}
          <div className="flex items-start justify-between mb-6">
            <div className={`p-4 rounded-2xl bg-gradient-to-br ${program.gradient} shadow-xl group-hover:scale-110 transition-transform duration-300`}>
              <Icon className="w-10 h-10 text-white" />
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30">
                <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                <span className="text-sm font-bold text-red-300">{program.places}</span>
              </div>
            </div>
          </div>

          {/* Titre et sous-titre */}
          <h3 className="text-2xl md:text-3xl font-black text-white mb-2 group-hover:text-gradient transition-all duration-300">
            {program.title}
          </h3>
          <p className="text-lg text-purple-300 font-medium mb-4">
            {program.subtitle}
          </p>
          
          {/* Description */}
          <p className="text-zinc-400 leading-relaxed mb-6 group-hover:text-zinc-300 transition-colors">
            {program.desc}
          </p>

          {/* Features */}
          <div className="space-y-2 mb-6">
            {program.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span className="text-zinc-400">{feature}</span>
              </div>
            ))}
          </div>

          {/* Footer badges */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-zinc-500">{program.duration}</span>
            </div>
            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <span className="text-xs text-zinc-400 font-medium">{program.level}</span>
            </div>
          </div>
        </div>

        {/* Badge "HOT" sur certains programmes */}
        {index === 0 && (
          <div className="absolute -top-3 -right-3 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-black shadow-xl animate-pulse">
            🔥 POPULAIRE
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default function Signup() {
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
            {/* Badge sessions */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-full mb-8"
            >
              <Trophy className="w-6 h-6 text-yellow-400" />
              <span className="font-bold text-yellow-400 text-lg">
                Sessions Janvier & Mars 2026
              </span>
              <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            </motion.div>

            {/* Titre principal */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] mb-8">
              Rejoignez l'élite
              <br />
              <span className="text-gradient text-5xl md:text-6xl lg:text-7xl">
                IA africaine
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed mb-12">
              Formations intensives • Projets réels déployés • Mentorat individuel • 
              <span className="text-white font-semibold"> Pipeline complet vers l'emploi</span>
            </p>

            {/* Mini features */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {["12 semaines max", "Projets portfolio", "Support 24/7", "Certificat pro"].map((item, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-zinc-300">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 relative">
        <div className="container-custom px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Pourquoi nos formations ?
            </h2>
            <p className="text-xl text-zinc-400">
              Ce qui nous différencie des autres programmes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {BENEFITS.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 hover:bg-white/8 transition-all duration-300 text-center group"
                >
                  <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-white/10 mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-purple-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{benefit.title}</h4>
                  <p className="text-sm text-zinc-400 leading-relaxed">{benefit.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Programs & Form Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />
        </div>

        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-5 gap-12 max-w-7xl mx-auto items-start">
            
            {/* Programmes - 3 colonnes */}
            <div className="lg:col-span-3 space-y-8">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                  Nos programmes
                </h2>
                <p className="text-xl text-zinc-400">
                  Choisissez le parcours qui vous correspond
                </p>
              </motion.div>

              {PROGRAMS.map((program, index) => (
                <ProgramCard key={index} program={program} index={index} />
              ))}
            </div>

            {/* Formulaire sticky - 2 colonnes */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 lg:sticky lg:top-24"
            >
              {/* Wrapper avec gradient border */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-3xl blur-xl opacity-30 animate-pulse" />
                
                <div className="relative glass-strong rounded-3xl p-8 border-2 border-white/20">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-full mb-4">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      <span className="text-sm font-bold text-purple-300">Inscription rapide</span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                      Réservez votre place
                    </h2>
                    <p className="text-zinc-400 text-lg">
                      Places <span className="text-white font-bold">très limitées</span> — 
                      Réponse sous 24h garantie
                    </p>
                  </div>
                  
                  <SignupForm />
                </div>

                {/* Badge exclusivité */}
                <div className="absolute -top-4 -right-4 px-6 py-3 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-black font-black text-sm rounded-full shadow-2xl animate-pulse">
                  ⚡ EXCLUSIF 2026
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="container-custom px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Des résultats prouvés
              </h2>
              <p className="text-xl text-zinc-400">
                Les chiffres parlent d'eux-mêmes
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {STATS.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all group"
                  >
                    <Icon className="w-10 h-10 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <div className="text-5xl font-black text-gradient mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-zinc-500 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20" />
        </div>

        <div className="container-custom px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="p-1 rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600">
              <div className="p-12 md:p-16 rounded-[calc(1.5rem-4px)] bg-black">
                <Zap className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
                
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                  Les places partent vite
                </h2>
                
                <p className="text-xl md:text-2xl text-zinc-400 mb-8">
                  Ne ratez pas votre chance de rejoindre{" "}
                  <span className="text-white font-bold">l'élite IA africaine</span>
                </p>
                
                <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full text-white font-bold text-lg shadow-2xl shadow-red-500/30">
                  <Users className="w-6 h-6" />
                  <span>Session limitée à 12 participants max</span>
                </div>

                <p className="text-sm text-zinc-600 mt-8">
                  ⏰ Dernière inscription : 31 janvier 2026
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}