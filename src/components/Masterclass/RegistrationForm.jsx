/**
 * ─────────────────────────────────────────────────────────────────
 *  COMPOSANT — RegistrationForm.jsx
 *  Formulaire d'inscription complet avec :
 *  - Validation temps réel
 *  - Checklist prérequis
 *  - États loading / success / error
 *  - Vérification doublon email live
 * ─────────────────────────────────────────────────────────────────
 */
import React from "react";

import { useState, useEffect, useRef } from "react";
import { useRegistration, checkEmailExists } from "../../hooks/useRegistration";
import { isOpen } from "../../config/masterclasses.config";

// Domaines proposés dans le select
const DOMAINS = [
  "Technologie & Informatique",
  "Finance & Banque",
  "Santé & Médecine",
  "Éducation & Formation",
  "Commerce & Vente",
  "Marketing & Communication",
  "Agriculture & Agroalimentaire",
  "Droit & Juridique",
  "Administration & Gouvernance",
  "ONG & Humanitaire",
  "Arts & Culture",
  "Entrepreneuriat",
  "Autre",
];

export default function RegistrationForm({ masterclass, onClose }) {
  const { register, status, error, successData, isLoading, isSuccess, seats } =
    useRegistration(masterclass.id);

  const formRef = useRef(null);

  // État du formulaire
  const [fields, setFields] = useState({
    first_name:   "",
    last_name:    "",
    email:        "",
    profession:   "",
    domain:       "",
    message:      "",
  });

  // Prérequis cochés
  const [checkedReqs, setCheckedReqs] = useState([]);
  const [allReqsChecked, setAllReqsChecked] = useState(false);

  // Validation email live
  const [emailStatus, setEmailStatus] = useState("idle"); // idle | checking | taken | ok
  const emailTimer = useRef(null);

  // Erreurs champ par champ
  const [fieldErrors, setFieldErrors] = useState({});

  // ── Mise à jour champs ─────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    // Effacer erreur du champ modifié
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // ── Vérification email live (debounce 600ms) ───────────────
  useEffect(() => {
    const email = fields.email;
    if (!email.includes("@") || !email.includes(".")) {
      setEmailStatus("idle");
      return;
    }

    setEmailStatus("checking");
    clearTimeout(emailTimer.current);
    emailTimer.current = setTimeout(async () => {
      const taken = await checkEmailExists(masterclass.id, email);
      setEmailStatus(taken ? "taken" : "ok");
    }, 600);

    return () => clearTimeout(emailTimer.current);
  }, [fields.email, masterclass.id]);

  // ── Prérequis ─────────────────────────────────────────────
  const toggleReq = (req) => {
    setCheckedReqs((prev) => {
      const next = prev.includes(req)
        ? prev.filter((r) => r !== req)
        : [...prev, req];
      setAllReqsChecked(next.length === masterclass.prerequisites.length);
      return next;
    });
  };

  const checkAll = () => {
    if (allReqsChecked) {
      setCheckedReqs([]);
      setAllReqsChecked(false);
    } else {
      setCheckedReqs([...masterclass.prerequisites]);
      setAllReqsChecked(true);
    }
  };

  // ── Validation ────────────────────────────────────────────
  const validate = () => {
    const errors = {};
    if (!fields.first_name.trim()) errors.first_name = "Prénom requis";
    if (!fields.last_name.trim())  errors.last_name  = "Nom requis";
    if (!fields.email.includes("@")) errors.email  = "Email invalide";
    if (!fields.profession.trim()) errors.profession = "Profession requise";
    if (!fields.domain)            errors.domain     = "Domaine requis";
    if (checkedReqs.length < masterclass.prerequisites.length) {
      errors.prerequisites = "Veuillez confirmer tous les prérequis";
    }
    if (emailStatus === "taken") {
      errors.email = "Cet email est déjà inscrit à cet événement";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ── Soumission ────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    await register({
      ...fields,
      prerequisites: checkedReqs,
    });
  };

  // ── Couleur du thème ──────────────────────────────────────
  const color = masterclass.themeColor;
  const closed = !isOpen(masterclass);

  // ── ÉTAT : Inscriptions closes ─────────────────────────────
  if (closed) {
    return (
      <div style={{ textAlign: "center", padding: "48px 24px" }}>
        <div style={{ fontSize: "64px", marginBottom: "16px" }}>🔒</div>
        <h3 style={{ margin: "0 0 8px", fontSize: "22px", color: "#111827" }}>
          Inscriptions closes
        </h3>
        <p style={{ margin: "0", color: "#6B7280" }}>
          Cet événement s'est déjà tenu. Restez connecté(e) pour les prochaines sessions !
        </p>
      </div>
    );
  }

  // ── ÉTAT : Succès ──────────────────────────────────────────
  if (isSuccess && successData) {
    return (
      <div className="reg-success" style={{ textAlign: "center", padding: "48px 24px" }}>
        <div style={{
          width: "80px", height: "80px", borderRadius: "50%",
          background: `${color}15`, border: `3px solid ${color}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 24px", fontSize: "36px",
        }}>✅</div>
        <h3 style={{ margin: "0 0 8px", fontSize: "24px", color: "#111827", fontWeight: "800" }}>
          Vous êtes inscrit(e) !
        </h3>
        <p style={{ margin: "0 0 24px", color: "#6B7280", fontSize: "16px", lineHeight: "1.6" }}>
          Bonjour <strong>{successData.name}</strong>, votre inscription à<br />
          <strong style={{ color }}>"{successData.masterclass}"</strong> est confirmée.
        </p>
        <div style={{
          background: "#F0FDF4", border: "1px solid #BBF7D0",
          borderRadius: "12px", padding: "16px 24px", marginBottom: "24px",
          fontSize: "15px", color: "#166534",
        }}>
          📧 Un email de confirmation a été envoyé à <strong>{successData.email}</strong>
        </div>
        {onClose && (
          <button onClick={onClose} style={{
            padding: "12px 32px", background: color, color: "#fff",
            border: "none", borderRadius: "8px", cursor: "pointer",
            fontWeight: "700", fontSize: "15px",
          }}>
            Fermer
          </button>
        )}
      </div>
    );
  }

  // ── FORMULAIRE ─────────────────────────────────────────────
  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

      {/* Places restantes */}
      {seats && seats.total > 0 && (
        <div style={{
          padding: "10px 16px", borderRadius: "8px", fontSize: "14px", fontWeight: "600",
          background: seats.remaining <= 5 ? "#FEF2F2" : "#EFF6FF",
          color:      seats.remaining <= 5 ? "#DC2626"  : "#1D4ED8",
          border:     `1px solid ${seats.remaining <= 5 ? "#FCA5A5" : "#BFDBFE"}`,
        }}>
          {seats.isFull
            ? "❌ Événement complet — plus de places disponibles"
            : `🎫 ${seats.remaining} place${seats.remaining > 1 ? "s" : ""} restante${seats.remaining > 1 ? "s" : ""} sur ${seats.total}`}
        </div>
      )}

      {/* Erreur globale */}
      {error && (
        <div style={{
          padding: "12px 16px", borderRadius: "8px", fontSize: "14px",
          background: "#FEF2F2", color: "#DC2626", border: "1px solid #FCA5A5",
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* ── Nom & Prénom ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <Field
          label="Prénom *"
          name="first_name"
          value={fields.first_name}
          onChange={handleChange}
          error={fieldErrors.first_name}
          placeholder="Jean"
          color={color}
        />
        <Field
          label="Nom *"
          name="last_name"
          value={fields.last_name}
          onChange={handleChange}
          error={fieldErrors.last_name}
          placeholder="Dupont"
          color={color}
        />
      </div>

      {/* ── Email ── */}
      <div>
        <label style={labelStyle}>Email *</label>
        <div style={{ position: "relative" }}>
          <input
            type="email"
            name="email"
            value={fields.email}
            onChange={handleChange}
            placeholder="jean.dupont@email.com"
            style={{
              ...inputStyle,
              borderColor: fieldErrors.email ? "#DC2626"
                : emailStatus === "ok"   ? "#10B981"
                : emailStatus === "taken" ? "#DC2626"
                : "#E5E7EB",
            }}
          />
          {/* Indicateur status email */}
          {emailStatus !== "idle" && (
            <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "18px" }}>
              {emailStatus === "checking" ? "⏳" : emailStatus === "ok" ? "✅" : "❌"}
            </span>
          )}
        </div>
        {fieldErrors.email && <ErrorMsg>{fieldErrors.email}</ErrorMsg>}
        {emailStatus === "taken" && !fieldErrors.email && (
          <ErrorMsg>Cet email est déjà inscrit à cet événement</ErrorMsg>
        )}
      </div>

      {/* ── Profession ── */}
      <Field
        label="Profession *"
        name="profession"
        value={fields.profession}
        onChange={handleChange}
        error={fieldErrors.profession}
        placeholder="Ex: Ingénieur, Enseignant, Entrepreneur..."
        color={color}
      />

      {/* ── Domaine ── */}
      <div>
        <label style={labelStyle}>Domaine d'activité *</label>
        <select
          name="domain"
          value={fields.domain}
          onChange={handleChange}
          style={{
            ...inputStyle,
            borderColor: fieldErrors.domain ? "#DC2626" : "#E5E7EB",
            appearance: "none",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 12px center",
          }}
        >
          <option value="">— Sélectionnez votre domaine —</option>
          {DOMAINS.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        {fieldErrors.domain && <ErrorMsg>{fieldErrors.domain}</ErrorMsg>}
      </div>

      {/* ── Message (optionnel) ── */}
      <div>
        <label style={labelStyle}>
          Message / Question (optionnel)
        </label>
        <textarea
          name="message"
          value={fields.message}
          onChange={handleChange}
          placeholder="Une question particulière ? Quelque chose de spécifique que vous souhaitez apprendre ?"
          rows={3}
          style={{
            ...inputStyle,
            resize: "vertical",
            minHeight: "80px",
          }}
        />
        <span style={{ fontSize: "12px", color: "#9CA3AF" }}>
          {fields.message.length}/500 caractères
        </span>
      </div>

      {/* ── Prérequis ── */}
      <div style={{
        background: "#F9FAFB",
        border: `1px solid ${fieldErrors.prerequisites ? "#FCA5A5" : "#E5E7EB"}`,
        borderRadius: "12px",
        padding: "20px",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <label style={{ ...labelStyle, margin: 0 }}>
            ✅ Vérification des prérequis *
          </label>
          <button
            type="button"
            onClick={checkAll}
            style={{
              padding: "4px 12px", fontSize: "12px", cursor: "pointer",
              background: allReqsChecked ? "#F3F4F6" : color,
              color: allReqsChecked ? "#374151" : "#fff",
              border: "none", borderRadius: "6px", fontWeight: "600",
            }}
          >
            {allReqsChecked ? "Tout décocher" : "Tout cocher"}
          </button>
        </div>
        <p style={{ margin: "0 0 12px", fontSize: "13px", color: "#6B7280" }}>
          Confirmez que vous remplissez les conditions nécessaires pour participer :
        </p>
        {masterclass.prerequisites.map((req, i) => (
          <label key={i} style={{
            display: "flex", alignItems: "flex-start", gap: "12px",
            padding: "10px 0", cursor: "pointer",
            borderBottom: i < masterclass.prerequisites.length - 1 ? "1px solid #E5E7EB" : "none",
          }}>
            <div style={{
              width: "20px", height: "20px", borderRadius: "4px", flexShrink: 0,
              border: `2px solid ${checkedReqs.includes(req) ? color : "#D1D5DB"}`,
              background: checkedReqs.includes(req) ? color : "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginTop: "1px", transition: "all 0.15s",
            }}>
              {checkedReqs.includes(req) && (
                <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                  <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              )}
            </div>
            <input
              type="checkbox"
              checked={checkedReqs.includes(req)}
              onChange={() => toggleReq(req)}
              style={{ display: "none" }}
            />
            <span style={{ fontSize: "14px", color: "#374151", lineHeight: "1.5" }}>{req}</span>
          </label>
        ))}
        {fieldErrors.prerequisites && (
          <ErrorMsg>{fieldErrors.prerequisites}</ErrorMsg>
        )}
      </div>

      {/* ── Bouton Submit ── */}
      <button
        type="submit"
        disabled={isLoading || (seats && seats.isFull) || emailStatus === "taken"}
        style={{
          padding: "16px 32px",
          background: isLoading ? "#9CA3AF" : color,
          color: "#fff",
          border: "none",
          borderRadius: "10px",
          cursor: isLoading ? "not-allowed" : "pointer",
          fontWeight: "800",
          fontSize: "16px",
          letterSpacing: "0.3px",
          transition: "all 0.2s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        {isLoading ? (
          <>
            <Spinner /> Inscription en cours...
          </>
        ) : (
          <>🎯 Confirmer mon inscription</>
        )}
      </button>

      <p style={{ margin: "0", textAlign: "center", fontSize: "12px", color: "#9CA3AF" }}>
        Vous recevrez un email de confirmation automatique après inscription.
        <br />Vos données ne sont jamais partagées.
      </p>
    </form>
  );
}

// ── Sous-composants réutilisables ──────────────────────────────

function Field({ label, name, value, onChange, error, placeholder, type = "text", color }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          ...inputStyle,
          borderColor: error ? "#DC2626" : "#E5E7EB",
        }}
      />
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </div>
  );
}

function ErrorMsg({ children }) {
  return (
    <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#DC2626" }}>
      {children}
    </p>
  );
}

function Spinner() {
  return (
    <div style={{
      width: "16px", height: "16px",
      border: "2px solid rgba(255,255,255,0.3)",
      borderTopColor: "#fff",
      borderRadius: "50%",
      animation: "spin 0.8s linear infinite",
    }} />
  );
}

// ── Styles partagés ────────────────────────────────────────────

const labelStyle = {
  display: "block",
  marginBottom: "6px",
  fontSize: "14px",
  fontWeight: "600",
  color: "#374151",
};

const inputStyle = {
  width: "100%",
  padding: "11px 14px",
  fontSize: "15px",
  color: "#111827",
  background: "#fff",
  border: "1.5px solid #E5E7EB",
  borderRadius: "8px",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.15s",
};
