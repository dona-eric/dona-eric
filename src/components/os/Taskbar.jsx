import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Version Ubuntu/GNOME du shell OS - meme signature de props que l'original
// Windows-style (openWindows, onOpenWindow), remplacement direct.
export default function Taskbar({ openWindows, onOpenWindow }) {
  const [time, setTime] = useState(new Date());
  const [isLauncherOpen, setIsLauncherOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isLauncherOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isLauncherOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsLauncherOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  const dateStr = time.toLocaleDateString('fr-FR', options).replace(',', '');

  const apps = [
    { id: 'Ce PC', icon: '🖥️', label: 'Ce PC' },
    { id: 'Projets', icon: '📁', label: 'Projets' },
    { id: 'Mon CV', icon: '📄', label: 'Mon CV' },
    { id: 'Contact', icon: '✉️', label: 'Contact' },
    { id: 'Academy', icon: '🎓', label: 'Academy' },
  ];

  const filteredApps = apps.filter(app =>
    app.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleOpenFromLauncher = (id) => {
    onOpenWindow(id);
    setIsLauncherOpen(false);
  };

  return (
    <>
      {/* Top Bar (Ubuntu GNOME) */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, height: '28px',
        background: '#000000',
        color: '#e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        fontSize: '14px',
        fontWeight: '500',
        zIndex: 1000,
        userSelect: 'none',
      }}>
        <div />
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', cursor: 'pointer' }}>
          {dateStr}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
        </div>
      </div>

      {/* Left Dock (Ubuntu GNOME) */}
      <div style={{
        position: 'fixed',
        top: '28px', left: 0, bottom: 0, width: '64px',
        background: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '8px 0',
        zIndex: 900,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          {apps.map(app => (
            <DockIcon
              key={app.id}
              icon={app.icon}
              label={app.label}
              onClick={() => onOpenWindow(app.id)}
              active={openWindows.includes(app.id)}
            />
          ))}
        </div>
        <button
          onClick={() => setIsLauncherOpen(true)}
          title="Show Applications"
          style={{
            background: isLauncherOpen ? 'rgba(255,255,255,0.15)' : 'transparent',
            border: 'none',
            borderRadius: '10px',
            width: '40px', height: '40px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            margin: '12px 0',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 32 32">
            <circle cx="6" cy="6" r="2.5" fill="#ffffff" fillOpacity="0.8"/>
            <circle cx="16" cy="6" r="2.5" fill="#ffffff" fillOpacity="0.8"/>
            <circle cx="26" cy="6" r="2.5" fill="#ffffff" fillOpacity="0.8"/>
            <circle cx="6" cy="16" r="2.5" fill="#ffffff" fillOpacity="0.8"/>
            <circle cx="16" cy="16" r="2.5" fill="#ffffff" fillOpacity="0.8"/>
            <circle cx="26" cy="16" r="2.5" fill="#ffffff" fillOpacity="0.8"/>
            <circle cx="6" cy="26" r="2.5" fill="#ffffff" fillOpacity="0.8"/>
            <circle cx="16" cy="26" r="2.5" fill="#ffffff" fillOpacity="0.8"/>
            <circle cx="26" cy="26" r="2.5" fill="#ffffff" fillOpacity="0.8"/>
          </svg>
        </button>
      </div>

      {/* Activities / App Launcher - plein ecran, pas de panneau flottant */}
      <AnimatePresence>
        {isLauncherOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onMouseDown={() => setIsLauncherOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(10,10,10,0.72)',
              backdropFilter: 'blur(28px)',
              zIndex: 2000,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingTop: '8vh',
            }}
          >
            <div onMouseDown={(e) => e.stopPropagation()} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: '420px', maxWidth: '80vw',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '999px',
                padding: '12px 20px',
                display: 'flex', alignItems: 'center', gap: '10px',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Rechercher une application"
                  style={{ background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: '15px', width: '100%' }}
                />
              </div>

              {filteredApps.length > 0 ? (
                <div style={{
                  marginTop: '6vh',
                  display: 'grid',
                  gridTemplateColumns: `repeat(${Math.min(filteredApps.length, 5)}, 96px)`,
                  gap: '28px 8px',
                  justifyContent: 'center',
                }}>
                  {filteredApps.map(app => (
                    <StartApp key={app.id} icon={app.icon} label={app.label} onClick={() => handleOpenFromLauncher(app.id)} />
                  ))}
                </div>
              ) : (
                <div style={{ marginTop: '6vh', color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
                  Aucune application trouvee
                </div>
              )}
            </div>

            <div
              onMouseDown={(e) => e.stopPropagation()}
              style={{
                position: 'absolute', bottom: '6vh', left: '50%', transform: 'translateX(-50%)',
                display: 'flex', alignItems: 'center', gap: '14px', fontSize: '13px',
              }}
            >
              <div style={{
                width: '24px', height: '24px', borderRadius: '50%',
                background: '#e95420',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: '11px', fontWeight: 600,
              }}>D</div>
              <span style={{ color: 'rgba(255,255,255,0.55)' }}>dona.ia</span>
              <button
                onClick={() => window.location.reload()}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  color: 'rgba(255,255,255,0.55)', fontSize: '13px',
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#e95420'}
                onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>
                Se deconnecter
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function DockIcon({ icon, label, onClick, active }) {
  return (
    <button
      onClick={onClick}
      title={label}
      style={{
        width: '48px', height: '48px',
        borderRadius: '8px',
        background: active ? 'rgba(255,255,255,0.15)' : 'transparent',
        border: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '22px',
        cursor: 'pointer',
        transition: 'background 0.2s',
        position: 'relative',
      }}
    >
      {icon}
      {active && (
        <div style={{ position: 'absolute', left: '-6px', top: '50%', transform: 'translateY(-50%)', width: '4px', height: '20px', background: '#e95420', borderRadius: '0 4px 4px 0' }} />
      )}
    </button>
  );
}

function StartApp({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
        padding: '12px 8px', borderRadius: '12px',
        background: 'transparent', border: 'none', cursor: 'pointer',
        transition: 'background 0.15s',
      }}
      onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
      onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
    >
      <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px' }}>
        {icon}
      </div>
      <span style={{ color: '#fff', fontSize: '12.5px', fontWeight: 500, textAlign: 'center', textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}>
        {label}
      </span>
    </button>
  );
}