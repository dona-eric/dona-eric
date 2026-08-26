import React from 'react';
import { UbuntuFolderIcon, UbuntuFileIcon } from '../Icons';

export default function AboutContent() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      color: '#e2e8f0',
      fontFamily: "'Inter', sans-serif",
      padding: '24px',
      background: 'rgba(30,30,30,0.4)',
    }}>
      <div className="glass" style={{
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '24px',
        padding: '40px',
        width: '100%',
        maxWidth: '500px',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      }}>
        <div className="nav-logo-monogram" style={{ width: "80px", height: "80px", margin: "0 auto 24px", border: "2px solid rgba(233, 84, 32, 0.6)", background: 'rgba(233, 84, 32, 0.1)' }}>
          <span className="nav-logo-letter" style={{ fontSize: "36px", color: '#e95420' }}>D</span>
          <span className="nav-logo-dot" style={{ width: "10px", height: "10px", bottom: "14px", right: "16px", background: '#e95420' }} />
        </div>
        
        <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#fff', marginBottom: '8px' }}>dona.ia</h2>
        <p style={{ fontSize: '13px', color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '40px' }}>
          UBUNTU OS PORTFOLIO
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="glass" style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            padding: '24px',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'}
          >
            <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>
              <UbuntuFolderIcon size={40} />
            </div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>8</div>
            <div style={{ fontSize: '11px', color: '#cbd5e1', letterSpacing: '0.05em' }}>PROJETS</div>
          </div>

          <a href="/cv_dona_eric.pdf" target="_blank" rel="noopener noreferrer" className="glass" style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            padding: '24px',
            cursor: 'pointer',
            transition: 'background 0.2s',
            textDecoration: 'none',
            display: 'block'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'}
          >
            <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>
              <UbuntuFileIcon size={40} />
            </div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#e95420', marginBottom: '8px' }}>✓</div>
            <div style={{ fontSize: '11px', color: '#cbd5e1', letterSpacing: '0.05em' }}>TÉLÉCHARGER CV</div>
          </a>
        </div>
      </div>
    </div>
  );
}
