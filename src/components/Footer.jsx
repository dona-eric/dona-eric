import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Magnetic, Roll, SplitText } from "../quantum/primitives";
import { useMotion } from "../quantum/MotionContext";
import { useLanguage } from "../context/LanguageContext";
import { SOCIALS } from "../data/profile";
import "../styles/Footer.css";

function CotonouClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const time = now.toLocaleTimeString("fr-FR", { timeZone: "Africa/Porto-Novo", hour: "2-digit", minute: "2-digit", second: "2-digit" });
  return <span className="qf-clock">{time} <em>GMT+1</em></span>;
}

export default function Footer() {
  const { t } = useLanguage();
  const { lenis } = useMotion();

  const toTop = () => {
    if (lenis.current) lenis.current.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="qf">
      <div className="q-container">
        <div className="qf-cta">
          <span className="q-label"><span className="q-dot" /> {t("home.badge")}</span>
          <Magnetic strength={0.12} className="qf-cta-magnet">
            <Link to="/contact" className="qf-cta-link" data-cursor="label" data-cursor-label="Écrire">
              <SplitText as="span" className="qf-cta-text">Parlons-en.</SplitText>
              <span className="qf-cta-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="40%" height="40%"><path d="M6 18L18 6M8 6h10v10" stroke="currentColor" strokeWidth="1.6" fill="none" /></svg>
              </span>
            </Link>
          </Magnetic>
        </div>

        <div className="qf-grid">
          <div className="qf-col">
            <span className="q-label">Navigation</span>
            <Link to="/projects"><Roll>{t("nav.projects")}</Roll></Link>
            <Link to="/skills"><Roll>{t("nav.skills")}</Roll></Link>
            <Link to="/about"><Roll>{t("nav.about")}</Roll></Link>
            <Link to="/blog"><Roll>{t("nav.blog")}</Roll></Link>
            <Link to="/academy"><Roll>{t("nav.academy")}</Roll></Link>
          </div>
          <div className="qf-col">
            <span className="q-label">Réseaux</span>
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"><Roll>{s.label} ↗</Roll></a>
            ))}
          </div>
          <div className="qf-col">
            <span className="q-label">Heure locale · Cotonou</span>
            <CotonouClock />
            <span className="q-label" style={{ marginTop: 18 }}>Fichiers</span>
            <a href="/cv_dona_eric.pdf" target="_blank" rel="noopener noreferrer"><Roll>CV PDF ↗</Roll></a>
          </div>
          <div className="qf-col qf-col--end">
            <button className="qf-top" onClick={toTop} data-cursor="label" data-cursor-label="Haut">
              <svg viewBox="0 0 24 24" width="18" height="18"><path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="1.6" fill="none" /></svg>
            </button>
          </div>
        </div>

        <div className="qf-bottom">
          <span>© {new Date().getFullYear()} Dona Eric KOULODJI</span>
          <span>Conçu &amp; codé à Cotonou — <span className="q-serif">iħ ∂ψ/∂t = Ĥψ</span></span>
        </div>
      </div>
    </footer>
  );
}
