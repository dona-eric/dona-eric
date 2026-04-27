/**
 * ─────────────────────────────────────────────────────────────────
 *  COMPOSANT — MasterclassHero.jsx
 *  Affiche le masterclass actif EN VEDETTE (grand format).
 *  Inclut countdown, objectifs, programme résumé, CTA inscription.
 * ─────────────────────────────────────────────────────────────────
 */
import React from "react";
import { useState, useEffect } from "react";
import { isOpen, formatDate } from "../../config/masterclasses.config";
import { useRegistration } from "../../hooks/useRegistration";
import RegistrationForm from "./RegistrationForm";

export default function MasterclassHero({ masterclass }) {
  const [showForm, setShowForm]   = useState(false);
  const [countdown, setCountdown] = useState({});
  const { seats } = useRegistration(masterclass.id);
  const open = isOpen(masterclass);

  const {
    title, subtitle, date, time, duration, format, theme, themeColor, accentColor,
    image, objectives, price, speaker, type, description, seats: maxSeats,
  } = masterclass;

  // ── Countdown ───────────────────────────────────────────────
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
      borderRadius: "24px",
      overflow: "hidden",
      background: "#0F0F1A",
      marginBottom: "60px",
      minHeight: "520px",
    }}>

      {/* Background image */}
      {image && (
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.25,
        }} />
      )}

      {/* Gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(135deg, ${themeColor}CC 0%, #0F0F1Aee 60%)`,
      }} />

      {/* Decorative circle */}
      <div style={{
        position: "absolute", right: "-80px", top: "-80px",
        width: "400px", height: "400px", borderRadius: "50%",
        border: `60px solid ${accentColor || themeColor}22`,
        pointerEvents: "none",
      }} />

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 2,
        padding: "56px 56px",
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: "48px",
        alignItems: "center",
      }}>

        {/* LEFT */}
        <div>
          {/* Badges */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
            <Chip bg={`${themeColor}33`} color={themeColor}>
              {type === "webinaire" ? "🎙️" : "🎓"} {typeLabel}
            </Chip>
            <Chip bg={open ? "#10B98133" : "#EF444433"} color={open ? "#10B981" : "#EF4444"}>
              {open ? "🟢 Inscriptions ouvertes" : "🔴 Inscriptions closes"}
            </Chip>
            <Chip bg="#FFFFFF11" color="#fff">
              {price === "Gratuit" ? "🆓 Gratuit" : `💰 ${price}`}
            </Chip>
          </div>

          {/* Thème */}
          <p style={{
            margin: "0 0 8px",
            fontSize: "13px", fontWeight: "800",
            color: accentColor || themeColor,
            textTransform: "uppercase", letterSpacing: "1.5px",
          }}>
            {theme}
          </p>

          {/* Titre */}
          <h2 style={{
            margin: "0 0 12px",
            fontSize: "clamp(28px, 3.5vw, 44px)",
            fontWeight: "900",
            color: "#fff",
            lineHeight: "1.15",
          }}>
            {title}
          </h2>

          {/* Sous-titre */}
          <p style={{
            margin: "0 0 28px",
            color: "rgba(255,255,255,0.75)",
            fontSize: "17px",
            lineHeight: "1.6",
            maxWidth: "560px",
          }}>
            {subtitle}
          </p>

          {/* Infos date/durée */}
          <div style={{ display: "flex", gap: "24px", marginBottom: "32px", flexWrap: "wrap" }}>
            {[
              { icon: "📅", val: formatDate(date) },
              { icon: "⏰", val: time },
              { icon: "⏱️", val: duration },
              { icon: "💻", val: format },
            ].map(({ icon, val }) => (
              <div key={val} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "18px" }}>{icon}</span>
                <span style={{ color: "#fff", fontWeight: "600", fontSize: "15px" }}>{val}</span>
              </div>
            ))}
          </div>

          {/* Places restantes */}
          {seats && maxSeats > 0 && (
            <div style={{
              marginBottom: "28px",
              padding: "10px 16px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "8px",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}>
              <div style={{
                height: "6px", width: "120px", background: "rgba(255,255,255,0.2)",
                borderRadius: "3px", overflow: "hidden",
              }}>
                <div style={{
                  height: "100%",
                  width: `${Math.min(100, (seats.registered / maxSeats) * 100)}%`,
                  background: themeColor,
                  borderRadius: "3px",
                }} />
              </div>
              <span style={{ color: "#fff", fontSize: "14px", fontWeight: "600" }}>
                {seats.remaining} / {maxSeats} places restantes
              </span>
            </div>
          )}

          {/* CTA */}
          {open ? (
            <button
              onClick={() => setShowForm(true)}
              style={{
                padding: "16px 40px",
                background: accentColor || "#fff",
                color: accentColor ? "#fff" : themeColor,
                border: "none", borderRadius: "12px",
                cursor: "pointer", fontWeight: "800", fontSize: "17px",
                boxShadow: `0 8px 32px ${accentColor || "#ffffff"}44`,
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = `0 12px 40px ${accentColor || "#ffffff"}66`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = `0 8px 32px ${accentColor || "#ffffff"}44`;
              }}
            >
              🎯 Je m'inscris maintenant
            </button>
          ) : (
            <div style={{
              display: "inline-block",
              padding: "16px 40px",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "12px",
              color: "rgba(255,255,255,0.6)",
              fontWeight: "700", fontSize: "16px",
            }}>
              🔒 Événement terminé — Replay à venir
            </div>
          )}
        </div>

        {/* RIGHT — Countdown + Objectifs */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", minWidth: "260px" }}>

          {/* Countdown */}
          {open && !countdown.expired && countdown.days !== undefined && (
            <div style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "16px", padding: "24px", textAlign: "center",
            }}>
              <p style={{ margin: "0 0 16px", color: "rgba(255,255,255,0.6)", fontSize: "12px",
                          textTransform: "uppercase", letterSpacing: "1px", fontWeight: "700" }}>
                ⏳ Commence dans
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
                {[
                  { val: countdown.days,    label: "J" },
                  { val: countdown.hours,   label: "H" },
                  { val: countdown.minutes, label: "Min" },
                  { val: countdown.seconds, label: "Sec" },
                ].map(({ val, label }) => (
                  <div key={label}>
                    <div style={{
                      background: themeColor, color: "#fff",
                      borderRadius: "10px", padding: "10px 4px",
                      fontSize: "24px", fontWeight: "900",
                    }}>
                      {String(val).padStart(2, "0")}
                    </div>
                    <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,0.5)", fontSize: "11px" }}>
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Objectifs résumés */}
          <div style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "16px", padding: "24px",
          }}>
            <p style={{ margin: "0 0 14px", color: "rgba(255,255,255,0.6)", fontSize: "12px",
                        textTransform: "uppercase", letterSpacing: "1px", fontWeight: "700" }}>
              🎯 Objectifs
            </p>
            {objectives.slice(0, 4).map((obj, i) => (
              <div key={i} style={{
                display: "flex", gap: "10px", alignItems: "flex-start",
                marginBottom: i < 3 ? "10px" : "0",
              }}>
                <div style={{
                  width: "20px", height: "20px", borderRadius: "50%",
                  background: themeColor, color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "11px", fontWeight: "800", flexShrink: 0, marginTop: "1px",
                }}>
                  {i + 1}
                </div>
                <p style={{ margin: 0, color: "rgba(255,255,255,0.8)", fontSize: "13px", lineHeight: "1.5" }}>
                  {obj}
                </p>
              </div>
            ))}
          </div>

          {/* Speaker */}
          <div style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "16px", padding: "16px 20px",
            display: "flex", alignItems: "center", gap: "14px",
          }}>
            <div style={{
              width: "44px", height: "44px", borderRadius: "50%", overflow: "hidden",
              border: `2px solid ${themeColor}`, flexShrink: 0,
              background: `${themeColor}33`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {speaker.avatar
                ? <img src={speaker.avatar} alt={speaker.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <span style={{ fontSize: "22px" }}>👤</span>
              }
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: "700", color: "#fff", fontSize: "14px" }}>
                {speaker.name}
              </p>
              <p style={{ margin: 0, color: "rgba(255,255,255,0.55)", fontSize: "12px" }}>
                {speaker.title}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showForm && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)",
            display: "flex", alignItems: "center", justifyContent: "center", padding: "20px",
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}
        >
          <div style={{
            background: "#fff", borderRadius: "20px",
            width: "100%", maxWidth: "560px", maxHeight: "90vh",
            overflow: "hidden", display: "flex", flexDirection: "column",
            boxShadow: "0 32px 80px rgba(0,0,0,0.4)",
          }}>
            <div style={{
              padding: "20px 28px", borderBottom: "1px solid #E5E7EB",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              background: `${themeColor}08`,
            }}>
              <div>
                <p style={{ margin: "0 0 2px", fontSize: "12px", color: themeColor, fontWeight: "700", textTransform: "uppercase" }}>
                  Inscription — {typeLabel}
                </p>
                <h3 style={{ margin: 0, fontSize: "18px", color: "#111827", fontWeight: "800" }}>
                  {title}
                </h3>
              </div>
              <button onClick={() => setShowForm(false)} style={{
                width: "36px", height: "36px", borderRadius: "50%",
                background: "#F3F4F6", border: "none", cursor: "pointer",
                fontSize: "20px", display: "flex", alignItems: "center", justifyContent: "center",
              }}>×</button>
            </div>
            <div style={{ padding: "28px", overflowY: "auto", flex: 1 }}>
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
      padding: "5px 12px", borderRadius: "100px", fontSize: "12px",
      fontWeight: "700", background: bg, color, display: "inline-flex",
      alignItems: "center", gap: "5px",
    }}>
      {children}
    </span>
  );
}
