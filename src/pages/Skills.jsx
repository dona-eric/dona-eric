import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Counter, Magnetic, Marquee, Reveal, Roll, SectionHead, SplitText } from "../quantum/primitives";
import { EDUCATION } from "../data/profile";
import { useLanguage } from "../context/LanguageContext";
import "../styles/Skills.css";

const SKILL_COLS = [
  { tag: "ml_core", title: "ML & Deep Learning", skills: ["Scikit-Learn · XGBoost", "PyTorch", "TensorFlow / Keras", { en: "Time series", fr: "Séries temporelles" }, "Computer Vision (YOLO, SAM)"] },
  { tag: "llm_genai", title: "LLM & GenAI", skills: ["Fine-tuning (Llama 3)", "RAG · ChromaDB", "LangChain · LlamaIndex", "Prompt Engineering", "Groq · HuggingFace"] },
  { tag: "mlops", title: "MLOps & Infra", skills: ["Docker · Kubernetes", "MLflow", "FastAPI · REST APIs", "CI/CD (GitHub Actions)", "GCP · AWS · Vercel"] },
  {
    tag: "stats_data",
    title: { en: "Statistics & Data", fr: "Statistique & Data" },
    skills: [
      { en: "Statistical modelling", fr: "Modélisation statistique" },
      { en: "Inference · testing · A/B testing", fr: "Inférence · tests · A/B Testing" },
      "R · Python · Pandas",
      "SQL · PostgreSQL",
      "Plotly · Streamlit · Spark",
    ],
  },
];

const TAUGHT = ["Scikit-Learn", "PyTorch", "RAG", "LangChain", "Docker", "MLflow", "FastAPI", "Python", "SQL"];

const TOOLS_A = ["Python", "PyTorch", "TensorFlow", "Scikit-Learn", "LangChain", "LlamaIndex", "FastAPI", "Streamlit", "Docker", "MLflow", "Airflow", "PostgreSQL", "Spark"];
const TOOLS_B = ["Git", "GCP", "React", "Next.js", "Kubernetes", "R", "DVC", "Fortran", "Azure", "Vercel", "Bash", "Qdrant", "LangGraph"];

const STATS = [
  { v: 8, l: { en: "Portfolio projects", fr: "Projets au portfolio" }, note: { en: "7 shipped, 1 in progress", fr: "Dont 7 livrés, 1 en cours" } },
  { v: 3, l: { en: "Systems in production", fr: "Systèmes en production" }, note: { en: "Online and available", fr: "En ligne et accessibles" } },
  { v: 48, prefix: "<", suffix: "h", l: { en: "Project kick-off", fr: "Démarrage projet" }, note: { en: "After first contact", fr: "Après premier contact" } },
];

export default function Skills() {
  const { tr, tx } = useLanguage();
  return (
    <div className="sk">
      <Helmet>
        <title>{tr("Skills & Stack", "Compétences & Stack")} — Dona Eric KOULODJI | {tr("Statistician & AI Engineer", "Statisticien & AI Engineer")}</title>
        <meta
          name="description"
          content={tr(
            "Tech stack: Python, SQL, Scikit-Learn, PyTorch, NLP, LLM/RAG agents, FastAPI, Docker, MLflow and cloud.",
            "Stack technique : Python, SQL, Scikit-Learn, PyTorch, NLP, agents LLM/RAG, FastAPI, Docker, MLflow et cloud."
          )}
        />
      </Helmet>

      <header className="q-page-hero">
        <div className="q-container">
          <span className="q-label"><span className="q-dot" /> {tr("(Spectrum) — ready to ship", "(Spectre) — prêt à livrer")}</span>
          <h1 className="q-page-hero-title sk-title">
            <SplitText as="span" className="sk-title-line">{tr("What I master.", "Ce que je maîtrise.")}</SplitText>
            <SplitText as="span" className="sk-title-line q-serif q-accent" delay={0.2}>{tr("In production.", "En production.")}</SplitText>
          </h1>
          <div className="q-page-hero-foot">
            <Reveal>
              <p className="q-lead">
                {tr(
                  "Beyond algorithms, I master the tools that turn a research prototype into a scalable product, continuously available to your users.",
                  "Au-delà des algorithmes, je maîtrise les outils qui transforment un prototype de recherche en produit scalable, disponible en continu pour vos utilisateurs."
                )}
              </p>
            </Reveal>
          </div>
        </div>
      </header>

      <section className="q-container">
        <SectionHead index="01" label={tr("What I ship with", "Ce avec quoi je livre")} />
        <div className="sk-cols">
          {SKILL_COLS.map((c, ci) => (
            <Reveal key={c.tag} delay={ci * 0.08} className="sk-col">
              <div className="sk-col-head">
                <span className="q-label q-label--accent">// {c.tag}</span>
                <span className="sk-col-n">{String(ci + 1).padStart(2, "0")}</span>
              </div>
              <h2 className="sk-col-title">{tx(c.title)}</h2>
              <ul className="sk-col-list">
                {c.skills.map((raw) => {
                  const s = tx(raw);
                  const taught = TAUGHT.some((k) => s.includes(k));
                  return (
                    <li key={s}>
                      <span>{s}</span>
                      {taught && <span className="sk-taught" title={tr("Taught at MLAcademy", "Enseigné dans MLAcademy")}>MLAcademy</span>}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          ))}
        </div>
        <p className="sk-legend q-label"><span className="sk-taught">MLAcademy</span> = {tr("topic taught in my courses", "notion enseignée dans mes formations")}</p>
      </section>

      <section className="q-section sk-tools">
        <div className="q-container"><SectionHead index="02" label={tr("Daily tools", "Outils quotidiens")} /></div>
        <Marquee speed={38}>
          {TOOLS_A.map((t) => <span key={t} className="sk-tool">{t}<i>ψ</i></span>)}
        </Marquee>
        <Marquee speed={32} reverse>
          {TOOLS_B.map((t) => <span key={t} className="sk-tool sk-tool--alt">{t}<i>·</i></span>)}
        </Marquee>
      </section>

      <section className="q-container sk-stats">
        {STATS.map((s, i) => (
          <Reveal key={s.v + tx(s.l)} delay={i * 0.08} className="sk-stat">
            <Counter to={s.v} prefix={s.prefix || ""} suffix={s.suffix || ""} pad={2} className="sk-stat-value" />
            <span className="q-label">{tx(s.l)}</span>
            <span className="sk-stat-note">{tx(s.note)}</span>
          </Reveal>
        ))}
      </section>

      <section className="q-section">
        <div className="q-container">
          <SectionHead index="03" label={tr("Education & certifications", "Formation & certifications")} />
          <div className="sk-certs">
            {EDUCATION.map((e, i) => (
              <Reveal key={tx(e.title)} delay={i * 0.05} className="sk-cert">
                <span className="sk-cert-year">{tx(e.year)}</span>
                <h3>{tx(e.title)}</h3>
                <span className="sk-cert-org">{tx(e.org)}</span>
                <span className="q-label">{tx(e.field)}</span>
              </Reveal>
            ))}
          </div>
          <Reveal className="sk-cta">
            <p className="q-lead">{tr("A data or AI need? Answer within 24h, with documented code and results.", "Un besoin data ou IA ? Réponse sous 24h, code et résultats documentés.")}</p>
            <div className="sk-cta-actions">
              <Magnetic strength={0.3}>
                <a href="https://wa.me/2290151344289" target="_blank" rel="noopener noreferrer" className="q-btn q-btn--accent">
                  <Roll>{tr("Start my project", "Démarrer mon projet")}</Roll> <span className="q-btn-arrow">→</span>
                </a>
              </Magnetic>
              <Magnetic strength={0.3}>
                <Link to="/contact" className="q-btn"><Roll>{tr("Ask a question", "Poser une question")}</Roll></Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
