import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { Magnetic, Roll, EASE, EASE_IO } from "../quantum/primitives";
import { useScrollLock } from "../quantum/MotionContext";
import { SOCIALS } from "../data/profile";
import "../styles/Navigation.css";

const LANGS = ["fr", "en", "es", "ja"];

export default function Navigation() {
  const { lang, changeLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);
  const { scrollY } = useScroll();

  useScrollLock(menu);

  const LINKS = [
    { to: "/projects", label: t("nav.projects") },
    { to: "/skills", label: t("nav.skills") },
    { to: "/about", label: t("nav.about") },
    { to: "/blog", label: t("nav.blog") },
    { to: "/academy", label: t("nav.academy") },
    { to: "/contact", label: t("nav.contact") },
  ];

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 30);
    if (menu) return;
    setHidden(y > 160 && y > prev);
  });

  useEffect(() => { setMenu(false); setHidden(false); }, [location.pathname]);

  useEffect(() => {
    const close = (e) => { if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false); };
    window.addEventListener("pointerdown", close);
    return () => window.removeEventListener("pointerdown", close);
  }, []);

  const isActive = (to) => location.pathname === to || (to !== "/" && location.pathname.startsWith(to + "/"));

  return (
    <>
      <motion.header
        className={`qn ${scrolled ? "qn--scrolled" : ""} ${menu ? "qn--menu" : ""}`}
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className="qn-inner">
          <Link to="/" className="qn-logo" aria-label="Accueil" data-cursor="label" data-cursor-label="Accueil">
            <span className="qn-logo-mark">ψ</span>
            <span className="qn-logo-text">
              <Roll>Dona Eric</Roll>
              <small>Statisticien · AI Engineer</small>
            </span>
          </Link>

          <nav className="qn-links" aria-label="Navigation principale">
            {LINKS.map((l, i) => (
              <Link key={l.to} to={l.to} className={`qn-link ${isActive(l.to) ? "is-active" : ""}`}>
                <sup>{String(i + 1).padStart(2, "0")}</sup>
                <Roll>{l.label}</Roll>
              </Link>
            ))}
          </nav>

          <div className="qn-tools">
            <div className="qn-lang" ref={langRef}>
              <button className="qn-tool" onClick={() => setLangOpen((v) => !v)} aria-label={t("nav.langSelect")} aria-expanded={langOpen}>
                {lang.toUpperCase()}
                <svg width="8" height="8" viewBox="0 0 10 10" aria-hidden="true"><path d="M1 3l4 4 4-4" stroke="currentColor" fill="none" strokeWidth="1.4" /></svg>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.ul
                    className="qn-lang-menu"
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.25, ease: EASE }}
                  >
                    {LANGS.map((code) => (
                      <li key={code}>
                        <button
                          className={lang === code ? "is-active" : ""}
                          onClick={() => { changeLanguage(code); setLangOpen(false); }}
                        >
                          {code.toUpperCase()}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            <button
              className="qn-tool qn-theme"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? t("nav.themeLight") : t("nav.themeDark")}
              title={theme === "dark" ? t("nav.themeLight") : t("nav.themeDark")}
            >
              <motion.span
                className="qn-theme-icon"
                animate={{ rotate: theme === "dark" ? 0 : 180 }}
                transition={{ duration: 0.8, ease: EASE_IO }}
              />
            </button>

            <Magnetic strength={0.25} className="qn-cta-wrap">
              <Link to="/contact" className="q-btn q-btn--accent q-btn--sm qn-cta">
                <Roll>{t("home.btnContact")}</Roll>
              </Link>
            </Magnetic>

            <button className="qn-burger" onClick={() => setMenu((v) => !v)} aria-label="Menu" aria-expanded={menu}>
              <span className="qn-burger-label"><Roll>{menu ? "Fermer" : "Menu"}</Roll></span>
              <span className={`qn-burger-icon ${menu ? "is-open" : ""}`}><i /><i /></span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menu && (
          <motion.div
            className="qn-overlay"
            initial={{ clipPath: "circle(0% at calc(100% - 48px) 38px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 48px) 38px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 48px) 38px)" }}
            transition={{ duration: 0.9, ease: EASE_IO }}
            data-lenis-prevent
          >
            <div className="qn-overlay-inner">
              <span className="q-label">(Navigation)</span>
              <ul className="qn-overlay-links">
                <li>
                  <span className="q-mask">
                    <motion.span
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
                      style={{ display: "inline-block" }}
                    >
                      <Link to="/" className="qn-overlay-link">
                        <sup>00</sup>{t("nav.home")}
                      </Link>
                    </motion.span>
                  </span>
                </li>
                {LINKS.map((l, i) => (
                  <li key={l.to}>
                    <span className="q-mask">
                      <motion.span
                        initial={{ y: "110%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.9, ease: EASE, delay: 0.3 + i * 0.05 }}
                        style={{ display: "inline-block" }}
                      >
                        <Link to={l.to} className={`qn-overlay-link ${isActive(l.to) ? "is-active" : ""}`}>
                          <sup>{String(i + 1).padStart(2, "0")}</sup>
                          {l.label}
                        </Link>
                      </motion.span>
                    </span>
                  </li>
                ))}
              </ul>
              <motion.div
                className="qn-overlay-foot"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
              >
                <div className="qn-overlay-socials">
                  {SOCIALS.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                      <Roll>{s.label}</Roll>
                    </a>
                  ))}
                </div>
                <div className="qn-overlay-langs">
                  {LANGS.map((code) => (
                    <button key={code} className={lang === code ? "is-active" : ""} onClick={() => changeLanguage(code)}>
                      {code.toUpperCase()}
                    </button>
                  ))}
                  <a href="/cv_dona_eric.pdf" target="_blank" rel="noopener noreferrer" className="q-btn q-btn--sm">
                    CV PDF ↗
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
