import React, { useState, useEffect, useRef } from 'react';

// Vue "Activites" style GNOME/Ubuntu : plein ecran, recherche centree en
// haut, grille d'icones en dessous. Se ferme sur Echap ou clic hors grille.
export default function AppLauncher({ visible, apps, onOpenApp, onClose, username, onLogout }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (visible) {
      setQuery('');
      // Focus le champ de recherche a l'ouverture, comme GNOME Overview
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [visible, onClose]);

  if (!visible) return null;

  const filteredApps = apps.filter(app =>
    app.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      onMouseDown={onClose}
      style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(10,10,10,0.72)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '8vh',
      }}
    >
      {/* Empeche le clic dans la barre de recherche / grille de fermer le launcher */}
      <div onMouseDown={(e) => e.stopPropagation()} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          width: '420px',
          maxWidth: '80vw',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '999px',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une application"
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#fff',
              fontSize: '15px',
              width: '100%',
            }}
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
              <button
                key={app.id}
                onClick={() => onOpenApp(app.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 8px',
                  borderRadius: '12px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{
                  width: '56px', height: '56px',
                  borderRadius: '14px',
                  background: 'rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {app.icon}
                </div>
                <span style={{
                  color: '#fff',
                  fontSize: '12.5px',
                  fontWeight: 500,
                  textAlign: 'center',
                  textShadow: '0 1px 2px rgba(0,0,0,0.6)',
                }}>
                  {app.label}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div style={{ marginTop: '6vh', color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
            Aucune application trouvée
          </div>
        )}
      </div>

      {username && (
        <div
          onMouseDown={(e) => e.stopPropagation()}
          style={{
            position: 'absolute',
            bottom: '6vh',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            fontSize: '13px',
          }}
        >
          <div style={{
            width: '24px', height: '24px',
            borderRadius: '50%',
            background: '#e95420',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: '11px', fontWeight: 600,
          }}>
            {username.charAt(0).toUpperCase()}
          </div>
          <span style={{ color: 'rgba(255,255,255,0.55)' }}>{username}</span>
          {onLogout && (
            <button
              onClick={onLogout}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: 'transparent', border: 'none', cursor: 'pointer',
                color: 'rgba(255,255,255,0.55)', fontSize: '13px',
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#e95420'}
              onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                <line x1="12" y1="2" x2="12" y2="12"></line>
              </svg>
              Se déconnecter
            </button>
          )}
        </div>
      )}
    </div>
  );
}