export const MASTERCLASSES = [

  // ─────────────────────────────────────────────────────────────
  //  MASTERCLASS ACTIVE / EN COURS (mettre en premier)
  // ─────────────────────────────────────────────────────────────
  {
    id: "mc-001",
    type: "masterclass",               // "masterclass" | "webinaire"
    status: "active",                  // Ne pas toucher — calculé automatiquement

    // ── Infos principales 
    title: "Machine Learning en Production : Arrêtez de jouer dans vos notebooks et créez de la valeur.",
    subtitle: "Maîtrisez le cycle de vie d'un modèle : de l'entraînement au déploiement réel.",
    theme: "Machine Learning & Data Science",
    themeColor: "#6C63FF",            
    accentColor: "#FF6584",

    // ── Dates 
    date: "2026-05-09",               // Format YYYY-MM-DD
    time: "20h00 - 22h00 (GMT+1)",
    duration: "2h",

    // ── Visuel 
    image: "/masterclass/dataops_mlops.png",
    imageAlt: "Masterclass IA Générative",

    // ── Lieu / Lien 
    format: "En ligne",               // "En ligne" | "Présentiel" | "Hybride"
    link: "https://meet.google.com/uyb-zpwq-wou",  // Lien de la session (affiché après inscription)
    location: "",                     // Laisser vide si en ligne

    // ── Contenu ────────────────────────────────────────────────
    description: `
    70% des projets de Machine Learning ne voient jamais le jour car ils restent bloqués dans des notebooks. 
    Lors de cette masterclass intensive, nous verrons comment entraîner un modèle face à une problématique métier réelle, 
    optimiser ses performances, et surtout, le rendre utilisable par des tiers via une infrastructure robuste.
    `,
    objectives: [
      "Comprendre le passage de l'expérimentation à la production",
      "Entraîner et optimiser un modèle performant",
      "Exposer votre modèle via une API avec FastAPI",
      "Conteneuriser l'application avec Docker",
      "Mesurer l'impact et la valeur métier générée"
    ],
    program: [
      { time: "20h00", title: "Accueil & Pourquoi vos notebooks ne suffisent plus" },
      { time: "20h20", title: "Atelier 1 : Entraînement et Export du modèle" },
      { time: "20h50", title: "Atelier 2 : Création de l'API avec FastAPI" },
      { time: "21h20", title: "Atelier 3 : Dockerisation et Déploiement" },
      { time: "21h45", title: "Q&A & Networking" },
    ],

    // ── Prérequis (affichés dans le formulaire comme checklist) ─
    prerequisites: [
      "Avoir un ordinateur ou smartphone avec connexion internet",
      "Avoir un compte Gmail ou Google Meet (gratuit)",
      "Notions de base en Python souhaitées pour l'atelier pratique",
      "Avoir 2h minimum devant soi sans interruption majeure",
    ],

    // ── Infos supplémentaires ──────────────────────────────────
    price: "Gratuit",
    seats: 50,                         // Nombre de places (0 = illimité)
    speaker: {
      name: "Eric KOULODJI",
      title: "Data Scientist & Engineer Machine Learning",
      avatar: "/eric.jpg",
    },

    // ── Email de confirmation ──────────────────────────────────
    // Ces infos seront dans l'email envoyé automatiquement à l'inscrit
    emailContent: {
      subject: "✅ Inscription confirmée — Masterclass IA & Machine Learning & Métiers du Futur",
      welcomeMessage: "Votre place est réservée ! Voici tout ce qu'il faut savoir avant le grand jour.",
      sessionLink: "https://meet.google.com/uyb-zpwq-wou",
      reminder: "Un rappel vous sera envoyé 24h avant la session.",
      contact: "dtech.afrik@gmail.com",
    },
  },

  // ─────────────────────────────────────────────────────────────
  //  MASTERCLASS PASSÉE (automatiquement marquée "closed")
  // ─────────────────────────────────────────────────────────────
  {
    id: "mc-000",
    type: "webinaire",
    status: "active",

    title: "Data Science pour Non-Techniciens",
    subtitle: "Lire, comprendre et exploiter la donnée sans coder",
    theme: "Data & Analyse",
    themeColor: "#00BFA6",
    accentColor: "#FF8A65",

    date: "2025-03-20",              // Date déjà passée → fermé automatiquement
    time: "17h00 - 19h00 (GMT+1)",
    duration: "2h",
    format: "En ligne",
    link: "",
    location: "",
    image: "/masterclass/mc-data.jpg",
    imageAlt: "Webinaire Data Science",

    description: `
      Un webinaire pratique pour démystifier la data science et comprendre comment
      les données peuvent transformer vos décisions professionnelles et organisationnelles,
      même sans bagage technique.
    `,
    objectives: [
      "Comprendre ce qu'est vraiment la data science",
      "Lire et interpréter des dashboards et graphiques",
      "Identifier les bons KPIs pour votre activité",
      "Initiation à Google Sheets comme outil d'analyse",
    ],
    program: [
      { time: "17h00", title: "Introduction à la data science" },
      { time: "17h30", title: "Démonstration live : analyse de données" },
      { time: "18h15", title: "Q&A interactif" },
      { time: "19h00", title: "Clôture" },
    ],
    prerequisites: [
      "Ordinateur avec connexion internet",
      "Compte Google (pour Google Sheets)",
      "Aucune connaissance en programmation requise",
    ],
    price: "Gratuit",
    seats: 30,
    speaker: {
      name: "Votre Nom",
      title: "Data Analyst & Formateur",
      avatar: "/about/avatar.jpg",
    },
    emailContent: {
      subject: "✅ Inscription confirmée — Webinaire Data Science",
      welcomeMessage: "Vous êtes inscrit(e) ! Préparez vos questions.",
      sessionLink: "",
      reminder: "Un rappel vous sera envoyé la veille.",
      contact: "votre-email@gmail.com",
    },
  },
];

// ─────────────────────────────────────────────────────────────────
//  NE PAS MODIFIER CE QUI SUIT
// ─────────────────────────────────────────────────────────────────

/** Détermine si un masterclass est ouvert aux inscriptions */
export const isOpen = (mc) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventDate = new Date(mc.date);
  eventDate.setHours(0, 0, 0, 0);
  return eventDate >= today;
};

/** Retourne le masterclass actif le plus récent */
export const getFeatured = () =>
  MASTERCLASSES.find((mc) => isOpen(mc)) ?? MASTERCLASSES[0];

/** Formate la date en français */
export const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
