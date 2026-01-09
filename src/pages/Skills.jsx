// src/pages/Skills.jsx
import React from "react";
import { motion } from "framer-motion";
import { Section, Container, SectionTitle } from "../components/UI";

const Skills = () => {
  const skillCategories = [
    {
      title: "Machine Learning & AI",
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
      gradient: "from-indigo-600 to-indigo-900",
    },
    {
      title: "Data Science",
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
      gradient: "from-violet-600 to-violet-900",
    },
    {
      title: "Software Engineering",
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
      gradient: "from-pink-600 to-pink-900",
    },
  ];

  return (
    <div className="space-y-0">
      {/* Hero */}
      <Section className="pt-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-block mb-6 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-sm font-medium text-indigo-400">
              Compétences
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-white">
              Expertise Technique
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Une combinaison puissante de Machine Learning, Data Science et Software Engineering pour créer des solutions robustes et scalables.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* Skills Grid */}
      <Section>
        <Container>
          <div className="grid md:grid-cols-3 gap-8">
            {skillCategories.map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-white/5 border border-white/10 rounded-lg hover:border-white/20 transition-all"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${category.gradient} rounded-lg mb-6`}></div>
                <h3 className="text-2xl font-semibold text-white mb-6">{category.title}</h3>
                <ul className="space-y-3">
                  {category.skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-3 text-slate-300">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full flex-shrink-0"></div>
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Certifications */}
      <Section className="bg-gradient-to-b from-black to-indigo-950/20">
        <SectionTitle
          tag="Certifications"
          title="Formations & Certifications"
          description="Apprentissage continu et validation professionnelle"
        />

        <Container>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Master's Degree",
                institution: "University of Benin",
                field: "Physics & AI",
                year: "2023",
              },
              {
                title: "Machine Learning Specialization",
                institution: "DeepLearning.AI",
                field: "TensorFlow & Deep Learning",
                year: "2022",
              },
              {
                title: "Data Science Professional",
                institution: "Coursera",
                field: "Advanced Analytics",
                year: "2021",
              },
              {
                title: "Cloud Architecture",
                institution: "AWS",
                field: "Solutions Architect Associate",
                year: "2023",
              },
            ].map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-white/5 border border-white/10 rounded-lg hover:border-indigo-400/50 transition-all"
              >
                <h3 className="text-lg font-semibold text-white mb-2">{cert.title}</h3>
                <p className="text-indigo-400 text-sm mb-2">{cert.institution}</p>
                <p className="text-slate-400 text-sm">{cert.field}</p>
                <p className="text-slate-500 text-xs mt-3">{cert.year}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default Skills;
