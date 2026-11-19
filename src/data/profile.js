// Profile content shared by Home, About and the OS desktop window.

export const STATS = [
  { value: 3, label: "Systèmes en prod", note: "Déployés & accessibles" },
  { value: 8, label: "Projets", note: "Dont 7 livrés, 1 en cours" },
  { value: 3, label: "Pays touchés", note: "Bénin · Nigeria · France" },
  { value: 6, suffix: "+", label: "Élèves formés", note: "MLAcademy Cohorte #1" },
];

export const VALUES = [
  {
    tag: "01",
    title: "Livraison concrète",
    desc: "Pas de réunions infinies. Un besoin, un délai, un système qui tourne. Je livre des projets testables, pas des slides.",
    proof: "8 projets · code public sur GitHub",
  },
  {
    tag: "02",
    title: "Production-first",
    desc: "Chaque ligne de code est pensée pour le cloud, le monitoring et le scaling dès le départ, pas ajoutée après coup.",
    proof: "Docker · MLflow · CI/CD · FastAPI",
  },
  {
    tag: "03",
    title: "Interlocuteur unique",
    desc: "Data, ML, déploiement, agents IA : je gère l'ensemble de la chaîne. Vous parlez à une seule personne, vous recevez un système complet.",
    proof: "Du notebook à l'endpoint en production",
  },
];

export const EXPERIENCES = [
  {
    role: "Statisticien & AI Engineer",
    type: "CDD",
    company: "Becotrac (Re) Assurances",
    location: "Hybride · Bénin",
    period: "Depuis le 11 nov. 2026",
    current: true,
    tasks: [
      { tag: "Statistique", desc: "Analyses statistiques et modélisation au service de l'assurance et de la réassurance" },
      { tag: "IA", desc: "Conception et intégration de solutions d'intelligence artificielle pour les équipes métier" },
    ],
  },
  {
    role: "Facilitateur, Mentor technique",
    type: "Bénévolat",
    company: "Impact Hub Cotonou",
    location: "Cotonou · Bénin",
    period: "28 – 30 août 2026",
    tasks: [
      { tag: "Communalthon", desc: "Accompagnement de plus de 30 jeunes diplômés et développeurs dans la création de solutions numériques innovantes liées à l'économie verte, lors du hackathon Communalthon." },
    ],
  },
  {
    role: "AI & Data Engineer",
    type: "Bénévolat",
    company: "Datum Africa",
    location: "À distance",
    period: "Sept 2025 – Fév 2026",
    tasks: [
      { tag: "Architecture", desc: "Modèles de bases de données (UML/PostgreSQL) pour systèmes scalables" },
      { tag: "Pipelines", desc: "Collecte et traitement de corpus africains (Igbo, Hausa) via PySpark" },
      { tag: "Collaboration", desc: "Workflows d'équipe et versioning via GitHub" },
    ],
  },
  {
    role: "Data Developer",
    type: "Bénévolat",
    company: "CNES — Centre National d'Études Spatiales",
    location: "À distance · France",
    period: "Juil – Oct 2025",
    tasks: [
      { tag: "Qualité data", desc: "Pipelines de contrôle qualité de datasets satellites (> 10 Go)" },
      { tag: "Modélisation", desc: "Random Forest pour la prédiction agricole sur données spatiales" },
      { tag: "MLOps", desc: "Suivi et production avec DVC, MLflow et OpenTelemetry" },
    ],
  },
  {
    role: "Data Scientist",
    type: "Mission courte",
    company: "Sirius Club Association",
    location: "Présentiel · Bénin",
    period: "04 – 06 Oct 2025",
    tasks: [
      { tag: "Data", desc: "Collecte de données qualité de l'air et météo (NASA)" },
      { tag: "Pipeline ML", desc: "Pipeline d'ingestion et d'inférence via FastAPI" },
      { tag: "Modélisation", desc: "Benchmark XGBoost vs Random Forest avec contrôle du surapprentissage" },
    ],
  },
  {
    role: "Intervenant & participant",
    type: "Intervenant",
    company: "DSA 2025 Summer School — Université d'Ibadan",
    location: "Nigeria",
    period: "02 – 05 Mai 2025",
    tasks: [
      { tag: "Discovery", desc: "École d'été Data Science Africa 2025 : masterclasses sur le machine learning, le federated learning et le fonctionnement des réseaux de neurones et des LLMs." },
      { tag: "Prédiction", desc: "Projet de prédiction du rendement du riz (unsupervised learning & séries temporelles)" },
      { tag: "Formation", desc: "20+ étudiants internationaux formés en ML et Python" },
    ],
  },
];

export const EDUCATION = [
  { year: "En cours", title: "Master 1 Statistiques Appliquées au Vivant", org: "ICPMA-UAC", field: "Statistique appliquée" },
  { year: "2026", title: "Build RAG Agentic", org: "NVIDIA", field: "Agentic RAG · Vector Search" },
  { year: "2026", title: "Machine Learning Engineer", org: "Isheero / DataCamp", field: "ML Engineering" },
  { year: "2025", title: "Licence en Physique", org: "Université d'Abomey-Calavi", field: "Physique Fondamentale" },
  { year: "2024", title: "Data Science", org: "IBM / Africa TechUp Tour", field: "Data Science" },
  { year: "2024", title: "ML Specialization", org: "Coursera", field: "Supervised & Unsupervised ML" },
  { year: "2024", title: "DL Specialization", org: "DeepLearning.AI", field: "CNN · RNN · NLP" },
];

export const SOCIALS = [
  { label: "Email", value: "donaerickoulodji@gmail.com", href: "mailto:donaerickoulodji@gmail.com" },
  { label: "WhatsApp", value: "+229 01 51 34 42 89", href: "https://wa.me/2290151344289" },
  { label: "LinkedIn", value: "in/dona-erick", href: "https://linkedin.com/in/dona-erick" },
  { label: "GitHub", value: "dona-eric", href: "https://github.com/dona-eric" },
  { label: "Medium", value: "@koulodjiric", href: "https://medium.com/@koulodjiric" },
];
