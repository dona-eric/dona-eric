import { request } from "../api/apiClient";

export const MasterclassService = {
  /**
   * Récupère la liste de toutes les masterclasses
   * @returns {Promise<Array>} Liste des masterclasses
   */
  getAll: async () => {
    try {
      return await request("masterclasses");
    } catch (error) {
      console.error("MasterclassService.getAll error:", error);
      return [];
    }
  },

  /**
   * Récupère une masterclass par son ID
   * @param {string} id ID de la masterclass
   * @returns {Promise<Object|null>}
   */
  getById: async (id) => {
    try {
      return await request(`masterclasses/${id}`);
    } catch (error) {
      console.error(`MasterclassService.getById(${id}) error:`, error);
      return null;
    }
  },

  /**
   * Inscrit un utilisateur à une masterclass
   * @param {Object} data Données d'inscription (name, email, masterclassId, etc.)
   */
  register: async (data) => {
    return await request("register", "POST", data);
  },

  /**
   * Vérifie si un email est déjà inscrit à une masterclass
   * @param {string} masterclassId
   * @param {string} email
   */
  checkRegistration: async (masterclassId, email) => {
    return await request(`check/${masterclassId}?email=${encodeURIComponent(email)}`);
  },

  /**
   * Récupère le nombre d'inscrits à une masterclass
   * @param {string} masterclassId
   */
  getRegistrationCount: async (masterclassId) => {
    return await request(`count/${masterclassId}`);
  }
};
