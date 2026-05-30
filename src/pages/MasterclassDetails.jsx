import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import RegistrationForm from "../components/Masterclass/RegistrationForm";
import PageLoader from "../components/PageLoader";

// Fallback pour le développement avant d'avoir les clés Notion
import { MASTERCLASSES, formatDate } from "../config/masterclasses.config";

export default function MasterclassDetails() {
  const { id } = useParams();
  const [masterclass, setMasterclass] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMasterclass = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001/api";
        const res = await fetch(`${apiUrl}/masterclasses/${id}`);
        
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setMasterclass(data);
            setLoading(false);
            return;
          }
        }
        
        // Fallback si l'API échoue (ex: clés Notion manquantes)
        console.warn("API introuvable, utilisation des données locales (fallback)");
        const fallbackData = MASTERCLASSES.find(mc => mc.id === id);
        if (fallbackData) {
          setMasterclass(fallbackData);
        } else {
          setError("Événement introuvable");
        }
      } catch (err) {
        console.error("Erreur Fetch:", err);
        const fallbackData = MASTERCLASSES.find(mc => mc.id === id);
        if (fallbackData) {
          setMasterclass(fallbackData);
        } else {
          setError("Erreur de connexion");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMasterclass();
  }, [id]);

  if (loading) return <PageLoader />;

  if (error || !masterclass) {
    return (
      <div style={{ textAlign: "center", padding: "120px 20px" }}>
        <h2 style={{ fontSize: "2rem", color: "#ef4444" }}>{error || "Masterclass introuvable"}</h2>
        <Link to="/formations" style={{ display: "inline-block", marginTop: "20px", color: "#00d4ff", textDecoration: "underline" }}>Retour aux formations</Link>
      </div>
    );
  }

  const { themeColor } = masterclass;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#e2e8f0", paddingBottom: "100px" }}>
      
      {/* ── HERO SECTION ── */}
      <section style={{ 
        padding: "100px 24px 60px", 
        background: `linear-gradient(180deg, ${themeColor}15 0%, rgba(0,0,0,0) 100%)`,
        borderBottom: "1px solid rgba(255,255,255,0.05)"
      }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <Link to="/formations" style={{ display: "inline-block", marginBottom: "40px", color: "#94a3b8", textDecoration: "none", fontSize: "14px", fontWeight: "600" }}>
            ← Retour aux événements
          </Link>

          <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "24px" }}>
            <span style={{ padding: "6px 12px", background: `${themeColor}20`, color: themeColor, borderRadius: "20px", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              {masterclass.theme}
            </span>
            <span style={{ padding: "6px 12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#cbd5e1", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>
              {masterclass.format}
            </span>
          </div>

          <h1 style={{ 
            fontSize: "clamp(36px, 5vw, 56px)", 
            fontWeight: "800", 
            color: "#ffffff", 
            lineHeight: "1.1", 
            marginBottom: "24px",
            fontFamily: "'Space Grotesk', sans-serif"
          }}>
            {masterclass.title}
          </h1>
          
          <p style={{ fontSize: "18px", color: "#94a3b8", lineHeight: "1.6", maxWidth: "700px", margin: "0 auto" }}>
            {masterclass.subtitle}
          </p>

          <div style={{ marginTop: "40px", display: "flex", gap: "24px", justifyContent: "center", flexWrap: "wrap" }}>
            <div style={{ textAlign: "left" }}>
              <span style={{ display: "block", fontSize: "12px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" }}>Date</span>
              <strong style={{ fontSize: "16px", color: "#ffffff" }}>{masterclass.date ? formatDate(masterclass.date) : "À venir"}</strong>
            </div>
            <div style={{ width: "1px", background: "rgba(255,255,255,0.1)" }}></div>
            <div style={{ textAlign: "left" }}>
              <span style={{ display: "block", fontSize: "12px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" }}>Heure</span>
              <strong style={{ fontSize: "16px", color: "#ffffff" }}>{masterclass.time}</strong>
            </div>
            <div style={{ width: "1px", background: "rgba(255,255,255,0.1)" }}></div>
            <div style={{ textAlign: "left" }}>
              <span style={{ display: "block", fontSize: "12px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" }}>Prix</span>
              <strong style={{ fontSize: "16px", color: "#10b981" }}>{masterclass.price}</strong>
            </div>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: "1000px", margin: "60px auto 0", padding: "0 24px", display: "grid", gridTemplateColumns: "minmax(0, 1fr) 400px", gap: "64px" }}>
        
        {/* ── COLONNE GAUCHE (Détails) ── */}
        <div>
          <h2 style={{ fontSize: "24px", color: "#ffffff", fontWeight: "700", marginBottom: "20px", fontFamily: "'Space Grotesk', sans-serif" }}>À propos de cet événement</h2>
          <p style={{ fontSize: "16px", color: "#94a3b8", lineHeight: "1.8", marginBottom: "40px", whiteSpace: "pre-line" }}>
            {masterclass.description}
          </p>

          <h3 style={{ fontSize: "20px", color: "#ffffff", fontWeight: "700", marginBottom: "16px" }}>🎯 Ce que vous allez apprendre</h3>
          <ul style={{ paddingLeft: "20px", marginBottom: "40px", color: "#cbd5e1" }}>
            {masterclass.objectives.map((obj, i) => (
              <li key={i} style={{ marginBottom: "12px", fontSize: "15px", lineHeight: "1.6" }}>{obj}</li>
            ))}
          </ul>

          <h3 style={{ fontSize: "20px", color: "#ffffff", fontWeight: "700", marginBottom: "16px" }}>🗓️ Programme</h3>
          <div style={{ borderLeft: `2px solid ${themeColor}40`, marginLeft: "8px", paddingLeft: "24px", marginBottom: "40px" }}>
            {masterclass.program.map((step, i) => (
              <div key={i} style={{ position: "relative", marginBottom: "20px" }}>
                <div style={{ position: "absolute", left: "-31px", top: "4px", width: "12px", height: "12px", borderRadius: "50%", background: "#000", border: `2px solid ${themeColor}` }} />
                <span style={{ fontWeight: "700", color: themeColor, display: "block", fontSize: "14px", marginBottom: "4px" }}>{step.time}</span>
                <span style={{ fontSize: "16px", color: "#e2e8f0", fontWeight: "500" }}>{step.title}</span>
              </div>
            ))}
          </div>

          <h3 style={{ fontSize: "20px", color: "#ffffff", fontWeight: "700", marginBottom: "16px" }}>👤 L'Intervenant</h3>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", background: "rgba(255,255,255,0.03)", padding: "20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
            <img src={masterclass.speaker.avatar} alt={masterclass.speaker.name} style={{ width: "64px", height: "64px", borderRadius: "50%", objectFit: "cover" }} />
            <div>
              <div style={{ fontWeight: "700", fontSize: "18px", color: "#ffffff" }}>{masterclass.speaker.name}</div>
              <div style={{ color: "#94a3b8", fontSize: "14px", marginTop: "4px" }}>{masterclass.speaker.title}</div>
            </div>
          </div>
        </div>

        {/* ── COLONNE DROITE (Formulaire Fixe) ── */}
        <div>
          <div style={{ 
            position: "sticky", 
            top: "100px", 
            background: "rgba(15, 23, 42, 0.6)", 
            backdropFilter: "blur(12px)", 
            border: "1px solid rgba(255,255,255,0.1)", 
            borderRadius: "16px", 
            padding: "32px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
          }}>
            <h3 style={{ fontSize: "22px", color: "#ffffff", fontWeight: "700", marginBottom: "8px", fontFamily: "'Space Grotesk', sans-serif" }}>Réserver votre place</h3>
            <p style={{ fontSize: "14px", color: "#94a3b8", marginBottom: "24px" }}>Remplissez le formulaire ci-dessous pour confirmer votre inscription gratuite.</p>
            
            <RegistrationForm 
              masterclass={masterclass} 
              onClose={() => window.location.href = "/formations"} 
            />
          </div>
        </div>

      </div>
    </div>
  );
}
