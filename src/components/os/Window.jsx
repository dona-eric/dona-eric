import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Window({ title, onClose, onMinimize, children, defaultSize = { width: 800, height: 600 }, isActive = false, isMinimized = false, slot = 0 }) {
  const [isMaximized, setIsMaximized] = useState(false);

  const toggleMaximize = () => setIsMaximized(!isMaximized);

  if (isMinimized) return null; // Minimized windows are restored from the dock.

  // Cascade offset: keeps every new window visibly offset from the previous one.
  const offset = Math.min(slot, 4) * 20;

  const windowStyle = isMaximized
    ? { top: 0, left: 0, width: '100%', height: '100%', borderRadius: 0 }
    : {
        width: `min(${defaultSize.width}px, calc(100vw - 224px))`,
        height: `min(${defaultSize.height}px, calc(100vh - 160px))`,
        borderRadius: 12
      };

  return (
    <motion.div
      drag={!isMaximized}
      dragMomentum={false}
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: 10 }}
      transition={{ duration: 0.2 }}
      className="os-window glass"
      style={{
        position: 'absolute',
        top: isMaximized ? 0 : `calc(6% + ${offset}px)`,
        left: isMaximized ? 0 : `calc(8% + ${offset}px)`,
        ...windowStyle,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: isActive ? '0 25px 50px -12px rgba(0, 0, 0, 0.8)' : '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        zIndex: 100,
        overflow: 'hidden',
        background: '#242424', // Ubuntu Yaru Dark background
      }}
    >
      {/* Title Bar (GNOME HeaderBar) */}
      <div 
        className="os-window-titlebar"
        style={{
          height: '46px', // GNOME header bars are taller
          background: isActive ? '#303030' : '#2b2b2b',
          borderBottom: '1px solid #1a1a1a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center', // Title is centered in GNOME
          padding: '0 12px',
          cursor: isMaximized ? 'default' : 'move',
          userSelect: 'none',
          position: 'relative'
        }}
        onDoubleClick={toggleMaximize}
      >
        <div style={{ position: 'absolute', left: '16px', display: 'flex', alignItems: 'center' }}>
          {/* Optional: Add search or menu icon here if needed */}
        </div>

        <div style={{ color: isActive ? '#ffffff' : '#a1a1a1', fontSize: '15px', fontWeight: '600' }}>
          {title}
        </div>
        
        <div style={{ position: 'absolute', right: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Ubuntu Yaru Window Controls */}
          <button onClick={onMinimize} style={{ border: 'none', color: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} title="Minimize">
            <svg width="10" height="2" viewBox="0 0 10 2" fill="currentColor"><rect width="10" height="2" rx="1"/></svg>
          </button>
          <button onClick={toggleMaximize} style={{ border: 'none', color: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}>
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="1" width="10" height="10" rx="1"/></svg>
          </button>
          <button onClick={onClose} style={{ border: 'none', color: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#e95420' }} title="Close">
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 2L10 10M10 2L2 10" strokeLinecap="round"/></svg>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="os-window-content" style={{ flex: 1, overflowY: 'auto', padding: '0', position: 'relative', background: '#1e1e1e' }}>
        {children}
      </div>
    </motion.div>
  );
}
