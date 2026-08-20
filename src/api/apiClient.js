export const API_BASE_URL = import.meta.env.VITE_API_URL || "https://donerick.onrender.com/api";

export async function request(endpoint, method = "GET", data = null) {
  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    // Nettoyage de l'endpoint pour éviter les doubles slashes
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    const response = await fetch(`${API_BASE_URL}/${cleanEndpoint}`, config);
    
    if (!response.ok) {
      let errData;
      try {
        errData = await response.json();
      } catch (e) {
        if (response.status === 429) {
          throw new Error("Trop de requêtes effectuées. Veuillez repatienter 2 à 3 minutes avant de réessayer.");
        }
        throw new Error(`Erreur serveur (${response.status}). Réessayez ultérieurement.`);
      }

      if (response.status === 429) {
        throw new Error(errData?.error || "Limite de tentatives atteinte. Veuillez patienter quelques minutes.");
      }

      throw new Error(errData?.error || errData?.message || errData?.detail || "Une erreur est survenue.");
    }
    return await response.json();
  } catch (err) {
    console.error(`[API Error] ${method} /${endpoint}:`, err.message);
    throw err;
  }
}
