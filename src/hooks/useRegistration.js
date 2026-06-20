import { useState, useEffect, useCallback } from "react";
import { MasterclassService } from "../services/masterclassService";

/**
 * Hook principal pour la gestion des inscriptions
 * @param {string} masterclassId - ID du masterclass concerné
 */
export function useRegistration(masterclassId) {
  const [status, setStatus]         = useState("idle");   // idle | loading | success | error
  const [error, setError]           = useState(null);
  const [successData, setSuccess]   = useState(null);
  const [seats, setSeats]           = useState(null);

  // Récupère le nombre de places restantes au montage
  useEffect(() => {
    if (!masterclassId) return;

    MasterclassService.getRegistrationCount(masterclassId)
      .then(setSeats)
      .catch(() => {}); // Silencieux si hors ligne
  }, [masterclassId]);

  /**
   * Soumet le formulaire d'inscription
   * @param {Object} formData - Données du formulaire validées
   */
  const register = useCallback(async (formData) => {
    setStatus("loading");
    setError(null);

    try {
      const data = await MasterclassService.register({ masterclass_id: masterclassId, ...formData });

      setSuccess(data.data);
      setStatus("success");

      // Rafraîchir le compteur de places
      MasterclassService.getRegistrationCount(masterclassId)
        .then(setSeats)
        .catch(() => {});

      return true;

    } catch (err) {
      const errMessage = err.message || "";
      // Codes d'erreur spécifiques
      if (errMessage.includes("DUPLICATE_EMAIL")) {
        setError("Vous êtes déjà inscrit(e) avec cet email !");
      } else if (errMessage.includes("REGISTRATIONS_CLOSED")) {
        setError("Les inscriptions sont closes pour cet événement.");
      } else if (errMessage.includes("NO_SEATS")) {
        setError("Toutes les places sont prises. Désolé !");
      } else {
        setError(errMessage || "Impossible de contacter le serveur. Vérifiez votre connexion.");
      }
      setStatus("error");
      return false;
    }
  }, [masterclassId]);

  const reset = useCallback(() => {
    setStatus("idle");
    setError(null);
    setSuccess(null);
  }, []);

  return {
    register,
    reset,
    status,
    error,
    successData,
    isLoading:  status === "loading",
    isSuccess:  status === "success",
    isError:    status === "error",
    seats,      // { registered, total, remaining, isFull }
  };
}

/**
 * Vérifie en temps réel si un email est déjà inscrit
 * (Utilisé pour le feedback live dans le formulaire)
 */
export async function checkEmailExists(masterclassId, email) {
  if (!email || !email.includes("@")) return false;
  try {
    const data = await MasterclassService.checkRegistration(masterclassId, email);
    return data.alreadyRegistered;
  } catch {
    return false;
  }
}
