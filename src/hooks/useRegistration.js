import { useState, useEffect, useCallback } from "react";

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? "https://donerick.onrender.com/api" : "http://localhost:3001/api");

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

    fetch(`${API_URL}/count/${masterclassId}`)
      .then((r) => r.json())
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
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ masterclass_id: masterclassId, ...formData }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Codes d'erreur spécifiques
        if (data.code === "DUPLICATE_EMAIL") {
          setError("Vous êtes déjà inscrit(e) avec cet email !");
        } else if (data.code === "REGISTRATIONS_CLOSED") {
          setError("Les inscriptions sont closes pour cet événement.");
        } else if (data.code === "NO_SEATS") {
          setError("Toutes les places sont prises. Désolé !");
        } else {
          setError(data.error || "Une erreur est survenue.");
        }
        setStatus("error");
        return false;
      }

      setSuccess(data.data);
      setStatus("success");

      // Rafraîchir le compteur de places
      fetch(`${API_URL}/count/${masterclassId}`)
        .then((r) => r.json())
        .then(setSeats)
        .catch(() => {});

      return true;

    } catch (err) {
      setError("Impossible de contacter le serveur. Vérifiez votre connexion.");
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
    const r = await fetch(`${API_URL}/check/${masterclassId}?email=${encodeURIComponent(email)}`);
    const data = await r.json();
    return data.alreadyRegistered;
  } catch {
    return false;
  }
}
