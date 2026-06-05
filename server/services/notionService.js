import { Client } from "@notionhq/client";
import dotenv from "dotenv";

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

/**
 * Mappe une page Notion vers un objet Masterclass
 * Ces noms de propriétés devront correspondre aux noms de tes colonnes dans Notion.
 */
function mapNotionPageToMasterclass(page) {
  const props = page.properties;
  
  // Utilitaires d'extraction
  const getText = (prop) => prop?.rich_text?.[0]?.plain_text || "";
  const getTitle = (prop) => prop?.title?.[0]?.plain_text || "";
  const getDate = (prop) => prop?.date?.start || "";
  const getSelect = (prop) => prop?.select?.name || "";
  const getNumber = (prop) => prop?.number || 0;
  
  // Utilitaire pour extraire un tableau depuis un texte (séparé par des sauts de ligne)
  const getArray = (prop) => {
    const text = getText(prop);
    return text.split('\n').map(item => item.replace(/^- /, '').trim()).filter(Boolean);
  };

  // Utilitaire pour le programme (texte structuré "20h00: Titre")
  const getProgram = (prop) => {
    const text = getText(prop);
    try {
      if (text.trim().startsWith('[')) return JSON.parse(text); // Support du JSON direct
    } catch(e) {}
    
    return text.split('\n').map(line => {
      const match = line.match(/^(\d{2}h\d{2})\s*[:\-]\s*(.+)$/);
      if (match) return { time: match[1], title: match[2].trim() };
      return null;
    }).filter(Boolean);
  };

  return {
    id: page.id,
    type: getSelect(props.Type) || "masterclass",
    status: getSelect(props.Status) || "active",
    
    title: getTitle(props.Name || props.Titre || props.Title),
    subtitle: getText(props.Subtitle || props.Sous_titre),
    theme: getSelect(props.Theme || props.Thème),
    themeColor: getText(props.ThemeColor || props.Couleur) || "#6C63FF",
    accentColor: getText(props.AccentColor),
    
    date: getDate(props.Date),
    time: getText(props.Time || props.Heure),
    duration: getText(props.Duration || props.Durée),
    
    image: getText(props.Image) || "/masterclass/dataops_mlops.png",
    imageAlt: getText(props.ImageAlt),
    
    format: getSelect(props.Format) || "En ligne",
    link: getText(props.Link || props.Lien),
    location: getText(props.Location || props.Lieu),
    
    description: getText(props.Description),
    objectives: getArray(props.Objectives || props.Objectifs),
    program: getProgram(props.Program || props.Programme),
    prerequisites: getArray(props.Prerequisites || props.Prérequis),
    
    price: getText(props.Price || props.Prix) || "Gratuit",
    seats: getNumber(props.Seats || props.Places),
    
    speaker: {
      name: getText(props.SpeakerName || props.Intervenant) || "Eric KOULODJI",
      title: getText(props.SpeakerTitle || props.Titre_Intervenant) || "Data Scientist",
      avatar: getText(props.SpeakerAvatar || props.Avatar_Intervenant) || "/eric.jpg",
    },
    
    emailContent: {
      subject: getText(props.EmailSubject || props.Email_Objet) || "✅ Inscription confirmée",
      welcomeMessage: getText(props.EmailWelcome || props.Email_Bienvenue) || "Votre place est réservée !",
      sessionLink: getText(props.Link || props.Lien), 
      reminder: getText(props.EmailReminder || props.Email_Rappel) || "Un rappel vous sera envoyé 24h avant la session.",
      contact: getText(props.EmailContact || props.Contact) || "dtech.afrik@gmail.com",
    }
  };
}

const MOCK_EVENTS = [
  {
    id: "c591c17b-fa0b-41a8-9b1a-94941d17fad9",
    type: "masterclass",
    status: "Active",
    title: "MLOps Blueprint : Industrialiser et Déployer des Pipelines IA Reproductibles avec DVC et FastAPI",
    subtitle: "",
    theme: "Data Science",
    themeColor: "#6C63FF",
    accentColor: "",
    date: "2026-06-20",
    time: "20:00",
    duration: "2h",
    image: "/masterclass/dataops_mlops.png",
    imageAlt: "",
    format: "En ligne",
    link: "",
    location: "",
    description: "Passer du code de recherche (Notebook) à une architecture logicielle de niveau industriel. Repartir avec un template de projet propre, versionné, scalable et prêt pour le déploiement continu (CI/CD).",
    objectives: [
      "Comprendre pourquoi Git ne suffit plus pour gérer données et modèles",
      "Maîtriser DVC pour la traçabilité et la reproductibilité des expériences ML",
      "Développer une API de production performante et documentée avec FastAPI",
      "Structurer son repo GitHub de manière industrielle (prêt CI/CD)"
    ],
    program: [],
    prerequisites: [
      "Comprendre pourquoi Git ne suffit plus pour gérer données et modèles",
      "Maîtriser DVC pour la traçabilité et la reproductibilité des expériences ML",
      "Développer une API de production performante et documentée avec FastAPI",
      "Structurer son repo GitHub de manière industrielle (prêt CI/CD)"
    ],
    price: "Gratuit",
    seats: 100,
    speaker: {
      name: "Eric KOULODJI",
      title: "Data Scientist",
      avatar: "/eric.jpg"
    },
    emailContent: {
      subject: "✅ Inscription confirmée",
      welcomeMessage: "Votre place est réservée !",
      sessionLink: "",
      reminder: "Un rappel vous sera envoyé 24h avant la session.",
      contact: "dtech.afrik@gmail.com"
    }
  },
  {
    id: "f2d48e72-aad0-4632-86e2-364c4dc9ec4a",
    type: "webinaire",
    status: "Active",
    title: "Décoder l'Intelligence Artificielle : Les Clés de l'Explicabilité (XAI) pour des Modèles de Confiance",
    subtitle: "",
    theme: "IA / Machine Learning",
    themeColor: "#6C63FF",
    accentColor: "",
    date: "2026-06-13",
    time: "20:00",
    duration: "1h30",
    image: "/masterclass/dataops_mlops.png",
    imageAlt: "",
    format: "En ligne",
    link: "",
    location: "",
    description: "Comprendre pourquoi la précision d'un modèle ne suffit pas et repartir avec une méthode claire pour auditer, interpréter et faire accepter un modèle d'IA dans le monde réel (santé, environnement, finance).",
    objectives: [
      "Comprendre pourquoi la précision d'un modèle ne suffit pas",
      "Repartir avec une méthode claire pour auditer et interpréter un modèle d'IA",
      "Faire accepter un modèle d'IA dans le monde réel (santé, environnement, finance)"
    ],
    program: [],
    prerequisites: [
      "Comprendre pourquoi la précision d'un modèle ne suffit pas",
      "Repartir avec une méthode claire pour auditer et interpréter un modèle d'IA",
      "Faire accepter un modèle d'IA dans le monde réel (santé, environnement, finance)"
    ],
    price: "Gratuit",
    seats: 200,
    speaker: {
      name: "Eric KOULODJI",
      title: "Data Scientist",
      avatar: "/eric.jpg"
    },
    emailContent: {
      subject: "✅ Inscription confirmée",
      welcomeMessage: "Votre place est réservée !",
      sessionLink: "",
      reminder: "Un rappel vous sera envoyé 24h avant la session.",
      contact: "dtech.afrik@gmail.com"
    }
  }
];

export async function getMasterclasses() {
  if (!databaseId || !process.env.NOTION_API_KEY) {
    console.warn("Identifiants Notion manquants. Utilisation des fallbacks locaux.");
    return MOCK_EVENTS;
  }

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    return response.results.map(mapNotionPageToMasterclass);
  } catch (error) {
    console.error("🚨 ERREUR NOTION (getMasterclasses) - Utilisation du fallback local:", error);
    return MOCK_EVENTS;
  }
}

export async function getMasterclassById(id) {
  if (!process.env.NOTION_API_KEY) {
    return MOCK_EVENTS.find(e => e.id === id) || null;
  }
  
  try {
    const page = await notion.pages.retrieve({ page_id: id });
    return mapNotionPageToMasterclass(page);
  } catch (error) {
    console.error(`Erreur Notion pour la page ${id} - Utilisation du fallback local:`, error);
    return MOCK_EVENTS.find(e => e.id === id) || null;
  }
}
