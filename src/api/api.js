const BASE_URL = "http://localhost:8000/api" // ⚠️ changer en prod

async function request(endpoint, method = "GET", data = null) {
  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data) config.body = JSON.stringify(data);

  try {
    const response = await fetch(`${BASE_URL}/${endpoint}/`, config);
    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.detail || "Erreur API inconnue");
    }
    return await response.json();
  } catch (err) {
    console.error("API Error:", err.message);
    throw err;
  }
}

// Endpoints
export const api = {
  getArticles: () => request("articles"),
  getProjects: () => request("projects"),
  getTrainings: () => request("trainings"),
  getTrainers: () => request("trainers"),
  postSignup: (data) => request("signups", "POST", data),
  postContact: (data) => request("contacts", "POST", data),
  postNewsletter: (data) => request("newsletters", "POST", data),
};
