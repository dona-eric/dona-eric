import "../env.js";
import express from "express";

const router = express.Router();

/**
 * GET /api/customers
 * Récupère la liste des clients Chariow avec support de pagination et recherche.
 */
router.get("/", async (req, res) => {
  try {
    const COSMO_API_KEY = process.env.COSMO_API_KEY;
    const URL_BASE_COSMO = process.env.URL_BASE_COSMO || "https://api.chariow.com/v1";

    if (!COSMO_API_KEY) {
      return res.status(500).json({ error: "Configuration Chariow manquante sur le serveur (COSMO_API_KEY)." });
    }

    const { per_page = 20, search, start_date, end_date, cursor } = req.query;

    const queryParams = new URLSearchParams({ per_page });
    if (search) queryParams.append("search", search);
    if (start_date) queryParams.append("start_date", start_date);
    if (end_date) queryParams.append("end_date", end_date);
    if (cursor) queryParams.append("cursor", cursor);

    const response = await fetch(`${URL_BASE_COSMO}/customers?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${COSMO_API_KEY}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn("[Chariow Customers Non-200]", response.status, errText);
      return res.json({ customers: [], pagination: null });
    }

    const data = await response.json();
    const customers = Array.isArray(data.data?.data) 
      ? data.data.data 
      : (Array.isArray(data.data) ? data.data : []);
    const pagination = data.data?.pagination || data.pagination || null;

    return res.json({
      customers,
      pagination
    });
  } catch (error) {
    console.error("[Customers Route Error]", error);
    return res.status(500).json({ customers: [], error: error.message });
  }
});

export default router;
