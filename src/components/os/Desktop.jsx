import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import Window from './Window';
import { useLocation, useNavigate } from 'react-router-dom';
import { UbuntuFolderIcon, UbuntuFileIcon, UbuntuMailIcon, UbuntuAcademyIcon, UbuntuMonitorIcon, UbuntuBlogIcon, ShowAppsIcon } from './Icons';
import AppLauncher from './windows/AppLauncher';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

// Contenus
import Projects from '../../pages/Projects';
import Contact from '../../pages/Contact';
import Academy from '../../pages/Academy';
import Bootcamp from '../../pages/Bootcamp';
import Blog from '../../pages/Blog';
import AboutContent from './windows/AboutContent';
import CvContent from './windows/CvContent';

export default function Desktop() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { theme } = useTheme();

  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [showLauncher, setShowLauncher] = useState(false);

  const LAUNCHER_APPS = [
    { id: 'Ce PC', label: t('os.pc'), icon: <UbuntuMonitorIcon size={30} /> },
    { id: 'Projets', label: t('os.projects'), icon: <UbuntuFolderIcon size={30} /> },
    { id: 'Blog', label: t('os.blog'), icon: <UbuntuBlogIcon size={30} /> },
    { id: 'Mon CV', label: t('os.cv'), icon: <UbuntuFileIcon size={30} /> },
    { id: 'Contact', label: t('os.contact'), icon: <UbuntuMailIcon size={30} /> },
    { id: 'Academy', label: t('os.academy'), icon: <UbuntuAcademyIcon size={30} /> },
  ];

  useEffect(() => {
    const path = location.pathname;
    let windowToOpen = null;
    if (path === '/about') windowToOpen = 'Ce PC';
    else if (path === '/projets' || path === '/projects') windowToOpen = 'Projets';
    else if (path === '/blog') windowToOpen = 'Blog';
    else if (path === '/contact') windowToOpen = 'Contact';
    else if (path === '/academy') windowToOpen = 'Academy';
    else if (path === '/academy/bootcamp') windowToOpen = 'Bootcamp';

    if (windowToOpen) {
      setOpenWindows(prev => prev.includes(windowToOpen) ? prev : [...prev, windowToOpen]);
      setActiveWindow(windowToOpen);
    }
  }, [location.pathname]);

  const handleOpenWindow = (windowId) => {
    setOpenWindows(prev => prev.includes(windowId) ? prev : [...prev, windowId]);
    setActiveWindow(windowId);
  };

  const handleCloseWindow = (windowId) => {
    setOpenWindows(openWindows.filter(w => w !== windowId));
    if (activeWindow === windowId) {
      setActiveWindow(openWindows.length > 1 ? openWindows[openWindows.length - 2] : null);
    }
  };

  const handleOpenFromLauncher = (windowId) => {
    handleOpenWindow(windowId);
    setShowLauncher(false);
  };

  return (
    <div className="os-desktop" style={{
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      position: 'relative',
      backgroundColor: theme === 'light' ? '#f1f5f9' : '#000000',
    }}>
      <Helmet>
        <title>Bureau — dona.ia</title>
      </Helmet>

      {/* Background Image with lowered opacity */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(/eric-dona.jpg)',
        backgroundPosition: 'center top',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        opacity: theme === 'light' ? 0.2 : 0.4,
        zIndex: 0
      }} />

      {/* Overlay for contrast */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: theme === 'light' 
          ? 'linear-gradient(90deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 100%)' 
          : 'linear-gradient(90deg, rgba(15,15,15,0.7) 0%, rgba(15,15,15,0.2) 100%)',
        zIndex: 1
      }} />

      {/* Top Bar (Ubuntu GNOME) */}
      <TopBar onPowerClick={() => navigate('/')} />

      {/* Left Dock (Ubuntu GNOME) */}
      <LeftDock
        openWindows={openWindows}
        onOpenWindow={handleOpenWindow}
        activeWindow={activeWindow}
        onShowApps={() => setShowLauncher(true)}
        apps={LAUNCHER_APPS}
      />

      {/* Windows Manager */}
      <div style={{ position: 'absolute', top: '28px', left: '64px', right: 0, bottom: 0, pointerEvents: 'none', zIndex: 20 }}>
        {openWindows.map(windowId => (
          <div key={windowId} style={{ pointerEvents: 'auto', zIndex: activeWindow === windowId ? 30 : 20 }} onMouseDown={() => setActiveWindow(windowId)}>
            <Window 
              title={windowId} 
              onClose={() => handleCloseWindow(windowId)}
              defaultSize={getSizeForWindow(windowId)}
              isActive={activeWindow === windowId}
            >
              {renderWindowContent(windowId, handleOpenWindow)}
            </Window>
          </div>
        ))}
      </div>

      {/* Ubuntu Activities / App Launcher overlay */}
      <AppLauncher
        visible={showLauncher}
        apps={LAUNCHER_APPS}
        onOpenApp={handleOpenFromLauncher}
        onClose={() => setShowLauncher(false)}
        username="donerick"
        onLogout={() => { setShowLauncher(false); navigate('/'); }}
      />
    </div>
  );
}

function TopBar({ onPowerClick }) {
  const [time, setTime] = useState(new Date());
  const { lang, changeLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  const dateStr = time.toLocaleDateString('en-US', options).replace(',', '');

  const langFlags = { fr: "🇫🇷 FR", en: "🇬🇧 EN", es: "🇪🇸 ES", ja: "🇯🇵 JA" };

  return (
    <div style={{
      position: 'absolute',
      top: 0, left: 0, right: 0, height: '28px',
      background: theme === 'light' ? '#e2e8f0' : '#000000',
      color: theme === 'light' ? '#0f172a' : '#e2e8f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      fontSize: '13px',
      fontWeight: '600',
      zIndex: 100,
      userSelect: 'none',
      boxShadow: theme === 'light' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontWeight: '700', letterSpacing: '0.5px' }}>Activities</span>
      </div>

      <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', cursor: 'pointer' }}>
        {dateStr}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
        {/* Quick Language Dropdown */}
        <div style={{ position: "relative" }}>
          <span 
            onClick={() => setLangOpen(!langOpen)} 
            style={{ cursor: "pointer", fontSize: "12px", background: "rgba(255,255,255,0.15)", padding: "2px 8px", borderRadius: "4px" }}
          >
            {langFlags[lang] || "🇫🇷 FR"} ▼
          </span>

          {langOpen && (
            <div style={{
              position: "absolute",
              top: "24px",
              right: 0,
              background: theme === 'light' ? '#ffffff' : '#1e293b',
              color: theme === 'light' ? '#0f172a' : '#ffffff',
              border: "1px solid rgba(0,0,0,0.15)",
              borderRadius: "6px",
              padding: "4px",
              boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
              zIndex: 250,
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              minWidth: "90px"
            }}>
              {[
                { code: "fr", label: "🇫🇷 FR" },
                { code: "en", label: "🇬🇧 EN" },
                { code: "es", label: "🇪🇸 ES" },
                { code: "ja", label: "🇯🇵 JA" }
              ].map(item => (
                <button
                  key={item.code}
                  onClick={() => { changeLanguage(item.code); setLangOpen(false); }}
                  style={{
                    background: lang === item.code ? "#6366f1" : "transparent",
                    color: lang === item.code ? "#ffffff" : "inherit",
                    border: "none",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "12px",
                    textAlign: "left"
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <span onClick={toggleTheme} style={{ cursor: "pointer", fontSize: "14px" }} title="Toggle Theme">
          {theme === "dark" ? "☀️" : "🌙"}
        </span>

        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" onClick={onPowerClick} title="Deconnexion / Home"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>
      </div>
    </div>
  );
}

function LeftDock({ openWindows, onOpenWindow, activeWindow, onShowApps, apps }) {
  const { theme } = useTheme();

  return (
    <div style={{
      position: 'absolute',
      top: '28px', left: 0, bottom: 0, width: '64px',
      background: theme === 'light' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.4)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '8px 0',
      zIndex: 90,
      borderRight: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : 'none'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        {apps.map(app => (
          <DockIcon
            key={app.id}
            icon={app.icon}
            label={app.label}
            onClick={() => onOpenWindow(app.id)}
            isOpen={openWindows.includes(app.id)}
            isActive={activeWindow === app.id}
          />
        ))}
      </div>
      <button
        onClick={onShowApps}
        style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '12px' }}
        title="Afficher les applications"
      >
        <ShowAppsIcon size={22} />
      </button>
    </div>
  );
}

function DockIcon({ icon, label, onClick, isOpen, isActive }) {
  return (
    <button 
      onClick={onClick}
      title={label}
      style={{
        background: isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
        border: 'none',
        borderRadius: '12px',
        padding: '8px',
        cursor: 'pointer',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease',
      }}
    >
      {icon}
      {isOpen && (
        <span style={{
          position: 'absolute',
          left: '2px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '4px',
          height: '4px',
          backgroundColor: '#e95420',
          borderRadius: '50%',
        }} />
      )}
    </button>
  );
}

function getSizeForWindow(windowId) {
  switch (windowId) {
    case 'Ce PC': return { width: 780, height: 520 };
    case 'Projets': return { width: 900, height: 600 };
    case 'Blog': return { width: 920, height: 620 };
    case 'Mon CV': return { width: 700, height: 580 };
    case 'Contact': return { width: 680, height: 500 };
    case 'Academy': return { width: 940, height: 620 };
    case 'Bootcamp': return { width: 900, height: 600 };
    default: return { width: 800, height: 550 };
  }
}

function renderWindowContent(windowId, onOpenWindow) {
  switch (windowId) {
    case 'Ce PC': return <AboutContent />;
    case 'Projets': return <Projects />;
    case 'Blog': return <Blog />;
    case 'Mon CV': return <CvContent />;
    case 'Contact': return <Contact />;
    case 'Academy': return <Academy onOpenBootcamp={() => onOpenWindow('Bootcamp')} />;
    case 'Bootcamp': return <Bootcamp />;
    default: return <div>Contenu non trouvé</div>;
  }
}