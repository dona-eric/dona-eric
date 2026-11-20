import { request } from "./apiClient";

/**
 * Send a message to the portfolio AI assistant via the backend proxy.
 * The API key is stored securely on the server — never exposed to the client.
 *
 * @param {string} message - The user's message
 * @param {Array} history - Previous conversation messages [{role, content}]
 * @returns {Promise<string>} The assistant's reply
 */
const isFr = () => typeof document !== "undefined" && document.documentElement.lang === "fr";

export async function sendToGroq(message, history = []) {
  try {
    const data = await request("chat", "POST", { message, history });
    return data.reply || (isFr() ? "⚠️ Aucune réponse disponible." : "⚠️ No answer available.");
  } catch (err) {
    console.error("❌ Erreur Chat API:", err.message);
    return isFr() ? "Erreur, veuillez réessayer plus tard." : "Something went wrong, please try again later.";
  }
}
