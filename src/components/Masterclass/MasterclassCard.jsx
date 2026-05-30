import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isOpen, formatDate } from "../../config/masterclasses.config";
import { useRegistration } from "../../hooks/useRegistration";

export default function MasterclassCard({ masterclass }) {
  const [showForm, setShowForm] = useState(false);
  const { seats } = useRegistration(masterclass.id);
  const open = isOpen(masterclass);
  
  const { title, subtitle, date, time, format, theme, themeColor, image, imageAlt,
          price, speaker, type, duration } = masterclass;

  const typeLabel = type === "webinaire" ? "Webinaire" : "Masterclass";

  return (
    <>
      <article className="glass" style={{
        borderRadius: "16px",
        overflow: "hidden",
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
        padding: 0
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.borderColor = themeColor;
        e.currentTarget.style.boxShadow = `0 16px 40px ${themeColor}20`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "var(--glass-border)";
        e.currentTarget.style.boxShadow = "none";
      }}
      >
        {/* Top border accent */}
        <div style={{
          height: 3,
          background: `linear-gradient(90deg, transparent, ${themeColor}, transparent)`,
          opacity: 0.8
        }} />

        <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <span style={{
              padding: "4px 10px", borderRadius: 4, fontSize: 11,
              fontFamily: "'Inter', sans-serif", fontWeight: 600, color: themeColor,
              background: themeColor + "15", border: `1px solid ${themeColor}30`, textTransform: "uppercase"
            }}>{theme}</span>
            <span style={{
              padding: "4px 10px", borderRadius: 4, fontSize: 11,
              fontFamily: "'Inter', sans-serif", fontWeight: 600, color: open ? "#10b981" : "#f59e0b",
              background: open ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)", 
              border: `1px solid ${open ? "rgba(16,185,129,0.3)" : "rgba(245,158,11,0.3)"}`, textTransform: "uppercase"
            }}>
              {typeLabel}
            </span>
          </div>

          <h3 style={{
            margin: "0 0 8px", fontSize: "20px", fontWeight: "700",
            color: "#ffffff", lineHeight: "1.3", fontFamily: "'Space Grotesk', sans-serif"
          }}>
            {title}
          </h3>

          <p style={{
            margin: "0 0 20px", fontSize: "14px", color: "#94a3b8", lineHeight: "1.6", flexGrow: 1
          }}>
            {subtitle}
          </p>

          <div style={{
            display: "grid", 
            gridTemplateColumns: "1fr 1fr",
            gap: "12px", 
            marginBottom: "24px",
            padding: "16px",
            background: "rgba(255,255,255,0.02)",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.05)"
          }}>
            {[
              { icon: "📅", label: formatDate(date).split(" ").slice(0, 3).join(" ") },
              { icon: "⏰", label: time.split(" ")[0] },
              { icon: "⏱️", label: duration },
              { icon: "💻", label: format },
            ].map(({ icon, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#e2e8f0" }}>
                <span style={{ flexShrink: 0, opacity: 0.8 }}>{icon}</span>
                <span style={{ fontWeight: "500", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontFamily: "'Inter', sans-serif" }}>{label}</span>
              </div>
            ))}
          </div>

          {/* Speaker */}
          <div style={{
            display: "flex", alignItems: "center", gap: "12px",
            paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.05)",
            marginBottom: "24px",
          }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: `1px solid ${themeColor}50` }}>
              {speaker.avatar 
                ? <img src={speaker.avatar} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <span style={{ background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>👤</span>
              }
            </div>
            <div style={{ overflow: "hidden" }}>
              <p style={{ margin: 0, fontSize: "14px", fontWeight: "600", color: "#ffffff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontFamily: "'Inter', sans-serif" }}>{speaker.name}</p>
            </div>
          </div>

          {/* CTA */}
          <div style={{ marginTop: "auto" }}>
            {open ? (
              <Link
                to={`/formations/${masterclass.id}`}
                style={{
                  display: "block",
                  width: "100%", padding: "14px",
                  background: themeColor, color: "#000000",
                  border: "none", borderRadius: "8px",
                  cursor: "pointer", fontWeight: "700", fontSize: "15px",
                  fontFamily: "'Inter', sans-serif", textDecoration: "none", textAlign: "center",
                  transition: "all 0.2s ease", boxSizing: "border-box",
                  boxShadow: `0 4px 15px ${themeColor}40`
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                Voir les détails & S'inscrire
              </Link>
            ) : (
              <Link
                to={`/formations/${masterclass.id}`}
                style={{
                  display: "block",
                  width: "100%", padding: "14px", background: "rgba(255,255,255,0.03)", 
                  color: "#64748b", borderRadius: "8px", textAlign: "center", fontSize: "14px",
                  fontFamily: "'Inter', sans-serif", fontWeight: "500", border: "1px solid rgba(255,255,255,0.05)",
                  textDecoration: "none", boxSizing: "border-box"
                }}>
                🔒 Inscriptions closes ({seats ? seats.registered : "..."} inscrits)
              </Link>
            )}
          </div>
        </div>
      </article>
    </>
  );
}
