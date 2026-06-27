import React, { useState } from 'react';

/**
 * TagCloud — Grille responsive de pills technologiques.
 * Remplace l'ancien nuage 3D illisible par une grille claire et accessible.
 */
const TagCloud = ({ tags }) => {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '24px',
      width: '100%',
      height: '100%',
      position: 'relative',
      zIndex: 2,
    }}>
      {tags.map((tag, i) => (
        <TagPill key={i} tag={tag} index={i} />
      ))}
    </div>
  );
};

function TagPill({ tag, index }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '7px',
        padding: '8px 16px',
        borderRadius: '8px',
        background: hov ? 'rgba(99, 102, 241, 0.12)' : 'rgba(255, 255, 255, 0.04)',
        border: `1px solid ${hov ? 'rgba(99, 102, 241, 0.4)' : 'rgba(255, 255, 255, 0.08)'}`,
        color: hov ? '#ffffff' : '#94a3b8',
        fontFamily: "'JetBrains Mono', 'Space Grotesk', monospace",
        fontSize: '13px',
        fontWeight: 500,
        cursor: 'default',
        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: hov ? 'translateY(-2px)' : 'translateY(0)',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        animationDelay: `${index * 30}ms`,
      }}
    >
      {tag.icon && (
        <span style={{ fontSize: '1em', lineHeight: 1 }}>{tag.icon}</span>
      )}
      {tag.label}
    </div>
  );
}

export default TagCloud;
