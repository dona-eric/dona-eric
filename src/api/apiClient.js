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
        throw new Error(`HTTP Error: ${response.status}`);
      }
      throw new Error(errData.error || errData.detail || "Erreur API");
    }
    return await response.json();
  } catch (err) {
    console.error(`[API Error] ${method} /${endpoint}:`, err.message);
    throw err;
  }
}
