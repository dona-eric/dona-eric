// ─────────────────────────────────────────────────────────────────
// MLAcademy — Configuration & Données
// ─────────────────────────────────────────────────────────────────

export const ACADEMY = {
  name: "MLAcademy",
  tagline: "Construisez des solutions d'IA.<br/>Et faites-en votre carrière.",
  subtitle: "De Zéro à Data Scientist en 90 jours. Grâce à des projets réels.",
  badges: ["100% Live", "100% Projet", "100% Francophone"],
  cohort: {
    name: "Cohorte #1",
    seats: 25,
    duration: "90 jours",
    status: "pre-registration", // pre-registration | open | closed
  },
  stats: [
    { value: "90", label: "jours" },
    { value: "40", label: "TP" },
    { value: "+10", label: "projets réels" },
    { value: "1", label: "Certificat Reconnue" },
  ]
};

export const MISSION = {
  title: "L'Histoire Derrière MLAcademy",
  problem: "Pendant longtemps, j'ai vu des étudiants et des professionnels africains suivre des centaines d'heures de tutoriels sur YouTube ou Coursera. Ils maîtrisaient la théorie, connaissaient les algorithmes par cœur, mais face à un problème d'entreprise réel, tout s'effondrait. Pourquoi ? Parce qu'on leur a appris à entraîner des modèles dans des Jupyter Notebooks isolés, avec des jeux de données parfaits, mais jamais à les déployer en production.",
  vision: "J'ai créé MLAcademy pour combler ce vide. Mon objectif est de bâtir une nouvelle élite africaine en IA. En 90 jours, vous sortirez avec une bonne capacité de construire, déployer et présenter de vrais projets Data/ML/IA.Vous saurez comment construire un système de bout en bout, de l'idée jusqu'au déploiement sur un serveur cloud, prêt à encaisser des milliers de requêtes. Prêt à impacter le monde réel.",
};

export const TRACKS = [
  {
    id: 0,
    title: "Orientation Track",
    icon: "🧭",
    duration: "1 semaine",
    color: "#94a3b8",
    free: true,
    topics: [
      "Comment apprendre efficacement",
      "Installer son environnement de travail",
      "Les métiers de la Data (Analyst, Scientist, Engineer, ML/AI/MLOps)",
      "Choisir sa spécialisation",
    ],
    stack: ["Notion", "Discord", "GitHub"],
    learningOutcomes: [
      "Comprendre l'écosystème Data & IA",
      "Configurer son environnement de dev professionnel",
      "Choisir la bonne spécialisation selon son profil"
    ],
    projects: [],
    certification: null,
  },
  {
    id: 1,
    title: "Foundation Track",
    icon: "🏗️",
    duration: "3 semaines",
    color: "#3b82f6",
    free: false,
    topics: ["Python", "SQL", "Git", "Linux", "Statistiques", "Pandas", "NumPy", "Visualisation"],
    stack: ["Python", "Pandas", "NumPy", "Git", "SQL", "Matplotlib"],
    learningOutcomes: [
      "Maîtriser la programmation Python pour la Data",
      "Manipuler et nettoyer de grands jeux de données",
      "Versionner son code avec Git comme un pro",
      "Créer des visualisations de données impactantes"
    ],
    projects: [
      "Analyse complète d'un dataset e-commerce",
      "Script d'automatisation d'extraction de données"
    ],
    certification: "Python & Data Foundations",
  },
  {
    id: 2,
    title: "Data Science Track",
    icon: "🧪",
    duration: "3 semaines",
    color: "#8b5cf6",
    free: false,
    topics: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision", "Feature Engineering"],
    stack: ["Scikit-Learn", "PyTorch", "XGBoost", "Jupyter", "Hugging Face"],
    learningOutcomes: [
      "Entraîner et évaluer des modèles prédictifs",
      "Construire un réseau de neurones avec PyTorch",
      "Traiter des données textuelles (NLP)",
      "Optimiser les hyperparamètres d'un modèle"
    ],
    projects: [
      "Modèle de prédiction",
      "Vision par Ordinateur avec Pytorch"
    ],
    certification: "Machine Learning Practitioner",
  },
  {
    id: 3,
    title: "AI Engineering Track",
    icon: "🧠",
    duration: "3 semaines",
    color: "#ec4899",
    free: false,
    topics: ["LLM", "Prompt Engineering", "Fine-Tuning (LoRA)", "LangChain", "Agents IA", "RAG"],
    stack: ["LangChain", "LlamaIndex", "OpenAI", "Ollama", "ChromaDB", "FastAPI"],
    learningOutcomes: [
      "Développer des applications basées sur les LLMs",
      "Construire un système RAG robuste",
      "Créer des Agents IA autonomes",
      "Exposer des modèles via des APIs REST (FastAPI)"
    ],
    projects: [
      "Assistant conversationnel métier (RAG)",
      "API d'extraction d'informations par IA"
    ],
    certification: "Generative AI Engineer",
  },
  {
    id: 4,
    title: "Production & MLOps Track",
    icon: "🚀",
    duration: "2 semaines",
    color: "#f59e0b",
    free: false,
    topics: ["Docker", "Kubernetes", "CI/CD", "MLflow", "DVC", "Monitoring"],
    stack: ["Docker", "Kubernetes", "MLflow", "DVC", "GitHub Actions", "AWS"],
    learningOutcomes: [
      "Containeriser une application avec Docker",
      "Orchestrer le déploiement sur Kubernetes",
      "Créer un pipeline CI/CD automatisé",
      "Tracker et versionner les modèles avec MLflow"
    ],
    projects: [
      "Déploiement d'une API ML sur un cluster K8s",
      "Pipeline CI/CD complet de l'entraînement au déploiement"
    ],
    certification: "MLOps Engineer",
  },
  {
    id: 5,
    title: "Career Track",
    icon: "💼",
    duration: "1 semaine",
    color: "#10b981",
    free: false,
    topics: ["Comment répondre aux recruteurs", "Simulation entretien", "Freelance", "Construire LinkedIn", "GitHub", "CV", "Portfolio"],
    stack: ["LinkedIn", "GitHub", "Notion", "Figma"],
    learningOutcomes: [
      "Construire un Portfolio qui prouve vos compétences",
      "Optimiser son profil LinkedIn et GitHub",
      "Réussir les entretiens techniques (simulations)",
      "Savoir se vendre en tant que Freelance ou Employé"
    ],
    projects: [
      "Portfolio public déployé en ligne",
      "CV Data Scientist/MLOps optimisé"
    ],
    certification: "MLAcademy Graduate",
  },
];

export const ADVANTAGES = [
  { icon: "⚡", title: "100% Pratique", desc: "Chaque concept est appliqué immédiatement sur un projet réel." },
  { icon: "📹", title: "Meet en direct", desc: "Sessions live hebdomadaires avec Q&A en temps réel." },
  { icon: "▶️", title: "Replay YouTube", desc: "Toutes les sessions enregistrées, accessibles à vie." },
  { icon: "💬", title: "Communauté Discord", desc: "Entraide permanente avec les autres apprenants et les mentors." },
  { icon: "🛠️", title: "Support technique", desc: "Aide personnalisée sur vos blocages de code et de projet." },
  { icon: "📂", title: "+10 Projets concrets", desc: "Du dashboard BI au déploiement Kubernetes, vous construisez tout." },
  { icon: "🌐", title: "Portfolio déployé", desc: "Repartez avec un portfolio professionnel en ligne." },
  { icon: "🤝", title: "Réseau Alumni", desc: "Rejoignez une communauté de professionnels de la Data en Afrique." },
];

export const DELIVERABLES = [
  { icon: "📊", title: "Dashboard BI", desc: "Visualisation de données interactive" },
  { icon: "🤖", title: "Modèle ML", desc: "Classification, régression, clustering" },
  { icon: "🧠", title: "Réseau de neurones", desc: "Deep Learning avec PyTorch" },
  { icon: "⚡", title: "API FastAPI", desc: "Endpoint de prédiction en production" },
  { icon: "🐳", title: "Application Docker", desc: "Containerisation complète" },
  { icon: "☸️", title: "Déploiement K8s", desc: "Orchestration Kubernetes" },
  { icon: "🔎", title: "Système RAG", desc: "Retrieval-Augmented Generation" },
  { icon: "☁️", title: "Cloud Deploy", desc: "Déploiement AWS / GCP / Azure" },
];

export const TIMELINE_STEPS = [
  { icon: "📝", title: "Pré-inscriptions", desc: "Réservez votre place dès maintenant", status: "active" },
  { icon: "🎯", title: "Sélection", desc: "Entretien de motivation (15 min)", status: "upcoming" },
  { icon: "🚀", title: "Ouverture officielle", desc: "Début de la formation", status: "upcoming" },
  { icon: "💻", title: "90 jours intensifs", desc: "7 modules, 8 projets, support continu", status: "upcoming" },
  { icon: "🏆", title: "Projet Final", desc: "Présentation devant un jury", status: "upcoming" },
  { icon: "📜", title: "Certification", desc: "MLAcademy Data Scientist", status: "upcoming" },
  { icon: "🌍", title: "Communauté Alumni", desc: "Accès à vie au réseau MLAcademy", status: "upcoming" },
];

export const TARGET_AUDIENCE = [
  { icon: "🎓", label: "Étudiants en informatique ou sciences" },
  { icon: "💻", label: "Développeurs souhaitant se spécialiser en IA" },
  { icon: "📊", label: "Data Analysts voulant passer au Machine Learning" },
  { icon: "🔧", label: "Ingénieurs en reconversion vers la Data Science" },
  { icon: "🔄", label: "Professionnels en reconversion technologique" },
  { icon: "📚", label: "Autodidactes motivés avec des bases en programmation" },
];

export const SKILLS_OUTCOME = [
  "Analyser un dataset et en extraire des insights actionnables",
  "Entraîner et évaluer un modèle de Machine Learning",
  "Construire une API de prédiction avec FastAPI",
  "Versionner son code et ses données avec Git et DVC",
  "Containeriser une application avec Docker",
  "Déployer sur Kubernetes en production",
  "Construire un système RAG avec LangChain",
  "Créer un portfolio professionnel qui décroche des entretiens",
];

export const VALUES = [
  { icon: "⚡", title: "La pratique avant tout", desc: "On code dès le premier jour. Pas de théorie sans application." },
  { icon: "🤝", title: "Le partage", desc: "Apprendre ensemble, grandir ensemble. Aucune question n'est stupide." },
  { icon: "🔓", title: "L'Open Source", desc: "Tous les projets sont open-source. Contribuer, c'est apprendre." },
  { icon: "🧭", title: "Le mentorat", desc: "Chaque étudiant bénéficie d'un accompagnement personnalisé." },
  { icon: "🏗️", title: "Les projets réels", desc: "Pas de datasets jouets. Des problèmes business concrets." },
];

export const FAQ = [
  {
    q: "Combien de temps dure la formation ?",
    a: "La formation complète dure 90 jours (environ 3 mois). Chaque semaine comprend des sessions live, des TP et un projet à rendre.",
  },
  {
    q: "Faut-il savoir programmer pour s'inscrire ?",
    a: "Des bases en programmation sont recommandées, mais le Niveau 0 (Orientation) est conçu pour vous mettre à niveau. Si vous savez écrire une boucle for, vous êtes prêt.",
  },
  {
    q: "Les sessions live seront-elles enregistrées ?",
    a: "Oui, 100% des sessions seront enregistrées et disponibles en replay sur YouTube. Vous pouvez suivre à votre rythme.",
  },
  {
    q: "Combien coûte la formation ?",
    a: "Le prix sera communiqué à l'ouverture officielle des inscriptions. Le Niveau 0 (Orientation) est entièrement gratuit.",
  },
  {
    q: "Y aura-t-il un certificat ?",
    a: "Oui. Un certificat est délivré à la fin de chaque module, et une certification finale \"MLAcademy Data Scientist\" est remise après validation du projet final.",
  },
  {
    q: "Quel est le format des cours ?",
    a: "Sessions live hebdomadaires (Meet/Zoom), TP guidés, projets individuels avec review de code, support continu sur Discord.",
  },
  {
    q: "Pourquoi seulement 25 places ?",
    a: "Pour garantir un accompagnement de qualité. Chaque projet est relu, chaque question reçoit une réponse personnalisée. La qualité prime sur la quantité.",
  },
];

export const INSTRUCTOR = {
  name: "Eric KOULODJI",
  title: "Data Scientist, ML Engineer et Student AI Researcher at Google DeepMind",
  bio: "Physicien de formation, AI Engineer chez Datum Africa. Contributeur au Centre National d'Études Spatiales (CNES), mentor à Ubuntu Foundation et Founder de DTech-Africa. Spécialisé dans le déploiement de systèmes IA en production.",
  avatar: "/eric-dona.jpg",
  stats: [
    { value: "5+", label: "Systèmes IA en prod" },
    { value: "6+", label: "Projets livrés" },
    { value: "10+", label: "Étudiants formés" },
  ],
  socials: {
    linkedin: "https://linkedin.com/in/dona-erick",
    github: "https://github.com/dona-eric",
    youtube: "https://www.youtube.com/@mlacademy",
  },
};

export const COMMUNITY = [
  { icon: "💬", name: "Discord", desc: "Entraide et discussions en temps réel", url: "#" },
  { icon: "🐙", name: "GitHub", desc: "Projets open-source et code reviews", url: "https://github.com/dona-eric" },
  { icon: "📺", name: "YouTube", desc: "Cours, tutoriels et replays", url: "https://www.youtube.com/@mlacademy" },
  { icon: "💼", name: "LinkedIn", desc: "Réseau professionnel et opportunités", url: "https://linkedin.com/in/dona-erick" },
];

export const FORM_OPTIONS = {
  countries: [
    "Bénin", "Togo", "Côte d'Ivoire", "Sénégal", "Cameroun", "Mali",
    "Burkina Faso", "Niger", "Guinée", "Congo", "Gabon", "Madagascar",
    "France", "Belgique", "Canada", "Suisse", "Autre",
  ],
  levels: [
    "Débutant complet (aucune expérience en programmation)",
    "Débutant (quelques notions de Python/SQL)",
    "Intermédiaire (à l'aise avec Python et les bases du ML)",
    "Avancé (expérience professionnelle en Data Science)",
  ],
  objectives: [
    "Devenir Data Scientist",
    "Devenir AI / ML Engineer",
    "Devenir MLOps Engineer",
    "Monter en compétences (reconversion)",
    "Renforcer mes compétences actuelles",
    "Créer ma propre startup IA",
    "Autre",
  ],
};
