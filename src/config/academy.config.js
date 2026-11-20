// ─────────────────────────────────────────────────────────────────
// MLAcademy — Configuration & content
// Every user-facing string is an { en, fr } pair; `academyContent(lang)`
// returns the whole tree resolved for one language.
// Form option `value`s stay in French so stored registrations stay consistent.
// ─────────────────────────────────────────────────────────────────

const L = (en, fr) => ({ en, fr });

const CONTENT = {
  ACADEMY: {
    name: "MLAcademy",
    tagline: L("Build AI solutions.<br/>And make it your career.", "Construisez des solutions d'IA.<br/>Et faites-en votre carrière."),
    subtitle: L("From zero to Data Scientist in 90 days, through real projects.", "De Zéro à Data Scientist en 90 jours. Grâce à des projets réels."),
    badges: [L("100% Live", "100% Live"), L("100% Projects", "100% Projet"), L("100% in French", "100% Francophone")],
    cohort: {
      name: L("Cohort #1", "Cohorte #1"),
      seats: 25,
      duration: L("90 days", "90 jours"),
      status: "pre-registration", // pre-registration | open | closed
    },
    stats: [
      { value: "90", label: L("days", "jours") },
      { value: "40", label: L("labs", "TP") },
      { value: "+10", label: L("real projects", "projets réels") },
      { value: "1", label: L("Completion certificate", "Certificat de fin de parcours") },
    ],
  },

  MISSION: {
    title: L("The Story Behind MLAcademy", "L'Histoire Derrière MLAcademy"),
    problem: L(
      "For a long time I watched African students and professionals follow hundreds of hours of tutorials on YouTube or Coursera. They knew the theory and the algorithms by heart, but faced with a real business problem, everything fell apart. Why? Because they had been taught to train models in isolated Jupyter notebooks with perfect datasets, but never to deploy them to production.",
      "Pendant longtemps, j'ai vu des étudiants et des professionnels africains suivre des centaines d'heures de tutoriels sur YouTube ou Coursera. Ils maîtrisaient la théorie, connaissaient les algorithmes par cœur, mais face à un problème d'entreprise réel, tout s'effondrait. Pourquoi ? Parce qu'on leur a appris à entraîner des modèles dans des Jupyter Notebooks isolés, avec des jeux de données parfaits, mais jamais à les déployer en production."
    ),
    vision: L(
      "I created MLAcademy to fill that gap. My goal is to build a new generation of African AI talent. In 90 days you will leave able to build, deploy and present real Data/ML/AI projects. You will know how to build an end-to-end system, from the idea to deployment on a cloud server, ready to handle thousands of requests. Ready to make a real-world impact.",
      "J'ai créé MLAcademy pour combler ce vide. Mon objectif est de bâtir une nouvelle élite africaine en IA. En 90 jours, vous sortirez avec une bonne capacité de construire, déployer et présenter de vrais projets Data/ML/IA. Vous saurez comment construire un système de bout en bout, de l'idée jusqu'au déploiement sur un serveur cloud, prêt à encaisser des milliers de requêtes. Prêt à impacter le monde réel."
    ),
  },

  TRACKS: [
    {
      id: 0,
      title: "Orientation Track",
      icon: "🧭",
      duration: L("1 week", "1 semaine"),
      color: "#94a3b8",
      free: true,
      topics: [
        L("How to learn effectively", "Comment apprendre efficacement"),
        L("Setting up your work environment", "Installer son environnement de travail"),
        L("Data careers (Analyst, Scientist, Engineer, ML/AI/MLOps)", "Les métiers de la Data (Analyst, Scientist, Engineer, ML/AI/MLOps)"),
        L("Choosing your specialisation", "Choisir sa spécialisation"),
      ],
      stack: ["Notion", "Discord", "GitHub"],
      learningOutcomes: [
        L("Understand the Data & AI ecosystem", "Comprendre l'écosystème Data & IA"),
        L("Set up a professional development environment", "Configurer son environnement de dev professionnel"),
        L("Pick the right specialisation for your profile", "Choisir la bonne spécialisation selon son profil"),
      ],
      projects: [],
      certification: null,
    },
    {
      id: 1,
      title: "Foundation Track",
      icon: "🏗️",
      duration: L("3 weeks", "3 semaines"),
      color: "#5ee6ff",
      free: false,
      topics: ["Python", "SQL", "Git", "Linux", L("Statistics", "Statistiques"), "Pandas", "NumPy", L("Visualisation", "Visualisation")],
      stack: ["Python", "Pandas", "NumPy", "Git", "SQL", "Matplotlib"],
      learningOutcomes: [
        L("Master Python programming for data", "Maîtriser la programmation Python pour la Data"),
        L("Manipulate and clean large datasets", "Manipuler et nettoyer de grands jeux de données"),
        L("Version your code with Git like a pro", "Versionner son code avec Git comme un pro"),
        L("Create impactful data visualisations", "Créer des visualisations de données impactantes"),
      ],
      projects: [
        L("Full analysis of an e-commerce dataset", "Analyse complète d'un dataset e-commerce"),
        L("Data-extraction automation script", "Script d'automatisation d'extraction de données"),
      ],
      certification: "Python & Data Foundations",
    },
    {
      id: 2,
      title: "Data Science Track",
      icon: "🧪",
      duration: L("3 weeks", "3 semaines"),
      color: "#8f7dff",
      free: false,
      topics: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision", "Feature Engineering"],
      stack: ["Scikit-Learn", "PyTorch", "XGBoost", "Jupyter", "Hugging Face"],
      learningOutcomes: [
        L("Train and evaluate predictive models", "Entraîner et évaluer des modèles prédictifs"),
        L("Build a neural network with PyTorch", "Construire un réseau de neurones avec PyTorch"),
        L("Process text data (NLP)", "Traiter des données textuelles (NLP)"),
        L("Tune a model's hyperparameters", "Optimiser les hyperparamètres d'un modèle"),
      ],
      projects: [L("Prediction model", "Modèle de prédiction"), L("Computer vision with PyTorch", "Vision par Ordinateur avec Pytorch")],
      certification: "Machine Learning Practitioner",
    },
    {
      id: 3,
      title: "AI Engineering Track",
      icon: "🧠",
      duration: L("3 weeks", "3 semaines"),
      color: "#ff7a45",
      free: false,
      topics: ["LLM", "Prompt Engineering", "Fine-Tuning (LoRA)", "LangChain", L("AI agents", "Agents IA"), "RAG"],
      stack: ["LangChain", "LlamaIndex", "OpenAI", "Ollama", "ChromaDB", "FastAPI"],
      learningOutcomes: [
        L("Build LLM-based applications", "Développer des applications basées sur les LLMs"),
        L("Build a robust RAG system", "Construire un système RAG robuste"),
        L("Create autonomous AI agents", "Créer des Agents IA autonomes"),
        L("Serve models through REST APIs (FastAPI)", "Exposer des modèles via des APIs REST (FastAPI)"),
      ],
      projects: [
        L("Business conversational assistant (RAG)", "Assistant conversationnel métier (RAG)"),
        L("AI information-extraction API", "API d'extraction d'informations par IA"),
      ],
      certification: "Generative AI Engineer",
    },
    {
      id: 4,
      title: "Production & MLOps Track",
      icon: "🚀",
      duration: L("2 weeks", "2 semaines"),
      color: "#ffc94a",
      free: false,
      topics: ["Docker", "Kubernetes", "CI/CD", "MLflow", "DVC", "Monitoring"],
      stack: ["Docker", "Kubernetes", "MLflow", "DVC", "GitHub Actions", "AWS"],
      learningOutcomes: [
        L("Containerise an application with Docker", "Containeriser une application avec Docker"),
        L("Orchestrate deployment on Kubernetes", "Orchestrer le déploiement sur Kubernetes"),
        L("Build an automated CI/CD pipeline", "Créer un pipeline CI/CD automatisé"),
        L("Track and version models with MLflow", "Tracker et versionner les modèles avec MLflow"),
      ],
      projects: [
        L("Deploying an ML API on a K8s cluster", "Déploiement d'une API ML sur un cluster K8s"),
        L("Full CI/CD pipeline from training to deployment", "Pipeline CI/CD complet de l'entraînement au déploiement"),
      ],
      certification: "MLOps Engineer",
    },
    {
      id: 5,
      title: "Career Track",
      icon: "💼",
      duration: L("1 week", "1 semaine"),
      color: "#d4ff3a",
      free: false,
      topics: [
        L("Answering recruiters", "Comment répondre aux recruteurs"),
        L("Mock interviews", "Simulation entretien"),
        "Freelance",
        L("Building your LinkedIn", "Construire LinkedIn"),
        "GitHub",
        "CV",
        "Portfolio",
      ],
      stack: ["LinkedIn", "GitHub", "Notion", "Figma"],
      learningOutcomes: [
        L("Build a portfolio that proves your skills", "Construire un Portfolio qui prouve vos compétences"),
        L("Optimise your LinkedIn and GitHub profiles", "Optimiser son profil LinkedIn et GitHub"),
        L("Pass technical interviews (mock sessions)", "Réussir les entretiens techniques (simulations)"),
        L("Sell yourself as a freelancer or employee", "Savoir se vendre en tant que Freelance ou Employé"),
      ],
      projects: [
        L("Public portfolio deployed online", "Portfolio public déployé en ligne"),
        L("Optimised Data Scientist/MLOps CV", "CV Data Scientist/MLOps optimisé"),
      ],
      certification: "MLAcademy Graduate",
    },
  ],

  ADVANTAGES: [
    { icon: "⚡", title: L("100% hands-on", "100% Pratique"), desc: L("Every concept is applied immediately on a real project.", "Chaque concept est appliqué immédiatement sur un projet réel.") },
    { icon: "📹", title: L("Live sessions", "Meet en direct"), desc: L("Weekly live sessions with real-time Q&A.", "Sessions live hebdomadaires avec Q&A en temps réel.") },
    { icon: "▶️", title: L("YouTube replays", "Replay YouTube"), desc: L("Every session recorded, available for life.", "Toutes les sessions enregistrées, accessibles à vie.") },
    { icon: "💬", title: L("Discord community", "Communauté Discord"), desc: L("Ongoing peer support with other learners and mentors.", "Entraide permanente avec les autres apprenants et les mentors.") },
    { icon: "🛠️", title: L("Technical support", "Support technique"), desc: L("Personal help when you are stuck on code or projects.", "Aide personnalisée sur vos blocages de code et de projet.") },
    { icon: "📂", title: L("10+ real projects", "+10 Projets concrets"), desc: L("From BI dashboards to Kubernetes deployment, you build it all.", "Du dashboard BI au déploiement Kubernetes, vous construisez tout.") },
    { icon: "🌐", title: L("Deployed portfolio", "Portfolio déployé"), desc: L("Leave with a professional portfolio online.", "Repartez avec un portfolio professionnel en ligne.") },
    { icon: "🤝", title: L("Alumni network", "Réseau Alumni"), desc: L("Join a community of data professionals across Africa.", "Rejoignez une communauté de professionnels de la Data en Afrique.") },
  ],

  DELIVERABLES: [
    { icon: "📊", title: L("BI dashboard", "Dashboard BI"), desc: L("Interactive data visualisation", "Visualisation de données interactive") },
    { icon: "🤖", title: L("ML model", "Modèle ML"), desc: L("Classification, regression, clustering", "Classification, régression, clustering") },
    { icon: "🧠", title: L("Neural network", "Réseau de neurones"), desc: L("Deep learning with PyTorch", "Deep Learning avec PyTorch") },
    { icon: "⚡", title: "API FastAPI", desc: L("Prediction endpoint in production", "Endpoint de prédiction en production") },
    { icon: "🐳", title: L("Docker application", "Application Docker"), desc: L("Full containerisation", "Containerisation complète") },
    { icon: "☸️", title: L("K8s deployment", "Déploiement K8s"), desc: L("Kubernetes orchestration", "Orchestration Kubernetes") },
    { icon: "🔎", title: L("RAG system", "Système RAG"), desc: "Retrieval-Augmented Generation" },
    { icon: "☁️", title: "Cloud Deploy", desc: L("Deployment on AWS / GCP / Azure", "Déploiement AWS / GCP / Azure") },
  ],

  TIMELINE_STEPS: [
    { icon: "📝", title: L("Pre-registration", "Pré-inscriptions"), desc: L("Book your seat now", "Réservez votre place dès maintenant"), status: "active" },
    { icon: "🎯", title: L("Selection", "Sélection"), desc: L("Motivation interview (15 min)", "Entretien de motivation (15 min)"), status: "upcoming" },
    { icon: "🚀", title: L("Official launch", "Ouverture officielle"), desc: L("Start of the programme", "Début de la formation"), status: "upcoming" },
    { icon: "💻", title: L("90 intensive days", "90 jours intensifs"), desc: L("7 modules, 8 projects, continuous support", "7 modules, 8 projets, support continu"), status: "upcoming" },
    { icon: "🏆", title: L("Final project", "Projet Final"), desc: L("Presentation before a jury", "Présentation devant un jury"), status: "upcoming" },
    { icon: "📜", title: "Certification", desc: "MLAcademy Data Scientist", status: "upcoming" },
    { icon: "🌍", title: L("Alumni community", "Communauté Alumni"), desc: L("Lifetime access to the MLAcademy network", "Accès à vie au réseau MLAcademy"), status: "upcoming" },
  ],

  TARGET_AUDIENCE: [
    { icon: "🎓", label: L("Computer-science or science students", "Étudiants en informatique ou sciences") },
    { icon: "💻", label: L("Developers who want to specialise in AI", "Développeurs souhaitant se spécialiser en IA") },
    { icon: "📊", label: L("Data analysts moving to machine learning", "Data Analysts voulant passer au Machine Learning") },
    { icon: "🔧", label: L("Engineers switching to data science", "Ingénieurs en reconversion vers la Data Science") },
    { icon: "🔄", label: L("Professionals changing careers into tech", "Professionnels en reconversion technologique") },
    { icon: "📚", label: L("Motivated self-learners with programming basics", "Autodidactes motivés avec des bases en programmation") },
  ],

  SKILLS_OUTCOME: [
    L("Analyse a dataset and extract actionable insights", "Analyser un dataset et en extraire des insights actionnables"),
    L("Train and evaluate a machine learning model", "Entraîner et évaluer un modèle de Machine Learning"),
    L("Build a prediction API with FastAPI", "Construire une API de prédiction avec FastAPI"),
    L("Version code and data with Git and DVC", "Versionner son code et ses données avec Git et DVC"),
    L("Containerise an application with Docker", "Containeriser une application avec Docker"),
    L("Deploy to Kubernetes in production", "Déployer sur Kubernetes en production"),
    L("Build a RAG system with LangChain", "Construire un système RAG avec LangChain"),
    L("Create a professional portfolio that lands interviews", "Créer un portfolio professionnel qui décroche des entretiens"),
  ],

  VALUES: [
    { icon: "⚡", title: L("Practice first", "La pratique avant tout"), desc: L("We code from day one. No theory without application.", "On code dès le premier jour. Pas de théorie sans application.") },
    { icon: "🤝", title: L("Sharing", "Le partage"), desc: L("Learn together, grow together. No question is stupid.", "Apprendre ensemble, grandir ensemble. Aucune question n'est stupide.") },
    { icon: "🔓", title: L("Open source", "L'Open Source"), desc: L("Every project is open source. Contributing is learning.", "Tous les projets sont open-source. Contribuer, c'est apprendre.") },
    { icon: "🧭", title: L("Mentoring", "Le mentorat"), desc: L("Every student gets personal guidance.", "Chaque étudiant bénéficie d'un accompagnement personnalisé.") },
    { icon: "🏗️", title: L("Real projects", "Les projets réels"), desc: L("No toy datasets. Concrete business problems.", "Pas de datasets jouets. Des problèmes business concrets.") },
  ],

  FAQ: [
    {
      q: L("How long is the programme?", "Combien de temps dure la formation ?"),
      a: L(
        "The full programme lasts 90 days (about 3 months). Each week includes live sessions, labs and a project to hand in.",
        "La formation complète dure 90 jours (environ 3 mois). Chaque semaine comprend des sessions live, des TP et un projet à rendre."
      ),
    },
    {
      q: L("Do I need to know how to code?", "Faut-il savoir programmer pour s'inscrire ?"),
      a: L(
        "Programming basics are recommended, but Level 0 (Orientation) is designed to bring you up to speed. If you can write a for loop, you are ready.",
        "Des bases en programmation sont recommandées, mais le Niveau 0 (Orientation) est conçu pour vous mettre à niveau. Si vous savez écrire une boucle for, vous êtes prêt."
      ),
    },
    {
      q: L("Will the live sessions be recorded?", "Les sessions live seront-elles enregistrées ?"),
      a: L(
        "Yes, 100% of sessions are recorded and available as replays on YouTube. You can learn at your own pace.",
        "Oui, 100% des sessions seront enregistrées et disponibles en replay sur YouTube. Vous pouvez suivre à votre rythme."
      ),
    },
    {
      q: L("How much does it cost?", "Combien coûte la formation ?"),
      a: L(
        "The price will be announced when registration officially opens. Level 0 (Orientation) is completely free.",
        "Le prix sera communiqué à l'ouverture officielle des inscriptions. Le Niveau 0 (Orientation) est entièrement gratuit."
      ),
    },
    {
      q: L("Is there a certificate?", "Y aura-t-il un certificat ?"),
      a: L(
        "Yes. A certificate is issued at the end of each module, and a final \"MLAcademy Data Scientist\" certification is awarded once the final project is validated.",
        "Oui. Un certificat est délivré à la fin de chaque module, et une certification finale \"MLAcademy Data Scientist\" est remise après validation du projet final."
      ),
    },
    {
      q: L("What is the course format?", "Quel est le format des cours ?"),
      a: L(
        "Weekly live sessions (Meet/Zoom), guided labs, individual projects with code review, continuous support on Discord.",
        "Sessions live hebdomadaires (Meet/Zoom), TP guidés, projets individuels avec review de code, support continu sur Discord."
      ),
    },
    {
      q: L("Why only 25 seats?", "Pourquoi seulement 25 places ?"),
      a: L(
        "To guarantee quality mentoring. Every project is reviewed and every question gets a personal answer. Quality over quantity.",
        "Pour garantir un accompagnement de qualité. Chaque projet est relu, chaque question reçoit une réponse personnalisée. La qualité prime sur la quantité."
      ),
    },
  ],

  INSTRUCTOR: {
    name: "Eric KOULODJI",
    title: L("Statistician & AI Engineer · Founder of MLAcademy", "Statisticien & AI Engineer · Fondateur de MLAcademy"),
    bio: L(
      "Physicist by training, now a Statistician & AI Engineer and Master's student in Applied Statistics. Former AI & Data Engineer (volunteer) at Datum Africa, contributor to the French Space Agency (CNES), speaker at the DSA Summer School and founder of DTech-Africa / MLAcademy. Focused on measurable, deployed AI systems.",
      "Physicien de formation, aujourd'hui Statisticien & AI Engineer et étudiant en Master de Statistiques Appliquées. Ancien AI & Data Engineer (bénévolat) chez Datum Africa, contributeur au Centre National d'Études Spatiales (CNES), intervenant à la DSA Summer School et fondateur de DTech-Africa / MLAcademy. Spécialisé dans les systèmes IA mesurables et déployés."
    ),
    avatar: "/eric-dona.jpg",
    stats: [
      { value: "3", label: L("AI systems in production", "Systèmes IA en prod") },
      { value: "8", label: L("Projects shipped", "Projets livrés") },
      { value: "6+", label: L("Students trained", "Étudiants formés") },
    ],
    socials: {
      linkedin: "https://linkedin.com/in/dona-erick",
      github: "https://github.com/dona-eric",
      youtube: "https://www.youtube.com/@mlacademie",
    },
  },

  COMMUNITY: [
    { icon: "💬", name: "Discord", desc: L("Real-time help and discussion", "Entraide et discussions en temps réel"), url: "#" },
    { icon: "🐙", name: "GitHub", desc: L("Open-source projects and code reviews", "Projets open-source et code reviews"), url: "https://github.com/dona-eric" },
    { icon: "📺", name: "YouTube", desc: L("Courses, tutorials and replays", "Cours, tutoriels et replays"), url: "https://www.youtube.com/@mlacademy" },
    { icon: "💼", name: "LinkedIn", desc: L("Professional network and opportunities", "Réseau professionnel et opportunités"), url: "https://linkedin.com/in/dona-erick" },
  ],

  FORM_OPTIONS: {
    countries: [
      { value: "Bénin", label: L("Benin", "Bénin") },
      { value: "Togo", label: "Togo" },
      { value: "Côte d'Ivoire", label: L("Côte d'Ivoire", "Côte d'Ivoire") },
      { value: "Sénégal", label: L("Senegal", "Sénégal") },
      { value: "Cameroun", label: L("Cameroon", "Cameroun") },
      { value: "Mali", label: "Mali" },
      { value: "Burkina Faso", label: "Burkina Faso" },
      { value: "Niger", label: "Niger" },
      { value: "Guinée", label: L("Guinea", "Guinée") },
      { value: "Congo", label: "Congo" },
      { value: "Gabon", label: "Gabon" },
      { value: "Madagascar", label: "Madagascar" },
      { value: "France", label: "France" },
      { value: "Belgique", label: L("Belgium", "Belgique") },
      { value: "Canada", label: "Canada" },
      { value: "Suisse", label: L("Switzerland", "Suisse") },
      { value: "Autre", label: L("Other", "Autre") },
    ],
    levels: [
      { value: "Débutant complet (aucune expérience en programmation)", label: L("Complete beginner (no programming experience)", "Débutant complet (aucune expérience en programmation)") },
      { value: "Débutant (quelques notions de Python/SQL)", label: L("Beginner (some Python/SQL)", "Débutant (quelques notions de Python/SQL)") },
      { value: "Intermédiaire (à l'aise avec Python et les bases du ML)", label: L("Intermediate (comfortable with Python and ML basics)", "Intermédiaire (à l'aise avec Python et les bases du ML)") },
      { value: "Avancé (expérience professionnelle en Data Science)", label: L("Advanced (professional data-science experience)", "Avancé (expérience professionnelle en Data Science)") },
    ],
    objectives: [
      { value: "Devenir Data Scientist", label: L("Become a Data Scientist", "Devenir Data Scientist") },
      { value: "Devenir AI / ML Engineer", label: L("Become an AI / ML Engineer", "Devenir AI / ML Engineer") },
      { value: "Devenir MLOps Engineer", label: L("Become an MLOps Engineer", "Devenir MLOps Engineer") },
      { value: "Monter en compétences (reconversion)", label: L("Upskill (career change)", "Monter en compétences (reconversion)") },
      { value: "Renforcer mes compétences actuelles", label: L("Strengthen my current skills", "Renforcer mes compétences actuelles") },
      { value: "Créer ma propre startup IA", label: L("Start my own AI startup", "Créer ma propre startup IA") },
      { value: "Autre", label: L("Other", "Autre") },
    ],
  },
};

const isPair = (v) =>
  v && typeof v === "object" && !Array.isArray(v) && Object.keys(v).length === 2 && "en" in v && "fr" in v;

function localize(node, lang) {
  if (isPair(node)) return node[lang] ?? node.en;
  if (Array.isArray(node)) return node.map((n) => localize(n, lang));
  if (node && typeof node === "object") {
    const out = {};
    for (const [k, v] of Object.entries(node)) out[k] = localize(v, lang);
    return out;
  }
  return node;
}

const cache = {};
export function academyContent(lang) {
  const key = lang === "fr" ? "fr" : "en";
  if (!cache[key]) cache[key] = localize(CONTENT, key);
  return cache[key];
}
