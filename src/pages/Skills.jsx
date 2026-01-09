import React from "react";
import { motion } from "framer-motion";
import { 
  Brain, 
  Database, 
  Code2, 
  Sparkles, 
  CheckCircle2,
  Award,
  GraduationCap,
  TrendingUp
} from "lucide-react";

const skillCategories = [
  {
    title: "Machine Learning & AI",
    icon: Brain,
    gradient: "from-indigo-600 to-indigo-900",
    skills: [
      "TensorFlow & Keras",
      "PyTorch",
      "Scikit-learn",
      "XGBoost & LightGBM",
      "NLP (BERT, Transformers)",
      "Computer Vision",
      "Deep Learning",
      "Reinforcement Learning",
    ],
  },
  {
    title: "Data Science",
    icon: Database,
    gradient: "from-violet-600 to-violet-900",
    skills: [
      "Data Analysis",
      "Data Visualization",
      "Statistical Modeling",
      "Feature Engineering",
      "Time Series Analysis",
      "A/B Testing",
      "Pandas & NumPy",
      "SQL & Databases",
    ],
  },
  {
    title: "Software Engineering",
    icon: Code2,
    gradient: "from-pink-600 to-pink-900",
    skills: [
      "Python",
      "JavaScript & React",
      "FastAPI & Flask",
      "Docker & Kubernetes",
      "Git & CI/CD",
      "REST APIs",
      "Cloud Deployment",
      "System Design",
    ],
  },
];

const certifications = [
  {
    title: "Master's Degree",
    institution: "University of Benin",
    field: "Physics & AI",
    year: "2023",
    gradient: "from-purple-600 to-pink-600"
  },
  {
    title: "Machine Learning Specialization",
    institution: "DeepLearning.AI",
    field: "TensorFlow & Deep Learning",
    year: "2022",
    gradient: "from-blue-600 to-cyan-600"
  },
  {
    title: "Data Science Professional",
    institution: "Coursera",
    field: "Advanced Analytics",
    year: "2021",
    gradient: "from-emerald-600 to-teal-600"
  },
  {
    title: "Cloud Architecture",
    institution: "AWS",
    field: "Solutions Architect Associate",
    year: "2023",
    gradient: "from-orange-600 to-red-600"
  },
];

export default function Skills() {
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
              <span className="text-sm font-semibold text-purple-300">Compétences</span>
            </motion.div>

            {/* Titre avec animation rotation */}
            <motion.h1
              initial={{ opacity: 0, rotateY: -180 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] mb-8"
              style={{ transformStyle: "preserve-3d" }}
            >
              Expertise
              <br />
              <span className="text-gradient text-5xl md:text-6xl lg:text-7xl font-light">
                Technique
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed"
            >
              Une combinaison puissante de{" "}
              <span className="text-white font-semibold">Machine Learning</span>,{" "}
              <span className="text-white font-semibold">Data Science</span> et{" "}
              <span className="text-white font-semibold">Software Engineering</span>{" "}
              pour créer des solutions robustes et scalables.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ESPACEUR */}
      <div className="h-32 md:h-48" />

      {/* Skills Grid */}
      <section className="py-20 relative">
        <div className="container-custom px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {skillCategories.map((category, idx) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.7 }}
                  className="group"
                >
                  <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 h-full">
                    <div className={`inline-flex p-5 rounded-2xl bg-gradient-to-br ${category.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-gradient transition-all duration-300">
                      {category.title}
                    </h3>
                    <ul className="space-y-3">
                      {category.skills.map((skill, i) => (
                        <motion.li
                          key={skill}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-center gap-3 text-zinc-300 group/item"
                        >
                          <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                          <span className="group-hover/item:text-white transition-colors">{skill}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ESPACEUR */}
      <div className="h-32 md:h-48" />

      {/* Certifications */}
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
              Formations & Certifications
            </motion.h2>
            <p className="text-xl text-zinc-400">
              Apprentissage continu et validation professionnelle
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {certifications.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="group"
              >
                <div className="relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden">
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${cert.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    {/* Icon badge */}
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${cert.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gradient transition-all duration-300">
                      {cert.title}
                    </h3>
                    <p className="text-purple-400 text-base mb-2 font-medium">{cert.institution}</p>
                    <p className="text-zinc-400 text-sm mb-3">{cert.field}</p>
                    <div className="flex items-center gap-2 text-zinc-500 text-xs">
                      <Award className="w-4 h-4" />
                      <span>{cert.year}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ESPACEUR */}
      <div className="h-32 md:h-48" />

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="container-custom px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h3
              initial={{ opacity: 0, rotateY: -180 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-3xl md:text-4xl font-black text-white mb-16"
              style={{ transformStyle: "preserve-3d" }}
            >
              En chiffres
            </motion.h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: TrendingUp, value: "7+", label: "Modèles en prod" },
                { icon: Award, value: "90%", label: "Précision moyenne" },
                { icon: GraduationCap, value: "50+", label: "Étudiants formés" },
                { icon: Brain, value: "3", label: "Continents" }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
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
            <motion.p
              initial={{ opacity: 0, rotateY: -180 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-3xl md:text-4xl text-zinc-400 mb-12"
              style={{ transformStyle: "preserve-3d" }}
            >
              Besoin de ces compétences pour{" "}
              <span className="text-white font-bold">votre projet</span> ?
            </motion.p>

            <div className="h-12" />

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
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              <span className="relative z-10">Discutons-en</span>
              <TrendingUp className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
            </motion.a>

            <div className="h-20" />

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
              </div>
              <div className="text-left">
                <p className="text-base font-bold text-white">
                  Disponible pour nouveaux projets
                </p>
                <p className="text-sm text-green-300">
                  Freelance • Consulting • Long terme
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