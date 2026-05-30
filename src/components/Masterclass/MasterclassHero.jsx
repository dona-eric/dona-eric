import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isOpen, formatDate } from "../../config/masterclasses.config";
import { useRegistration } from "../../hooks/useRegistration";

export default function MasterclassHero({ masterclass }) {
  const [countdown, setCountdown] = useState({});
  const { seats } = useRegistration(masterclass.id);
  const open = isOpen(masterclass);

  const {
    title, subtitle, date, time, duration, format, theme, themeColor, accentColor,
    image, objectives, price, speaker, type, seats: maxSeats,
  } = masterclass;

  useEffect(() => {
    if (!open) return;
    const tick = () => {
      const diff = new Date(date) - new Date();
      if (diff <= 0) return setCountdown({ expired: true });
      setCountdown({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000)  / 60000),
        seconds: Math.floor((diff % 60000)    / 1000),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [date, open]);

  const typeLabel = type === "webinaire" ? "Webinaire" : "Masterclass";

  return (
    <section className="glass" style={{
      position: "relative",
      borderRadius: "24px",
      overflow: "hidden",
      marginBottom: "40px",
      minHeight: "520px",
      padding: 0
    }}>

      {/* Background & Overlays */}
      {image && (
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${image})`,
          backgroundSize: "cover", backgroundPosition: "center",
          opacity: 0.15,
        }} />
      )}
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(135deg, ${themeColor}60 0%, transparent 100%)`,
      }} />

      <div style={{
        position: "relative", zIndex: 2,
        padding: "48px",
        display: "flex",
        flexDirection: "row", 
        gap: "48px",
        flexWrap: "wrap"
      }}>

        {/* COLONNE GAUCHE (Textes) */}
        <div style={{ flex: "1 1 400px" }}>
          <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
            <Chip bg={`${themeColor}15`} color={themeColor} border={themeColor}>{typeLabel}</Chip>
            <Chip bg={open ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)"} color={open ? "#10b981" : "#ef4444"} border={open ? "#10b981" : "#ef4444"}>
              {open ? "Ouvert" : "Clos"}
            </Chip>
            <Chip bg="rgba(255,255,255,0.05)" color="#ffffff" border="#ffffff">{price}</Chip>
          </div>

          <h2 style={{
            margin: "0 0 20px",
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: "800",
            color: "#ffffff",
            lineHeight: "1.1",
            fontFamily: "'Space Grotesk', sans-serif"
          }}>
            {title}
          </h2>

          <p style={{
            margin: "0 0 32px",
            color: "#94a3b8",
            fontSize: "16px",
            lineHeight: "1.7",
            maxWidth: "600px",
            fontFamily: "'Inter', sans-serif"
          }}>
            {subtitle}
          </p>

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", 
            gap: "16px", 
            marginBottom: "40px",
            background: "rgba(255,255,255,0.02)",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.05)"
          }}>
            {[
              { icon: "📅", val: formatDate(date) },
              { icon: "⏰", val: time },
              { icon: "⏱️", val: duration },
              { icon: "💻", val: format },
            ].map(({ icon, val }) => (
              <div key={val} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ opacity: 0.8 }}>{icon}</span>
                <span style={{ color: "#e2e8f0", fontWeight: "600", fontSize: "14px", fontFamily: "'Inter', sans-serif" }}>{val}</span>
              </div>
            ))}
          </div>

          {open ? (
            <Link
              to={`/formations/${masterclass.id}`}
              style={{
                padding: "16px 36px",
                background: themeColor,
                color: "#000000",
                border: "none", borderRadius: "8px",
                cursor: "pointer", fontWeight: "700", fontSize: "16px",
                fontFamily: "'Inter', sans-serif", textDecoration: "none",
                boxShadow: `0 4px 20px ${themeColor}40`,
                transition: "all 0.3s ease",
                display: "inline-block", boxSizing: "border-box"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              Voir les détails & S'inscrire →
            </Link>
          ) : (
            <Link
              to={`/formations/${masterclass.id}`}
              style={{ 
                color: "#64748b", fontWeight: "600", fontFamily: "'Inter', sans-serif", 
                padding: "16px 36px", background: "rgba(255,255,255,0.03)", 
                borderRadius: "8px", display: "inline-block", border: "1px solid rgba(255,255,255,0.05)",
                textDecoration: "none" 
              }}>
              🔒 Inscriptions closes ({seats ? seats.registered : "..."} inscrits)
            </Link>
          )}
        </div>

        {/* COLONNE DROITE (Countdown + Objectifs) */}
        <div style={{ 
          flex: "1 1 320px",
          display: "flex", 
          flexDirection: "column", 
          gap: "24px" 
        }}>
          
          {/* Countdown */}
          {open && !countdown.expired && countdown.days !== undefined && (
            <div style={{
              background: "rgba(255,255,255,0.02)",
              borderRadius: "16px", padding: "24px", textAlign: "center",
              border: "1px solid rgba(255,255,255,0.05)",
            }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
                {[
                  { val: countdown.days, label: "Jours" },
                  { val: countdown.hours, label: "Heures" },
                  { val: countdown.minutes, label: "Minutes" },
                  { val: countdown.seconds, label: "Secondes" },
                ].map(({ val, label }) => (
                  <div key={label}>
                    <div style={{ 
                      background: "rgba(255,255,255,0.05)", border: `1px solid ${themeColor}30`, 
                      color: themeColor, borderRadius: "8px", padding: "12px 0", 
                      fontSize: "24px", fontWeight: "800", fontFamily: "'Space Grotesk', sans-serif" 
                    }}>
                      {String(val).padStart(2, "0")}
                    </div>
                    <div style={{ fontSize: "11px", color: "#64748b", marginTop: "8px", textTransform: "uppercase", fontWeight: "600", letterSpacing: "0.05em" }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Objectifs */}
          <div style={{
            background: "rgba(255,255,255,0.02)",
            borderRadius: "16px", padding: "24px",
            border: "1px solid rgba(255,255,255,0.05)",
          }}>
            <p style={{ color: "#00d4ff", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", marginBottom: "16px", letterSpacing: "0.1em", fontFamily: "'Space Grotesk', sans-serif" }}>
              // Objectifs d'apprentissage
            </p>
            {objectives.slice(0, 4).map((obj, i) => (
              <div key={i} style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
                <div style={{ width: "20px", height: "20px", borderRadius: "4px", background: themeColor + "20", border: `1px solid ${themeColor}50`, fontSize: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: themeColor, flexShrink: 0, fontWeight: "700" }}>
                  {i + 1}
                </div>
                <p style={{ margin: 0, color: "#cbd5e1", fontSize: "14px", lineHeight: "1.5", fontFamily: "'Inter', sans-serif" }}>{obj}</p>
              </div>
            ))}
          </div>

          {/* Speaker */}
          <div style={{
            background: "rgba(255,255,255,0.02)",
            borderRadius: "16px", padding: "16px 20px",
            display: "flex", alignItems: "center", gap: "16px",
            border: "1px solid rgba(255,255,255,0.05)"
          }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "50%", overflow: "hidden", border: `2px solid ${themeColor}` }}>
              <img src={speaker.avatar} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ overflow: "hidden" }}>
              <p style={{ margin: 0, color: "#ffffff", fontSize: "15px", fontWeight: "700", fontFamily: "'Space Grotesk', sans-serif" }}>{speaker.name}</p>
              <p style={{ margin: 0, color: "#64748b", fontSize: "12px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontFamily: "'Inter', sans-serif" }}>{speaker.title}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Chip({ bg, color, border, children }) {
  return (
    <span style={{
      padding: "6px 12px", borderRadius: "6px", fontSize: "11px",
      fontWeight: "700", background: bg, color, border: `1px solid ${border}40`, whiteSpace: "nowrap", textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: "'Inter', sans-serif"
    }}>
      {children}
    </span>
  );
}
