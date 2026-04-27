import React, { useState, useEffect } from "react";
import { isOpen, formatDate } from "../../config/masterclasses.config";
import RegistrationForm from "./RegistrationForm";

export default function MasterclassCard({ masterclass }) {
  const [showForm, setShowForm] = useState(false);
  const open = isOpen(masterclass);
  
  // Détection mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 600);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { title, subtitle, date, time, format, theme, themeColor, image, imageAlt,
          price, speaker, type, duration } = masterclass;

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
        transition: "transform 0.2s",
        opacity: open ? 1 : 0.85,
        display: "flex",
        flexDirection: "column",
        height: "100%", // Pour que toutes les cartes aient la même hauteur
      }}>

        {/* Image - Hauteur réduite sur mobile pour gagner de la place */}
        <div style={{
          position: "relative",
          height: isMobile ? "150px" : "180px",
          background: `linear-gradient(135deg, ${themeColor}22, ${themeColor}44)`,
          overflow: "hidden",
        }}>
          {image ? (
            <img src={image} alt={imageAlt} style={{
              width: "100%", height: "100%", objectFit: "cover",
              filter: open ? "none" : "grayscale(60%)",
            }} />
          ) : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: "48px" }}>
              {typeIcon}
            </div>
          )}

          {/* Badges repositionnés pour mobile */}
          <div style={{
            position: "absolute", top: "10px", left: "10px",
            padding: "4px 8px", borderRadius: "6px", fontSize: "10px",
            fontWeight: "700", background: themeColor, color: "#fff",
          }}>
            {typeLabel}
          </div>
        </div>

        {/* Contenu */}
        <div style={{ padding: isMobile ? "16px" : "20px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "11px", fontWeight: "700", color: themeColor, textTransform: "uppercase", marginBottom: "6px" }}>
            {theme}
          </span>

          <h3 style={{
            margin: "0 0 8px", fontSize: isMobile ? "17px" : "18px", fontWeight: "800",
            color: "#111827", lineHeight: "1.3",
          }}>
            {title}
          </h3>

          <p style={{
            margin: "0 0 16px", fontSize: "14px", color: "#6B7280", lineHeight: "1.5",
          }}>
            {subtitle}
          </p>

          {/* Infos rapides - Adaptation Grid */}
          <div style={{
            display: "grid", 
            gridTemplateColumns: "1fr 1fr", // Garde 2 colonnes même sur mobile
            gap: "10px", 
            marginBottom: "20px",
          }}>
            {[
              { icon: "📅", label: formatDate(date).split(" ").slice(0, 3).join(" ") },
              { icon: "⏰", label: time.split(" ")[0] },
              { icon: "⏱️", label: duration },
              { icon: "💻", label: format },
            ].map(({ icon, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#4B5563" }}>
                <span style={{ flexShrink: 0 }}>{icon}</span>
                <span style={{ fontWeight: "600", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{label}</span>
              </div>
            ))}
          </div>

          {/* Speaker */}
          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            paddingTop: "14px", borderTop: "1px solid #F3F4F6",
            marginBottom: "20px",
          }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
              {speaker.avatar 
                ? <img src={speaker.avatar} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <span style={{ background: "#eee", display: "block", textAlign: "center" }}>👤</span>
              }
            </div>
            <div style={{ overflow: "hidden" }}>
              <p style={{ margin: 0, fontSize: "13px", fontWeight: "700", color: "#111827", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{speaker.name}</p>
            </div>
          </div>

          {/* CTA */}
          <div style={{ marginTop: "auto" }}>
            {open ? (
              <button
                onClick={() => setShowForm(true)}
                style={{
                  width: "100%", padding: "14px",
                  background: themeColor, color: "#fff",
                  border: "none", borderRadius: "10px",
                  cursor: "pointer", fontWeight: "700", fontSize: "15px",
                }}
              >
                🎯 S'inscrire {price}
              </button>
            ) : (
              <div style={{
                width: "100%", padding: "12px", background: "#F3F4F6", 
                color: "#9CA3AF", borderRadius: "10px", textAlign: "center", fontSize: "13px",
              }}>
                🔒 Inscriptions closes
              </div>
            )}
          </div>
        </div>
      </article>

      {/* Modal adaptée au mobile */}
      {showForm && (
        <Modal title={title} color={themeColor} onClose={() => setShowForm(false)} isMobile={isMobile}>
          <RegistrationForm masterclass={masterclass} onClose={() => setShowForm(false)} />
        </Modal>
      )}
    </>
  );
}

function Modal({ title, color, onClose, children, isMobile }) {
  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)",
        display: "flex", alignItems: isMobile ? "flex-end" : "center", // Sur mobile, la modal "monte" du bas
        justifyContent: "center",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: "#fff", 
        borderRadius: isMobile ? "20px 20px 0 0" : "20px",
        width: "100%", 
        maxWidth: "560px",
        height: isMobile ? "92vh" : "auto", 
        maxHeight: isMobile ? "92vh" : "90vh",
        overflow: "hidden",
        display: "flex", flexDirection: "column",
        boxShadow: "0 -10px 25px rgba(0,0,0,0.2)",
      }}>
        {/* Header Modal */}
        <div style={{
          padding: "16px 20px", borderBottom: "1px solid #E5E7EB",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: `${color}05`,
        }}>
          <div style={{ overflow: "hidden" }}>
            <h3 style={{ margin: 0, fontSize: "16px", color: "#111827", fontWeight: "800", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {title}
            </h3>
          </div>
          <button onClick={onClose} style={{
            width: "32px", height: "32px", borderRadius: "50%",
            background: "#F3F4F6", border: "none", fontSize: "20px",
          }}>×</button>
        </div>

        {/* Body Modal */}
        <div style={{ padding: "20px", overflowY: "auto", flex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  );
}