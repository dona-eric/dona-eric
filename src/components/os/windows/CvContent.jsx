import React, { useState } from 'react';
import { UbuntuFileIcon } from '../Icons';
import { CV_PDF_URL } from '../../../config/constants';

const CV_DATA = {
  name: "Dona Eric KOULODJI",
  title: "Machine Learning Engineer & MLOps Specialist",
  location: "Abomey-Calavi, Bénin",
  email: "donaerickoulodji@gmail.com",
  phone: "+229 01 41 73 02 / +229 01 51 34 42 89",
  linkedin: "https://linkedin.com/in/dona-erick",
  github: "https://github.com/dona-eric",
  gravatar: "https://gravatar.com/donaerickoulodji",

  summary: "Ingénieur Machine Learning spécialisé en architectures MLOps, Deep Learning et solutions IA de production. Fort d'un background rigoureux en physique théorique, je conçois et déploie des pipelines de données fiables, des modèles prédictifs haute performance et des agents IA interactifs (RAG / LLMs).",

  experiences: [
    {
      period: "Sept 2025 – Présent",
      role: "AI & Data Engineer",
      company: "Datum Africa",
      location: "À distance",
      accent: "#f472b6",
      details: [
        "Conception de modèles conceptuels et physiques de BDD pour systèmes scalables (UML/PostgreSQL).",
        "Développement de pipelines d'ingestion PySpark pour la collecte et le traitement de corpus linguistiques africains (Igbo, Hausa).",
        "Mise en place d'architectures MLOps sécurisées pour le suivi et le déploiement continu."
      ]
    },
    {
      period: "Juil 2025 – Oct 2025",
      role: "Data Developer (Bénévole)",
      company: "CNES — Centre National d'Études Spatiales",
      location: "À distance (France)",
      accent: "#a78bfa",
      details: [
        "Automatisation du contrôle qualité de jeux de données observation de la Terre (> 10 Go).",
        "Optimisation de la préparation des données satellitaires pour entraînement de modèles de Computer Vision.",
        "Mise en place de tests d'intégrité automatisés en Python."
      ]
    },
    {
      period: "04 – 06 Oct 2025",
      role: "Data Scientist",
      company: "Sirius Club Association",
      location: "Présentiel (Bénin)",
      accent: "#22d3ee",
      details: [
        "Collecte et nettoyage de données environnementales et satellites NASA sur la qualité de l'air.",
        "Développement d'une API FastAPI d'ingestion et d'inférence en temps réel.",
        "Modélisation prédictive (XGBoost vs RandomForest) avec benchmark de généralisation."
      ]
    },
    {
      period: "2025",
      role: "Intervenant & Mentor ML",
      company: "DSA 2025 Summer School",
      location: "Nigeria",
      accent: "#34d399",
      details: [
        "Formateur principal en Unsupervised Learning et prédiction de rendement agricole.",
        "Mentorat technique de 20+ étudiants internationaux sur les meilleures pratiques Python et Scikit-Learn."
      ]
    }
  ],

  education: [
    {
      year: "2025",
      degree: "Licence en Physique (Physique Théorique)",
      institution: "Université d'Abomey-Calavi (UAC)",
      note: "Fondations mathématiques solides, modélisation et analyse numérique."
    },
    {
      year: "2026",
      degree: "Building RAG Agentic Applications",
      institution: "NVIDIA Academy",
      note: "Vector Search, RAG hybride, LangChain & LlamaIndex."
    },
    {
      year: "2025",
      degree: "Building LLMs Applications",
      institution: "NVIDIA Academy",
      note: "Prompt Engineering, Quantization et Fine-Tuning de LLMs."
    },
    {
      year: "2024 - 2025",
      degree: "Machine Learning & Deep Learning Specialization",
      institution: "Coursera / DeepLearning.AI",
      note: "Supervised Learning, Neural Networks, CNNs, RNNs & Transformers."
    }
  ],

  skillCategories: [
    { name: "ML & AI Core", skills: ["PyTorch", "TensorFlow", "Scikit-Learn", "XGBoost", "RAG / LangChain", "Transformers"] },
    { name: "MLOps & Cloud", skills: ["Docker", "Kubernetes", "MLflow", "FastAPI", "GitHub Actions", "GCP / AWS", "Vercel"] },
    { name: "Data & Databases", skills: ["PySpark", "Pandas / NumPy", "PostgreSQL", "ChromaDB", "Airflow", "Streamlit"] },
    { name: "Languages", skills: ["Python (Expert)", "SQL (Avancé)", "JavaScript / React", "Bash", "French (Natif)", "English (Technique)"] }
  ]
};

export default function CvContent() {
  const [viewMode, setViewMode] = useState('pdf'); // 'pdf' | 'web'
  const [cacheKey, setCacheKey] = useState(Date.now());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleRefreshPdf = () => {
    setIsRefreshing(true);
    setCacheKey(Date.now());
    setTimeout(() => setIsRefreshing(false), 800);
  };

  // URL dynamique du PDF avec jeton de rafraîchissement anti-cache
  const activePdfUrl = CV_PDF_URL.includes('?')
    ? `${CV_PDF_URL}&v=${cacheKey}`
    : `${CV_PDF_URL}?v=${cacheKey}`;

  return (
    <div style={{
      color: '#e2e8f0',
      fontFamily: "'Inter', sans-serif",
      padding: '24px 20px',
      background: '#1e1e1e',
      minHeight: '100%',
      boxSizing: 'border-box'
    }}>
      {/* ── Top Header Toolbar ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: '16px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <UbuntuFileIcon size={32} />
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#ffffff', margin: 0, fontFamily: "'Space Grotesk', sans-serif" }}>
              CURRICULUM VITAE
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
              <span style={{ fontSize: '12px', color: '#e95420', fontWeight: '600', whiteSpace: 'nowrap' }}>
                Dona Eric KOULODJI — Version 2026
              </span>
              <span style={{
                fontSize: '10px',
                padding: '2px 8px',
                borderRadius: '9999px',
                background: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                color: '#34d399',
                fontWeight: '600'
              }}>
                🟢 Synchro PDF Active
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls & View Switcher */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Mode Switcher */}
          <div style={{
            display: 'flex',
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '3px',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <button
              onClick={() => setViewMode('pdf')}
              style={{
                background: viewMode === 'pdf' ? '#e95420' : 'transparent',
                color: '#ffffff',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              📄 Lecteur PDF Live
            </button>
            <button
              onClick={() => setViewMode('web')}
              style={{
                background: viewMode === 'web' ? '#6366f1' : 'transparent',
                color: '#ffffff',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              📊 Vue Synthétique
            </button>
          </div>

          {/* Refresh PDF Cache Button */}
          {viewMode === 'pdf' && (
            <button
              onClick={handleRefreshPdf}
              title="Forcer le rechargement du PDF"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 12px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '6px',
                color: '#ffffff',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'}
            >
              <span style={{ display: 'inline-block', transform: isRefreshing ? 'rotate(360deg)' : 'none', transition: 'transform 0.5s' }}>🔄</span>
              {isRefreshing ? 'Actualisation...' : 'Actualiser flux'}
            </button>
          )}

          <button
            onClick={handlePrint}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 12px',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '6px',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'}
          >
            🖨️ Imprimer
          </button>

          

          <a
            href={CV_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            download="CV_Dona_Eric_KOULODJI.pdf"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              background: '#e95420',
              borderRadius: '6px',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#d84715'}
            onMouseOut={(e) => e.currentTarget.style.background = '#e95420'}
          >
            ⬇️ Télécharger PDF
          </a>
        </div>
      </div>

      {/* ── Main View Content ── */}
      {viewMode === 'pdf' ? (
        <div style={{
          position: 'relative',
          width: '100%',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          background: '#0a0a0a',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
        }}>
          <iframe
            key={cacheKey}
            src={`${activePdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
            title="CV Dona Eric KOULODJI"
            style={{
              width: '100%',
              height: '75vh',
              minHeight: '620px',
              border: 'none',
              display: 'block',
              background: '#ffffff'
            }}
          />
          <div style={{
            padding: '10px 16px',
            background: 'rgba(15, 23, 42, 0.9)',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center',
            fontSize: '12px',
            color: '#94a3b8'
          }}>
            <span>💡 Astuce : Si vous avez mis à jour votre PDF, cliquez sur <strong>Actualiser flux 🔄</strong>.</span>
            <a
              href={CV_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: '500' }}
            >
              Ouvrir le document brut dans un nouvel onglet ↗
            </a>
          </div>
        </div>
      ) : (
        /* ── Web Synthetic View ── */
        <div>
          {/* Main CV Header */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '28px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h1 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: '800', color: '#ffffff', margin: '0 0 6px 0', fontFamily: "'Space Grotesk', sans-serif", whiteSpace: 'nowrap' }}>
                  {CV_DATA.name}
                </h1>
                <div style={{ fontSize: '15px', color: '#e95420', fontWeight: '600', marginBottom: '12px' }}>
                  {CV_DATA.title}
                </div>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '13px', color: '#94a3b8' }}>
                  <span>📍 {CV_DATA.location}</span>
                  <span>✉️ {CV_DATA.email}</span>
                  <span>📞 {CV_DATA.phone}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                <span style={{
                  fontSize: '11px', fontWeight: '700', color: '#10b981',
                  background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)',
                  padding: '4px 10px', borderRadius: '9999px', letterSpacing: '0.05em'
                }}>
                  ● DISPONIBLE POUR MISSIONS / CDI
                </span>
                <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                  <a href={CV_DATA.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8', fontSize: '13px', textDecoration: 'none' }}>LinkedIn ↗</a>
                  <a href={CV_DATA.github} target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8', fontSize: '13px', textDecoration: 'none' }}>GitHub ↗</a>
                </div>
              </div>
            </div>

            <p style={{ fontSize: '13.5px', color: '#cbd5e1', lineHeight: '1.65', marginTop: '16px', borderTop: '1px dashed rgba(255, 255, 255, 0.08)', paddingTop: '16px', margin: '16px 0 0 0' }}>
              {CV_DATA.summary}
            </p>
          </div>

          {/* Grid Content */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '28px' }}>
            {/* Left Column: Experiences */}
            <div>
              <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                💼 EXPÉRIENCES PROFESSIONNELLES
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {CV_DATA.experiences.map((exp, idx) => (
                  <div key={idx} style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderLeft: `3px solid ${exp.accent}`,
                    borderRadius: '8px',
                    padding: '16px 18px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', flexWrap: 'wrap' }}>
                      <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#ffffff', margin: 0 }}>{exp.role}</h4>
                      <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600' }}>{exp.period}</span>
                    </div>
                    <div style={{ fontSize: '13px', color: exp.accent, fontWeight: '600', marginBottom: '8px' }}>
                      {exp.company} <span style={{ color: '#64748b', fontWeight: '400' }}>· {exp.location}</span>
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12.5px', color: '#cbd5e1', lineHeight: '1.55' }}>
                      {exp.details.map((d, di) => (
                        <li key={di} style={{ marginBottom: '4px' }}>{d}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Education */}
            <div>
              <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                🎓 FORMATION & CERTIFICATIONS
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {CV_DATA.education.map((edu, idx) => (
                  <div key={idx} style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '8px',
                    padding: '14px 16px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', flexWrap: 'wrap' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#ffffff', margin: 0 }}>{edu.degree}</h4>
                      <span style={{ fontSize: '11px', color: '#e95420', fontWeight: '600' }}>{edu.year}</span>
                    </div>
                    <div style={{ fontSize: '12.5px', color: '#a5b4fc', fontWeight: '500', marginBottom: '4px' }}>
                      {edu.institution}
                    </div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: '1.4' }}>
                      {edu.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills Matrix */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            padding: '20px'
          }}>
            <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
              🛠️ MATRICE DE COMPÉTENCES TECHNIQUES
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {CV_DATA.skillCategories.map((cat, idx) => (
                <div key={idx} style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff', marginBottom: '10px' }}>
                    {cat.name}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {cat.skills.map((skill, si) => (
                      <span key={si} style={{
                        fontSize: '11.5px', color: '#cbd5e1', background: 'rgba(255, 255, 255, 0.05)',
                        padding: '3px 8px', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.08)'
                      }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
