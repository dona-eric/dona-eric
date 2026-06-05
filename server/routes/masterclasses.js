import express from "express";
import { getMasterclasses, getMasterclassById } from "../services/notionService.js";
import { countRegistrations } from "../database.js";

const router = express.Router();

const getDeadline = (item) => {
  if (!item.date) return new Date(0);
  return item.date.includes("T") ? new Date(item.date) : new Date(`${item.date}T16:00:00+01:00`);
};

// Caching generated storytelling in memory to avoid repeating expensive API calls
const storytellingCache = {};

async function getStorytelling(mc) {
  if (storytellingCache[mc.id]) {
    return storytellingCache[mc.id];
  }

  const fallbackMap = {
    "MLOps Blueprint : Industrialiser et Déployer des Pipelines IA Reproductibles avec DVC et FastAPI": 
      "Le passage de la recherche au déploiement en production est le grand défi des ingénieurs IA. Cette masterclass a été conçue comme un véritable guide de survie, montrant comment automatiser, versionner et sécuriser les pipelines.<br/><br/>Une formidable opportunité pour notre communauté de s'approprier les standards industriels actuels et de propulser leurs projets IA vers des sommets de fiabilité et de performance.",
      
    "Décoder l'Intelligence Artificielle : Les Clés de l'Explicabilité (XAI) pour des Modèles de Confiance": 
      "Nous ne pouvons plus nous permettre d'utiliser des modèles 'boîtes noires' dans des secteurs aussi critiques que la santé ou la finance. Ce webinaire a réuni des esprits curieux et exigeants, désireux de comprendre et maîtriser les rouages internes des algorithmes.<br/><br/>En vulgarisant les concepts clés de l'explicabilité (XAI), nous redonnons le contrôle aux humains et posons les jalons d'une intelligence artificielle éthique, transparente et responsable sur le continent."
  };

  const defaultText = fallbackMap[mc.title] || mc.description || 
    `Une session d'apprentissage intensive dédiée au thème "${mc.title}". Notre communauté s'est largement mobilisée pour explorer ces concepts clés et acquérir des compétences concrètes.<br/><br/>Grâce à des cas pratiques issus de la production, les participants sont désormais parés pour implémenter ces méthodologies de pointe dans leurs projets respectifs.`;

  if (process.env.VITE_GROQ_API_KEY) {
    try {
      console.log(`🤖 Génération de storytelling avec Groq pour: ${mc.title}...`);
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.VITE_GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content: "Tu es un copywriter expert en technologie pour la marque DTech-Africa. Rédige un court récit d'impact inspirant de exactement deux paragraphes (environ 80-120 mots au total) en français pour illustrer la réussite d'un webinaire ou d'une masterclass portant sur le thème fourni. Le ton doit être professionnel, dynamique et axé sur l'Afrique, l'acquisition de compétences réelles et la communauté. Sépare impérativement les deux paragraphes par la balise HTML <br/><br/>. Ne renvoie que le texte du post, sans guillemets autour."
            },
            {
              role: "user",
              content: `Titre : "${mc.title}". Thème : "${mc.theme}". Subtitle : "${mc.subtitle}". Nombre d'inscrits : ${mc.registrantsCount || 10}.`
            }
          ]
        })
      });
      if (response.ok) {
        const result = await response.json();
        const text = result.choices?.[0]?.message?.content?.trim();
        if (text) {
          // Remove wrapping quotes if present
          const cleanText = text.replace(/^"|"$/g, "");
          storytellingCache[mc.id] = cleanText;
          return cleanText;
        }
      } else {
        console.error("Erreur réponse Groq:", response.status, await response.text());
      }
    } catch (err) {
      console.error("Erreur d'appel Groq:", err.message);
    }
  }

  return defaultText;
}

/**
 * Récupère toutes les masterclasses depuis Notion
 */
router.get("/", async (req, res) => {
  try {
    const masterclasses = await getMasterclasses();
    
    masterclasses.sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(a.date) - new Date(b.date);
    });

    const now = new Date();
    const activeEvents = masterclasses.filter(item => getDeadline(item) > now);
    const openEventId = activeEvents.length > 0 ? activeEvents[0].id : null;

    const enriched = [];
    for (const mc of masterclasses) {
      const deadline = getDeadline(mc);
      const isPast = deadline <= now;
      const isOpen = !isPast && mc.id === openEventId;
      const isLocked = !isPast && mc.id !== openEventId;
      const registrantsCount = await countRegistrations(mc.id);
      const storytelling = await getStorytelling({ ...mc, registrantsCount });

      enriched.push({
        ...mc,
        isOpen,
        isPast,
        isLocked,
        registrantsCount,
        storytelling,
      });
    }

    res.json(enriched);
  } catch (error) {
    console.error("Erreur GET /api/masterclasses:", error);
    res.status(500).json({ error: "Erreur lors de la récupération des événements" });
  }
});

/**
 * Récupère les détails d'une masterclass spécifique
 */
router.get("/:id", async (req, res) => {
  try {
    const masterclass = await getMasterclassById(req.params.id);
    if (!masterclass) {
      return res.status(404).json({ error: "Événement non trouvé" });
    }

    const allMasterclasses = await getMasterclasses();
    allMasterclasses.sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(a.date) - new Date(b.date);
    });

    const now = new Date();
    const activeEvents = allMasterclasses.filter(item => getDeadline(item) > now);
    const openEventId = activeEvents.length > 0 ? activeEvents[0].id : null;

    const deadline = getDeadline(masterclass);
    const isPast = deadline <= now;
    const isOpen = !isPast && masterclass.id === openEventId;
    const isLocked = !isPast && masterclass.id !== openEventId;
    const registrantsCount = await countRegistrations(masterclass.id);
    const storytelling = await getStorytelling({ ...masterclass, registrantsCount });

    res.json({
      ...masterclass,
      isOpen,
      isPast,
      isLocked,
      registrantsCount,
      storytelling,
    });
  } catch (error) {
    console.error(`Erreur GET /api/masterclasses/${req.params.id}:`, error);
    res.status(500).json({ error: "Erreur lors de la récupération des détails" });
  }
});

export default router;
