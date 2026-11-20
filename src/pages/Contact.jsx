import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AnimatePresence, motion } from "framer-motion";
import GravatarQR from "../components/GravatarQR";
import { Magnetic, Reveal, Roll, SectionHead, SplitText, EASE } from "../quantum/primitives";
import { fieldBus, useScrollLock } from "../quantum/MotionContext";
import { SOCIALS } from "../data/profile";
import { useLanguage } from "../context/LanguageContext";
import "../styles/Contact.css";

const MESSAGES = {
  sending: { en: "Sending…", fr: "Transmission en cours…" },
  success: { en: "Message received ✓ Reply within 24h.", fr: "Message reçu ✓ Réponse sous 24h." },
  invalid: { en: "Please fill in all three fields.", fr: "Merci de remplir les trois champs." },
  error: {
    en: "Sending failed. Write to me directly by email or WhatsApp.",
    fr: "L'envoi a échoué. Écrivez-moi directement par email ou WhatsApp.",
  },
};

function QrModal({ onClose }) {
  const { tr } = useLanguage();
  useScrollLock(true);
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div className="ct-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        className="ct-modal"
        role="dialog"
        aria-modal="true"
        aria-label={tr("Gravatar profile QR code", "Profil Gravatar QR")}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
      >
        <button className="ct-modal-close" onClick={onClose} aria-label={tr("Close", "Fermer")}>×</button>
        <GravatarQR email="donaerickoulodji@gmail.com" defaultType="gravatar" defaultVersion="3" size={300} />
      </motion.div>
    </motion.div>
  );
}

export default function Contact() {
  const { tr, tx } = useLanguage();
  const [form, setForm] = useState({ subject: "", message: "", sender: "" });
  const [status, setStatus] = useState(null);
  const [qr, setQr] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.sender.trim() || !form.subject.trim() || !form.message.trim()) {
      setStatus("invalid");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xovkejww", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: form.sender, subject: form.subject, message: form.message }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ subject: "", message: "", sender: "" });
        fieldBus.measure();
        setTimeout(() => setStatus(null), 5000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="ct">
      <Helmet>
        <title>Contact — Dona Eric KOULODJI</title>
        <meta
          name="description"
          content={tr(
            "Contact Dona Eric KOULODJI about a Data Science / Machine Learning opportunity, a collaboration or an AI assignment.",
            "Contactez Dona Eric KOULODJI pour une opportunité en Data Science / Machine Learning, une collaboration ou une mission IA."
          )}
        />
      </Helmet>

      <header className="q-page-hero">
        <div className="q-container">
          <span className="q-label"><span className="q-dot" /> (Contact) — {tr("reply within 24h", "réponse sous 24h")}</span>
          <h1 className="q-page-hero-title">
            <SplitText as="span" by="char" stagger={0.03}>{tr("Let's talk.", "Parlons-en.")}</SplitText>
          </h1>
          <div className="q-page-hero-foot">
            <Reveal>
              <p className="q-lead">
                {tr(
                  "A Data / ML opportunity, a collaboration or an AI assignment? Describe the problem and I will come back to you with a first approach.",
                  "Une opportunité Data / ML, une collaboration ou une mission IA ? Décrivez le problème : je reviens vers vous avec une première approche."
                )}
              </p>
            </Reveal>
          </div>
        </div>
      </header>

      <section className="q-container ct-grid">
        <div className="ct-channels">
          <SectionHead index="01" label={tr("Direct channels", "Canaux directs")} />
          <ul>
            {SOCIALS.map((s, i) => (
              <Reveal as="li" key={s.label} delay={i * 0.06}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="ct-channel">
                  <span className="q-label">{s.label}</span>
                  <span className="ct-channel-value">{s.value}</span>
                  <span className="ct-channel-arrow">↗</span>
                </a>
              </Reveal>
            ))}
            <Reveal as="li" delay={0.35}>
              <button className="ct-channel" onClick={() => setQr(true)}>
                <span className="q-label">Gravatar</span>
                <span className="ct-channel-value">{tr("Profile QR code", "Profil QR code")}</span>
                <span className="ct-channel-arrow">⌗</span>
              </button>
            </Reveal>
          </ul>
        </div>

        <div className="ct-form-wrap">
          <SectionHead index="02" label="Message" />
          <form className="ct-form" onSubmit={handleSubmit} noValidate>
            <div className="q-field">
              <label htmlFor="ct-email">{tr("Your email", "Votre email")}</label>
              <input
                id="ct-email"
                type="email"
                required
                autoComplete="email"
                placeholder={tr("you@company.com", "vous@entreprise.com")}
                value={form.sender}
                onChange={(e) => setForm({ ...form, sender: e.target.value })}
              />
            </div>
            <div className="q-field">
              <label htmlFor="ct-subject">{tr("Subject", "Objet")}</label>
              <input
                id="ct-subject"
                type="text"
                required
                placeholder={tr("Collaboration proposal", "Proposition de collaboration")}
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
              />
            </div>
            <div className="q-field">
              <label htmlFor="ct-message">Message</label>
              <textarea
                id="ct-message"
                required
                rows={5}
                placeholder={tr("The context, the available data, the goal…", "Le contexte, les données disponibles, l'objectif…")}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>
            <div className="ct-form-foot">
              <Magnetic strength={0.3}>
                <button type="submit" className="q-btn q-btn--accent" disabled={status === "sending"}>
                  <Roll>{status === "sending" ? tr("Sending…", "Envoi…") : tr("Send message", "Envoyer le message")}</Roll>
                  <span className="q-btn-arrow">→</span>
                </button>
              </Magnetic>
              <AnimatePresence mode="wait">
                {status && (
                  <motion.span
                    key={status}
                    className={`ct-status ct-status--${status}`}
                    role="status"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    {tx(MESSAGES[status])}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <p className="ct-to">
              {tr("Recipient:", "Destinataire :")} <span>donaerickoulodji@gmail.com</span>
            </p>
          </form>
        </div>
      </section>

      <AnimatePresence>{qr && <QrModal onClose={() => setQr(false)} />}</AnimatePresence>
    </div>
  );
}
