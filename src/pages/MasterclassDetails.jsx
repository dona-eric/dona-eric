import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import RegistrationForm from "../components/Masterclass/RegistrationForm";
import PageLoader from "../components/PageLoader";
import "../styles/MasterclassDetails.css";

import { formatDate } from "../config/masterclasses.config";

export default function MasterclassDetails() {
  const { id } = useParams();
  const [masterclass, setMasterclass] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMasterclass = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? "https://donerick.onrender.com/api" : "http://localhost:3001/api");
        const res = await fetch(`${apiUrl}/masterclasses/${id}`);
        
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setMasterclass(data);
            setLoading(false);
            return;
          }
        }
        
        // Si l'API échoue
        console.warn("API introuvable ou erreur de chargement");
        setError("Événement introuvable");
      } catch (err) {
        console.error("Erreur Fetch:", err);
        setError("Erreur de connexion");
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
        <h2 className="mdetails-error-title">{error || "Masterclass introuvable"}</h2>
        <Link to="/formations" className="mdetails-error-link">Retour aux formations</Link>
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
          <Link to="/formations" className="mdetails-back-link">
            ← Retour aux événements
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
              <strong className="mdetails-meta-value">{masterclass.date ? formatDate(masterclass.date) : "À venir"}</strong>
            </div>
            <div className="mdetails-meta-divider"></div>
            <div className="mdetails-meta-item">
              <span className="mdetails-meta-label">Heure</span>
              <strong className="mdetails-meta-value">{masterclass.time}</strong>
            </div>
            <div className="mdetails-meta-divider"></div>
            <div className="mdetails-meta-item">
              <span className="mdetails-meta-label">Prix</span>
              <strong className="mdetails-meta-value price">{masterclass.price}</strong>
            </div>
          </div>
        </div>
      </section>

      <div className="mdetails-grid">
        
        {/* ── COLONNE GAUCHE (Détails) ── */}
        <div>
          <h2 className="mdetails-section-title">À propos de cet événement</h2>
          <p className="mdetails-description">
            {masterclass.description}
          </p>

          <h3 className="mdetails-subsection-title">🎯 Ce que vous allez apprendre</h3>
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

          <h3 className="mdetails-subsection-title">👤 L'Intervenant</h3>
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
            <h3 className="mdetails-form-title">Réserver votre place</h3>
            <p className="mdetails-form-desc">Remplissez le formulaire ci-dessous pour confirmer votre inscription gratuite.</p>
            
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
