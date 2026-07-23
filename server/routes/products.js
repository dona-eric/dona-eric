import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const COSMO_API_KEY = process.env.COSMO_API_KEY;
    const URL_BASE_COSMO = process.env.URL_BASE_COSMO || "https://api.chariow.com/v1";
    
    if (!COSMO_API_KEY) {
      console.error("[Products Route Error] COSMO_API_KEY is not defined in process.env");
      return res.status(500).json({ error: "Configuration Chariow manquante sur le serveur (COSMO_API_KEY)." });
    }

    let allProducts = [];
    let nextCursor = null;
    let hasMore = true;

    while (hasMore) {
      const cursorParam = nextCursor ? `&cursor=${encodeURIComponent(nextCursor)}` : "";
      const url = `${URL_BASE_COSMO}/products?per_page=100${cursorParam}`;
      
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
        if (allProducts.length > 0) break;
        return res.status(response.status).json({ error: `Erreur Chariow API (${response.status}): ${errText}` });
      }

      const data = await response.json();
      
      // Chariow API format: { message: "success", data: [...products], pagination: { next_cursor, has_more_pages } }
      const pageProducts = Array.isArray(data.data) ? data.data : (Array.isArray(data.data?.data) ? data.data.data : []);
      allProducts = allProducts.concat(pageProducts);

      const pagination = data.pagination || data.data?.pagination;
      const canContinue = pagination?.has_more_pages || pagination?.has_more;
      
      if (canContinue && pagination?.next_cursor) {
        nextCursor = pagination.next_cursor;
      } else {
        hasMore = false;
      }
    }

    return res.json({ products: allProducts });
  } catch (error) {
    console.error("[Products Route Error]", error);
    return res.status(500).json({ error: error.message || "Erreur interne du serveur lors de la récupération des produits." });
  }
});

export default router;


