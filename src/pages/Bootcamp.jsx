import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  ACADEMY, TRACKS, MISSION, ADVANTAGES, DELIVERABLES, TIMELINE_STEPS,
  TARGET_AUDIENCE, SKILLS_OUTCOME, VALUES, FAQ, INSTRUCTOR,
  COMMUNITY, FORM_OPTIONS,
} from "../config/academy.config";
import { AcademyService } from "../services/academyService";
import GenerativeBg from "../components/GenerativeBg";
import Desktop from "../components/os/Desktop";
import "../styles/Academy.css";

export default function Bootcamp({ isWindow }) {
  const [preRegCount, setPreRegCount] = useState(0);

  useEffect(() => {
    AcademyService.getCount()
      .then((data) => setPreRegCount(data.count || 0))
      .catch(() => {});
  }, []);

  const content = (
    <div className="academy-main" style={isWindow ? { minHeight: "100%", padding: 0 } : {}}>
      {!isWindow && <GenerativeBg />}

      {/* ══════════════════ HERO ══════════════════ */}
      <section className="academy-hero">
        <div className="academy-hero-content">
          <div className="academy-badge">
            <span className="academy-badge-dot" />
            Pré-inscriptions ouvertes — {ACADEMY.cohort.name}
          </div>

          <h1 dangerouslySetInnerHTML={{ __html: "Road to Data Science<br/><span class='gradient-text'>Moderne en 90 Jours</span>" }}>
          </h1>

          <p className="academy-hero-sub" style={{ fontSize: "1.2rem", maxWidth: "600px" }}>
            {ACADEMY.subtitle}
          </p>

          <div className="academy-hero-tags">
            {ACADEMY.badges.map((b) => (
              <span key={b} className="academy-hero-tag" style={{ border: "1px solid rgba(99,102,241,0.3)", background: "rgba(99,102,241,0.1)", color: "#a5b4fc" }}>
                ✓ {b}
              </span>
            ))}
          </div>

          <div className="academy-cta-group">
            <a href="#inscription" className="academy-cta-primary">
              🚀 Je réserve ma place
            </a>
            <a href="#roadmap" className="academy-cta-secondary">
              📋 Voir le programme
            </a>
          </div>

          {preRegCount > 0 && (
            <p className="academy-counter">
              <strong>{preRegCount}</strong> personnes déjà pré-inscrites
            </p>
          )}
        </div>
      </section>

      {/* ══════════════════ STATS / PROGRESSION ══════════════════ */}
      <section style={{ background: "rgba(0,0,0,0.2)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "24px 48px" }}>
          {ACADEMY.stats.map((stat, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "32px", fontWeight: "700", color: "#f8fafc", fontFamily: "'Space Grotesk', sans-serif" }}>{stat.value}</div>
              <div style={{ fontSize: "14px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "500" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════ POURQUOI MLACADEMY ══════════════════ */}
      <div className="academy-divider" />
      <section className="academy-section">
        <span className="academy-section-label">// story.begin()</span>
        <h2 className="academy-section-title">
          <span className="gradient-text">{MISSION.title}</span>
        </h2>

        <div className="academy-story-content" style={{ background: "rgba(15,23,42,0.6)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "24px", padding: "40px", maxWidth: "800px", margin: "0 auto", textAlign: "left", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}>
          <p style={{ fontSize: "18px", color: "#e2e8f0", lineHeight: "1.8", marginBottom: "24px" }}>
            {MISSION.problem}
          </p>
          <div className="academy-why-highlight" style={{ marginBottom: "24px" }}>
            {["Modèles isolés", "Jupyter Notebooks", "Datasets parfaits"].map((t) => (
              <span key={t} className="academy-why-pill">{t}</span>
            ))}
          </div>
          <p style={{ fontSize: "18px", color: "#e2e8f0", lineHeight: "1.8", paddingLeft: "16px", borderLeft: "4px solid #6366f1" }}>
            {MISSION.vision}
          </p>
          <div className="academy-why-highlight" style={{ marginTop: "24px" }}>
            {["Déploiement Cloud", "Kubernetes", "Systèmes temps réel", "CI/CD"].map((t) => (
              <span key={t} className="academy-why-pill good">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ POUR QUI ══════════════════ */}
      <div className="academy-divider" />
      <section className="academy-section">
        <span className="academy-section-label">// target.audience()</span>
        <h2 className="academy-section-title">Pour qui ?</h2>
        <p className="academy-section-desc">
          Cette académie est conçue pour toute personne motivée, avec ou sans expérience préalable en Data Science.
        </p>
        <div className="academy-audience-grid">
          {TARGET_AUDIENCE.map((item, i) => (
            <div key={i} className="academy-audience-item">
              <span className="academy-audience-icon">{item.icon}</span>
              <span className="academy-audience-label">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════ TIMELINE ══════════════════ */}
      <div className="academy-divider" />
      <section className="academy-section">
        <span className="academy-section-label">// votre.parcours()</span>
        <h2 className="academy-section-title">Le parcours en un coup d'œil</h2>
        <p className="academy-section-desc">
          De la pré-inscription à la communauté alumni, voici les étapes qui vous attendent.
        </p>
        <div className="academy-timeline">
          {TIMELINE_STEPS.map((step, i) => {
            let currentStatus = "upcoming";
            const cohortStatus = ACADEMY.cohort.status; // pre-registration, selection, open, active, completed
            
            const statusMap = {
              "pre-registration": 0,
              "selection": 1,
              "open": 2,
              "active": 3,
              "completed": 6
            };
            
            const currentStepIdx = statusMap[cohortStatus] || 0;
            
            if (i < currentStepIdx) currentStatus = "done";
            else if (i === currentStepIdx) currentStatus = "active";
            
            return (
              <div key={i} className={`academy-timeline-step ${currentStatus === "active" ? "active" : currentStatus === "done" ? "done" : ""}`}>
                <div className="academy-timeline-dot">{step.icon}</div>
                <div className="academy-timeline-info">
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════ ROADMAP ══════════════════ */}
      <div className="academy-divider" />
      <section id="roadmap" className="academy-section">
        <span className="academy-section-label">// curriculum.load()</span>
        <h2 className="academy-section-title">
          La Roadmap des <span className="gradient-text">{ACADEMY.cohort.duration}</span>
        </h2>
        <p className="academy-section-desc">
          7 niveaux progressifs, du débutant à l'ingénieur IA opérationnel. Chaque niveau se termine par un projet concret.
        </p>

        <div className="academy-levels">
          {TRACKS.map((track) => (
            <div key={track.id} className="academy-level-card">
              <div className="academy-level-icon" style={{ background: track.color + "15", border: `1px solid ${track.color}30` }}>
                {track.icon}
              </div>
              <div>
                <div className="academy-level-header">
                  <span className="academy-level-number">MODULE {track.id}</span>
                  <span className="academy-level-title" style={{ color: track.color }}>{track.title}</span>
                  <span className="academy-level-duration">{track.duration}</span>
                  {track.free && <span className="academy-level-free">GRATUIT</span>}
                </div>
                
                {/* Tech Stack */}
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "16px" }}>
                  {track.stack.map((tech, idx) => (
                    <span key={idx} style={{ fontSize: "12px", background: "rgba(255,255,255,0.06)", padding: "2px 8px", borderRadius: "4px", color: "#cbd5e1" }}>
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Outcomes */}
                <div style={{ marginBottom: "16px" }}>
                  <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "8px", fontWeight: "600", textTransform: "uppercase" }}>Vous serez capable de :</div>
                  <ul style={{ margin: 0, paddingLeft: "16px", color: "#94a3b8", fontSize: "14px", display: "flex", flexDirection: "column", gap: "6px" }}>
                    {track.learningOutcomes.map((outcome, idx) => (
                      <li key={idx}>{outcome}</li>
                    ))}
                  </ul>
                </div>

                {/* Projects */}
                {track.projects.length > 0 && (
                  <div style={{ background: "rgba(99,102,241,0.05)", border: "1px solid rgba(99,102,241,0.15)", borderRadius: "8px", padding: "12px 16px", marginTop: "16px" }}>
                    <div style={{ fontSize: "13px", color: "#8b5cf6", marginBottom: "6px", fontWeight: "600" }}>🚀 PROJETS :</div>
                    <ul style={{ margin: 0, paddingLeft: "16px", color: "#cbd5e1", fontSize: "14px" }}>
                      {track.projects.map((proj, idx) => (
                        <li key={idx}>{proj}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════ CE QUE VOUS SAUREZ FAIRE ══════════════════ */}
      <div className="academy-divider" />
      <section className="academy-section">
        <span className="academy-section-label">// skills.acquired()</span>
        <h2 className="academy-section-title">Ce que vous saurez faire</h2>
        <p className="academy-section-desc">
          À la fin des 90 jours, vous serez capable de :
        </p>
        <div className="academy-skills-grid">
          {SKILLS_OUTCOME.map((skill, i) => (
            <div key={i} className="academy-skill-item">
              <span className="academy-skill-check">✓</span>
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════ AVANTAGES ══════════════════ */}
      <div className="academy-divider" />
      <section className="academy-section academy-section-center">
        <span className="academy-section-label">// academy.features()</span>
        <h2 className="academy-section-title">Pourquoi choisir MLAcademy ?</h2>
        <p className="academy-section-desc">
          Une formation pensée pour l'impact, pas pour le volume.
        </p>
        <div className="academy-advantages-grid">
          {ADVANTAGES.map((adv, i) => (
            <div key={i} className="academy-advantage-card">
              <div className="academy-advantage-icon">{adv.icon}</div>
              <div className="academy-advantage-title">{adv.title}</div>
              <div className="academy-advantage-desc">{adv.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════ PROJETS LIVRABLES ══════════════════ */}
      <div className="academy-divider" />
      <section className="academy-section academy-section-center">
        <span className="academy-section-label">// projects.build()</span>
        <h2 className="academy-section-title">
          8 projets que vous <span className="gradient-text">construirez</span>
        </h2>
        <p className="academy-section-desc">
          Chaque étudiant repart avec un portfolio complet de projets déployés.
        </p>
        <div className="academy-deliverables-grid">
          {DELIVERABLES.map((d, i) => (
            <div key={i} className="academy-deliverable-card">
              <div className="academy-deliverable-icon">{d.icon}</div>
              <div className="academy-deliverable-title">{d.title}</div>
              <div className="academy-deliverable-desc">{d.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════ CERTIFICATIONS ══════════════════ */}
      <div className="academy-divider" />
      <section className="academy-section academy-section-center">
        <span className="academy-section-label">// certifications.earn()</span>
        <h2 className="academy-section-title">Certifications</h2>
        <p className="academy-section-desc">
          Un certificat à la fin de chaque module. Une certification finale après validation du projet.
        </p>
        <div className="academy-deliverables-grid">
          {TRACKS.filter((t) => t.certification).map((t) => (
            <div key={t.id} className="academy-deliverable-card">
              <div className="academy-deliverable-icon">📜</div>
              <div className="academy-deliverable-title">{t.certification}</div>
              <div className="academy-deliverable-desc">Module {t.id} — {t.title}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════ L'INSTRUCTEUR ══════════════════ */}
      <div className="academy-divider" />
      <section className="academy-section">
        <span className="academy-section-label">// instructor.profile()</span>
        <h2 className="academy-section-title">Votre instructeur</h2>
        <div className="academy-instructor-card">
          <img
            src={INSTRUCTOR.avatar}
            alt={INSTRUCTOR.name}
            className="academy-instructor-avatar"
          />
          <div>
            <h3 className="academy-instructor-name">{INSTRUCTOR.name}</h3>
            <p className="academy-instructor-title">{INSTRUCTOR.title}</p>
            <p className="academy-instructor-bio">{INSTRUCTOR.bio}</p>
            <div className="academy-instructor-stats">
              {INSTRUCTOR.stats.map((s, i) => (
                <div key={i} className="academy-instructor-stat">
                  <div className="academy-instructor-stat-value">{s.value}</div>
                  <div className="academy-instructor-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ POURQUOI 50 PLACES ══════════════════ */}
      <div className="academy-divider" />
      <section className="academy-section academy-section-center">
        <div className="academy-scarcity">
          <h3>Pourquoi seulement {ACADEMY.cohort.seats} places ?</h3>
          <p>
            Cette première cohorte sera volontairement limitée.
            Parce que la qualité d'accompagnement est notre priorité absolue.
          </p>
          <div className="academy-scarcity-reasons">
            {[
              "Répondre personnellement à chaque question",
              "Corriger chaque projet individuellement",
              "Accompagner chaque étudiant vers son objectif",
              "Construire une vraie communauté soudée",
            ].map((r, i) => (
              <div key={i} className="academy-scarcity-reason">
                <span>✓</span> {r}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ NOS VALEURS ══════════════════ */}
      <div className="academy-divider" />
      <section className="academy-section academy-section-center">
        <span className="academy-section-label">// values.core()</span>
        <h2 className="academy-section-title">Nos valeurs</h2>
        <div className="academy-values-grid">
          {VALUES.map((v, i) => (
            <div key={i} className="academy-value-card">
              <div className="academy-value-icon">{v.icon}</div>
              <div className="academy-value-title">{v.title}</div>
              <div className="academy-value-desc">{v.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════ COMMUNAUTÉ ══════════════════ */}
      <div className="academy-divider" />
      <section className="academy-section">
        <span className="academy-section-label">// community.join()</span>
        <h2 className="academy-section-title">Rejoignez la communauté</h2>
        <p className="academy-section-desc">
          MLAcademy, c'est aussi un réseau de passionnés. Rejoignez-nous sur vos plateformes préférées.
        </p>
        <div className="academy-community-grid">
          {COMMUNITY.map((c, i) => (
            <a key={i} href={c.url} target="_blank" rel="noopener noreferrer" className="academy-community-card">
              <span className="academy-community-icon">{c.icon}</span>
              <div>
                <div className="academy-community-name">{c.name}</div>
                <div className="academy-community-desc">{c.desc}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ══════════════════ FAQ ══════════════════ */}
      <div className="academy-divider" />
      <section className="academy-section">
        <span className="academy-section-label">// faq.answers()</span>
        <h2 className="academy-section-title">Questions fréquentes</h2>
        <div className="academy-faq-list">
          {FAQ.map((item, i) => (
            <FaqItem key={i} question={item.q} answer={item.a} />
          ))}
        </div>
      </section>

      {/* ══════════════════ FORMULAIRE ══════════════════ */}
      <div className="academy-divider" />
      <section id="inscription" className="academy-form-section">
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center", marginBottom: 48 }}>
          <span className="academy-section-label">// register.now()</span>
          <h2 className="academy-section-title">Pré-inscription — {ACADEMY.cohort.name}</h2>
          <p className="academy-section-desc" style={{ margin: "0 auto" }}>
            Réservez votre place dès maintenant. Aucun paiement requis à ce stade.
          </p>
        </div>
        <RegistrationForm onSuccess={() => setPreRegCount((c) => c + 1)} />
      </section>
    </div>
  );

  if (!isWindow) {
    return <Desktop />;
  }

  return (
    <>
      <Helmet>
        <title>MLAcademy — Devenez Data Scientist en 90 jours | Dona.ia</title>
        <meta name="description" content="Formation intensive en Data Science, IA et MLOps. De Python à Kubernetes en 90 jours avec des projets réels. Pré-inscriptions ouvertes." />
      </Helmet>
      {content}
    </>
  );
}

/* ── FAQ Accordion Item ── */
function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`academy-faq-item ${open ? "open" : ""}`}>
      <button className="academy-faq-q" onClick={() => setOpen(!open)}>
        {question}
        <span className="academy-faq-arrow">{open ? "▲" : "▼"}</span>
      </button>
      {open && <div className="academy-faq-a">{answer}</div>}
    </div>
  );
}

/* ── Registration Form ── */
function RegistrationForm({ onSuccess }) {
  const [form, setForm] = useState({
    first_name: "", last_name: "", email: "", country: "",
    profession: "", current_level: "", objective: "", motivation: "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    const required = ["first_name", "last_name", "email", "country", "profession", "current_level", "objective"];
    for (const field of required) {
      if (!form[field].trim()) {
        setError("Veuillez remplir tous les champs obligatoires.");
        return;
      }
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Veuillez entrer une adresse email valide.");
      return;
    }

    setStatus("loading");
    try {
      await AcademyService.register(form);
      setStatus("success");
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message || "Une erreur est survenue. Réessayez.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="academy-form-wrapper">
        <div className="academy-form-success">
          <div className="academy-form-success-icon">🎉</div>
          <h3>Pré-inscription confirmée !</h3>
          <p>
            Un email de bienvenue a été envoyé à <strong style={{ color: "#a5b4fc" }}>{form.email}</strong>.<br />
            Nous vous contacterons dès l'ouverture officielle des inscriptions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="academy-form-wrapper">
      <form onSubmit={handleSubmit}>
        <div className="academy-form-grid">
          <div className="academy-form-field">
            <label className="academy-form-label">Prénom *</label>
            <input name="first_name" value={form.first_name} onChange={handleChange}
              placeholder="Jean" className="academy-form-input" />
          </div>
          <div className="academy-form-field">
            <label className="academy-form-label">Nom *</label>
            <input name="last_name" value={form.last_name} onChange={handleChange}
              placeholder="DUPONT" className="academy-form-input" />
          </div>
          <div className="academy-form-field full">
            <label className="academy-form-label">Email *</label>
            <input name="email" type="email" value={form.email} onChange={handleChange}
              placeholder="jean.dupont@email.com" className="academy-form-input" />
          </div>
          <div className="academy-form-field">
            <label className="academy-form-label">Pays *</label>
            <select name="country" value={form.country} onChange={handleChange} className="academy-form-select">
              <option value="">Sélectionnez</option>
              {FORM_OPTIONS.countries.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="academy-form-field">
            <label className="academy-form-label">Profession *</label>
            <input name="profession" value={form.profession} onChange={handleChange}
              placeholder="Étudiant, Développeur..." className="academy-form-input" />
          </div>
          <div className="academy-form-field full">
            <label className="academy-form-label">Niveau actuel *</label>
            <select name="current_level" value={form.current_level} onChange={handleChange} className="academy-form-select">
              <option value="">Sélectionnez votre niveau</option>
              {FORM_OPTIONS.levels.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div className="academy-form-field full">
            <label className="academy-form-label">Votre objectif *</label>
            <select name="objective" value={form.objective} onChange={handleChange} className="academy-form-select">
              <option value="">Que souhaitez-vous devenir ?</option>
              {FORM_OPTIONS.objectives.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="academy-form-field full">
            <label className="academy-form-label">Pourquoi souhaitez-vous intégrer MLAcademy ? (optionnel)</label>
            <textarea name="motivation" value={form.motivation} onChange={handleChange}
              placeholder="Votre motivation, vos attentes..." className="academy-form-textarea" />
          </div>
          {error && <div className="academy-form-error">{error}</div>}
        </div>
        <button type="submit" className="academy-form-submit" disabled={status === "loading"}>
          {status === "loading" ? "⏳ Inscription en cours..." : "🚀 Je réserve ma place"}
        </button>
      </form>
    </div>
  );
}