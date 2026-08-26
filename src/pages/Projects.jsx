import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Desktop from "../components/os/Desktop";
import { UbuntuFolderIcon, UbuntuFileIcon } from "../components/os/Icons";

const PROJECTS = [
  {
    id: "veritaai", title: "VeritaAI", subtitle: "Détection intelligente de fake news",
    problem: "La vérification manuelle des faits par les journalistes est trop lente face à la vitesse de propagation des fausses informations.",
    solution: "Système RAG + BERT automatisé pour analyser et scorer l'authenticité des informations en temps réel via une API FastAPI.",
    results: "Temps de vérification divisé par 10. Précision de 90% sur 3 médias partenaires.",
    stack: ["BERT", "Transformers", "RAG", "FastAPI", "Streamlit"],
    impact: "90% précision", impactDetail: "3 médias partenaires",
    github: "https://github.com/dona-eric/veritaai", demo: "https://verita-ai.streamlit.app",
    status: "production", category: "nlp", accent: "#10b981", featured: true,
  },
  {
    id: "coachai", title: "CoachAI", subtitle: "Générateur IA de programmes sportifs",
    problem: "Les coachs sportifs passent jusqu'à 40% de leur temps à rédiger des programmes personnalisés.",
    solution: "Application LLM (RAG multi-providers) générant automatiquement des entraînements, plans de récupération et recommandations.",
    results: "Gain de temps opérationnel de 20% pour les coachs professionnels.",
    stack: ["OpenAI", "GroqCloud", "RAG", "LangChain", "Streamlit"],
    impact: "-20% temps", impactDetail: "Coachs professionnels",
    github: "https://github.com/dona-eric/CoachAI", demo: "https://coach-ai.streamlit.app",
    status: "production", category: "llm", accent: "#a855f7", featured: true,
  },
  {
    id: "credit-risk", title: "Credit Risk Engine", subtitle: "Scoring de crédit automatisé",
    problem: "L'évaluation manuelle des dossiers de crédit génère des goulots d'étranglement et des biais humains.",
    solution: "Modèle prédictif MLOps avec explicabilité SHAP et monitoring de drift, intégré via API REST.",
    results: "Augmentation de la précision de 15% et approbation des crédits 3x plus rapide.",
    stack: ["Scikit-Learn", "SHAP", "FastAPI", "MLflow", "Docker"],
    impact: "+15% précision", impactDetail: "Fintech Bénin",
    github: "https://github.com/dona-eric/Hack2Hiere_TechTech_DataScience_20", demo: "https://risk-score.streamlit.app",
    status: "production", category: "ml", accent: "#00d4ff", featured: true,
  },
  {
    id: "rag-docs", title: "RAG Document Intelligence", subtitle: "Recherche sémantique multi-documents",
    problem: "Les employés perdent des heures à chercher des informations spécifiques dans des milliers de documents d'entreprise.",
    solution: "Système RAG multi-format ultra-rapide (Groq + ChromaDB) pour interroger le corpus documentaire en langage naturel.",
    results: "Accès instantané à l'information (< 2s) sur plus de 1000 documents.",
    stack: ["Groq", "LangChain", "ChromaDB", "Llama 3", "HuggingFace"],
    impact: "< 2s latence", impactDetail: "1000+ docs indexés",
    github: "https://huggingface.co/spaces/donerick", demo: "https://huggingface.co/spaces/donerick/Projects",
    status: "production", category: "llm", accent: "#f59e0b", featured: false,
  },
  {
    id: "ev-dashboard", title: "EV Dashboard Pro", subtitle: "Optimisation recharge véhicules électriques",
    problem: "Coûts énergétiques imprévisibles liés aux pics de recharge des flottes de véhicules électriques.",
    solution: "Dashboard prédictif (Prophet + XGBoost) anticipant la demande à 7 jours pour lisser la consommation.",
    results: "Réduction projetée de 30% sur la facture énergétique globale.",
    stack: ["Prophet", "XGBoost", "Plotly Dash", "Docker", "GCP"],
    impact: "-30% facture", impactDetail: "Flotte B2B",
    github: "https://github.com/dona-eric/dashboard-ve", demo: null,
    status: "done", category: "ml", accent: "#ec4899", featured: false,
  },
  {
    id: "askbenin", title: "AskBenin", subtitle: "IA souveraine pour la culture béninoise",
    problem: "Manque d'accessibilité numérique centralisée pour l'histoire, la culture et les traditions béninoises.",
    solution: "Plateforme Agentic RAG dialoguant en tenant compte des nuances culturelles locales (pas juste un chatbot générique).",
    results: "Plus de 10 000 documents culturels indexés pour la souveraineté numérique.",
    stack: ["LangChain", "LangGraph", "FastAPI", "Next.js", "RAG"],
    impact: "10K docs indexés", impactDetail: "Souveraineté numérique",
    github: "https://github.com/askbeninn", demo: null,
    status: "wip", category: "llm", accent: "#f59e0b", featured: true,
  },
];

const CAT_MAP = {
  all: { label: "Home", icon: "🏠" },
  ml:  { label: "Machine Learning", icon: "🧠" },
  nlp: { label: "NLP / Vision", icon: "👁️" },
  llm: { label: "LLM / Agents", icon: "🤖" },
};

const ALL_CATS = ["all", "ml", "nlp", "llm"];

export default function Projects({ isWindow }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered = activeFilter === "all" ? PROJECTS : PROJECTS.filter(p => p.category === activeFilter);

  const content = (
    <div style={{ display: 'flex', height: '100%', width: '100%', fontFamily: "'Inter', sans-serif", color: '#e2e8f0', background: '#1e1e1e' }}>
      
      {/* Sidebar (Places) */}
      <div style={{ 
        width: '240px', 
        background: '#242424', 
        borderRight: '1px solid #1a1a1a', 
        display: 'flex', 
        flexDirection: 'column',
        padding: '16px 0'
      }}>
        <div style={{ padding: '0 16px', marginBottom: '12px', fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>
          Dossiers
        </div>
        {ALL_CATS.map(cat => {
          const active = activeFilter === cat;
          return (
            <button 
              key={cat}
              onClick={() => { setActiveFilter(cat); setSelectedProject(null); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '10px 24px', background: active ? 'rgba(233, 84, 32, 0.15)' : 'transparent',
                border: 'none', color: active ? '#e95420' : '#cbd5e1',
                cursor: 'pointer', textAlign: 'left',
                borderLeft: active ? '3px solid #e95420' : '3px solid transparent',
                transition: 'background 0.2s',
                fontWeight: active ? '600' : '400',
                fontSize: '14px'
              }}
              onMouseOver={(e) => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
              onMouseOut={(e) => { if (!active) e.currentTarget.style.background = 'transparent' }}
            >
              <span style={{ fontSize: '16px' }}>{CAT_MAP[cat].icon}</span>
              {CAT_MAP[cat].label}
            </button>
          )
        })}
      </div>

      {/* Main Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#1e1e1e' }}>
        
        {/* Toolbar / Path */}
        <div style={{ 
          height: '48px', 
          borderBottom: '1px solid #1a1a1a', 
          display: 'flex', 
          alignItems: 'center', 
          padding: '0 24px',
          background: '#252525'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '14px' }}>
            <span>dona.ia</span>
            <span>/</span>
            <span style={{ color: '#fff' }}>Projets</span>
            <span>/</span>
            <span style={{ color: '#e95420', fontWeight: '600' }}>{CAT_MAP[activeFilter].label}</span>
          </div>
        </div>

        {/* Content (Grid or Details) */}
        {selectedProject ? (
          <ProjectDetails project={selectedProject} onBack={() => setSelectedProject(null)} />
        ) : (
          <div style={{ 
            padding: '24px', 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', 
            gap: '24px',
            alignContent: 'start',
            overflowY: 'auto',
            flex: 1
          }}>
            {filtered.map(project => (
              <div 
                key={project.id}
                onClick={() => setSelectedProject(project)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
                  padding: '16px', borderRadius: '8px', cursor: 'pointer',
                  textAlign: 'center', transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ position: 'relative' }}>
                  <UbuntuFolderIcon size={64} />
                  {project.status === 'production' && (
                    <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', background: '#10b981', width: '14px', height: '14px', borderRadius: '50%', border: '2px solid #1e1e1e' }} title="En Production" />
                  )}
                </div>
                <div>
                  <div style={{ color: '#fff', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>{project.title}</div>
                  <div style={{ color: '#64748b', fontSize: '11px' }}>{project.impact}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  if (!isWindow) {
    return <Desktop />;
  }

  return (
    <>
      <Helmet>
        <title>Projets — dona.ia</title>
        <meta name="description" content="Découvrez mes projets d'ingénierie en IA, du prototypage au déploiement en production." />
      </Helmet>
      {content}
    </>
  );
}

function ProjectDetails({ project, onBack }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'auto' }}>
      <div style={{ padding: '24px', borderBottom: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', gap: '24px', background: '#222' }}>
        <button 
          onClick={onBack}
          style={{ 
            background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', 
            width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
        >
          ←
        </button>
        <div>
          <h2 style={{ fontSize: '24px', color: '#fff', margin: '0 0 4px 0', fontWeight: '600' }}>{project.title}</h2>
          <div style={{ color: '#94a3b8', fontSize: '14px' }}>{project.subtitle}</div>
        </div>
      </div>
      
      <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Status & Links */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <span style={{ padding: '6px 12px', background: 'rgba(16,185,129,0.1)', color: '#10b981', borderRadius: '20px', fontSize: '12px', fontWeight: '600', border: '1px solid rgba(16,185,129,0.3)' }}>
            {project.status.toUpperCase()}
          </span>
          <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ color: '#e95420', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
            📁 Code Source
          </a>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" style={{ color: '#00d4ff', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
              ↗ Live Demo
            </a>
          )}
        </div>

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', fontWeight: '600' }}>Le Problème</div>
            <p style={{ margin: 0, color: '#cbd5e1', fontSize: '15px', lineHeight: '1.6' }}>{project.problem}</p>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', fontWeight: '600' }}>La Solution</div>
            <p style={{ margin: 0, color: '#cbd5e1', fontSize: '15px', lineHeight: '1.6' }}>{project.solution}</p>
          </div>
          
          <div style={{ background: 'rgba(233, 84, 32, 0.05)', padding: '20px', borderRadius: '8px', borderLeft: '3px solid #e95420' }}>
            <div style={{ fontSize: '11px', color: '#e95420', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', fontWeight: '600' }}>Résultats / ROI</div>
            <p style={{ margin: 0, color: '#fff', fontSize: '15px', lineHeight: '1.6' }}>{project.results}</p>
          </div>
        </div>

        {/* Stack */}
        <div>
          <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', fontWeight: '600' }}>Technologies utilisées</div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {project.stack.map(tech => (
              <span key={tech} style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', fontSize: '13px', color: '#cbd5e1' }}>
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}