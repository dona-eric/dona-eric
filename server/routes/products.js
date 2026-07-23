import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { COSMO_API_KEY, URL_BASE_COSMO } = process.env;
    
    if (!COSMO_API_KEY || !URL_BASE_COSMO) {
      return res.status(500).json({ error: "Configuration Chariow manquante sur le serveur." });
    }

    // Par défaut, on va récupérer les produits de type "downloadable", "course", "bundle", etc.
    // L'utilisateur n'a pas spécifié de filtre, on récupère tout pour l'instant.
    const url = `${URL_BASE_COSMO}/products?per_page=50`;
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${COSMO_API_KEY}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("[Chariow API Error]", response.status, errText);
      return res.status(response.status).json({ error: "Erreur lors de la récupération des produits Chariow." });
    }

    const data = await response.json();
    return res.json({ products: data.data || [] });
  } catch (error) {
    console.error("[Products Route Error]", error);
    return res.status(500).json({ error: "Erreur interne du serveur lors de la récupération des produits." });
  }
});

export default router;
