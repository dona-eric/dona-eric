// Single source of truth for projects (Home, Projects).
// Localised fields are { en, fr } objects, resolved with `tx()` from useLanguage().
export const PROJECTS = [
  {
    id: "hennu", title: "Hennu AI",
    subtitle: { en: "RAG-augmented customs AI agent", fr: "Agent IA douanier augmenté par RAG" },
    problem: {
      en: "Manually checking customs declarations and searching legal articles is slow and error-prone.",
      fr: "La vérification manuelle des déclarations douanières et la recherche d'articles de loi sont lentes et sujettes à erreur.",
    },
    solution: {
      en: "Autonomous agent (LangGraph + Qdrant + OCR) that queries customs legislation, checks HS codes and returns sourced answers citing the relevant articles.",
      fr: "Agent autonome (LangGraph + Qdrant + OCR) qui interroge la législation douanière, vérifie les codes SH et restitue des réponses sourcées avec citation des articles.",
    },
    results: {
      en: "Working end-to-end prototype: OCR extraction, Qdrant retrieval and sourced answers. Public code on GitHub.",
      fr: "Prototype fonctionnel de bout en bout : extraction OCR, retrieval Qdrant et réponses certifiées avec sources. Code public sur GitHub.",
    },
    stack: ["LangGraph", "Qdrant", "RAG", "OCR", "FastAPI", "Docker"],
    impact: { en: "RAG + OCR agent", fr: "Agent RAG + OCR" },
    impactDetail: { en: "Customs legislation", fr: "Législation douanière" },
    github: "https://github.com/dona-eric/Hennu", demo: null,
    status: "done", category: "llm", accent: "#d4ff3a", featured: true,
  },
  {
    id: "veritaai", title: "VeritaAI",
    subtitle: { en: "Fake-news detection with NLP", fr: "Détection de fake news par NLP" },
    problem: {
      en: "Manual fact-checking is too slow for how fast misinformation spreads.",
      fr: "La vérification manuelle des faits est trop lente face à la vitesse de propagation des fausses informations.",
    },
    solution: {
      en: "NLP pipeline (SVM + embeddings) with a FastAPI service, a Streamlit interface and metric / data-drift tracking in MLflow.",
      fr: "Pipeline NLP (SVM + embeddings) avec API FastAPI, interface Streamlit et suivi des métriques / data drift via MLflow.",
    },
    results: {
      en: "End-to-end documented prototype (notebook + API + interface). Data and model quality tracked in MLflow.",
      fr: "Prototype documenté de bout en bout (notebook + API + interface). Suivi de la qualité des données et des modèles avec MLflow.",
    },
    stack: ["SVM", "NLP", "Scikit-Learn", "FastAPI", "Streamlit", "MLflow"],
    impact: { en: "NLP project", fr: "Projet NLP" },
    impactDetail: { en: "Public code & notebook", fr: "Code & notebook publics" },
    github: "https://github.com/dona-eric/VeritaAI", demo: "https://verita-ai.streamlit.app",
    status: "production", category: "nlp", accent: "#5ee6ff", featured: true,
  },
  {
    id: "credit-risk", title: "Credit Risk Engine",
    subtitle: { en: "Explainable credit scoring", fr: "Scoring de crédit explicable" },
    problem: {
      en: "Manual review of credit applications creates bottlenecks and biased decisions.",
      fr: "L'évaluation manuelle des dossiers de crédit génère des goulots d'étranglement et des biais de décision.",
    },
    solution: {
      en: "Scoring model (Scikit-Learn + SHAP) served through a REST API, with MLflow tracking and explainable decisions.",
      fr: "Modèle de scoring (Scikit-Learn + SHAP) avec API REST, suivi MLflow et explicabilité des décisions.",
    },
    results: {
      en: "1st prize at the Hack2Hire TechTech Data Science hackathon. +15% precision over the hackathon baseline, with SHAP explanations.",
      fr: "1er prix du hackathon Hack2Hire TechTech Data Science. +15% de précision vs la baseline du hackathon, avec explicabilité SHAP.",
    },
    stack: ["Scikit-Learn", "SHAP", "FastAPI", "MLflow", "Streamlit"],
    impact: { en: "1st prize, hackathon", fr: "1er Prix Hackathon" },
    impactDetail: { en: "Scoring + SHAP", fr: "Scoring + SHAP" },
    github: "https://github.com/dona-eric/Hack2Hiere_TechTech_DataScience_20", demo: "https://risk-score.streamlit.app",
    status: "done", category: "ml", accent: "#8f7dff", featured: true,
  },
  {
    id: "coachai", title: "CoachAI",
    subtitle: { en: "AI generator for training programmes", fr: "Générateur IA de programmes sportifs" },
    problem: {
      en: "Fitness coaches spend a large share of their time writing personalised programmes.",
      fr: "Les coachs sportifs passent une part importante de leur temps à rédiger des programmes personnalisés.",
    },
    solution: {
      en: "LLM application that generates workouts, recovery plans and recommendations from each client's goals and constraints.",
      fr: "Application LLM générant entraînements, plans de récupération et recommandations selon les objectifs et contraintes du client.",
    },
    results: {
      en: "Deployed Streamlit app. Estimated ~20% time saved for coaches when preparing programmes.",
      fr: "Application Streamlit déployée. Gain de temps estimé à ~20% pour les coachs sur la préparation des programmes.",
    },
    stack: ["LangChain", "Groq", "Llama 3", "RAG", "Streamlit"],
    impact: { en: "Live demo", fr: "Démo en ligne" },
    impactDetail: { en: "Est. 20% time saved", fr: "Gain estimé -20%" },
    github: "https://github.com/dona-eric/CoachAI", demo: "https://coach-ai.streamlit.app",
    status: "production", category: "llm", accent: "#ff7a45", featured: true,
  },
  {
    id: "aqi-cotonou", title: "AQI Cotonou",
    subtitle: { en: "Air-quality monitoring", fr: "Surveillance de la qualité de l'air" },
    problem: {
      en: "No central public tool existed to track and anticipate air pollution in Cotonou.",
      fr: "Absence d'outil public centralisé pour suivre et anticiper la pollution atmosphérique à Cotonou.",
    },
    solution: {
      en: "Time-series dashboard (Prophet + XGBoost) to visualise and forecast PM2.5, PM10, O3 and NO2.",
      fr: "Dashboard de séries temporelles (Prophet + XGBoost) pour visualiser et prévoir PM2.5, PM10, O3 et NO2.",
    },
    results: {
      en: "Public online tool: 5,256+ hourly measurements analysed and pollutant forecasts available to everyone.",
      fr: "Outil public en ligne : 5 256+ mesures horaires analysées et prévisions des polluants accessibles à tous.",
    },
    stack: ["Python", "Prophet", "XGBoost", "Plotly", "Netlify"],
    impact: { en: "Public online tool", fr: "Outil public en ligne" },
    impactDetail: { en: "5,256+ hourly readings", fr: "5 256+ mesures horaires" },
    github: "https://github.com/dona-eric/AirQuality", demo: "https://aqi-cotonou.netlify.app",
    status: "production", category: "ml", accent: "#ffc94a", featured: true,
  },
  {
    id: "rag-docs", title: "RAG Document Intelligence",
    subtitle: { en: "Multi-document semantic search", fr: "Recherche sémantique multi-documents" },
    problem: {
      en: "Teams lose hours looking for one precise piece of information across thousands of documents.",
      fr: "Les équipes perdent des heures à chercher une information précise dans des milliers de documents.",
    },
    solution: {
      en: "Multi-format RAG system (Groq + embeddings + vector store) to query a document corpus in natural language.",
      fr: "Système RAG multi-format (Groq + embeddings + base vectorielle) pour interroger un corpus documentaire en langage naturel.",
    },
    results: {
      en: "Working HuggingFace demo: sourced answers in under 2 seconds over an indexed document corpus.",
      fr: "Démo HuggingFace opérationnelle : réponses sourcées en moins de 2 secondes sur un corpus de documents indexés.",
    },
    stack: ["Groq", "LangChain", "ChromaDB", "Llama 3", "HuggingFace"],
    impact: { en: "< 2s latency", fr: "< 2s latence" },
    impactDetail: { en: "HuggingFace demo", fr: "Démo HuggingFace" },
    github: "https://github.com/dona-eric/RAG_DOCUMENTS", demo: "https://huggingface.co/spaces/donerick/Projects",
    status: "done", category: "llm", accent: "#b6a8ff", featured: false,
  },
  {
    id: "modelwatch", title: "ModelWatch",
    subtitle: { en: "Drift monitoring for ML models", fr: "Monitoring de dérive des modèles ML" },
    problem: {
      en: "A model that works at deployment can silently become less reliable over time.",
      fr: "Un modèle qui fonctionne au déploiement peut devenir silencieusement moins fiable avec le temps.",
    },
    solution: {
      en: "Open-source tool that tracks metrics and data drift to raise alerts before quality degrades.",
      fr: "Outil open source qui suit les métriques et la dérive des données pour alerter avant que la qualité ne se dégrade.",
    },
    results: {
      en: "Open-source project released under the MIT licence, focused on observability and reliability of models in production.",
      fr: "Projet open source publié sous licence MIT, orienté observabilité et fiabilité des modèles en production.",
    },
    stack: ["Python", "MLOps", "Monitoring", "Data Drift", "Open Source"],
    impact: { en: "MIT open source", fr: "Open source MIT" },
    impactDetail: { en: "ML observability", fr: "Observabilité ML" },
    github: "https://github.com/dona-eric/ModelWatch", demo: null,
    status: "done", category: "mlops", accent: "#5ee6ff", featured: false,
  },
  {
    id: "askbenin", title: "AskBenin",
    subtitle: { en: "Sovereign AI for Benin", fr: "IA souveraine pour le Bénin" },
    problem: {
      en: "Cultural and administrative information about Benin is scattered and hard to access.",
      fr: "L'information culturelle et administrative béninoise est dispersée et difficilement accessible.",
    },
    solution: {
      en: "Multi-source agentic RAG platform to ask about culture, administrative procedures and opportunities in Benin.",
      fr: "Plateforme Agentic RAG multi-sources pour interroger la culture, les démarches et les opportunités au Bénin.",
    },
    results: {
      en: "Prototype in progress: indexing Beninese cultural and institutional sources.",
      fr: "Prototype en cours : indexation de sources culturelles et institutionnelles béninoises.",
    },
    stack: ["LangGraph", "RAG", "FastAPI", "Next.js", "Qdrant"],
    impact: { en: "In progress", fr: "En cours" },
    impactDetail: { en: "Multi-source RAG", fr: "RAG multi-sources" },
    github: "https://github.com/dona-eric/AskBenin", demo: null,
    status: "wip", category: "llm", accent: "#d4ff3a", featured: false,
  },
];

export const CATEGORIES = [
  { id: "all", label: { en: "All", fr: "Tous" } },
  { id: "ml", label: "Machine Learning" },
  { id: "nlp", label: "NLP" },
  { id: "llm", label: "LLM / Agents" },
  { id: "mlops", label: "MLOps" },
];

export const STATUS = {
  production: { label: { en: "In production", fr: "En production" }, tone: "accent" },
  done: { label: { en: "Shipped", fr: "Livré" }, tone: "ink" },
  wip: { label: { en: "In progress", fr: "En cours" }, tone: "warm" },
};
