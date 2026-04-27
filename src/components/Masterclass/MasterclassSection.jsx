import React, { useState } from "react";
import { MASTERCLASSES, getFeatured, isOpen } from "../../config/masterclasses.config";
import MasterclassHero from "./MasterclassHero";
import MasterclassCard from "./MasterclassCard";

export default function MasterclassSection() {
  const featured = getFeatured();
  const [filter, setFilter] = useState("all");

  const allEvents = MASTERCLASSES;
  const filtered = allEvents.filter((mc) => {
    if (filter === "open") return isOpen(mc);
    if (filter === "closed") return !isOpen(mc);
    return true;
  });

  const openCount = allEvents.filter(isOpen).length;
  const closedCount = allEvents.filter((mc) => !isOpen(mc)).length;

  // Helper pour le responsive simple sans CSS externe
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <section id="masterclass" style={{ 
      padding: isMobile ? "40px 0" : "80px 0", 
      fontFamily: "sans-serif",
      overflowX: "hidden" 
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>

        {/* ── En-tête ── */}
        <div style={{ textAlign: "center", marginBottom: isMobile ? "32px" : "56px" }}>
          <span style={{
            display: "inline-block",
            padding: "6px 16px",
            background: "#EEF2FF",
            color: "#4F46E5",
            borderRadius: "100px",
            fontSize: "12px",
            fontWeight: "700",
            textTransform: "uppercase",
            marginBottom: "16px",
          }}>
            🎓 Masterclasses & Webinaires
          </span>

          <h2 style={{
            margin: "0 0 16px",
            fontSize: isMobile ? "28px" : "42px",
            fontWeight: "900",
            color: "#1e293b", // Couleur ajustée pour lisibilité
            lineHeight: "1.2",
          }}>
            Apprenez, Échangez, Progressez
          </h2>

          {/* Stats rapides (Flex wrap important pour mobile) */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: isMobile ? "16px" : "32px",
            marginTop: "24px",
            flexWrap: "wrap",
          }}>
            {[
              { val: allEvents.length, label: "Événements" },
              { val: openCount, label: "Ouverts" },
              { val: closedCount, label: "Réalisés" },
            ].map(({ val, label }) => (
              <div key={label} style={{ textAlign: "center", minWidth: "100px" }}>
                <div style={{ fontSize: isMobile ? "24px" : "32px", fontWeight: "900", color: "#4F46E5" }}>
                  {val}
                </div>
                <div style={{ fontSize: "11px", color: "#94A3B8", fontWeight: "600", textTransform: "uppercase" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Masterclass Vedette ── */}
        {featured && (
          <div style={{ marginBottom: "40px" }}>
            <MasterclassHero masterclass={featured} />
          </div>
        )}

        {/* ── Filtres ── */}
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          marginBottom: "28px",
          gap: "16px",
        }}>
          <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "800", color: "#0F172A" }}>
            📚 Tous les événements
          </h3>

          <div style={{ 
            display: "flex", 
            gap: "8px", 
            overflowX: "auto", 
            width: "100%",
            paddingBottom: "8px", // Pour ne pas cacher la scrollbar sur mobile
            WebkitOverflowScrolling: "touch" // Scroll fluide sur iOS
          }}>
            {[
              { key: "all", label: `Tous (${allEvents.length})` },
              { key: "open", label: `Ouverts (${openCount})` },
              { key: "closed", label: `Terminés (${closedCount})` },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                style={{
                  padding: "10px 16px",
                  borderRadius: "8px",
                  border: "1.5px solid",
                  borderColor: filter === key ? "#4F46E5" : "#E2E8F0",
                  background: filter === key ? "#4F46E5" : "#fff",
                  color: filter === key ? "#fff" : "#64748B",
                  fontWeight: "600",
                  fontSize: "12px",
                  cursor: "pointer",
                  whiteSpace: "nowrap", // Empêche le texte de revenir à la ligne
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
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
        }}>
          {filtered.map((mc) => (
            <MasterclassCard key={mc.id} masterclass={mc} />
          ))}
        </div>

        {/* ── Newsletter ── */}
        <div style={{
          marginTop: "60px",
          background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
          borderRadius: "20px",
          padding: isMobile ? "32px 20px" : "48px",
          textAlign: "center",
        }}>
          <h3 style={{ margin: "0 0 12px", color: "#fff", fontSize: isMobile ? "22px" : "28px", fontWeight: "800" }}>
            Soyez notifié(e)
          </h3>
          <p style={{ margin: "0 0 28px", color: "#94A3B8", fontSize: "15px" }}>
            Recevez les annonces de nos prochains lives.
          </p>

          <NewsletterForm isMobile={isMobile} />
        </div>
      </div>
    </section>
  );
}

function NewsletterForm({ isMobile }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) return <p style={{ color: "#10B981", fontWeight: "700" }}>✅ Inscrit(e) !</p>;

  return (
    <form onSubmit={handleSubmit} style={{
      display: "flex", 
      flexDirection: isMobile ? "column" : "row",
      gap: "12px", 
      justifyContent: "center",
    }}>
      <input
        type="email"
        placeholder="votre@email.com"
        required
        style={{
          padding: "14px 20px", borderRadius: "10px",
          border: "none", fontSize: "15px",
          width: isMobile ? "100%" : "280px",
          background: "rgba(255,255,255,0.1)", color: "#fff",
        }}
      />
      <button type="submit" style={{
        padding: "14px 28px", borderRadius: "10px",
        background: "#4F46E5", color: "#fff",
        border: "none", fontWeight: "700",
        width: isMobile ? "100%" : "auto",
      }}>
        Me notifier 🔔
      </button>
    </form>
  );
}