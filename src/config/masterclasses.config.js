// ─────────────────────────────────────────────────────────────────
// Utilitaires Masterclass
// ─────────────────────────────────────────────────────────────────

/** Détermine si un masterclass est ouvert aux inscriptions */
export const isOpen = (mc, allEvents = []) => {
  // If we don't have allEvents to check chronological sequence, trust the server's boolean flag if it exists
  if (allEvents.length === 0 && mc && typeof mc.isOpen === "boolean") {
    return mc.isOpen;
  }

  if (!mc || !mc.date) return false;

  const now = new Date();
  
  const getDeadline = (item) => {
    if (!item.date) return new Date(0);
    return item.date.includes("T") ? new Date(item.date) : new Date(`${item.date}T16:00:00+01:00`);
  };

  const deadline = getDeadline(mc);
  if (deadline <= now) {
    return false;
  }

  if (allEvents && allEvents.length > 0) {
    const activeEvents = allEvents.filter(e => getDeadline(e) > now);
    activeEvents.sort((a, b) => getDeadline(a) - getDeadline(b));
    if (activeEvents.length > 0) {
      return activeEvents[0].id === mc.id;
    }
  }

  return true;
};

/** Retourne le masterclass actif le plus récent */
export const getFeatured = () =>
  MASTERCLASSES.find((mc) => isOpen(mc)) ?? MASTERCLASSES[0];

/** Formate la date en français */
export const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/** Résout dynamiquement l'URL de l'API */
export const getApiUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL || "https://donerick.onrender.com/api";
  if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
    return "http://localhost:3001/api";
  }
  return envUrl;
};
