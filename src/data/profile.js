// Profile content shared by Home and About.
// Localised fields are { en, fr } objects, resolved with `tx()` from useLanguage().

export const STATS = [
  {
    value: 3,
    label: { en: "Systems in production", fr: "Systèmes en prod" },
    note: { en: "Deployed & publicly available", fr: "Déployés & accessibles" },
  },
  {
    value: 8,
    label: { en: "Projects", fr: "Projets" },
    note: { en: "7 shipped, 1 in progress", fr: "Dont 7 livrés, 1 en cours" },
  },
  {
    value: 3,
    label: { en: "Countries reached", fr: "Pays touchés" },
    note: { en: "Benin · Nigeria · France", fr: "Bénin · Nigeria · France" },
  },
  {
    value: 6,
    suffix: "+",
    label: { en: "Learners trained", fr: "Élèves formés" },
    note: { en: "MLAcademy cohort #1", fr: "MLAcademy Cohorte #1" },
  },
];

export const VALUES = [
  {
    tag: "01",
    title: { en: "Concrete delivery", fr: "Livraison concrète" },
    desc: {
      en: "No endless meetings. A need, a deadline, a system that runs. I ship testable projects, not slides.",
      fr: "Pas de réunions infinies. Un besoin, un délai, un système qui tourne. Je livre des projets testables, pas des slides.",
    },
    proof: { en: "8 projects · public code on GitHub", fr: "8 projets · code public sur GitHub" },
  },
  {
    tag: "02",
    title: { en: "Production-first", fr: "Production-first" },
    desc: {
      en: "Every line of code is designed for the cloud, monitoring and scaling from day one, not bolted on afterwards.",
      fr: "Chaque ligne de code est pensée pour le cloud, le monitoring et le scaling dès le départ, pas ajoutée après coup.",
    },
    proof: { en: "Docker · MLflow · CI/CD · FastAPI", fr: "Docker · MLflow · CI/CD · FastAPI" },
  },
  {
    tag: "03",
    title: { en: "One point of contact", fr: "Interlocuteur unique" },
    desc: {
      en: "Data, ML, deployment, AI agents: I handle the whole chain. You talk to one person and get a complete system.",
      fr: "Data, ML, déploiement, agents IA : je gère l'ensemble de la chaîne. Vous parlez à une seule personne, vous recevez un système complet.",
    },
    proof: { en: "From notebook to production endpoint", fr: "Du notebook à l'endpoint en production" },
  },
];

export const EXPERIENCES = [
  {
    role: { en: "Statistician & AI Engineer", fr: "Statisticien & AI Engineer" },
    type: { en: "Fixed-term", fr: "CDD" },
    company: "Becotrac (Re) Assurances",
    location: { en: "Remote · Benin", fr: "Remote · Bénin" },
    period: { en: "Since 11 Nov 2026", fr: "Depuis le 11 nov. 2026" },
    current: true,
    tasks: [
      {
        tag: { en: "Statistics", fr: "Statistique" },
        desc: {
          en: "Statistical analysis and modelling for insurance and reinsurance",
          fr: "Analyses statistiques et modélisation au service de l'assurance et de la réassurance",
        },
      },
      {
        tag: { en: "AI", fr: "IA" },
        desc: {
          en: "Design and integration of AI solutions for business teams",
          fr: "Conception et intégration de solutions d'intelligence artificielle pour les équipes métier",
        },
      },
    ],
  },
  {
    role: { en: "Facilitator, technical mentor", fr: "Facilitateur, Mentor technique" },
    type: { en: "Volunteer", fr: "Bénévolat" },
    company: "Impact Hub Cotonou",
    location: { en: "Cotonou · Benin", fr: "Cotonou · Bénin" },
    period: { en: "28 – 30 Aug 2026", fr: "28 – 30 août 2026" },
    tasks: [
      {
        tag: "Communalthon",
        desc: {
          en: "Mentored 30+ young graduates and developers building digital solutions for the green economy during the Communalthon hackathon.",
          fr: "Accompagnement de plus de 30 jeunes diplômés et développeurs dans la création de solutions numériques innovantes liées à l'économie verte, lors du hackathon Communalthon.",
        },
      },
    ],
  },
  {
    role: { en: "AI & Data Engineer", fr: "AI & Data Engineer" },
    type: { en: "Volunteer", fr: "Bénévolat" },
    company: "Datum Africa",
    location: { en: "Remote", fr: "À distance" },
    period: { en: "Sep 2025 – Feb 2026", fr: "Sept 2025 – Fév 2026" },
    tasks: [
      {
        tag: { en: "Architecture", fr: "Architecture" },
        desc: {
          en: "Database models (UML/PostgreSQL) for scalable systems",
          fr: "Modèles de bases de données (UML/PostgreSQL) pour systèmes scalables",
        },
      },
      {
        tag: { en: "Pipelines", fr: "Pipelines" },
        desc: {
          en: "Collection and processing of African-language corpora (Igbo, Hausa) with PySpark",
          fr: "Collecte et traitement de corpus africains (Igbo, Hausa) via PySpark",
        },
      },
      {
        tag: { en: "Collaboration", fr: "Collaboration" },
        desc: { en: "Team workflows and versioning on GitHub", fr: "Workflows d'équipe et versioning via GitHub" },
      },
    ],
  },
  {
    role: { en: "Data Developer", fr: "Data Developer" },
    type: { en: "Volunteer", fr: "Bénévolat" },
    company: { en: "CNES — French Space Agency", fr: "CNES — Centre National d'Études Spatiales" },
    location: { en: "Remote · France", fr: "À distance · France" },
    period: { en: "Jul – Oct 2025", fr: "Juil – Oct 2025" },
    tasks: [
      {
        tag: { en: "Data quality", fr: "Qualité data" },
        desc: {
          en: "Quality-control pipelines for satellite datasets (> 10 GB)",
          fr: "Pipelines de contrôle qualité de datasets satellites (> 10 Go)",
        },
      },
      {
        tag: { en: "Modelling", fr: "Modélisation" },
        desc: {
          en: "Random Forest for crop prediction from space data",
          fr: "Random Forest pour la prédiction agricole sur données spatiales",
        },
      },
      {
        tag: "MLOps",
        desc: {
          en: "Tracking and production with DVC, MLflow and OpenTelemetry",
          fr: "Suivi et production avec DVC, MLflow et OpenTelemetry",
        },
      },
    ],
  },
  {
    role: { en: "Data Scientist", fr: "Data Scientist" },
    type: { en: "Short mission", fr: "Mission courte" },
    company: "Sirius Club Association",
    location: { en: "On site · Benin", fr: "Présentiel · Bénin" },
    period: { en: "04 – 06 Oct 2025", fr: "04 – 06 Oct 2025" },
    tasks: [
      {
        tag: "Data",
        desc: {
          en: "Collection of air-quality and weather data (NASA)",
          fr: "Collecte de données qualité de l'air et météo (NASA)",
        },
      },
      {
        tag: { en: "ML pipeline", fr: "Pipeline ML" },
        desc: { en: "Ingestion and inference pipeline with FastAPI", fr: "Pipeline d'ingestion et d'inférence via FastAPI" },
      },
      {
        tag: { en: "Modelling", fr: "Modélisation" },
        desc: {
          en: "XGBoost vs Random Forest benchmark with overfitting control",
          fr: "Benchmark XGBoost vs Random Forest avec contrôle du surapprentissage",
        },
      },
    ],
  },
  {
    role: { en: "Speaker & participant", fr: "Intervenant & participant" },
    type: { en: "Speaker", fr: "Intervenant" },
    company: { en: "DSA 2025 Summer School — University of Ibadan", fr: "DSA 2025 Summer School — Université d'Ibadan" },
    location: "Nigeria",
    period: { en: "02 – 05 May 2025", fr: "02 – 05 Mai 2025" },
    tasks: [
      {
        tag: "Discovery",
        desc: {
          en: "Data Science Africa 2025 summer school: masterclasses on machine learning, federated learning, and how neural networks and LLMs work.",
          fr: "École d'été Data Science Africa 2025 : masterclasses sur le machine learning, le federated learning et le fonctionnement des réseaux de neurones et des LLMs.",
        },
      },
      {
        tag: { en: "Prediction", fr: "Prédiction" },
        desc: {
          en: "Rice-yield prediction project (unsupervised learning & time series)",
          fr: "Projet de prédiction du rendement du riz (unsupervised learning & séries temporelles)",
        },
      },
      {
        tag: { en: "Teaching", fr: "Formation" },
        desc: { en: "Trained 20+ international students in ML and Python", fr: "20+ étudiants internationaux formés en ML et Python" },
      },
    ],
  },
];

export const EDUCATION = [
  {
    year: { en: "Ongoing", fr: "En cours" },
    title: { en: "Master 1, Applied Statistics", fr: "Master 1 Statistiques Appliquées" },
    org: "",
    field: { en: "Applied statistics", fr: "Statistique appliquée" },
  },
  { year: "2026", title: "AI Researcher", org: "AIMS South Africa & Google DeepMind", field: "Research Student" },
  { year: "2026", title: "Build RAG Agentic", org: "NVIDIA", field: "Agentic RAG · Vector Search" },
  { year: "2026", title: "Machine Learning Engineer", org: "Isheero / DataCamp", field: "ML Engineering" },
  {
    year: "2025",
    title: { en: "BSc in Physics", fr: "Licence en Physique" },
    org: { en: "University of Abomey-Calavi", fr: "Université d'Abomey-Calavi" },
    field: { en: "Fundamental physics", fr: "Physique Fondamentale" },
  },
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
