import express from "express";
import { getReviews, insertReview } from "../database.js";

const router = express.Router();

// Curated seed reviews fallback if database is empty
const INITIAL_SEED_REVIEWS = [
  {
    id: "seed-1",
    name: "Kévin M.",
    role: "Étudiant MLAcademy Cohorte 1",
    rating: 5,
    comment: "Accompagnement d'une qualité rare ! Dona explique des concepts très complexes (MLOps, Kubernetes, RAG) avec une pédagogie vivante et très concrète. Ma façon de coder en IA a totalement changé.",
    created_at: "2026-06-15T10:00:00Z"
  },
  {
    id: "seed-2",
    name: "Sarah T.",
    role: "Participant Masterclass LLM & Agents",
    rating: 5,
    comment: "Les masterclasses live sont passionnantes. Dona est disponible, prend le temps de répondre à toutes les questions et donne des cas d'usage directement applicables en entreprise.",
    created_at: "2026-07-02T14:30:00Z"
  },
  {
    id: "seed-3",
    name: "Aimé K.",
    role: "Data Analyst & Élève",
    rating: 5,
    comment: "Travailler avec Dona Eric est un accélérateur de carrière. La clarté des explications et l'exigence sur les bonnes pratiques MLOps font toute la différence !",
    created_at: "2026-07-18T09:15:00Z"
  }
];

// GET /api/reviews
router.get("/", async (req, res) => {
  try {
    const dbReviews = await getReviews();
    if (dbReviews && dbReviews.length > 0) {
      return res.json({ reviews: dbReviews });
    }
    return res.json({ reviews: INITIAL_SEED_REVIEWS });
  } catch (error) {
    console.error("[GET /api/reviews Error]", error);
    return res.json({ reviews: INITIAL_SEED_REVIEWS });
  }
});

// POST /api/reviews
router.post("/", async (req, res) => {
  try {
    const { name, role, rating, comment } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Votre nom est requis." });
    }
    if (!comment || !comment.trim()) {
      return res.status(400).json({ error: "Votre avis ou message est requis." });
    }

    const cleanRating = Math.max(1, Math.min(5, Number(rating) || 5));
    const cleanRole = role && role.trim() ? role.trim() : "Étudiant / Participant";
    const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";

    await insertReview({
      name: name.trim(),
      role: cleanRole,
      rating: cleanRating,
      comment: comment.trim(),
      ip_address: ipAddress
    });

    return res.status(201).json({
      success: true,
      message: "Merci ! Votre avis a été enregistré avec succès.",
      review: {
        name: name.trim(),
        role: cleanRole,
        rating: cleanRating,
        comment: comment.trim(),
        created_at: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error("[POST /api/reviews Error]", error);
    return res.status(500).json({ error: "Erreur lors de l'enregistrement de votre avis." });
  }
});

export default router;
