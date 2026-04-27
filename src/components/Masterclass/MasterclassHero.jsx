import React, { useState, useEffect } from "react";
import { isOpen, formatDate } from "../../config/masterclasses.config";
import { useRegistration } from "../../hooks/useRegistration";
import RegistrationForm from "./RegistrationForm";

export default function MasterclassHero({ masterclass }) {
  const [showForm, setShowForm]   = useState(false);
  const [countdown, setCountdown] = useState({});
  const { seats } = useRegistration(masterclass.id);
  const open = isOpen(masterclass);

  // Détection mobile simple
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 992);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    <section style={{
      position: "relative",
      borderRadius: isMobile ? "16px" : "24px",
      overflow: "hidden",
      background: "#0F0F1A",
      marginBottom: "40px",
      minHeight: isMobile ? "auto" : "520px",
    }}>

      {/* Background & Overlays */}
      {image && (
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${image})`,
          backgroundSize: "cover", backgroundPosition: "center",
          opacity: 0.2,
        }} />
      )}
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(135deg, ${themeColor}EE 0%, #0F0F1A 100%)`,
      }} />

      {/* Conteneur Principal Flexible */}
      <div style={{
        position: "relative", zIndex: 2,
        padding: isMobile ? "32px 20px" : "56px",
        display: "flex",
        flexDirection: isMobile ? "column" : "row", // Empilage vertical sur mobile
        gap: isMobile ? "32px" : "48px",
      }}>

        {/* COLONNE GAUCHE (Textes) */}
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
            <Chip bg={`${themeColor}33`} color="#fff">{typeLabel}</Chip>
            <Chip bg={open ? "#10B98133" : "#EF444433"} color={open ? "#10B981" : "#EF4444"}>
              {open ? "Ouvert" : "Clos"}
            </Chip>
            <Chip bg="#FFFFFF11" color="#fff">{price}</Chip>
          </div>

          <h2 style={{
            margin: "0 0 16px",
            fontSize: isMobile ? "28px" : "44px",
            fontWeight: "900",
            color: "#fff",
            lineHeight: "1.2",
          }}>
            {title}
          </h2>

          <p style={{
            margin: "0 0 28px",
            color: "rgba(255,255,255,0.8)",
            fontSize: isMobile ? "15px" : "17px",
            lineHeight: "1.6",
            maxWidth: "600px",
          }}>
            {subtitle}
          </p>

          {/* Grid d'infos adaptée au mobile */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fill, minmax(140px, 1fr))", 
            gap: "16px", 
            marginBottom: "32px" 
          }}>
            {[
              { icon: "📅", val: formatDate(date) },
              { icon: "⏰", val: time },
              { icon: "⏱️", val: duration },
              { icon: "💻", val: format },
            ].map(({ icon, val }) => (
              <div key={val} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span>{icon}</span>
                <span style={{ color: "#fff", fontWeight: "600", fontSize: "14px" }}>{val}</span>
              </div>
            ))}
          </div>

          {/* CTA Mobile Full Width */}
          {open ? (
            <button
              onClick={() => setShowForm(true)}
              style={{
                width: isMobile ? "100%" : "auto",
                padding: "18px 40px",
                background: accentColor || "#fff",
                color: accentColor ? "#fff" : themeColor,
                border: "none", borderRadius: "12px",
                cursor: "pointer", fontWeight: "800", fontSize: "16px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
              }}
            >
              🎯 Je m'inscris maintenant
            </button>
          ) : (
            <div style={{ color: "#94A3B8", fontWeight: "700" }}>🔒 Inscriptions closes</div>
          )}
        </div>

        {/* COLONNE DROITE (Countdown + Objectifs) */}
        <div style={{ 
          width: isMobile ? "100%" : "320px", 
          display: "flex", 
          flexDirection: "column", 
          gap: "20px" 
        }}>
          
          {/* Countdown (Plus compact sur mobile) */}
          {open && !countdown.expired && countdown.days !== undefined && (
            <div style={{
              background: "rgba(255,255,255,0.08)",
              borderRadius: "16px", padding: "16px", textAlign: "center",
              border: "1px solid rgba(255,255,255,0.1)",
            }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
                {[
                  { val: countdown.days, label: "J" },
                  { val: countdown.hours, label: "H" },
                  { val: countdown.minutes, label: "M" },
                  { val: countdown.seconds, label: "S" },
                ].map(({ val, label }) => (
                  <div key={label}>
                    <div style={{ background: themeColor, color: "#fff", borderRadius: "8px", padding: "8px 0", fontSize: "18px", fontWeight: "900" }}>
                      {String(val).padStart(2, "0")}
                    </div>
                    <div style={{ fontSize: "10px", color: "#94A3B8", marginTop: "4px" }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Objectifs */}
          <div style={{
            background: "rgba(255,255,255,0.05)",
            borderRadius: "16px", padding: "20px",
            border: "1px solid rgba(255,255,255,0.1)",
          }}>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", marginBottom: "12px" }}>
              🎯 Ce que vous allez apprendre
            </p>
            {objectives.slice(0, 4).map((obj, i) => (
              <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
                <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: themeColor, fontSize: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0 }}>
                  {i + 1}
                </div>
                <p style={{ margin: 0, color: "#CBD5E1", fontSize: "13px" }}>{obj}</p>
              </div>
            ))}
          </div>

          {/* Speaker */}
          <div style={{
            background: "rgba(255,255,255,0.05)",
            borderRadius: "16px", padding: "12px 16px",
            display: "flex", alignItems: "center", gap: "12px",
          }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", overflow: "hidden", border: `2px solid ${themeColor}` }}>
              <img src={speaker.avatar} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ overflow: "hidden" }}>
              <p style={{ margin: 0, color: "#fff", fontSize: "14px", fontWeight: "700" }}>{speaker.name}</p>
              <p style={{ margin: 0, color: "#94A3B8", fontSize: "11px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{speaker.title}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal d'inscription */}
      {showForm && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 9999,
          background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: isMobile ? "0" : "20px",
        }}>
          <div style={{
            background: "#fff", width: "100%", height: isMobile ? "100%" : "auto", 
            maxWidth: "560px", borderRadius: isMobile ? "0" : "20px", overflow: "hidden"
          }}>
            {/* Header Modal */}
            <div style={{ padding: "20px", borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: "800" }}>Inscription</span>
              <button onClick={() => setShowForm(false)} style={{ border: "none", background: "none", fontSize: "24px" }}>×</button>
            </div>
            <div style={{ padding: "20px", overflowY: "auto", height: isMobile ? "calc(100% - 70px)" : "auto" }}>
              <RegistrationForm masterclass={masterclass} onClose={() => setShowForm(false)} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Chip({ bg, color, children }) {
  return (
    <span style={{
      padding: "4px 10px", borderRadius: "100px", fontSize: "11px",
      fontWeight: "700", background: bg, color, whiteSpace: "nowrap"
    }}>
      {children}
    </span>
  );
}