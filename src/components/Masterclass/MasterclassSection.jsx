import React, { useState, useEffect } from "react";
import { MASTERCLASSES, getFeatured, isOpen } from "../../config/masterclasses.config";
import MasterclassHero from "./MasterclassHero";
import MasterclassCard from "./MasterclassCard";
import PageLoader from "../PageLoader";

export default function MasterclassSection() {
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001/api";
        const res = await fetch(`${apiUrl}/masterclasses`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setAllEvents(data);
            setLoading(false);
            return;
          }
        }
        // Fallback local
        setAllEvents(MASTERCLASSES);
      } catch (e) {
        console.warn("Erreur chargement Notion, utilisation du fallback.");
        setAllEvents(MASTERCLASSES);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <PageLoader />;

  const featured = allEvents.find(mc => isOpen(mc)) || allEvents[0]; // Premier ouvert ou juste le premier
  const filtered = allEvents.filter((mc) => {
    if (filter === "open") return isOpen(mc);
    if (filter === "closed") return !isOpen(mc);
    return true;
  });

  const openCount = allEvents.filter(isOpen).length;
  const closedCount = allEvents.filter((mc) => !isOpen(mc)).length;

  return (
    <section id="masterclass" style={{ 
      padding: "100px 24px", 
      fontFamily: "'Inter', sans-serif",
      color: "#e2e8f0",
      position: "relative",
      zIndex: 1
    }}>
      <div style={{ maxWidth: "1160px", margin: "0 auto" }}>

        {/* ── En-tête ── */}
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "8px 20px", borderRadius: "30px", marginBottom: 24,
            background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.3)",
            fontSize: 11, fontWeight: 600, color: "#00d4ff", letterSpacing: "0.08em", textTransform: "uppercase"
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%", background: "#00d4ff",
              boxShadow: "0 0 10px #00d4ff", display: "inline-block"
            }} />
            MASTERCLASS.LOAD() → APPRENTISSAGE CONTINU
          </div>

          <h1 style={{
            margin: "0 0 16px",
            fontSize: "clamp(40px, 6vw, 64px)",
            fontWeight: "800",
            color: "#ffffff",
            lineHeight: "1.1",
            letterSpacing: "-0.02em",
            fontFamily: "'Space Grotesk', sans-serif"
          }}>
            Apprenez, Échangez,<br />
            <span className="gradient-text">Progressez.</span>
          </h1>

          <p style={{ maxWidth: 640, margin: "0 auto", color: "#94a3b8", fontSize: 17, lineHeight: 1.8 }}>
            Découvrez des masterclasses et webinaires intensifs pour monter en compétences sur l'IA, le ML et les architectures de données.
          </p>

          {/* Stats rapides */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "16px",
            marginTop: "48px",
            flexWrap: "wrap",
          }}>
            {[
              { val: allEvents.length, label: "Événements", color: "#a855f7" },
              { val: openCount, label: "Ouverts", color: "#10b981" },
              { val: closedCount, label: "Réalisés", color: "#f59e0b" },
            ].map(({ val, label, color }) => (
              <div key={label} className="glass" style={{ textAlign: "center", padding: "16px 24px", borderRadius: 8, position: "relative", overflow: "hidden", minWidth: 140 }}>
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(90deg, transparent, ${color}, transparent)`
                }} />
                <div style={{ fontSize: "32px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: "800", color: color, marginBottom: 8 }}>
                  {val}
                </div>
                <div style={{ fontSize: "11px", color: "#94a3b8", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Masterclass Vedette ── */}
        {featured && (
          <div style={{ marginBottom: "80px" }}>
            <MasterclassHero masterclass={featured} />
          </div>
        )}

        {/* ── Filtres ── */}
        <div style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "40px",
          gap: "24px",
          flexWrap: "wrap"
        }}>
          <div>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600,
              color: "#a855f7", letterSpacing: "0.15em", marginBottom: 16, textTransform: "uppercase"
            }}>
              // events.all[]
            </div>
            <h2 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 40px)", fontWeight: "800", color: "#ffffff", fontFamily: "'Space Grotesk', sans-serif" }}>
              Tous les événements
            </h2>
          </div>

          <div style={{ 
            display: "flex", 
            gap: "12px", 
            overflowX: "auto", 
            paddingBottom: "4px",
            WebkitOverflowScrolling: "touch"
          }}>
            {[
              { key: "all", label: `Tous (${allEvents.length})`, color: "#00d4ff" },
              { key: "open", label: `Ouverts (${openCount})`, color: "#10b981" },
              { key: "closed", label: `Terminés (${closedCount})`, color: "#f59e0b" },
            ].map(({ key, label, color }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "6px",
                  border: `1px solid ${filter === key ? color + "60" : "rgba(255,255,255,0.1)"}`,
                  background: filter === key ? color + "15" : "rgba(255,255,255,0.02)",
                  color: filter === key ? color : "#94a3b8",
                  fontWeight: "600",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s ease"
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Grille ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "24px",
        }}>
          {filtered.map((mc) => (
            <MasterclassCard key={mc.id} masterclass={mc} />
          ))}
        </div>

        {/* ── Newsletter ── */}
        <div className="glass" style={{
          marginTop: "100px",
          borderRadius: "16px",
          padding: "64px 24px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 3,
            background: "linear-gradient(90deg, transparent, #00d4ff, #a855f7, transparent)"
          }} />
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600,
            color: "#00d4ff", letterSpacing: "0.15em", marginBottom: 24, textTransform: "uppercase"
          }}>
            // newsletter.subscribe()
          </div>
          <h2 style={{ margin: "0 0 16px", color: "#ffffff", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: "800", fontFamily: "'Space Grotesk', sans-serif" }}>
            Restez informé(e)
          </h2>
          <p style={{ margin: "0 auto 40px", color: "#94a3b8", fontSize: "16px", maxWidth: 500 }}>
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

  if (sent) return <div style={{ color: "#34d399", fontWeight: "600", padding: "16px", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 8, display: "inline-block" }}>✓ Inscription réussie ! Vous serez notifié(e).</div>;

  return (
    <form onSubmit={handleSubmit} style={{
      display: "flex", 
      flexWrap: "wrap",
      gap: "16px", 
      justifyContent: "center",
    }}>
      <input
        type="email"
        placeholder="votre@email.com"
        required
        style={{
          padding: "16px 24px", borderRadius: "8px",
          border: "1px solid rgba(255,255,255,0.1)", fontSize: "15px",
          width: "100%", maxWidth: "340px",
          background: "rgba(255,255,255,0.03)", color: "#ffffff",
          fontFamily: "'Inter', sans-serif", outline: "none",
          transition: "border-color 0.2s"
        }}
        onFocus={(e) => e.currentTarget.style.borderColor = "rgba(0,212,255,0.5)"}
        onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
      />
      <button type="submit" style={{
        padding: "16px 32px", borderRadius: "8px",
        background: "linear-gradient(135deg, #00d4ff, #4338ca)", color: "#ffffff",
        border: "none", fontWeight: "600",
        cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: "15px",
        transition: "all 0.3s ease",
        boxShadow: "0 4px 20px rgba(0, 212, 255, 0.2)"
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
      onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
      >
        Me notifier →
      </button>
    </form>
  );
}