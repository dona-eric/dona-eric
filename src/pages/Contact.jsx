import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Desktop from "../components/os/Desktop";
import { UbuntuMailIcon, UbuntuFolderIcon } from "../components/os/Icons";

export default function Contact({ isWindow }) {
  const [form, setForm] = useState({ subject: "", message: "", sender: "" });
  const [status, setStatus] = useState(null);
  const [activeFolder, setActiveFolder] = useState('compose');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    
    try {
      const res = await fetch("https://formspree.io/f/xovkejww", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.sender,
          subject: form.subject,
          message: form.message
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ subject: "", message: "", sender: "" });
        setTimeout(() => setStatus(null), 3000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  const content = (
    <div style={{ display: 'flex', height: '100%', width: '100%', fontFamily: "'Inter', sans-serif", color: '#e2e8f0', background: '#1e1e1e' }}>
      
      {/* Left Sidebar (Mail Folders) */}
      <div style={{ 
        width: '240px', 
        background: '#242424', 
        borderRight: '1px solid #1a1a1a', 
        display: 'flex', 
        flexDirection: 'column',
        padding: '16px 0'
      }}>
        <div style={{ padding: '0 16px', marginBottom: '12px', fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>
          Réseaux & Contact
        </div>
        
        <button 
          onClick={() => setActiveFolder('compose')}
          style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '10px 24px', background: activeFolder === 'compose' ? 'rgba(233, 84, 32, 0.15)' : 'transparent',
            border: 'none', color: activeFolder === 'compose' ? '#e95420' : '#cbd5e1',
            cursor: 'pointer', textAlign: 'left',
            borderLeft: activeFolder === 'compose' ? '3px solid #e95420' : '3px solid transparent',
            transition: 'background 0.2s',
            fontWeight: activeFolder === 'compose' ? '600' : '400',
            fontSize: '14px'
          }}
          onMouseOver={(e) => { if (activeFolder !== 'compose') e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
          onMouseOut={(e) => { if (activeFolder !== 'compose') e.currentTarget.style.background = 'transparent' }}
        >
          <span style={{ fontSize: '16px' }}>✉️</span>
          Nouveau Message
        </button>

        <a href="https://linkedin.com/in/dona-erick" target="_blank" rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '10px 24px', background: 'transparent',
            border: 'none', color: '#cbd5e1', textDecoration: 'none',
            cursor: 'pointer', textAlign: 'left', borderLeft: '3px solid transparent',
            transition: 'background 0.2s', fontSize: '14px'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <span style={{ fontSize: '16px', color: '#0a66c2' }}>in</span>
          LinkedIn
        </a>

        <a href="https://github.com/dona-eric" target="_blank" rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '10px 24px', background: 'transparent',
            border: 'none', color: '#cbd5e1', textDecoration: 'none',
            cursor: 'pointer', textAlign: 'left', borderLeft: '3px solid transparent',
            transition: 'background 0.2s', fontSize: '14px'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <span style={{ fontSize: '16px' }}>💻</span>
          GitHub
        </a>

        <a href="mailto:donaerickoulodji@gmail.com"
          style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '10px 24px', background: 'transparent',
            border: 'none', color: '#cbd5e1', textDecoration: 'none',
            cursor: 'pointer', textAlign: 'left', borderLeft: '3px solid transparent',
            transition: 'background 0.2s', fontSize: '14px'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <span style={{ fontSize: '16px', color: '#ea4335' }}>G</span>
          Gmail Direct
        </a>
      </div>

      {/* Main Area (Compose Mail) */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#1e1e1e' }}>
        
        {/* Toolbar */}
        <div style={{ 
          height: '48px', 
          borderBottom: '1px solid #1a1a1a', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          padding: '0 24px',
          background: '#252525'
        }}>
          <div style={{ fontWeight: '600', color: '#fff', fontSize: '14px' }}>Nouveau Message</div>
          <button 
            onClick={handleSubmit}
            disabled={status === "sending"}
            style={{
              background: '#e95420',
              color: '#fff',
              border: 'none',
              padding: '6px 16px',
              borderRadius: '4px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: status === "sending" ? 'not-allowed' : 'pointer',
              opacity: status === "sending" ? 0.7 : 1
            }}
          >
            {status === "sending" ? "Envoi..." : status === "success" ? "Envoyé ✓" : status === "error" ? "Erreur" : "Envoyer"}
          </button>
        </div>

        {/* Compose Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div style={{ display: 'flex', borderBottom: '1px solid #2a2a2a', padding: '12px 24px', alignItems: 'center' }}>
            <div style={{ width: '80px', color: '#94a3b8', fontSize: '13px' }}>De:</div>
            <input 
              type="email" 
              required
              placeholder="votre.email@entreprise.com" 
              value={form.sender}
              onChange={e => setForm({...form, sender: e.target.value})}
              style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', outline: 'none', fontSize: '14px' }}
            />
          </div>
          
          <div style={{ display: 'flex', borderBottom: '1px solid #2a2a2a', padding: '12px 24px', alignItems: 'center' }}>
            <div style={{ width: '80px', color: '#94a3b8', fontSize: '13px' }}>À:</div>
            <div style={{ flex: 1, color: '#fff', fontSize: '14px', background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '4px', display: 'inline-block', width: 'fit-content', flexGrow: 0 }}>
              donaerickoulodji@gmail.com
            </div>
          </div>
          
          <div style={{ display: 'flex', borderBottom: '1px solid #2a2a2a', padding: '12px 24px', alignItems: 'center' }}>
            <div style={{ width: '80px', color: '#94a3b8', fontSize: '13px' }}>Objet:</div>
            <input 
              type="text" 
              required
              placeholder="Proposition de collaboration..." 
              value={form.subject}
              onChange={e => setForm({...form, subject: e.target.value})}
              style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', outline: 'none', fontSize: '14px', fontWeight: '500' }}
            />
          </div>

          <textarea 
            required
            placeholder="Écrivez votre message ici..."
            value={form.message}
            onChange={e => setForm({...form, message: e.target.value})}
            style={{ 
              flex: 1, background: 'transparent', border: 'none', color: '#cbd5e1', 
              padding: '24px', outline: 'none', fontSize: '14px', resize: 'none',
              fontFamily: "'Inter', sans-serif", lineHeight: '1.6'
            }}
          />
        </form>
      </div>
    </div>
  );

  if (!isWindow) {
    return <Desktop />;
  }

  return (
    <>
      <Helmet>
        <title>Contact — dona.ia</title>
      </Helmet>
      {content}
    </>
  );
}