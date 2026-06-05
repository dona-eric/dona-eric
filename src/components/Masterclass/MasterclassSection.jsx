import React, { useState, useEffect } from "react";
import { isOpen, getApiUrl } from "../../config/masterclasses.config";
import MasterclassHero from "./MasterclassHero";
import MasterclassCard from "./MasterclassCard";
import PageLoader from "../PageLoader";
import "../../styles/MasterclassSection.css";

export default function MasterclassSection() {
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const apiUrl = getApiUrl();
        const res = await fetch(`${apiUrl}/masterclasses`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setAllEvents(data);
            setLoading(false);
            return;
          }
        }
      } catch (e) {
        console.error("Erreur chargement Notion:", e);
        setAllEvents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <PageLoader />;

  const featured = allEvents.find(mc => isOpen(mc, allEvents)) || allEvents[0]; // Premier ouvert ou juste le premier
  const filtered = allEvents.filter((mc) => {
    if (filter === "open") return isOpen(mc, allEvents);
    if (filter === "closed") return !isOpen(mc, allEvents);
    return true;
  });

  const openCount = allEvents.filter(mc => isOpen(mc, allEvents)).length;
  const closedCount = allEvents.filter((mc) => !isOpen(mc, allEvents)).length;

  return (
    <section id="masterclass" className="ms-section">
      <div className="ms-container">

        {/* ── En-tête ── */}
        <div className="ms-header">
          <div className="ms-badge">
            <span className="ms-badge-dot" />
            MASTERCLASS.LOAD() → APPRENTISSAGE CONTINU
          </div>

          <h1 className="ms-title">
            Apprenez, Échangez,<br />
            <span className="gradient-text">Progressez.</span>
          </h1>

          <p className="ms-description">
            Découvrez des masterclasses et webinaires intensifs pour monter en compétences sur l'IA, le ML et les architectures de données.
          </p>

          {/* Stats rapides */}
          <div className="ms-stats">
            {[
              { val: allEvents.length, label: "Événements", color: "#a855f7" },
              { val: openCount, label: "Ouverts", color: "#10b981" },
              { val: closedCount, label: "Réalisés", color: "#f59e0b" },
            ].map(({ val, label, color }) => (
              <div key={label} className="glass ms-stat-card">
                <div className="ms-stat-gradient" style={{
                  background: `linear-gradient(90deg, transparent, ${color}, transparent)`
                }} />
                <div className="ms-stat-value" style={{ color: color }}>
                  {val}
                </div>
                <div className="ms-stat-label">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Masterclass Vedette ── */}
        {featured && (
          <div className="ms-featured">
            <MasterclassHero masterclass={featured} />
          </div>
        )}

        {/* ── Filtres ── */}
        <div className="ms-filters-header">
          <div>
            <div className="ms-filters-subtitle">
              // events.all[]
            </div>
            <h2 className="ms-filters-title">
              Tous les événements
            </h2>
          </div>

          <div className="ms-filter-buttons">
            {[
              { key: "all", label: `Tous (${allEvents.length})`, color: "#00d4ff" },
              { key: "open", label: `Ouverts (${openCount})`, color: "#10b981" },
              { key: "closed", label: `Terminés (${closedCount})`, color: "#f59e0b" },
            ].map(({ key, label, color }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className="ms-filter-btn"
                style={{
                  border: `1px solid ${filter === key ? color + "60" : "rgba(255,255,255,0.1)"}`,
                  background: filter === key ? color + "15" : "rgba(255,255,255,0.02)",
                  color: filter === key ? color : "#94a3b8"
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Grille ── */}
        <div className="ms-grid">
          {filtered.map((mc) => (
            <MasterclassCard key={mc.id} masterclass={mc} allEvents={allEvents} />
          ))}
        </div>

        {/* ── Newsletter ── */}
        <div className="glass ms-newsletter">
          <div className="ms-newsletter-gradient" />
          <div className="ms-newsletter-badge">
            // newsletter.subscribe()
          </div>
          <h2 className="ms-newsletter-title">
            Restez informé(e)
          </h2>
          <p className="ms-newsletter-desc">
            Recevez les annonces de nos prochains lives et masterclasses directement dans votre boîte de réception.
          </p>

          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}

function NewsletterForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) return <div className="ms-newsletter-success">✓ Inscription réussie ! Vous serez notifié(e).</div>;

  return (
    <form onSubmit={handleSubmit} className="ms-newsletter-form">
      <input
        type="email"
        placeholder="votre@email.com"
        required
        className="ms-newsletter-input"
        onFocus={(e) => e.currentTarget.style.borderColor = "rgba(0,212,255,0.5)"}
        onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
      />
      <button type="submit" className="ms-newsletter-btn">
        Me notifier →
      </button>
    </form>
  );
}