import React, { useState, useEffect, useRef } from "react";
import "../styles/Contact.css";

const useFadeIn = (delay = 0) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`;
    const t = setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 50);
    return () => clearTimeout(t);
  }, [delay]);
  return ref;
};

function SocialBtn({ href, label, icon, color="#00d4ff" }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      aria-label={label}
      className="contact-social-btn"
      style={{
        background: hov ? `${color}15` : "rgba(255,255,255,0.03)",
        border: `1px solid ${hov ? `${color}50` : "rgba(255,255,255,0.1)"}`,
        color: hov ? color : "#94a3b8"
      }}>
      <span className="contact-social-icon">{icon}</span>
      <span>{label}</span>
    </a>
  );
}

function Typewriter({ text, speed = 40 }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    setDisplayed("");
    const id = setInterval(() => {
      setDisplayed(text.slice(0, ++i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return (
    <span>
      {displayed}
      <span className="typewriter-cursor">|</span>
    </span>
  );
}

function MetricCard({ label, value, sub, delay }) {
  const ref = useFadeIn(delay);
  return (
    <div ref={ref} className="glass contact-metric-card">
      <div className="contact-metric-gradient" />
      <div className="contact-metric-value">{value}</div>
      <div className="contact-metric-label">{label}</div>
      {sub && <div className="contact-metric-sub">{sub}</div>}
    </div>
  );
}

function Field({ label, name, type = "text", value, onChange, placeholder, multiline }) {
  const [focused, setFocused] = useState(false);
  const baseStyle = {
    background: focused ? "rgba(0,212,255,0.05)" : "rgba(255,255,255,0.02)",
    border: `1px solid ${focused ? "rgba(0,212,255,0.5)" : "rgba(255,255,255,0.1)"}`,
  };

  return (
    <div className="contact-form-group">
      <label className="contact-form-label">
        <span className="contact-form-label-prefix">// </span>{label}
      </label>
      <div className="contact-input-wrapper">
        <span className="contact-input-icon" style={{
          color: focused ? "#00d4ff" : "#64748b"
        }}>›</span>
        {multiline ? (
          <textarea
            name={name} value={value} onChange={onChange}
            placeholder={placeholder} rows={5}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            className="contact-input"
            style={baseStyle}
          />
        ) : (
          <input
            name={name} type={type} value={value} onChange={onChange}
            placeholder={placeholder}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            className="contact-input"
            style={baseStyle}
          />
        )}
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(null); 

  const heroRef = useFadeIn(0.1);
  const formRef = useFadeIn(0.3);
  const infoRef = useFadeIn(0.4);
  const socialRef = useFadeIn(0.5); 
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { setStatus("missing"); return; }
    if (!validateEmail(form.email)) { setStatus("invalid"); return; }
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xovkejww", {
        method: "POST",
        body: JSON.stringify(form),
        headers: { Accept: "application/json", "Content-Type": "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus(null), 6000);
      } else setStatus("error");
    } catch { setStatus("error"); }
  };

  const contactInfo = [
    { label: "location", value: "Abomey-Calavi, Bénin", icon: "📍" },
    { label: "email", value: "donaerickoulodji@gmail.com", href: "mailto:donaerickoulodji@gmail.com", icon: "✉" },
    { label: "phone", value: "+229 01 41 73 02 40", href: "tel:+2290141730240", icon: "☎" },
    { label: "response_time", value: "< 24h guaranteed", icon: "⚡" },
    { label: "availability", value: "Mon – Sun · All TZ", icon: "🕐" },
  ];

  const expertise = ["Data Science", "Machine Learning", "Deep Learning", "MLOps", "Statistical Modeling", "AI Automation"];

  return (
    <>
      <main className="contact-main">
        <div className="contact-container">

          {/* HERO */}
          <div ref={heroRef} className="contact-hero">
            <div className="contact-badge" style={{ background: "rgba(99,102,241,0.1)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.2)" }}>
              <span className="contact-badge-dot" style={{ background: "#818cf8", boxShadow: "0 0 8px #818cf8" }} />
              Bénin · Monde · Remote
            </div>

            <div className="contact-title-container">
              <h1 className="contact-title">
                <Typewriter text="Parlons de votre prochain" speed={60} />
                <br />
                <span className="contact-title-gradient">système IA.</span>
              </h1>
            </div>

            <p className="contact-description" style={{ color: "#e2e8f0" }}>
              Que vous cherchiez à automatiser les processus de votre entreprise (Consulting B2B) 
              ou à vous inscrire à ma prochaine session de formation (MLAcademy), laissez-moi un message.
            </p>

            <div className="contact-tags">
              <span className="contact-tag" style={{ border: "1px solid rgba(99,102,241,0.4)" }}>Consulting B2B</span>
              <span className="contact-tag" style={{ border: "1px solid rgba(139,92,246,0.4)" }}>MLAcademy</span>
              <span className="contact-tag">Partenariats</span>
            </div>
          </div>

          {/* METRICS */}
          <div className="contact-metrics-grid">
            <MetricCard label="Projets Livrés" value="06+" sub="Domaines variés" delay={0.2} />
            <MetricCard label="Temps de réponse" value="<24h" sub="Garanti" delay={0.3} />
            <MetricCard label="Expertise" value="Full" sub="Data → Deploy" delay={0.4} />
            <MetricCard label="Disponibilité" value="Remote" sub="Tous fuseaux horaires" delay={0.5} />
          </div>

          {/* FORM + INFO */}
          <div className="contact-grid">
            
            {/* FORM */}
            <div ref={formRef} className="glass contact-form-card">
              <div className="contact-form-gradient" />

              <div className="contact-form-header">
                <div className="contact-form-badge">
                  POST /api/contact → HTTP 200
                </div>
                <h2 className="contact-form-title">
                  Démarrer la collaboration
                </h2>
                <p className="contact-form-desc">
                  Tous les champs sont requis sauf mention contraire.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="contact-form-row">
                  <Field label="Votre Nom" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" />
                  <Field label="Adresse Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@entreprise.com" />
                </div>
                
                <div className="contact-form-group">
                  <label className="contact-form-label">
                    <span className="contact-form-label-prefix">// </span>Motif de contact
                  </label>
                  <div className="contact-input-wrapper">
                    <span className="contact-input-icon" style={{ color: "#64748b" }}>›</span>
                    <select
                      name="subject" value={form.subject} onChange={handleChange}
                      className="contact-input"
                      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.1)", appearance: "none" }}
                    >
                      <option value="" disabled>Sélectionnez un motif</option>
                      <option value="Projet d'entreprise / Consulting">Projet d'entreprise / Consulting</option>
                      <option value="Question sur MLAcademy">Question sur MLAcademy</option>
                      <option value="Autre demande">Autre demande</option>
                    </select>
                  </div>
                </div>

                <Field label="Message" name="message" value={form.message} onChange={handleChange}
                  placeholder="Décrivez votre besoin..." multiline />

                {/* Status Messages */}
                {status === "missing" && (
                  <div className="contact-status-error">
                    ✗ Erreur de validation : tous les champs requis doivent être remplis.
                  </div>
                )}
                {status === "invalid" && (
                  <div className="contact-status-error">
                    ✗ Erreur d'email : le format est invalide.
                  </div>
                )}
                {status === "success" && (
                  <div className="contact-status-success">
                    <div className="contact-status-success-title">
                      ✓ 200 OK — Message envoyé avec succès
                    </div>
                    <div className="contact-status-success-desc">
                      Je vous réponds sous 24h. Merci !
                    </div>
                  </div>
                )}
                {status === "error" && (
                  <div className="contact-status-error">
                    ✗ Erreur Serveur 500 ! Veuillez réessayer ou m'envoyer un email directement.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="contact-submit-btn"
                >
                  {status === "sending" ? (
                    <>
                      <span className="contact-spin-icon">⟳</span>
                      Transmission...
                    </>
                  ) : (
                    <>Envoyer le message →</>
                  )}
                </button>
              </form>
            </div>

            {/* INFO PANEL */}
            <div ref={infoRef} className="contact-info-panel">
              
              <div className="glass contact-info-card">
                <div className="contact-info-gradient" />
                <div className="contact-info-badge">
                  contact.json
                </div>

                <div className="contact-info-list">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="contact-info-item">
                      <div className="contact-info-label">
                        {item.label}
                      </div>
                      {item.href ? (
                        <a href={item.href} className="info-value-link">
                          {item.icon} <span style={{ marginLeft: 8 }}>{item.value}</span>
                        </a>
                      ) : (
                        <div className="contact-info-value">
                          {item.icon} <span style={{ marginLeft: 8 }}>{item.value}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="contact-mission-card">
                <div className="contact-mission-badge">
                  // mission.md
                </div>
                <p className="contact-mission-desc">
                  Une rigueur issue de la physique appliquée aux données. De l'analyse exploratoire aux systèmes ML en production. Je comble le fossé entre la donnée brute et les décisions intelligentes.
                </p>
                <div className="contact-mission-tags">
                  {["#Freelance", "#Contract", "#Research", "#Remote"].map((t) => (
                    <span key={t} className="contact-mission-tag">{t}</span>
                  ))}
                </div>
              </div>

              <div ref={socialRef} className="contact-social-container">
                <SocialBtn href="https://github.com/dona-eric" label="GitHub" color="#00d4ff"
                  icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>}
                />
                <SocialBtn href="https://linkedin.com/in/dona-erick" label="LinkedIn" color="#a855f7"
                  icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>}
                />
              </div>

            </div>
          </div>
        </div>
      </main>
    </>
  );
}