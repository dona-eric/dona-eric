import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Window from './Window';
import { useLocation, useNavigate } from 'react-router-dom';
import { UbuntuFolderIcon, UbuntuFileIcon, UbuntuMailIcon, UbuntuAcademyIcon, UbuntuMonitorIcon, UbuntuBlogIcon, ShowAppsIcon } from './Icons';
import AppLauncher from './windows/AppLauncher';

// Contenus
import Projects from '../../pages/Projects';
import Contact from '../../pages/Contact';
import Academy from '../../pages/Academy';
import Bootcamp from '../../pages/Bootcamp';
import Blog from '../../pages/Blog';
import AboutContent from './windows/AboutContent';
import CvContent from './windows/CvContent';

// Source unique pour la liste d'apps : utilisée à la fois par le Dock ET
// par AppLauncher, pour ne pas dupliquer/désynchroniser les deux listes.
const LAUNCHER_APPS = [
  { id: 'Ce PC', label: 'Ce PC', icon: <UbuntuMonitorIcon size={30} /> },
  { id: 'Projets', label: 'Projets', icon: <UbuntuFolderIcon size={30} /> },
  { id: 'Blog', label: 'Blog & Livres', icon: <UbuntuBlogIcon size={30} /> },
  { id: 'Mon CV', label: 'Mon CV', icon: <UbuntuFileIcon size={30} /> },
  { id: 'Contact', label: 'Contact', icon: <UbuntuMailIcon size={30} /> },
  { id: 'Academy', label: 'Academy', icon: <UbuntuAcademyIcon size={30} /> },
];

export default function Desktop() {
  const location = useLocation();
  const navigate = useNavigate();
  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [showLauncher, setShowLauncher] = useState(false);

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
      backgroundColor: '#000000',
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
        opacity: 0.4,
        zIndex: 0
      }} />

      {/* Dark overlay for contrast */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(15,15,15,0.7) 0%, rgba(15,15,15,0.2) 100%)', zIndex: 1 }} />

      {/* Top Bar (Ubuntu GNOME) */}
      <TopBar onPowerClick={() => navigate('/')} />

      {/* Left Dock (Ubuntu GNOME) */}
      <LeftDock
        openWindows={openWindows}
        onOpenWindow={handleOpenWindow}
        activeWindow={activeWindow}
        onShowApps={() => setShowLauncher(true)}
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

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  const dateStr = time.toLocaleDateString('en-US', options).replace(',', '');

  return (
    <div style={{
      position: 'absolute',
      top: 0, left: 0, right: 0, height: '28px',
      background: '#000000',
      color: '#e2e8f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      fontSize: '14px',
      fontWeight: '500',
      zIndex: 100,
      userSelect: 'none'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ cursor: 'pointer' }}></span>
      </div>
      <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', cursor: 'pointer' }}>
        {dateStr}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" onClick={onPowerClick}><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>
      </div>
    </div>
  );
}

function LeftDock({ openWindows, onOpenWindow, activeWindow, onShowApps }) {
  return (
    <div style={{
      position: 'absolute',
      top: '28px', left: 0, bottom: 0, width: '64px',
      background: 'rgba(0, 0, 0, 0.4)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '8px 0',
      zIndex: 90
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        <DockIcon icon={<UbuntuMonitorIcon size={35} />} label="Ce PC" onClick={() => onOpenWindow('Ce PC')} isOpen={openWindows.includes('Ce PC')} isActive={activeWindow === 'Ce PC'} />
        <DockIcon icon={<UbuntuFolderIcon size={35} />} label="Projets" onClick={() => onOpenWindow('Projets')} isOpen={openWindows.includes('Projets')} isActive={activeWindow === 'Projets'} />
        <DockIcon icon={<UbuntuBlogIcon size={35} />} label="Blog & Livres" onClick={() => onOpenWindow('Blog')} isOpen={openWindows.includes('Blog')} isActive={activeWindow === 'Blog'} />
        <DockIcon icon={<UbuntuFileIcon size={35} />} label="Mon CV" onClick={() => onOpenWindow('Mon CV')} isOpen={openWindows.includes('Mon CV')} isActive={activeWindow === 'Mon CV'} />
        <DockIcon icon={<UbuntuMailIcon size={35} />} label="Contact" onClick={() => onOpenWindow('Contact')} isOpen={openWindows.includes('Contact')} isActive={activeWindow === 'Contact'} />
        <DockIcon icon={<UbuntuAcademyIcon size={35} />} label="Academy" onClick={() => onOpenWindow('Academy')} isOpen={openWindows.includes('Academy')} isActive={activeWindow === 'Academy'} />
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
        width: '48px',
        height: '48px',
        borderRadius: '8px',
        background: isActive ? 'rgba(255, 255, 255, 0.15)' : (isOpen ? 'rgba(255,255,255,0.05)' : 'transparent'),
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'background 0.2s',
        position: 'relative'
      }}
    >
      {icon}
      {isOpen && (
        <div style={{ position: 'absolute', left: '-6px', top: '50%', transform: 'translateY(-50%)', width: '4px', height: isActive ? '20px' : '8px', background: '#e95420', borderRadius: '0 4px 4px 0', transition: 'height 0.2s' }} />
      )}
    </button>
  );
}

function getSizeForWindow(id) {
  if (id === 'Ce PC') return { width: 750, height: 600 };
  if (id === 'Blog') return { width: 1050, height: 750 };
  return { width: 1000, height: 750 };
}

function renderWindowContent(id, onOpenWindow) {
  switch(id) {
    case 'Ce PC': return <AboutContent onOpenWindow={onOpenWindow} />;
    case 'Projets': return <Projects isWindow={true} />;
    case 'Blog': return <Blog isWindow={true} />;
    case 'Contact': return <Contact isWindow={true} />;
    case 'Academy': return <Academy isWindow={true} />;
    case 'Bootcamp': return <Bootcamp isWindow={true} />;
    case 'Mon CV': return <CvContent />;
    default: return <div style={{ color: 'white', padding: '24px' }}>Contenu en construction...</div>;
  }
}