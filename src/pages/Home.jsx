import { ReviewService, DEFAULT_REVIEWS } from "../services/reviewService";
import { Analytics } from "@vercel/analytics/react";
import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import "../styles/Home.css";
import { useScrollFade } from "../hooks/useAnimations";

function StudentReviewsSection() {
  const [reviews, setReviews] = useState(DEFAULT_REVIEWS);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Modal Form State
  const [form, setForm] = useState({ name: "", role: "", rating: 5, comment: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await ReviewService.getAll();
      if (data && data.length > 0) {
        setReviews(data);
      }
    };
    fetchReviews();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    if (!form.name.trim() || !form.comment.trim()) {
      setSubmitError("Veuillez remplir votre nom et votre avis.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await ReviewService.create(form);
      if (res.review) {
        setReviews(prev => [res.review, ...prev]);
      } else {
        const updated = await ReviewService.getAll();
        setReviews(updated);
      }
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setShowModal(false);
        setForm({ name: "", role: "", rating: 5, comment: "" });
      }, 1800);
    } catch (err) {
      setSubmitError(err.message || "Erreur lors de l'envoi de votre avis.");
    } finally {
      setSubmitting(false);
    }
  };

  const ref = useScrollFade(0.1);

  return (
    <section ref={ref} className="home-section" style={{ background: "rgba(15,23,42,0.5)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="home-container">
        {/* Rating Metrics Ribbon */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", flexWrap: "wrap", marginBottom: "40px", padding: "12px 24px", background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)", borderRadius: "9999px" }}>
          <span style={{ color: "#f59e0b", fontSize: "14px", fontWeight: "700", display: "flex", alignItems: "center", gap: "4px" }}>
            ★★★★★ <strong style={{ color: "#ffffff", marginLeft: "4px" }}>5.0 / 5</strong>
          </span>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>•</span>
          <span style={{ color: "#a5b4fc", fontSize: "13px", fontWeight: "600" }}>🎓 MLAcademy & Bootcamps</span>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>•</span>
          <span style={{ color: "#6ee7b7", fontSize: "13px", fontWeight: "600" }}>100% Retours Vérifiés</span>
        </div>

        <div className="home-reviews-header-flex">
          <div className="home-section-header" style={{ marginBottom: 0 }}>
            <span className="home-section-subtitle">// RETOUR D'EXPÉRIENCE & PÉDAGOGIE</span>
            <h2 className="home-section-title">
              Ce que disent mes <span className="gradient-text">étudiants & partenaires</span>
            </h2>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="home-cta-primary"
            style={{ padding: "12px 24px", fontSize: "14px", background: "#6366f1", borderRadius: "9999px", boxShadow: "0 4px 20px rgba(99, 102, 241, 0.4)" }}
          >
            ✍️ Laisser un avis
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#94a3b8" }}>
            Chargement des avis...
          </div>
        ) : reviews.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {reviews.map((rev, index) => {
              const stars = "★".repeat(rev.rating || 5) + "☆".repeat(5 - (rev.rating || 5));
              const initial = rev.name ? rev.name.charAt(0).toUpperCase() : "E";
              return (
                <div key={rev.id || index} className="home-review-card glass">
                  <div style={{ position: "absolute", top: "20px", right: "20px", color: "rgba(255,255,255,0.06)", fontSize: "48px", fontFamily: "serif", lineHeight: 1 }}>"</div>
                  <div className="home-review-stars">
                    {stars}
                  </div>
                  <p className="home-review-comment">
                    "{rev.comment}"
                  </p>
                  <div className="home-review-author">
                    <div className="home-review-avatar">
                      {initial}
                    </div>
                    <div>
                      <h4 className="home-review-author-name">{rev.name}</h4>
                      <p className="home-review-author-role">{rev.role || "Étudiant / Apprenant"}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
            Soyez le premier étudiant à laisser un témoignage !
          </div>
        )}
      </div>

      {/* MODAL DE SOUMISSION D'AVIS */}
      {showModal && (
        <div className="review-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="review-modal-content" onClick={e => e.stopPropagation()}>
            <button className="review-modal-close" onClick={() => setShowModal(false)}>
              &times;
            </button>

            {submitSuccess ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎉</div>
                <h3 style={{ color: "#ffffff", fontSize: "22px", marginBottom: "12px", fontFamily: "'Space Grotesk', sans-serif" }}>
                  Merci pour votre avis !
                </h3>
                <p style={{ color: "#94a3b8", fontSize: "15px" }}>
                  Votre retour d'expérience a été publié avec succès.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ color: "#ffffff", fontSize: "24px", fontWeight: "700", marginBottom: "8px", fontFamily: "'Space Grotesk', sans-serif" }}>
                  Donner votre avis 🎓
                </h3>
                <p style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "24px" }}>
                  Partagez votre retour sur la pédagogie, l'enseignement et le travail collaboratif avec Dona Eric.
                </p>

                {submitError && (
                  <div style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", color: "#fca5a5", padding: "12px 16px", borderRadius: "8px", marginBottom: "20px", fontSize: "14px" }}>
                    ⚠️ {submitError}
                  </div>
                )}

                <div style={{ marginBottom: "16px", textAlign: "left" }}>
                  <label style={{ display: "block", color: "#cbd5e1", fontSize: "13px", fontWeight: "600", marginBottom: "6px" }}>
                    Nom & Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Jean Dupont"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "12px 16px", color: "#ffffff", fontSize: "14px", outline: "none" }}
                  />
                </div>

                <div style={{ marginBottom: "16px", textAlign: "left" }}>
                  <label style={{ display: "block", color: "#cbd5e1", fontSize: "13px", fontWeight: "600", marginBottom: "6px" }}>
                    Rôle / Formation suivie
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Étudiant MLAcademy / Participant Masterclass"
                    value={form.role}
                    onChange={e => setForm({ ...form, role: e.target.value })}
                    style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "12px 16px", color: "#ffffff", fontSize: "14px", outline: "none" }}
                  />
                </div>

                <div style={{ marginBottom: "16px", textAlign: "left" }}>
                  <label style={{ display: "block", color: "#cbd5e1", fontSize: "13px", fontWeight: "600", marginBottom: "6px" }}>
                    Note globale
                  </label>
                  <div className="review-star-picker">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        className="review-star-btn"
                        onClick={() => setForm({ ...form, rating: star })}
                        style={{ color: star <= form.rating ? "#f59e0b" : "#475569" }}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: "24px", textAlign: "left" }}>
                  <label style={{ display: "block", color: "#cbd5e1", fontSize: "13px", fontWeight: "600", marginBottom: "6px" }}>
                    Votre avis / Témoignage *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Racontez votre expérience : clarté des explications, méthode d'enseignement, suivi des projets..."
                    value={form.comment}
                    onChange={e => setForm({ ...form, comment: e.target.value })}
                    style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "12px 16px", color: "#ffffff", fontSize: "14px", outline: "none", resize: "vertical" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="home-cta-primary"
                  style={{ width: "100%", justifyContent: "center", background: "#6366f1", opacity: submitting ? 0.7 : 1 }}
                >
                  {submitting ? "Envoi en cours..." : "Publier mon avis →"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default function Home() {
  return (
    <main className="home-main">
      {/* SECTION HERO */}
      <Hero />

      {/* SECTION TÉMOIGNAGES ÉTUDIANTS / AVIS */}
      <StudentReviewsSection />
    </main>
  );
}
