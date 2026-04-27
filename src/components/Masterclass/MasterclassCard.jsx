/**
 * ─────────────────────────────────────────────────────────────────
 *  COMPOSANT — MasterclassCard.jsx
 *  Carte pour afficher les masterclasses passées et à venir.
 *  Les passées affichent "Inscriptions closes".
 * ─────────────────────────────────────────────────────────────────
 */
import React from "react";
import { useState } from "react";
import { isOpen, formatDate } from "../../config/masterclasses.config";
import RegistrationForm from "./RegistrationForm";

export default function MasterclassCard({ masterclass }) {
  const [showForm, setShowForm] = useState(false);
  const open = isOpen(masterclass);
  const { title, subtitle, date, time, format, theme, themeColor, image, imageAlt,
          price, speaker, type, duration, seats } = masterclass;

  const typeLabel = type === "webinaire" ? "Webinaire" : "Masterclass";
  const typeIcon  = type === "webinaire" ? "🎙️" : "🎓";

  return (
    <>
      <article style={{
        background: "#fff",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid #E5E7EB",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        transition: "transform 0.2s, box-shadow 0.2s",
        opacity: open ? 1 : 0.85,
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        if (open) {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.12)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
      }}>

        {/* Image */}
        <div style={{
          position: "relative",
          height: "180px",
          background: `linear-gradient(135deg, ${themeColor}22, ${themeColor}44)`,
          overflow: "hidden",
        }}>
          {image ? (
            <img src={image} alt={imageAlt} style={{
              width: "100%", height: "100%", objectFit: "cover",
              filter: open ? "none" : "grayscale(60%)",
            }} />
          ) : (
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              height: "100%", fontSize: "64px",
            }}>
              {typeIcon}
            </div>
          )}

          {/* Badge type */}
          <div style={{
            position: "absolute", top: "12px", left: "12px",
            padding: "4px 10px", borderRadius: "6px", fontSize: "12px",
            fontWeight: "700", background: themeColor, color: "#fff",
            textTransform: "uppercase", letterSpacing: "0.5px",
          }}>
            {typeIcon} {typeLabel}
          </div>

          {/* Badge statut */}
          <div style={{
            position: "absolute", top: "12px", right: "12px",
            padding: "4px 10px", borderRadius: "6px", fontSize: "12px",
            fontWeight: "700",
            background: open ? "#D1FAE5" : "#FEE2E2",
            color: open ? "#065F46" : "#991B1B",
          }}>
            {open ? "🟢 Ouvert" : "🔴 Terminé"}
          </div>
        </div>

        {/* Contenu */}
        <div style={{ padding: "20px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Thème */}
          <span style={{
            fontSize: "12px", fontWeight: "700", color: themeColor,
            textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "8px",
            display: "block",
          }}>
            {theme}
          </span>

          {/* Titre */}
          <h3 style={{
            margin: "0 0 6px", fontSize: "15px", fontWeight: "800",
            color: "#111827", lineHeight: "1.3",
          }}>
            {title}
          </h3>

          {/* Sous-titre */}
          <p style={{
            margin: "0 0 16px", fontSize: "14px", color: "#6B7280", lineHeight: "1.5",
          }}>
            {subtitle}
          </p>

          {/* Infos rapides */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "8px", marginBottom: "20px",
          }}>
            {[
              { icon: "📅", label: formatDate(date).split(" ").slice(0, 3).join(" ") },
              { icon: "⏰", label: time.split(" ")[0] },
              { icon: "⏱️", label: duration },
              { icon: "💻", label: format },
            ].map(({ icon, label }) => (
              <div key={label} style={{
                display: "flex", alignItems: "center", gap: "6px",
                fontSize: "13px", color: "#4B5563",
              }}>
                <span>{icon}</span>
                <span style={{ fontWeight: "500" }}>{label}</span>
              </div>
            ))}
          </div>

          {/* Speaker */}
          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            paddingTop: "16px", borderTop: "1px solid #F3F4F6",
            marginBottom: "20px",
          }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "50%",
              background: `${themeColor}22`, border: `2px solid ${themeColor}44`,
              display: "flex", alignItems: "center", justifyContent: "center",
              overflow: "hidden", flexShrink: 0,
            }}>
              {speaker.avatar
                ? <img src={speaker.avatar} alt={speaker.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <span style={{ fontSize: "16px" }}>👤</span>
              }
            </div>
            <div>
              <p style={{ margin: 0, fontSize: "14px", fontWeight: "700", color: "#111827" }}>
                {speaker.name}
              </p>
              <p style={{ margin: 0, fontSize: "12px", color: "#6B7280" }}>
                {speaker.title}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div style={{ marginTop: "auto" }}>
            {open ? (
              <button
                onClick={() => setShowForm(true)}
                style={{
                  width: "100%", padding: "13px",
                  background: themeColor, color: "#fff",
                  border: "none", borderRadius: "10px",
                  cursor: "pointer", fontWeight: "700", fontSize: "15px",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = "0.9"}
                onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
              >
                🎯 S'inscrire {price}
              </button>
            ) : (
              <div style={{
                width: "100%", padding: "13px",
                background: "#F3F4F6", color: "#9CA3AF",
                border: "1px solid #E5E7EB", borderRadius: "10px",
                textAlign: "center", fontSize: "14px", fontWeight: "600",
                boxSizing: "border-box",
              }}>
                🔒 Inscriptions closes
              </div>
            )}
          </div>
        </div>
      </article>

      {/* Modal formulaire */}
      {showForm && (
        <Modal title={title} color={themeColor} onClose={() => setShowForm(false)}>
          <RegistrationForm masterclass={masterclass} onClose={() => setShowForm(false)} />
        </Modal>
      )}
    </>
  );
}

//  Modal 
function Modal({ title, color, onClose, children }) {
  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: "#fff", borderRadius: "20px",
        width: "100%", maxWidth: "560px",
        maxHeight: "90vh", overflow: "hidden",
        display: "flex", flexDirection: "column",
        boxShadow: "0 24px 64px rgba(0,0,0,0.25)",
      }}>
        {/* Modal header */}
        <div style={{
          padding: "20px 28px",
          borderBottom: "1px solid #E5E7EB",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: `${color}08`,
        }}>
          <div>
            <p style={{ margin: "0 0 2px", fontSize: "12px", color: color, fontWeight: "700", textTransform: "uppercase" }}>
              Inscription
            </p>
            <h3 style={{ margin: 0, fontSize: "18px", color: "#111827", fontWeight: "800" }}>
              {title}
            </h3>
          </div>
          <button onClick={onClose} style={{
            width: "36px", height: "36px", borderRadius: "50%",
            background: "#F3F4F6", border: "none", cursor: "pointer",
            fontSize: "20px", display: "flex", alignItems: "center", justifyContent: "center",
          }}>×</button>
        </div>

        {/* Modal body scrollable */}
        <div style={{ padding: "28px", overflowY: "auto", flex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
