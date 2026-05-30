import express from "express";
import { getMasterclasses, getMasterclassById } from "../services/notionService.js";

const router = express.Router();

/**
 * Récupère toutes les masterclasses depuis Notion
 */
router.get("/", async (req, res) => {
  try {
    const masterclasses = await getMasterclasses();
    res.json(masterclasses);
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
    res.json(masterclass);
  } catch (error) {
    console.error(`Erreur GET /api/masterclasses/${req.params.id}:`, error);
    res.status(500).json({ error: "Erreur lors de la récupération des détails" });
  }
});

export default router;
