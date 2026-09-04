import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import "../styles/Navigation.css";

const LANG_OPTIONS = [
  { code: "fr", flag: "🇫🇷", label: "FR" },
  { code: "en", flag: "🇬🇧", label: "EN" },
  { code: "es", flag: "🇪🇸", label: "ES" },
  { code: "ja", flag: "🇯🇵", label: "JA" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const { lang, changeLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const langDropdownRef = useRef(null);

  useEffect(() => { setIsOpen(false); }, [location]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close language dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target)) {
        setLangMenuOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) => location.pathname === path;
  const currentLangObj = LANG_OPTIONS.find(l => l.code === lang) || LANG_OPTIONS[0];

  return (
    <>
      <nav className={`nav-main ${scrolled ? "scrolled" : "transparent"}`}>
        <div className="nav-container">
          <div className="nav-header">

            {/* ── Logo Monogram ── */}
            <Link to="/" className="nav-logo-link">
              <div className="nav-logo-monogram">
                <span className="nav-logo-letter">D</span>
                <span className="nav-logo-dot" />
              </div>
            </Link>

            {/* ── Desktop nav ── */}
            <div className="desktop-nav">
              <Link to="/" className="nav-link">
                <span className={`nav-link-text ${isActive('/') ? 'active' : 'inactive'}`}>{t("nav.home")}</span>
                <div className={`nav-link-bar ${isActive('/') ? 'active' : 'inactive'}`} />
              </Link>
              <Link to="/projects" className="nav-link">
                <span className={`nav-link-text ${isActive('/projects') ? 'active' : 'inactive'}`}>{t("nav.projects")}</span>
                <div className={`nav-link-bar ${isActive('/projects') ? 'active' : 'inactive'}`} />
              </Link>
              <Link to="/about" className="nav-link">
                <span className={`nav-link-text ${isActive('/about') ? 'active' : 'inactive'}`}>{t("nav.about")}</span>
                <div className={`nav-link-bar ${isActive('/about') ? 'active' : 'inactive'}`} />
              </Link>
              <Link to="/contact" className="nav-link">
                <span className={`nav-link-text ${isActive('/contact') ? 'active' : 'inactive'}`}>{t("nav.contact")}</span>
                <div className={`nav-link-bar ${isActive('/contact') ? 'active' : 'inactive'}`} />
              </Link>
              <Link to="/academy" className="nav-link">
                <span className={`nav-link-text ${isActive('/academy') ? 'active' : 'inactive'}`}>{t("nav.academy")}</span>
                <div className={`nav-link-bar ${isActive('/academy') ? 'active' : 'inactive'}`} />
              </Link>
            </div>

            {/* ── Right Utilities & CTA ── */}
            <div className="desktop-cta" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <a href="/cv_dona_eric.pdf" target="_blank" rel="noopener noreferrer" className="btn-cv-pill">
                {t("nav.downloadCv")}
              </a>

              {/* Language Selector Dropdown */}
              <div ref={langDropdownRef} style={{ position: "relative" }}>
                <div 
                  className="lang-toggle-pill" 
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  title={t("nav.langSelect")}
                  style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <span>{currentLangObj.flag}</span> {currentLangObj.label} 
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                </div>

                {langMenuOpen && (
                  <div style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    right: 0,
                    background: "var(--bg-secondary)",
                    border: "1px solid var(--glass-border)",
                    borderRadius: "10px",
                    padding: "6px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                    zIndex: 200,
                    minWidth: "110px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px"
                  }}>
                    {LANG_OPTIONS.map((item) => (
                      <button
                        key={item.code}
                        onClick={() => {
                          changeLanguage(item.code);
                          setLangMenuOpen(false);
                        }}
                        style={{
                          background: lang === item.code ? "rgba(99, 102, 241, 0.2)" : "transparent",
                          border: "none",
                          borderRadius: "6px",
                          padding: "8px 10px",
                          color: "var(--text-primary)",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          cursor: "pointer",
                          fontSize: "13px",
                          fontWeight: lang === item.code ? "700" : "400",
                          textAlign: "left",
                          transition: "all 0.2s"
                        }}
                      >
                        <span>{item.flag}</span> {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Theme Toggle Button */}
              <button 
                onClick={toggleTheme}
                className="theme-toggle-btn" 
                aria-label="Toggle theme"
                title={theme === "dark" ? t("nav.themeDark") : t("nav.themeLight")}
                style={{ cursor: "pointer" }}
              >
                {theme === "dark" ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                )}
              </button>
            </div>

            {/* ── Mobile burger ── */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="mobile-burger"
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                {isOpen ? (
                  <>
                    <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </>
                ) : (
                  <>
                    <line x1="4" y1="6"  x2="20" y2="6"  stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="4" y1="18" x2="20" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </>
                )}
              </svg>
            </button>
          </div>

          {/* ── Mobile menu ── */}
          {isOpen && (
            <div className="mobile-menu">
              <div className="mobile-menu-list">
                <Link to="/" className={`mob-link ${isActive('/') ? "active" : "inactive"}`}>{t("nav.home")}</Link>
                <Link to="/projects" className={`mob-link ${isActive('/projects') ? "active" : "inactive"}`}>{t("nav.projects")}</Link>
                <Link to="/about" className={`mob-link ${isActive('/about') ? "active" : "inactive"}`}>{t("nav.about")}</Link>
                <Link to="/contact" className={`mob-link ${isActive('/contact') ? "active" : "inactive"}`}>{t("nav.contact")}</Link>
                <Link to="/academy" className={`mob-link ${isActive('/academy') ? "active" : "inactive"}`}>{t("nav.academy")}</Link>
              </div>

              {/* Mobile Language & Theme Selectors */}
              <div style={{ display: "flex", gap: "10px", marginTop: "16px", justifyContent: "center" }}>
                {LANG_OPTIONS.map(item => (
                  <button
                    key={item.code}
                    onClick={() => changeLanguage(item.code)}
                    style={{
                      background: lang === item.code ? "#6366f1" : "rgba(255,255,255,0.1)",
                      color: "#fff",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      cursor: "pointer"
                    }}
                  >
                    {item.flag} {item.label}
                  </button>
                ))}
                <button
                  onClick={toggleTheme}
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    color: "#fff",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    cursor: "pointer"
                  }}
                >
                  {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navigation;