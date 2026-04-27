/**
 * ─────────────────────────────────────────────────────────────────
 *  COMPOSANT PRINCIPAL — MasterclassSection.jsx
 *
 *  ➜ C'est CE composant que vous ajoutez dans votre portfolio.
 *  ➜ Il gère tout : hero du masterclass actif + grille des passés.
 *
 *  Usage dans votre App.jsx ou page Portfolio :
 *    import MasterclassSection from "./components/Masterclass/MasterclassSection";
 *    <MasterclassSection />
 * ─────────────────────────────────────────────────────────────────
 */
import React from "react";
import { useState } from "react";
import { MASTERCLASSES, getFeatured, isOpen} from "../../config/masterclasses.config";
import MasterclassHero from "./MasterclassHero";
import MasterclassCard from "./MasterclassCard";

export default function MasterclassSection() {
  const featured = getFeatured();
  const [filter, setFilter] = useState("all"); // "all" | "open" | "closed"

  // Tous les masterclasses (sans le featured s'il est actif)
  const allEvents = MASTERCLASSES;
  const filtered = allEvents.filter((mc) => {
    if (filter === "open")   return isOpen(mc);
    if (filter === "closed") return !isOpen(mc);
    return true;
  });

  const openCount   = allEvents.filter(isOpen).length;
  const closedCount = allEvents.filter((mc) => !isOpen(mc)).length;

  return (
    <section id="masterclass" style={{ padding: "80px 0", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>

        {/* ── En-tête de section ─────────────────────────────── */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <span style={{
            display: "inline-block",
            padding: "6px 16px",
            background: "#EEF2FF",
            color: "#4F46E5",
            borderRadius: "100px",
            fontSize: "13px",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: "16px",
          }}>
            🎓 Masterclasses & Webinaires
          </span>

          <h2 style={{
            margin: "0 0 16px",
            fontSize: "clamp(32px, 4vw, 48px)",
            fontWeight: "900",
            color: "#acb1be",
            lineHeight: "1.2",
          }}>
            Apprenez, Échangez, Progressez
          </h2>

          <p style={{
            margin: "0 auto",
            maxWidth: "600px",
            fontSize: "18px",
            color: "#64748B",
            lineHeight: "1.7",
          }}>
            Des sessions live gratuites pour monter en compétences sur les sujets
            qui façonnent notre futur numérique.
          </p>

          {/* Stats rapides */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "32px",
            marginTop: "32px",
            flexWrap: "wrap",
          }}>
            {[
              { val: allEvents.length, label: "Événements organisés" },
              { val: openCount,        label: "Ouvert aux inscriptions" },
              { val: closedCount,      label: "Sessions réalisées" },
            ].map(({ val, label }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "32px", fontWeight: "900", color: "#4F46E5" }}>
                  {val}
                </div>
                <div style={{ fontSize: "13px", color: "#94A3B8", fontWeight: "600" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Masterclass VEDETTE (actif) ─────────────────────── */}
        {featured && <MasterclassHero masterclass={featured} />}

        {/* ── Titre grille ─────────────────────────────────────── */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "28px",
          flexWrap: "wrap",
          gap: "16px",
        }}>
          <h3 style={{ margin: 0, fontSize: "22px", fontWeight: "800", color: "#0F172A" }}>
            📚 Tous les événements
          </h3>

          {/* Filtres */}
          <div style={{ display: "flex", gap: "8px" }}>
            {[
              { key: "all",    label: `Tous (${allEvents.length})` },
              { key: "open",   label: `Ouverts (${openCount})` },
              { key: "closed", label: `Terminés (${closedCount})` },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "1.5px solid",
                  borderColor: filter === key ? "#4F46E5" : "#E2E8F0",
                  background:  filter === key ? "#4F46E5" : "#fff",
                  color:       filter === key ? "#fff"    : "#64748B",
                  fontWeight:  "600",
                  fontSize:    "13px",
                  cursor:      "pointer",
                  transition:  "all 0.15s",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Grille des masterclasses ─────────────────────────── */}
        {filtered.length === 0 ? (
          <div style={{
            textAlign: "center", padding: "60px 24px",
            background: "#F8FAFC", borderRadius: "16px",
            border: "1px dashed #CBD5E1",
          }}>
            <p style={{ margin: 0, fontSize: "18px", color: "#94A3B8" }}>
              Aucun événement dans cette catégorie pour le moment.
            </p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "24px",
          }}>
            {filtered.map((mc) => (
              <MasterclassCard key={mc.id} masterclass={mc} />
            ))}
          </div>
        )}

        {/* ── CTA Newsletter ────────────────────────────────────── */}
        <div style={{
          marginTop: "60px",
          background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
          borderRadius: "20px",
          padding: "48px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Décoration */}
          <div style={{
            position: "absolute", top: "-60px", right: "-60px",
            width: "250px", height: "250px", borderRadius: "50%",
            border: "40px solid rgba(79,70,229,0.15)",
          }} />

          <p style={{ margin: "0 0 8px", color: "#818CF8", fontSize: "13px",
                      textTransform: "uppercase", letterSpacing: "1px", fontWeight: "700" }}>
            🔔 Ne ratez rien
          </p>
          <h3 style={{ margin: "0 0 12px", color: "#fff", fontSize: "28px", fontWeight: "800" }}>
            Soyez notifié(e) des prochains événements
          </h3>
          <p style={{ margin: "0 0 28px", color: "#94A3B8", fontSize: "16px", lineHeight: "1.6" }}>
            Inscrivez-vous à la liste de diffusion pour recevoir les annonces
            de nouvelles Masterclasses et Webinaires.
          </p>

          {/* Mini form newsletter */}
          <NewsletterForm />
        </div>

      </div>
    </section>
  );
}

// ── Newsletter inline (simple) ─────────────────────────────────
function NewsletterForm() {
  const [email, setEmail]     = useState("");
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setLoading(true);
    // Ici vous pouvez connecter votre API ou un service comme Mailchimp
    // Pour l'instant, simulation d'un délai
    await new Promise((r) => setTimeout(r, 800));
    setSent(true);
    setLoading(false);
  };

  if (sent) return (
    <p style={{ color: "#10B981", fontWeight: "700", fontSize: "16px" }}>
      ✅ Parfait ! Vous serez notifié(e) des prochains événements.
    </p>
  );

  return (
    <form onSubmit={handleSubmit} style={{
      display: "flex", gap: "12px", justifyContent: "center",
      flexWrap: "wrap",
    }}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="votre@email.com"
        required
        style={{
          padding: "14px 20px", borderRadius: "10px",
          border: "none", fontSize: "15px",
          width: "280px", maxWidth: "100%",
          background: "rgba(255,255,255,0.1)",
          color: "#fff", outline: "none",
        }}
      />
      <button
        type="submit"
        disabled={loading}
        style={{
          padding: "14px 28px", borderRadius: "10px",
          background: "#4F46E5", color: "#fff",
          border: "none", cursor: "pointer",
          fontWeight: "700", fontSize: "15px",
        }}
      >
        {loading ? "..." : "Me notifier 🔔"}
      </button>
    </form>
  );
}
