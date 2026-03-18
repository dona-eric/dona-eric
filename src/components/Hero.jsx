import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const useFadeIn = (delay = 0) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`;
    const t = setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 60);
    return () => clearTimeout(t);
  }, [delay]);
  return ref;
};

function RoleTypewriter() {
  const roles = ["Data Scientist","ML Engineer","AI Systems Builder","MLOps Practitioner","Physics-Trained Mind"];
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = roles[roleIdx];
    let timeout;
    if (!deleting && displayed.length < current.length)
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    else if (!deleting && displayed.length === current.length)
      timeout = setTimeout(() => setDeleting(true), 1800);
    else if (deleting && displayed.length > 0)
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    else if (deleting && displayed.length === 0) { setDeleting(false); setRoleIdx(i => (i+1) % roles.length); }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIdx]);
  return (
    <span>
      <span style={{ background:"linear-gradient(135deg,#00d4ff 0%,#6366f1 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{displayed}</span>
      <span style={{ color:"#00d4ff", animation:"blink 1s step-end infinite" }}>|</span>
    </span>
  );
}

function StatCard({ value, label, note, color="#00d4ff", delay }) {
  const ref = useFadeIn(delay);
  return (
    <div ref={ref} style={{ padding:"20px 16px", textAlign:"center", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:8, position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,transparent,${color},transparent)` }} />
      <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:32, fontWeight:700, color, lineHeight:1, marginBottom:8 }}>{value}</div>
      <div style={{ fontSize:13, color:"#94a3b8", fontWeight:500, marginBottom:4 }}>{label}</div>
      {note && <div style={{ fontSize:11, color:"#475569", fontFamily:"monospace" }}>{note}</div>}
    </div>
  );
}

function SocialBtn({ href, label, icon, color="#00d4ff" }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      aria-label={label}
      style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"7px 14px", borderRadius:6, textDecoration:"none", background:hov?`${color}15`:"rgba(255,255,255,0.04)", border:`1px solid ${hov?`${color}50`:"rgba(255,255,255,0.1)"}`, color:hov?color:"#64748b", fontFamily:"'JetBrains Mono',monospace", fontSize:12, fontWeight:500, transition:"all 0.2s ease", whiteSpace:"nowrap" }}>
      <span style={{ fontSize:15, lineHeight:1 }}>{icon}</span>
      <span>{label}</span>
    </a>
  );
}

export default function Hero() {
  const badgeRef  = useFadeIn(0.1);
  const nameRef   = useFadeIn(0.3);
  const roleRef   = useFadeIn(0.5);
  const descRef   = useFadeIn(0.7);
  const ctaRef    = useFadeIn(0.9);
  const socialRef = useFadeIn(1.1);
  const statsRef  = useFadeIn(1.3);
  const photoRef  = useFadeIn(0.4);

  const stats = [
    { value:"5+",   label:"Modèles en prod",  note:"Live & monitored",   color:"#00d4ff" },
    { value:"90%",  label:"Précision moyenne", note:"Across ML projects", color:"#a78bfa" },
    { value:"3",    label:"Pays touchés",      note:"BJ · FR · CA",       color:"#22c55e" },
    { value:"<24h", label:"Réponse garantie",  note:"Mon – Sun",           color:"#f59e0b" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        body { background:#060a0f; overflow-x:hidden; }
        @keyframes blink     { 50%{opacity:0} }
        @keyframes gridFloat { 0%,100%{opacity:.03}50%{opacity:.07} }
        @keyframes pulseDot  { 0%,100%{box-shadow:0 0 6px #22c55e}50%{box-shadow:0 0 16px #22c55e} }
        @keyframes orbit     { from{transform:rotate(0deg) translateX(160px) rotate(0deg)} to{transform:rotate(360deg) translateX(160px) rotate(-360deg)} }
        @keyframes orbit2    { from{transform:rotate(120deg) translateX(175px) rotate(-120deg)} to{transform:rotate(480deg) translateX(175px) rotate(-480deg)} }
        @keyframes orbit3    { from{transform:rotate(240deg) translateX(148px) rotate(-240deg)} to{transform:rotate(600deg) translateX(148px) rotate(-600deg)} }
        @keyframes photoGlow { 0%,100%{box-shadow:0 0 40px rgba(0,212,255,0.15)} 50%{box-shadow:0 0 60px rgba(0,212,255,0.25)} }
        @keyframes scrollBob { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }
        .btn-primary:hover   { background:linear-gradient(135deg,#0891b2,#4338ca)!important; transform:translateY(-2px); box-shadow:0 12px 32px rgba(0,212,255,0.25)!important; }
        .btn-secondary:hover { border-color:rgba(0,212,255,0.4)!important; color:#00d4ff!important; transform:translateY(-2px); }
        .btn-primary, .btn-secondary { transition:all 0.25s ease; }
        a { text-decoration:none; }

        @media (max-width:900px) {
          .hero-grid  { grid-template-columns:1fr!important; }
          .photo-col  { order:-1; align-items:center!important; justify-content:center!important; }
          .cta-row    { justify-content:center!important; }
          .social-row { justify-content:center!important; }
          .stats-grid { grid-template-columns:repeat(2,1fr)!important; }
          .badge-row  { justify-content:center!important; }
          .desc-text  { margin:0 auto!important; text-align:center!important; }
          .left-col   { align-items:center!important; text-align:center!important; }
        }
        @media (max-width:480px) {
          .stats-grid { grid-template-columns:repeat(2,1fr)!important; }
          .social-row { flex-wrap:wrap!important; }
          .cta-row    { flex-direction:column!important; align-items:stretch!important; }
        }
      `}</style>

      <div style={{ minHeight:"100vh", background:"#060a0f", color:"#e2e8f0", fontFamily:"'Space Grotesk',sans-serif", position:"relative", overflowX:"hidden" }}>

        {/* Grid bg */}
        <div style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none", backgroundImage:`linear-gradient(rgba(0,212,255,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.035) 1px,transparent 1px)`, backgroundSize:"48px 48px", animation:"gridFloat 8s ease infinite" }} />
        <div style={{ position:"fixed", top:"5%", right:0, width:"min(700px,80vw)", height:"min(700px,80vw)", background:"radial-gradient(circle,rgba(0,212,255,0.05) 0%,transparent 70%)", pointerEvents:"none", zIndex:0 }} />
        <div style={{ position:"fixed", bottom:0, left:0, width:"min(600px,70vw)", height:"min(600px,70vw)", background:"radial-gradient(circle,rgba(99,102,241,0.07) 0%,transparent 70%)", pointerEvents:"none", zIndex:0 }} />

        <div style={{ position:"relative", zIndex:1, maxWidth:1160, margin:"0 auto", padding:"90px 24px 80px", minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center" }}>

          {/* ══ HERO GRID — stretch so both cols share the same height ══ */}
          <div className="hero-grid" style={{
            display:"grid",
            gridTemplateColumns:"1fr 400px",
            gap:56,
            alignItems:"stretch"   /* ← clé : les deux colonnes s'étirent à la même hauteur */
          }}>

            {/* ── LEFT COLUMN ── */}
            <div className="left-col" style={{
              display:"flex", flexDirection:"column",
              justifyContent:"center",          /* contenu centré verticalement */
              gap:22
            }}>

              {/* Badge */}
              <div ref={badgeRef} className="badge-row" style={{ display:"flex", width:"fit-content" }}>
                <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 16px", borderRadius:4, background:"rgba(0,212,255,0.07)", border:"1px solid rgba(0,212,255,0.25)", fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:"#00d4ff", letterSpacing:"0.05em" }}>
                  <span style={{ width:7, height:7, borderRadius:"50%", background:"#22c55e", animation:"pulseDot 2s ease infinite", display:"inline-block", flexShrink:0 }} />
                  Disponible · Bénin · Remote OK
                </div>
              </div>

              {/* Name */}
              <div ref={nameRef}>
                <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:"#475569", letterSpacing:"0.15em", marginBottom:10 }}>
                  <span style={{ color:"#6366f1" }}>// </span>profile.init()
                </div>
                <h1 style={{ fontSize:"clamp(40px,6.5vw,80px)", fontWeight:700, lineHeight:1.02, letterSpacing:"-0.03em", color:"#f8fafc" }}>
                  Dona Éric<br />
                  <span style={{ background:"linear-gradient(135deg,#00d4ff 0%,#6366f1 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>KOULODJI</span>
                </h1>
              </div>

              {/* Role typewriter */}
              <div ref={roleRef} style={{ fontSize:"clamp(16px,2.4vw,24px)", fontWeight:600, fontFamily:"'JetBrains Mono',monospace", minHeight:36 }}>
                <RoleTypewriter />
              </div>

              {/* Description */}
              <p ref={descRef} className="desc-text" style={{ color:"#94a3b8", fontSize:15, lineHeight:1.85, maxWidth:500 }}>
                Je conçois et déploie des{" "}
                <strong style={{ color:"#e2e8f0" }}>systèmes d'intelligence artificielle</strong>{" "}
                qui répondent à des besoins métier concrets — de l'exploration des données
                jusqu'au déploiement en production. Formé en Physique, reconverti en Data & ML.
              </p>

              {/* CTAs */}
              <div ref={ctaRef} className="cta-row" style={{ display:"flex", flexWrap:"wrap", gap:12 }}>
                <Link to="/projects" className="btn-primary" style={{ display:"inline-flex", alignItems:"center", gap:10, padding:"13px 26px", borderRadius:6, background:"linear-gradient(135deg,#0e7490,#4338ca)", color:"#f0f9ff", fontFamily:"'JetBrains Mono',monospace", fontSize:13, fontWeight:600, letterSpacing:"0.05em", boxShadow:"0 4px 20px rgba(0,212,255,0.12)" }}>
                  view_projects() →
                </Link>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ display:"inline-flex", alignItems:"center", gap:10, padding:"13px 26px", borderRadius:6, background:"transparent", border:"1px solid rgba(255,255,255,0.15)", color:"#94a3b8", fontFamily:"'JetBrains Mono',monospace", fontSize:13, fontWeight:500, letterSpacing:"0.05em" }}>
                  ↓ download_resume.pdf
                </a>
              </div>

              {/* Socials */}
              <div ref={socialRef} className="social-row" style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
                <SocialBtn href="https://github.com/dona-eric" label="GitHub" color="#00d4ff"
                  icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>}
                />
                <SocialBtn href="https://linkedin.com/in/dona-erick" label="LinkedIn" color="#a78bfa"
                  icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>}
                />
                <SocialBtn href="https://twitter.com/ericschrodinger" label="Twitter / X" color="#64748b"
                  icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>}
                />
              </div>
            </div>

            {/* ── RIGHT COLUMN : Photo — même hauteur, contenu centré ── */}
            <div ref={photoRef} className="photo-col" style={{
              display:"flex", flexDirection:"column",
              alignItems:"center",
              justifyContent:"center",           /* ← centré verticalement dans la hauteur de la col gauche */
              gap:28,
              /* Bordure subtile pour matérialiser l'espace partagé */
              borderLeft:"1px solid rgba(0,212,255,0.06)",
              paddingLeft:40
            }}>

              {/* Photo frame */}
              <div style={{ position:"relative", width:280, height:280 }}>

                {[
                  { anim:"orbit 12s linear infinite",  color:"#00d4ff" },
                  { anim:"orbit2 16s linear infinite", color:"#a78bfa" },
                  { anim:"orbit3 10s linear infinite", color:"#22c55e" },
                ].map((o,i) => (
                  <div key={i} style={{ position:"absolute", top:"50%", left:"50%", width:8, height:8, borderRadius:"50%", background:o.color, boxShadow:`0 0 10px ${o.color}`, animation:o.anim, transformOrigin:"0 0", marginLeft:-4, marginTop:-4 }} />
                ))}

                <div style={{ position:"absolute", inset:-14, borderRadius:"50%", border:"1px solid rgba(0,212,255,0.12)" }} />
                <div style={{ position:"absolute", inset:-28, borderRadius:"50%", border:"1px dashed rgba(99,102,241,0.1)" }} />

                <div style={{ width:"100%", height:"100%", borderRadius:"50%", background:"linear-gradient(135deg,#0e7490 0%,#4338ca 100%)", padding:3, animation:"photoGlow 4s ease infinite" }}>
                  <div style={{ width:"100%", height:"100%", borderRadius:"50%", background:"#0a0e17", padding:5, overflow:"hidden" }}>
                    <img src="/eric.jpg" alt="Dona Éric KOULODJI"
                      style={{ width:"100%", height:"100%", borderRadius:"50%", objectFit:"cover", filter:"grayscale(20%) contrast(1.05)" }} />
                  </div>
                </div>

                {/* Badge flottant */}
                <div style={{ position:"absolute", bottom:-16, left:"50%", transform:"translateX(-50%)", padding:"7px 16px", borderRadius:4, background:"rgba(6,10,15,0.95)", border:"1px solid rgba(34,197,94,0.4)", fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:"#22c55e", whiteSpace:"nowrap", letterSpacing:"0.04em", boxShadow:"0 4px 20px rgba(34,197,94,0.15)" }}>
                  <span style={{ display:"inline-block", width:6, height:6, borderRadius:"50%", background:"#22c55e", marginRight:7, verticalAlign:"middle", animation:"pulseDot 2s ease infinite" }} />
                  Disponible immédiatement
                </div>
              </div>

              {/* Stack pills */}
              <div style={{ textAlign:"center", paddingTop:8 }}>
                <div style={{ fontFamily:"monospace", fontSize:10, color:"#334155", letterSpacing:"0.12em", marginBottom:10 }}>// current_stack</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:7, justifyContent:"center", maxWidth:280 }}>
                  {["Python","PyTorch","FastAPI","Docker","LangChain","MLflow","RAG"].map(t => (
                    <span key={t} style={{ padding:"4px 10px", borderRadius:3, background:"rgba(99,102,241,0.08)", border:"1px solid rgba(99,102,241,0.2)", fontSize:11, fontFamily:"monospace", color:"#818cf8" }}>{t}</span>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* ══ STATS ══ */}
          <div ref={statsRef} style={{ marginTop:64 }}>
            <div style={{ width:"100%", height:1, marginBottom:32, background:"linear-gradient(90deg,transparent,rgba(0,212,255,0.2),transparent)" }} />
            <div className="stats-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
              {stats.map((s,i) => <StatCard key={i} {...s} delay={1.3+i*0.1} />)}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position:"absolute", bottom:32, left:"50%", display:"flex", flexDirection:"column", alignItems:"center", gap:8, animation:"scrollBob 2s ease infinite" }}>
          <span style={{ fontFamily:"monospace", fontSize:10, color:"#334155", letterSpacing:"0.1em" }}>scroll</span>
          <div style={{ width:20, height:34, border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, display:"flex", justifyContent:"center", paddingTop:6 }}>
            <div style={{ width:2, height:8, borderRadius:2, background:"linear-gradient(180deg,#00d4ff,#6366f1)" }} />
          </div>
        </div>
      </div>
    </>
  );
}
