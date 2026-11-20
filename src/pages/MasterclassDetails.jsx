import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import RegistrationForm from "../components/Masterclass/RegistrationForm";
import PageLoader from "../components/PageLoader";
import "../styles/MasterclassDetails.css";

import { MasterclassService } from "../services/masterclassService";
import { formatDate, isOpen } from "../config/masterclasses.config";
import { useLanguage } from "../context/LanguageContext";

export default function MasterclassDetails() {
  const { id } = useParams();
  const { lang, tr } = useLanguage();
  const [masterclass, setMasterclass] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMasterclass = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await MasterclassService.getById(id);
        const allEvents = await MasterclassService.getAll() || [];
        
        if (data) {
          const open = isOpen(data, allEvents);
          const isPast = data.isPast ?? (new Date(data.date.includes("T") ? data.date : `${data.date}T16:00:00+01:00`) <= new Date());
          const isLocked = !isPast && !open;

          setMasterclass({
            ...data,
            isOpen: open,
            isPast,
            isLocked
          });
        } else {
          setError("notfound");
        }
      } catch (err) {
        console.error("Erreur Fetch:", err);
        setError("network");
      } finally {
        setLoading(false);
      }
    };

    fetchMasterclass();
  }, [id]);

  if (loading) return <PageLoader />;

  if (error || !masterclass) {
    return (
      <div className="mdetails-error-container">
        <h2 className="mdetails-error-title">
          {error === "network" ? tr("Connection error", "Erreur de connexion") : tr("Event not found", "Événement introuvable")}
        </h2>
        <Link to="/academy" className="mdetails-error-link">{tr("Back to MLAcademy", "Retour aux formations")}</Link>
      </div>
    );
  }

  const { themeColor } = masterclass;

  return (
    <div className="mdetails-main">
      
      {/* ── HERO SECTION ── */}
      <section className="mdetails-hero" style={{ 
        background: `linear-gradient(180deg, ${themeColor}15 0%, rgba(0,0,0,0) 100%)`,
      }}>
        <div className="mdetails-hero-content">
          <Link to="/academy" className="mdetails-back-link">
            ← {tr("Back to events", "Retour aux événements")}
          </Link>

          <div className="mdetails-badges">
            <span className="mdetails-badge-theme" style={{ background: `${themeColor}20`, color: themeColor }}>
              {masterclass.theme}
            </span>
            <span className="mdetails-badge-format">
              {masterclass.format}
            </span>
          </div>

          <h1 className="mdetails-title">
            {masterclass.title}
          </h1>
          
          <p className="mdetails-subtitle">
            {masterclass.subtitle}
          </p>

          <div className="mdetails-meta">
            <div className="mdetails-meta-item">
              <span className="mdetails-meta-label">Date</span>
              <strong className="mdetails-meta-value">{masterclass.date ? formatDate(masterclass.date, lang) : tr("Coming soon", "À venir")}</strong>
            </div>
            <div className="mdetails-meta-divider"></div>
            <div className="mdetails-meta-item">
              <span className="mdetails-meta-label">{tr("Time", "Heure")}</span>
              <strong className="mdetails-meta-value">{masterclass.time}</strong>
            </div>
            <div className="mdetails-meta-divider"></div>
            <div className="mdetails-meta-item">
              <span className="mdetails-meta-label">{tr("Price", "Prix")}</span>
              <strong className="mdetails-meta-value price">{masterclass.price}</strong>
            </div>
          </div>
        </div>
      </section>

      <div className="mdetails-grid">
        
        {/* ── COLONNE GAUCHE (Détails) ── */}
        <div>
          <h2 className="mdetails-section-title">{tr("About this event", "À propos de cet événement")}</h2>
          <p className="mdetails-description">
            {masterclass.description}
          </p>

          <h3 className="mdetails-subsection-title">🎯 {tr("What you will learn", "Ce que vous allez apprendre")}</h3>
          <ul className="mdetails-objectives">
            {masterclass.objectives.map((obj, i) => (
              <li key={i}>{obj}</li>
            ))}
          </ul>

          <h3 className="mdetails-subsection-title">🗓️ Programme</h3>
          <div className="mdetails-program" style={{ borderLeft: `2px solid ${themeColor}40` }}>
            {masterclass.program.map((step, i) => (
              <div key={i} className="mdetails-program-step">
                <div className="mdetails-program-dot" style={{ border: `2px solid ${themeColor}` }} />
                <span className="mdetails-program-time" style={{ color: themeColor }}>{step.time}</span>
                <span className="mdetails-program-title">{step.title}</span>
              </div>
            ))}
          </div>

          <h3 className="mdetails-subsection-title">👤 {tr("Speaker", "L'Intervenant")}</h3>
          <div className="mdetails-speaker">
            <img src={masterclass.speaker.avatar} alt={masterclass.speaker.name} className="mdetails-speaker-avatar" />
            <div>
              <div className="mdetails-speaker-name">{masterclass.speaker.name}</div>
              <div className="mdetails-speaker-title">{masterclass.speaker.title}</div>
            </div>
          </div>
        </div>

        {/* ── COLONNE DROITE (Formulaire Fixe) ── */}
        <div>
          <div className="mdetails-form-card">
            {masterclass.isOpen ? (
              <>
                <h3 className="mdetails-form-title">{tr("Book your seat", "Réserver votre place")}</h3>
                <p className="mdetails-form-desc">{tr("Fill in the form below to confirm your free registration.", "Remplissez le formulaire ci-dessous pour confirmer votre inscription gratuite.")}</p>
                <RegistrationForm 
                  masterclass={masterclass} 
                  onClose={() => (window.location.href = "/academy")} 
                />
              </>
            ) : masterclass.isPast ? (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <div style={{ fontSize: "50px", marginBottom: "16px" }}>🔒</div>
                <h3 style={{ margin: "0 0 10px", fontSize: "22px", fontWeight: "800", color: "var(--q-ink)", fontFamily: "var(--q-font-display)" }}>{tr("Registration closed", "Inscriptions Closes")}</h3>
                <p style={{ color: "var(--q-ink-2)", fontFamily: "'Inter', sans-serif", fontSize: "14px", lineHeight: "1.6" }}>
                  {tr("Registration for this event is closed because it has already taken place or expired.", "Les inscriptions pour cet événement sont closes car l'événement a déjà eu lieu ou a expiré.")}
                </p>
                <Link to="/academy" className="mdetails-error-link" style={{ marginTop: "24px", display: "inline-block" }}>{tr("Back to events", "Retour aux événements")}</Link>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <div style={{ fontSize: "50px", marginBottom: "16px" }}>⏳</div>
                <h3 style={{ margin: "0 0 10px", fontSize: "22px", fontWeight: "800", color: "var(--q-ink)", fontFamily: "var(--q-font-display)" }}>{tr("Registration coming soon", "Inscriptions à Venir")}</h3>
                <p style={{ color: "var(--q-ink-2)", fontFamily: "'Inter', sans-serif", fontSize: "14px", lineHeight: "1.6" }}>
                  {tr("Registration for this event is not open yet. It will start as soon as the previous event ends.", "Les inscriptions pour cet événement ne sont pas encore ouvertes. Elles débuteront dès la fin de l'événement précédent.")}
                </p>
                <Link to="/academy" className="mdetails-error-link" style={{ marginTop: "24px", display: "inline-block" }}>{tr("Back to events", "Retour aux événements")}</Link>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
