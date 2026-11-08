import React from 'react';
import { UbuntuFolderIcon, UbuntuFileIcon } from '../Icons';
import '../../../styles/About.css';
import { desc } from 'framer-motion/client';

const STATS = [
  { value: "3", label: "SYSTÈMES EN PROD", note: "Déployés & accessibles" },
  { value: "8", label: "PROJETS", note: "Dont 7 livrés, 1 en cours" },
  { value: "3", label: "PAYS TOUCHÉS", note: "Bénin · Nigeria · France" },
  { value: "06+", label: "ÉLÈVES FORMÉS", note: "MLAcademy Cohorte #1" },
];

const VALUES = [
  {
    tag: "01", color: "#22d3ee",
    title: "Livraison concrète",
    desc: "Pas de réunions infinies. Un besoin, un délai, un système qui tourne. Je livre des projets testables, pas des slides.",
    proof: "→ 8 projets · code public sur GitHub"
  },
  {
    tag: "02", color: "#f472b6",
    title: "Production-first",
    desc: "Chaque ligne de code est pensée pour le cloud, le monitoring et le scaling dès le départ — pas retrofittée après coup.",
    proof: "→ Docker · MLflow · CI/CD · FastAPI"
  },
  {
    tag: "03", color: "#a78bfa",
    title: "Interlocuteur unique",
    desc: "Data, ML, déploiement, agents IA — je gère l'ensemble de la chaîne. Vous parlez à une seule personne, vous recevez un système complet.",
    proof: "→ Du notebook au endpoint en production"
  },
];

const EXPERIENCES = [
  {
    role: "Facilitateur, Mentor Technique",
    type: "Bénévolat",
    Company: "Impact Hub Cotonou",
    period: "28-30 Aout 2026",
    accent: "#f470b5",
    tasks:[
      {tag: "Communalthon", desc: "Accompagner plus de 30 jeunes diplomés et développeurs dans la création des solutions innovantes numérique liées à l'économie verte à Cotonou lors de l'hackaton nommé Communalthon"}
    ]
  },

  {
    role: "AI & Data Engineer",
    type: "Bénévolat",
    company: "Datum Africa",
    location: "À distance",
    period: "Sept 2025 – Fév 2026",
    accent: "#f472b6",
    status: "done",
    tasks: [
      { tag: "Architecture", desc: "Modèles de bases de données (UML/PostgreSQL) pour systèmes scalables" },
      { tag: "Pipelines", desc: "Collecte et traitement de corpus africains (Igbo, Hausa) via PySpark" },
      { tag: "Collaboration", desc: "Workflows d'équipe et versioning via GitHub" },
    ],
  },
  {
    role: "Data Developer",
    type: "Bénévole",
    company: "CNES — Centre National d'Études Spatiales",
    location: "À distance · France",
    period: "Juil – Oct 2025",
    accent: "#a78bfa",
    status: "done",
    tasks: [
      { tag: "Qualité data", desc: "Pipelines de contrôle qualité de datasets satellites (> 10 Go)" },
      { tag: "Modélisation", desc: "Random Forest pour la prédiction agricole sur données spatiales" },
      { tag: "MLOps", desc: "Suivi et production avec DVC, MLflow et OpenTelemetry" },
    ],
  },
  {
    role: "Data Scientist",
    type: "Mission courte",
    company: "Sirius Club Association",
    location: "Présentiel · Bénin",
    period: "04 – 06 Oct 2025",
    accent: "#22d3ee",
    status: "done",
    tasks: [
      { tag: "Data", desc: "Collecte de données qualité de l'air et météo (NASA)" },
      { tag: "Pipeline ML", desc: "Pipeline d'ingestion et d'inférence via FastAPI" },
      { tag: "Modélisation", desc: "Benchmark XGBoost vs Random Forest avec contrôle du surapprentissage" },
    ]
  },
  {
    role: "Intervenant & Participants",
    type: "Intervenant",
    company: "DSA 2025 Summer School — Université d'Ibadan",
    location: "Nigeria",
    period: "02 – 05 Mai 2025",
    accent: "#34d399",
    status: "done",
    tasks: [
      {tag: "Discovery", desc: "J'ai participé à l'école d'été en Data Science Africa 2025, et avoir suivi des différentes interventions et masterclass sur l'apprentissage du machine learning, le federated learning et comprendre le fonctionnement des architectures des réseaux de neurones et LLMs."},
      {},
      { tag: "Prédiction", desc: "Projet de prédiction du rendement du riz (unsupervised learning & séries temporelles)" },
      { tag: "Formation", desc: "20+ étudiants internationaux formés en ML et Python" },
    ],
  },
];

export default function AboutContent({ onOpenWindow }) {
  return (
    <div style={{
      color: '#e2e8f0',
      fontFamily: "'Inter', sans-serif",
      padding: '0',
      background: '#1e1e1e',
      minHeight: '100%',
    }}>
      {/* ── Header / Identity ── */}
      <div style={{
        padding: '40px 32px 32px',
        textAlign: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'linear-gradient(180deg, rgba(233,84,32,0.06) 0%, transparent 100%)',
      }}>
        <div className="nav-logo-monogram" style={{ width: "72px", height: "72px", margin: "0 auto 16px", border: "2px solid rgba(233, 84, 32, 0.6)", background: 'rgba(233, 84, 32, 0.1)' }}>
          <span className="nav-logo-letter" style={{ fontSize: "32px", color: '#e95420' }}>D</span>
          <span className="nav-logo-dot" style={{ width: "9px", height: "9px", bottom: "12px", right: "14px", background: '#e95420' }} />
        </div>
        <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#fff', marginBottom: '4px', fontFamily: "'Space Grotesk', sans-serif", whiteSpace: 'nowrap' }}>Dona Eric KOULODJI</h2>
        <p style={{ fontSize: '13px', color: '#e95420', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '20px', fontWeight: '600' }}>
          Data Scientist &amp; ML Engineer
        </p>
        <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.7', maxWidth: '520px', margin: '0 auto', textAlign: 'left' }}>
          Je conçois des systèmes de Machine Learning mesurables et déployables : <strong style={{ color: '#e2e8f0' }}>données → modèle → API → monitoring</strong>. Formation en physique théorique, spécialisation NLP, modélisation prédictive et agents LLM.
        </p>
      </div>

      {/* ── Stats Grid ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1px',
        background: 'rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        {STATS.map((s, i) => (
          <div key={i} style={{ background: '#1e1e1e', padding: '20px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#fff', fontFamily: "'Space Grotesk', sans-serif" }}>{s.value}</div>
            <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: '600', marginTop: '4px' }}>{s.label}</div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>{s.note}</div>
          </div>
        ))}
      </div>

      {/* ── Quick Actions ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
        padding: '24px 32px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div 
          onClick={() => onOpenWindow && onOpenWindow('Projets')}
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '12px',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
        >
          <UbuntuFolderIcon size={36} />
          <div>
            <div style={{ fontSize: '16px', fontWeight: '600', color: '#fff' }}>8 Projets</div>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>ML · NLP · LLM · MLOps</div>
          </div>
        </div>

        <a href="/cv_dona_eric.pdf" target="_blank" rel="noopener noreferrer" style={{
          background: 'rgba(233,84,32,0.08)',
          border: '1px solid rgba(233,84,32,0.2)',
          borderRadius: '12px',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          cursor: 'pointer',
          transition: 'background 0.2s',
          textDecoration: 'none',
        }}
        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(233,84,32,0.15)'}
        onMouseOut={(e) => e.currentTarget.style.background = 'rgba(233,84,32,0.08)'}
        >
          <UbuntuFileIcon size={36} />
          <div>
            <div style={{ fontSize: '16px', fontWeight: '600', color: '#e95420' }}>Télécharger CV</div>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>PDF · Dernière version</div>
          </div>
        </a>
      </div>

      {/* ── Values / Pourquoi moi ── */}
      <div style={{ padding: '28px 32px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>
          // pourquoi_moi()
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {VALUES.map((v, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderLeft: `3px solid ${v.color}`,
              borderRadius: '10px',
              padding: '18px 20px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', color: v.color, fontWeight: '700', fontFamily: "'Space Grotesk', sans-serif" }}>{v.tag}</span>
                <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#fff', margin: 0 }}>{v.title}</h4>
              </div>
              <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6', margin: '0 0 8px 0' }}>{v.desc}</p>
              <div style={{ fontSize: '12px', color: v.color, background: `${v.color}10`, padding: '4px 10px', borderRadius: '6px', display: 'inline-block' }}>
                {v.proof}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Expériences ── */}
      <div style={{ padding: '28px 32px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>
          // parcours.professionnel()
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {EXPERIENCES.map((exp, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderLeft: `3px solid ${exp.accent}`,
              borderRadius: '10px',
              padding: '18px 20px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#fff', margin: 0 }}>{exp.role}</h4>
                    <span style={{
                      fontSize: '10px', fontWeight: '600', padding: '2px 8px', borderRadius: '4px',
                      color: exp.accent, background: `${exp.accent}15`, border: `1px solid ${exp.accent}30`,
                    }}>{exp.type}</span>
                    {exp.status === 'current' && (
                      <span style={{
                        width: '6px', height: '6px', borderRadius: '50%', background: exp.accent,
                        boxShadow: `0 0 8px ${exp.accent}`, display: 'inline-block',
                        animation: 'pulseDot 2s ease infinite',
                      }} />
                    )}
                  </div>
                  <div style={{ fontSize: '13px', color: exp.accent, fontWeight: '500' }}>{exp.company}</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>📍 {exp.location}</div>
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500', whiteSpace: 'nowrap' }}>{exp.period}</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {exp.tasks.map((t, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'baseline', gap: '8px', fontSize: '13px' }}>
                    <span style={{
                      fontSize: '10px', fontWeight: '600', padding: '2px 7px', borderRadius: '4px',
                      color: exp.accent, background: `${exp.accent}10`, border: `1px solid ${exp.accent}20`,
                      whiteSpace: 'nowrap', flexShrink: 0,
                    }}>{t.tag}</span>
                    <span style={{ color: '#94a3b8', lineHeight: '1.5' }}>{t.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
