import { request } from "../api/apiClient";

export const AcademyService = {
  /**
   * Pré-inscription à l'Academy
   * @param {Object} data Données du formulaire
   */
  register: async (data) => {
    return await request("academy/register", "POST", data);
  },

  /**
   * Récupère le nombre de pré-inscrits
   */
  getCount: async () => {
    try {
      return await request("academy/count");
    } catch {
      return { count: 0 };
    }
  },
};
