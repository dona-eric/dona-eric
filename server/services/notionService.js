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

export async function getMasterclasses() {
  if (!databaseId || !process.env.NOTION_API_KEY) {
    console.warn("⚠️ Identifiants Notion manquants. Retour d'un tableau vide.");
    return [];
  }

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      // On peut filtrer les brouillons si on a une colonne Status
      // filter: { property: 'Status', select: { does_not_equal: 'Draft' } },
      sorts: [
        {
          property: 'Date',
          direction: 'descending', // Les plus récents en premier
        },
      ],
    });

    return response.results.map(mapNotionPageToMasterclass);
  } catch (error) {
    console.error("Erreur lors de la récupération depuis Notion:", error);
    return [];
  }
}

export async function getMasterclassById(id) {
  if (!process.env.NOTION_API_KEY) return null;
  
  try {
    const page = await notion.pages.retrieve({ page_id: id });
    return mapNotionPageToMasterclass(page);
  } catch (error) {
    console.error(`Erreur Notion pour la page ${id}:`, error);
    return null;
  }
}
