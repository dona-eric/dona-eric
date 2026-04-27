import React from "react";

import { useState, useEffect } from "react";
import { db } from "./databaseService";
import { sendConfirmationEmail } from "./emailService";
import { isRegistrationOpen } from "./masterclassData";

// ============================================================
// 📝 FORMULAIRE D'INSCRIPTION — Masterclass/Webinaire
// ============================================================

const DOMAINS = [
  "Marketing & Communication",
  "Finance & Comptabilité",
  "Ressources Humaines",
  "Informatique & Tech",
  "Commerce & Vente",
  "Éducation & Formation",
  "Santé & Médical",
  "Juridique & Conseil",
  "Entrepreneuriat",
  "Art & Créativité",
  "Ingénierie",
  "Autre",
];

export default function RegistrationForm({ masterclass, onClose, onSuccess }) {
  const [step, setStep] = useState(1); // 1: form, 2: prerequisites, 3: success
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [participantCount, setParticipantCount] = useState(0);

  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    profession: "",
    domaine: "",
    message: "",
  });

  const [prereqs, setPrereqs] = useState(
    masterclass.prerequisites.reduce((acc, p) => ({ ...acc, [p.id]: false }), {})
  );

  useEffect(() => {
    db.countParticipants(masterclass.id).then(setParticipantCount);
  }, [masterclass.id]);

  const registrationOpen = isRegistrationOpen(masterclass);
  const spotsLeft = masterclass.maxParticipants - participantCount;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validateStep1 = () => {
    if (!form.nom.trim()) return "Le nom est requis.";
    if (!form.prenom.trim()) return "Le prénom est requis.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return "Un email valide est requis.";
    if (!form.profession.trim()) return "La profession est requise.";
    if (!form.domaine) return "Le domaine d'activité est requis.";
    return null;
  };

  const handleNextStep = () => {
    const err = validateStep1();
    if (err) return setError(err);
    setStep(2);
  };

  const requiredPrereqs = masterclass.prerequisites.filter((p) => p.required);
  const allRequiredChecked = requiredPrereqs.every((p) => prereqs[p.id]);

  const handleSubmit = async () => {
    if (!allRequiredChecked) {
      setError("Veuillez cocher tous les prérequis obligatoires.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Vérifier inscription existante
      const alreadyRegistered = await db.checkAlreadyRegistered(form.email, masterclass.id);
      if (alreadyRegistered) {
        setError("Cet email est déjà inscrit à cette masterclass.");
        setLoading(false);
        return;
      }

      // Vérifier places disponibles
      if (spotsLeft <= 0) {
        setError("Désolé, il n'y a plus de places disponibles.");
        setLoading(false);
        return;
      }

      // Sauvegarder en base
      const participant = await db.saveParticipant({
        ...form,
        email: form.email.toLowerCase(),
        masterclassId: masterclass.id,
        masterclassTitle: masterclass.title,
        prerequisitesMet: prereqs,
      });

      // Envoyer email de confirmation (asynchrone, non bloquant)
      sendConfirmationEmail(participant, masterclass).then((result) => {
        if (!result.success) console.warn("Email non envoyé, mais inscription OK");
      });

      setStep(3);
      if (onSuccess) onSuccess(participant);
    } catch (err) {
      if (err.message === "ALREADY_REGISTERED") {
        setError("Vous êtes déjà inscrit(e) à cette masterclass.");
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.");
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  // ────────────────────────── RENDU ──────────────────────────

  if (!registrationOpen) {
    return (
      <div style={styles.overlay}>
        <div style={styles.modal}>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🔒</div>
            <h2 style={{ color: "#f1f5f9", marginBottom: 8 }}>Inscriptions closes</h2>
            <p style={{ color: "#94a3b8" }}>
              La date de cette masterclass est passée. Consultez la prochaine session ci-dessous.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={styles.modal}>
        {/* Header */}
        <div style={styles.modalHeader}>
          <div>
            <p style={{ color: "#a78bfa", fontSize: 12, marginBottom: 4, fontWeight: 600 }}>
              INSCRIPTION
            </p>
            <h2 style={{ color: "#f1f5f9", fontSize: 18, margin: 0 }}>{masterclass.title}</h2>
          </div>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* Progress bar */}
        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: step === 1 ? "50%" : step === 2 ? "100%" : "100%" }} />
        </div>

        <div style={styles.modalBody}>
          {/* ── ÉTAPE 1 : Formulaire ── */}
          {step === 1 && (
            <div>
              <p style={styles.stepLabel}>Étape 1 / 2 — Vos informations</p>

              {spotsLeft <= 20 && spotsLeft > 0 && (
                <div style={styles.urgencyBadge}>
                  ⚡ Plus que {spotsLeft} places disponibles !
                </div>
              )}

              <div style={styles.row}>
                <div style={styles.field}>
                  <label style={styles.label}>Nom *</label>
                  <input
                    name="nom"
                    value={form.nom}
                    onChange={handleChange}
                    placeholder="DUPONT"
                    style={styles.input}
                  />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Prénom *</label>
                  <input
                    name="prenom"
                    value={form.prenom}
                    onChange={handleChange}
                    placeholder="Jean"
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Email *</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jean.dupont@email.com"
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Profession *</label>
                <input
                  name="profession"
                  value={form.profession}
                  onChange={handleChange}
                  placeholder="Ex: Consultant, Entrepreneur, Étudiant..."
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Domaine d'activité *</label>
                <select
                  name="domaine"
                  value={form.domaine}
                  onChange={handleChange}
                  style={{ ...styles.input, appearance: "none", cursor: "pointer" }}
                >
                  <option value="">Sélectionnez votre domaine</option>
                  {DOMAINS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Message (optionnel)</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Vos attentes, questions spécifiques..."
                  rows={3}
                  style={{ ...styles.input, resize: "none" }}
                />
              </div>

              {error && <p style={styles.errorMsg}>{error}</p>}

              <button style={styles.primaryBtn} onClick={handleNextStep}>
                Continuer →
              </button>
            </div>
          )}

          {/* ── ÉTAPE 2 : Prérequis ── */}
          {step === 2 && (
            <div>
              <p style={styles.stepLabel}>Étape 2 / 2 — Vérification des prérequis</p>
              <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 20 }}>
                Cochez les prérequis que vous remplissez pour tirer le meilleur parti de la session.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {masterclass.prerequisites.map((prereq) => (
                  <label
                    key={prereq.id}
                    style={{
                      ...styles.prereqItem,
                      borderColor: prereqs[prereq.id]
                        ? "#7c3aed"
                        : prereq.required
                        ? "#4b5563"
                        : "#374151",
                      background: prereqs[prereq.id]
                        ? "rgba(124,58,237,0.1)"
                        : "rgba(255,255,255,0.02)",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={prereqs[prereq.id]}
                      onChange={() =>
                        setPrereqs({ ...prereqs, [prereq.id]: !prereqs[prereq.id] })
                      }
                      style={{ accentColor: "#7c3aed", width: 18, height: 18 }}
                    />
                    <span style={{ color: "#e2e8f0", fontSize: 14 }}>
                      {prereq.label}
                      {prereq.required && (
                        <span style={{ color: "#a78bfa", marginLeft: 6, fontSize: 11 }}>
                          *obligatoire
                        </span>
                      )}
                    </span>
                  </label>
                ))}
              </div>

              {error && <p style={styles.errorMsg}>{error}</p>}

              <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                <button
                  style={styles.secondaryBtn}
                  onClick={() => setStep(1)}
                >
                  ← Retour
                </button>
                <button
                  style={{
                    ...styles.primaryBtn,
                    flex: 1,
                    opacity: loading ? 0.7 : 1,
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "⏳ Inscription en cours..." : "✅ Confirmer mon inscription"}
                </button>
              </div>
            </div>
          )}

          {/* ── ÉTAPE 3 : Succès ── */}
          {step === 3 && (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={styles.successIcon}>🎉</div>
              <h2 style={{ color: "#f1f5f9", marginBottom: 8 }}>Inscription confirmée !</h2>
              <p style={{ color: "#94a3b8", marginBottom: 16 }}>
                Un email de confirmation a été envoyé à <strong style={{ color: "#a78bfa" }}>{form.email}</strong>.
              </p>
              <div style={styles.successCard}>
                <p style={{ color: "#e2e8f0", margin: "4px 0" }}>
                  📅 {new Date(masterclass.date).toLocaleDateString("fr-FR", {
                    weekday: "long", day: "numeric", month: "long", year: "numeric"
                  })}
                </p>
                <p style={{ color: "#e2e8f0", margin: "4px 0" }}>
                  ⏰ {new Date(masterclass.date).toLocaleTimeString("fr-FR", {
                    hour: "2-digit", minute: "2-digit"
                  })}
                </p>
                <p style={{ color: "#e2e8f0", margin: "4px 0" }}>
                  💻 {masterclass.platform}
                </p>
              </div>
              <p style={{ color: "#64748b", fontSize: 13 }}>
                Vérifiez vos spams si vous ne recevez pas l'email sous 5 minutes.
              </p>
              <button style={{ ...styles.primaryBtn, marginTop: 16 }} onClick={onClose}>
                Fermer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ────────────────────────── STYLES ──────────────────────────
const styles = {
  overlay: {
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)",
    backdropFilter: "blur(8px)", display: "flex", alignItems: "center",
    justifyContent: "center", zIndex: 1000, padding: 16,
  },
  modal: {
    background: "#0f172a", borderRadius: 20, width: "100%", maxWidth: 520,
    maxHeight: "90vh", overflowY: "auto", border: "1px solid rgba(124,58,237,0.3)",
    boxShadow: "0 25px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,58,237,0.1)",
  },
  modalHeader: {
    display: "flex", alignItems: "flex-start", justifyContent: "space-between",
    padding: "20px 24px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  modalBody: { padding: "20px 24px 24px" },
  closeBtn: {
    background: "rgba(255,255,255,0.08)", border: "none", color: "#94a3b8",
    width: 32, height: 32, borderRadius: 8, cursor: "pointer", fontSize: 16,
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  progressBar: {
    height: 3, background: "rgba(124,58,237,0.2)", position: "relative",
  },
  progressFill: {
    height: "100%", background: "linear-gradient(90deg, #7c3aed, #a78bfa)",
    transition: "width 0.4s ease", borderRadius: 2,
  },
  stepLabel: { color: "#64748b", fontSize: 12, marginBottom: 16, fontWeight: 600 },
  row: { display: "flex", gap: 12 },
  field: { flex: 1, marginBottom: 14 },
  label: { display: "block", color: "#94a3b8", fontSize: 13, marginBottom: 6, fontWeight: 500 },
  input: {
    width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 10, padding: "10px 14px", color: "#f1f5f9", fontSize: 14,
    outline: "none", boxSizing: "border-box",
    transition: "border-color 0.2s",
  },
  primaryBtn: {
    width: "100%", background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
    border: "none", borderRadius: 12, padding: "14px", color: "white",
    fontSize: 15, fontWeight: 600, cursor: "pointer", marginTop: 8,
    transition: "opacity 0.2s, transform 0.1s",
  },
  secondaryBtn: {
    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 12, padding: "14px 20px", color: "#94a3b8",
    fontSize: 14, cursor: "pointer",
  },
  errorMsg: {
    color: "#f87171", background: "rgba(248,113,113,0.1)", borderRadius: 8,
    padding: "10px 14px", fontSize: 13, marginTop: 8,
  },
  urgencyBadge: {
    background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)",
    color: "#fbbf24", borderRadius: 8, padding: "8px 12px", fontSize: 13,
    marginBottom: 16, textAlign: "center",
  },
  prereqItem: {
    display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
    borderRadius: 10, border: "1px solid", cursor: "pointer", transition: "all 0.2s",
  },
  successIcon: { fontSize: 64, marginBottom: 16 },
  successCard: {
    background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.3)",
    borderRadius: 12, padding: "16px", margin: "16px 0", textAlign: "left",
  },
};