import { request } from "../api/apiClient";

export const DEFAULT_REVIEWS = [
  {
    id: "seed-1",
    name: "Kévin M.",
    role: "Étudiant MLAcademy Cohorte 1",
    rating: 5,
    comment: "Accompagnement d'une qualité rare ! Dona explique des concepts très complexes (MLOps, Kubernetes, RAG) avec une pédagogie vivante et très concrète. Ma façon de coder en IA a totalement changé.",
    created_at: new Date().toISOString()
  },
  {
    id: "seed-2",
    name: "Sarah T.",
    role: "Participant Masterclass LLM & Agents",
    rating: 5,
    comment: "Les masterclasses live sont passionnantes. Dona est disponible, prend le temps de répondre à toutes les questions et donne des cas d'usage directement applicables en entreprise.",
    created_at: new Date().toISOString()
  },
  {
    id: "seed-3",
    name: "Aimé K.",
    role: "Data Analyst & Élève",
    rating: 5,
    comment: "Travailler avec Dona Eric est un accélérateur de carrière. La clarté des explications et l'exigence sur les bonnes pratiques MLOps font toute la différence !",
    created_at: new Date().toISOString()
  }
];

export const ReviewService = {
  getAll: async () => {
    try {
      const data = await request("reviews");
      if (data?.reviews && data.reviews.length > 0) {
        return data.reviews;
      }
      return DEFAULT_REVIEWS;
    } catch (error) {
      console.warn("[ReviewService] API call failed, using default reviews fallback:", error);
      return DEFAULT_REVIEWS;
    }
  },

  create: async (reviewData) => {
    try {
      return await request("reviews", "POST", reviewData);
    } catch (error) {
      console.error("[ReviewService] Error submitting review:", error);
      throw error;
    }
  }
};
