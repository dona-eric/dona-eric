import React, { useState, useEffect, useRef } from "react";
import { useRegistration, checkEmailExists } from "../../hooks/useRegistration";
import { useLanguage } from "../../context/LanguageContext";

// `value` stays in French so stored registrations remain consistent across languages.
const DOMAINS = [
  { value: "Technologie & Informatique", en: "Technology & IT" },
  { value: "Finance & Banque", en: "Finance & Banking" },
  { value: "Santé & Médecine", en: "Health & Medicine" },
  { value: "Éducation & Formation", en: "Education & Training" },
  { value: "Commerce & Vente", en: "Retail & Sales" },
  { value: "Marketing & Communication", en: "Marketing & Communication" },
  { value: "Agriculture & Agroalimentaire", en: "Agriculture & Food" },
  { value: "Droit & Juridique", en: "Law & Legal" },
  { value: "Administration & Gouvernance", en: "Public administration & Governance" },
  { value: "ONG & Humanitaire", en: "NGOs & Humanitarian" },
  { value: "Arts & Culture", en: "Arts & Culture" },
  { value: "Entrepreneuriat", en: "Entrepreneurship" },
  { value: "Autre", en: "Other" },
];

export default function RegistrationForm({ masterclass, onClose }) {
  const { lang, tr } = useLanguage();
  const { register, status, error, successData, isLoading, isSuccess, seats, emailSent } =
    useRegistration(masterclass.id);

  const [fields, setFields] = useState({
    first_name: "", last_name: "", email: "",
    profession: "", domain: "", message: "",
  });

  const [checkedReqs, setCheckedReqs] = useState([]);
  const [allReqsChecked, setAllReqsChecked] = useState(false);
  const [emailStatus, setEmailStatus] = useState("idle");
  const [fieldErrors, setFieldErrors] = useState({});
  const emailTimer = useRef(null);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) setFieldErrors(prev => ({ ...prev, [name]: "" }));
  };

  const toggleReq = (req) => {
    setCheckedReqs(prev => {
      const next = prev.includes(req) ? prev.filter(r => r !== req) : [...prev, req];
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

  const validate = () => {
    const errors = {};
    if (!fields.first_name.trim()) errors.first_name = tr("First name required", "Prénom requis");
    if (!fields.last_name.trim())  errors.last_name  = tr("Last name required", "Nom requis");
    if (!fields.email.includes("@")) errors.email  = tr("Invalid email", "Email invalide");
    if (!fields.profession.trim()) errors.profession = tr("Profession required", "Profession requise");
    if (!fields.domain)            errors.domain     = tr("Field required", "Domaine requis");
    if (checkedReqs.length < masterclass.prerequisites.length) errors.prerequisites = tr("Please confirm the prerequisites", "Confirmez les prérequis");
    if (emailStatus === "taken") errors.email = tr("Already registered", "Déjà inscrit");
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    await register({ ...fields, prerequisites: checkedReqs });
  };

  const color = masterclass.themeColor;

  if (isSuccess && successData) {
    return (
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <div style={{ fontSize: "50px", marginBottom: "16px" }}>✅</div>
        <h3 style={{ margin: "0 0 10px", fontSize: "22px", fontWeight: "800", color: "var(--q-ink)", fontFamily: "var(--q-font-display)" }}>{tr("Welcome aboard!", "Bienvenue à bord !")}</h3>
        <p style={{ color: "var(--q-ink-2)", fontFamily: "'Inter', sans-serif" }}>{tr("Your registration for", "Votre inscription pour")} <strong>{successData.masterclass}</strong> {tr("is confirmed.", "est confirmée.")}</p>
        
        {/* Avertissement si l'email de confirmation n'a pas pu être envoyé */}
        {emailSent === false && (
          <div style={{ 
            marginTop: "20px", padding: "14px 20px", borderRadius: "10px",
            background: "rgba(255,201,74,0.1)", border: "1px solid rgba(255,201,74,0.3)",
            color: "#ffc94a", fontSize: "14px", textAlign: "left", lineHeight: "1.5"
          }}>
            <strong>⚠️ {tr("Email not sent", "Email non envoyé")}</strong><br />
            {tr("Your registration is saved, but the confirmation email could not be sent. Check your spam folder or contact us at", "Votre inscription est bien enregistrée, mais l'email de confirmation n'a pas pu être envoyé. Vérifiez vos spams ou contactez-nous à")} <strong>dtech.afrik@gmail.com</strong>.
          </div>
        )}

        <button onClick={onClose} style={{ marginTop: "32px", padding: "14px 32px", background: color, color: "#000000", border: "none", borderRadius: "8px", fontWeight: "700", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>{tr("Close", "Fermer")}</button>
      </div>
    );
  }

  return (
    <div style={{ margin: "0 auto", color: "var(--text-secondary)", fontFamily: "'Inter', sans-serif" }}>
      <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        
        {/* Places restantes */}
        {seats && (
          <div style={{ padding: "12px", borderRadius: "8px", fontSize: "14px", fontWeight: "700", textAlign: "center", background: seats.remaining <= 5 ? "rgba(255,93,93,0.1)" : "rgba(212,255,58,0.1)", color: seats.remaining <= 5 ? "#ff5d5d" : "#d4ff3a", border: `1px solid ${seats.remaining <= 5 ? "rgba(255,93,93,0.3)" : "rgba(212,255,58,0.3)"}` }}>
            {seats.isFull ? tr("⚠️ Event full", "⚠️ Événement Complet") : tr(`🎫 ${seats.remaining} seats left`, `🎫 ${seats.remaining} places restantes`)}
          </div>
        )}

        {/* Ligne 1 : Nom & Prénom */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <Field label={tr("First name *", "Prénom *")} name="first_name" value={fields.first_name} onChange={handleChange} error={fieldErrors.first_name} color={color} placeholder={tr("Jane", "Jean")} />
          <Field label={tr("Last name *", "Nom *")} name="last_name" value={fields.last_name} onChange={handleChange} error={fieldErrors.last_name} color={color} placeholder={tr("Doe", "Dupont")} />
        </div>

        {/* Ligne 2 : Email */}
        <div>
          <label style={{ display: "block", marginBottom: "8px", fontSize: "12px", fontWeight: "600", color: "var(--q-ink-2)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{tr("Work email *", "Email Professionnel *")}</label>
          <div style={{ position: "relative" }}>
            <input type="email" name="email" value={fields.email} onChange={handleChange} placeholder={tr("name@company.com", "nom@entreprise.com")} style={{ width: "100%", padding: "14px", fontSize: "15px", border: `1px solid ${fieldErrors.email || emailStatus === "taken" ? "#ff5d5d" : (emailStatus === "ok" ? "#d4ff3a" : "color-mix(in srgb, var(--q-ink) 10%, transparent)")}`, borderRadius: "8px", background: "color-mix(in srgb, var(--q-ink) 3%, transparent)", color: "var(--q-ink)", outline: "none", boxSizing: "border-box" }} />
            {emailStatus !== "idle" && <span style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)" }}>{emailStatus === "checking" ? "⏳" : emailStatus === "ok" ? "✅" : "❌"}</span>}
          </div>
          {(fieldErrors.email || emailStatus === "taken") && <ErrorMsg>{fieldErrors.email || tr("This email is already registered", "Cet email est déjà inscrit")}</ErrorMsg>}
        </div>

        {/* Ligne 3 : Profession & Domaine */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <Field label="Profession *" name="profession" value={fields.profession} onChange={handleChange} error={fieldErrors.profession} color={color} placeholder={tr("e.g. Data Engineer", "Ex: Data Engineer")} />
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "12px", fontWeight: "600", color: "var(--q-ink-2)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{tr("Field *", "Domaine *")}</label>
            <select name="domain" value={fields.domain} onChange={handleChange} style={{ width: "100%", padding: "14px", fontSize: "15px", border: `1px solid ${fieldErrors.domain ? "#ff5d5d" : "color-mix(in srgb, var(--q-ink) 10%, transparent)"}`, borderRadius: "8px", background: "color-mix(in srgb, var(--q-surface) 95%, transparent)", color: "var(--q-ink)", outline: "none", boxSizing: "border-box", appearance: "none" }}>
              <option value="">— {tr("Select", "Sélectionner")} —</option>
              {DOMAINS.map((d) => <option key={d.value} value={d.value}>{lang === "fr" ? d.value : d.en}</option>)}
            </select>
            {fieldErrors.domain && <ErrorMsg>{fieldErrors.domain}</ErrorMsg>}
          </div>
        </div>

        {/* Ligne 4 : Message */}
        <div>
          <label style={{ display: "block", marginBottom: "8px", fontSize: "12px", fontWeight: "600", color: "var(--q-ink-2)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{tr("A question for the instructor?", "Une question pour l'instructeur ?")}</label>
          <textarea name="message" value={fields.message} onChange={handleChange} rows={3} style={{ width: "100%", padding: "14px", fontSize: "15px", border: "1px solid color-mix(in srgb, var(--q-ink) 10%, transparent)", borderRadius: "8px", background: "color-mix(in srgb, var(--q-ink) 3%, transparent)", color: "var(--q-ink)", outline: "none", boxSizing: "border-box", resize: "none" }} placeholder={tr("Optional…", "Facultatif...")} />
        </div>

        {/* Ligne 5 : Prérequis */}
        <div style={{ background: "color-mix(in srgb, var(--q-ink) 2%, transparent)", border: "1px solid color-mix(in srgb, var(--q-ink) 5%, transparent)", borderRadius: "12px", padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
            <span style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-secondary)" }}>✅ {tr("PREREQUISITES", "PRÉREQUIS")}</span>
            <button type="button" onClick={checkAll} style={{ background: "none", border: "none", color: color, fontSize: "12px", fontWeight: "700", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>{allReqsChecked ? tr("Uncheck all", "Décocher") : tr("Check all", "Tout cocher")}</button>
          </div>
          {masterclass.prerequisites.map((req, i) => (
            <label key={i} style={{ display: "flex", gap: "12px", padding: "8px 0", cursor: "pointer", fontSize: "13px", alignItems: "flex-start" }}>
              <input type="checkbox" checked={checkedReqs.includes(req)} onChange={() => toggleReq(req)} style={{ marginTop: "4px", accentColor: color }} />
              <span style={{ color: "var(--text-secondary)", lineHeight: "1.5" }}>{req}</span>
            </label>
          ))}
          {fieldErrors.prerequisites && <ErrorMsg>{fieldErrors.prerequisites}</ErrorMsg>}
        </div>

        <button type="submit" disabled={isLoading || (seats && seats.isFull) || emailStatus === "taken"} 
          style={{ 
            padding: "16px", background: isLoading ? "color-mix(in srgb, var(--q-ink) 10%, transparent)" : color, color: isLoading ? "var(--q-ink-2)" : "#000000", 
            border: "none", borderRadius: "8px", fontWeight: "700", fontSize: "16px", cursor: (isLoading || emailStatus === "taken" || (seats && seats.isFull)) ? "not-allowed" : "pointer",
            width: "100%", alignSelf: "center", boxShadow: isLoading ? "none" : `0 4px 20px ${color}40`, fontFamily: "'Inter', sans-serif", transition: "all 0.3s ease"
          }}>
          {isLoading ? tr("Checking…", "Vérification...") : tr("🎯 Confirm my registration", "🎯 Confirmer mon inscription")}
        </button>
      </form>
    </div>
  );
}

function Field({ label, name, value, onChange, error, placeholder }) {
  return (
    <div style={{ flex: 1 }}>
      <label style={{ display: "block", marginBottom: "8px", fontSize: "12px", fontWeight: "600", color: "var(--q-ink-2)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>
      <input type="text" name={name} value={value} onChange={onChange} placeholder={placeholder} style={{ width: "100%", padding: "14px", fontSize: "15px", border: `1px solid ${error ? "#ff5d5d" : "color-mix(in srgb, var(--q-ink) 10%, transparent)"}`, borderRadius: "8px", background: "color-mix(in srgb, var(--q-ink) 3%, transparent)", color: "var(--q-ink)", outline: "none", boxSizing: "border-box" }} />
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </div>
  );
}

function ErrorMsg({ children }) {
  return <p style={{ margin: "6px 0 0", fontSize: "12px", color: "#ff5d5d", fontWeight: "600" }}>{children}</p>;
}