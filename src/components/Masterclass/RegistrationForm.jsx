import React, { useState, useEffect, useRef } from "react";
import { useRegistration, checkEmailExists } from "../../hooks/useRegistration";

const DOMAINS = [
  "Technologie & Informatique", "Finance & Banque", "Santé & Médecine",
  "Éducation & Formation", "Commerce & Vente", "Marketing & Communication",
  "Agriculture & Agroalimentaire", "Droit & Juridique", "Administration & Gouvernance",
  "ONG & Humanitaire", "Arts & Culture", "Entrepreneuriat", "Autre",
];

export default function RegistrationForm({ masterclass, onClose }) {
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
    if (!fields.first_name.trim()) errors.first_name = "Prénom requis";
    if (!fields.last_name.trim())  errors.last_name  = "Nom requis";
    if (!fields.email.includes("@")) errors.email  = "Email invalide";
    if (!fields.profession.trim()) errors.profession = "Profession requise";
    if (!fields.domain)            errors.domain     = "Domaine requis";
    if (checkedReqs.length < masterclass.prerequisites.length) errors.prerequisites = "Confirmez les prérequis";
    if (emailStatus === "taken") errors.email = "Déjà inscrit";
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
        <h3 style={{ margin: "0 0 10px", fontSize: "22px", fontWeight: "800", color: "#ffffff", fontFamily: "'Space Grotesk', sans-serif" }}>Bienvenue à bord !</h3>
        <p style={{ color: "#94a3b8", fontFamily: "'Inter', sans-serif" }}>Votre inscription pour <strong>{successData.masterclass}</strong> est confirmée.</p>
        
        {/* Avertissement si l'email de confirmation n'a pas pu être envoyé */}
        {emailSent === false && (
          <div style={{ 
            marginTop: "20px", padding: "14px 20px", borderRadius: "10px",
            background: "rgba(245, 158, 11, 0.1)", border: "1px solid rgba(245, 158, 11, 0.3)",
            color: "#f59e0b", fontSize: "14px", textAlign: "left", lineHeight: "1.5"
          }}>
            <strong>⚠️ Email non envoyé</strong><br />
            Votre inscription est bien enregistrée, mais l'email de confirmation n'a pas pu être envoyé. 
            Vérifiez vos spams ou contactez-nous à <strong>dtech.afrik@gmail.com</strong>.
          </div>
        )}

        <button onClick={onClose} style={{ marginTop: "32px", padding: "14px 32px", background: color, color: "#000000", border: "none", borderRadius: "8px", fontWeight: "700", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>Fermer</button>
      </div>
    );
  }

  return (
    <div style={{ margin: "0 auto", color: "#e2e8f0", fontFamily: "'Inter', sans-serif" }}>
      <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        
        {/* Places restantes */}
        {seats && (
          <div style={{ padding: "12px", borderRadius: "8px", fontSize: "14px", fontWeight: "700", textAlign: "center", background: seats.remaining <= 5 ? "rgba(239,68,68,0.1)" : "rgba(16,185,129,0.1)", color: seats.remaining <= 5 ? "#ef4444" : "#10b981", border: `1px solid ${seats.remaining <= 5 ? "rgba(239,68,68,0.3)" : "rgba(16,185,129,0.3)"}` }}>
            {seats.isFull ? "⚠️ Événement Complet" : `🎫 ${seats.remaining} places restantes`}
          </div>
        )}

        {/* Ligne 1 : Nom & Prénom */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <Field label="Prénom *" name="first_name" value={fields.first_name} onChange={handleChange} error={fieldErrors.first_name} color={color} placeholder="Jean" />
          <Field label="Nom *" name="last_name" value={fields.last_name} onChange={handleChange} error={fieldErrors.last_name} color={color} placeholder="Dupont" />
        </div>

        {/* Ligne 2 : Email */}
        <div>
          <label style={{ display: "block", marginBottom: "8px", fontSize: "12px", fontWeight: "600", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" }}>Email Professionnel *</label>
          <div style={{ position: "relative" }}>
            <input type="email" name="email" value={fields.email} onChange={handleChange} placeholder="nom@entreprise.com" style={{ width: "100%", padding: "14px", fontSize: "15px", border: `1px solid ${fieldErrors.email || emailStatus === "taken" ? "#ef4444" : (emailStatus === "ok" ? "#10b981" : "rgba(255,255,255,0.1)")}`, borderRadius: "8px", background: "rgba(255,255,255,0.03)", color: "#ffffff", outline: "none", boxSizing: "border-box" }} />
            {emailStatus !== "idle" && <span style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)" }}>{emailStatus === "checking" ? "⏳" : emailStatus === "ok" ? "✅" : "❌"}</span>}
          </div>
          {(fieldErrors.email || emailStatus === "taken") && <ErrorMsg>{fieldErrors.email || "Cet email est déjà inscrit"}</ErrorMsg>}
        </div>

        {/* Ligne 3 : Profession & Domaine */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <Field label="Profession *" name="profession" value={fields.profession} onChange={handleChange} error={fieldErrors.profession} color={color} placeholder="Ex: Data Engineer" />
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "12px", fontWeight: "600", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" }}>Domaine *</label>
            <select name="domain" value={fields.domain} onChange={handleChange} style={{ width: "100%", padding: "14px", fontSize: "15px", border: `1px solid ${fieldErrors.domain ? "#ef4444" : "rgba(255,255,255,0.1)"}`, borderRadius: "8px", background: "rgba(15,23,42,0.95)", color: "#ffffff", outline: "none", boxSizing: "border-box", appearance: "none" }}>
              <option value="">— Sélectionner —</option>
              {DOMAINS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            {fieldErrors.domain && <ErrorMsg>{fieldErrors.domain}</ErrorMsg>}
          </div>
        </div>

        {/* Ligne 4 : Message */}
        <div>
          <label style={{ display: "block", marginBottom: "8px", fontSize: "12px", fontWeight: "600", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" }}>Une question pour l'instructeur ?</label>
          <textarea name="message" value={fields.message} onChange={handleChange} rows={3} style={{ width: "100%", padding: "14px", fontSize: "15px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", background: "rgba(255,255,255,0.03)", color: "#ffffff", outline: "none", boxSizing: "border-box", resize: "none" }} placeholder="Facultatif..." />
        </div>

        {/* Ligne 5 : Prérequis */}
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "12px", padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
            <span style={{ fontSize: "13px", fontWeight: "700", color: "#e2e8f0" }}>✅ PRÉREQUIS</span>
            <button type="button" onClick={checkAll} style={{ background: "none", border: "none", color: color, fontSize: "12px", fontWeight: "700", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>{allReqsChecked ? "Décocher" : "Tout cocher"}</button>
          </div>
          {masterclass.prerequisites.map((req, i) => (
            <label key={i} style={{ display: "flex", gap: "12px", padding: "8px 0", cursor: "pointer", fontSize: "13px", alignItems: "flex-start" }}>
              <input type="checkbox" checked={checkedReqs.includes(req)} onChange={() => toggleReq(req)} style={{ marginTop: "4px", accentColor: color }} />
              <span style={{ color: "#cbd5e1", lineHeight: "1.5" }}>{req}</span>
            </label>
          ))}
          {fieldErrors.prerequisites && <ErrorMsg>{fieldErrors.prerequisites}</ErrorMsg>}
        </div>

        <button type="submit" disabled={isLoading || (seats && seats.isFull) || emailStatus === "taken"} 
          style={{ 
            padding: "16px", background: isLoading ? "rgba(255,255,255,0.1)" : color, color: isLoading ? "#94a3b8" : "#000000", 
            border: "none", borderRadius: "8px", fontWeight: "700", fontSize: "16px", cursor: (isLoading || emailStatus === "taken" || (seats && seats.isFull)) ? "not-allowed" : "pointer",
            width: "100%", alignSelf: "center", boxShadow: isLoading ? "none" : `0 4px 20px ${color}40`, fontFamily: "'Inter', sans-serif", transition: "all 0.3s ease"
          }}>
          {isLoading ? "Vérification..." : "🎯 Confirmer mon inscription"}
        </button>
      </form>
    </div>
  );
}

function Field({ label, name, value, onChange, error, placeholder }) {
  return (
    <div style={{ flex: 1 }}>
      <label style={{ display: "block", marginBottom: "8px", fontSize: "12px", fontWeight: "600", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>
      <input type="text" name={name} value={value} onChange={onChange} placeholder={placeholder} style={{ width: "100%", padding: "14px", fontSize: "15px", border: `1px solid ${error ? "#ef4444" : "rgba(255,255,255,0.1)"}`, borderRadius: "8px", background: "rgba(255,255,255,0.03)", color: "#ffffff", outline: "none", boxSizing: "border-box" }} />
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </div>
  );
}

function ErrorMsg({ children }) {
  return <p style={{ margin: "6px 0 0", fontSize: "12px", color: "#ef4444", fontWeight: "600" }}>{children}</p>;
}