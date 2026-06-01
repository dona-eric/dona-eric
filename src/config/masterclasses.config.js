// ─────────────────────────────────────────────────────────────────
// Utilitaires Masterclass
// ─────────────────────────────────────────────────────────────────

/** Détermine si un masterclass est ouvert aux inscriptions */
export const isOpen = (mc) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventDate = new Date(mc.date);
  eventDate.setHours(0, 0, 0, 0);
  return eventDate >= today;
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
