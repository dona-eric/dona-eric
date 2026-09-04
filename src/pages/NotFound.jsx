import React, { useEffect, useRef, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const SYSTEM_LOGS = [
  "🚨 [ALERTE ROUGE // ÉVASION DE CONFINEMENT] INTRUSION OU ACCÈS HORS LIMITES DÉTECTÉ !",
  "💥 ALARME DE SÉCURITÉ CONFINEMENT MAXIMAL DÉCLENCHÉE.",
  "⚡ ISOLATION DU SITE ET BLOCAGE DU PÉRIMÈTRE EN COURS...",
  "🤖 DÉSACTIVEZ L'ALARME EN SAISISSANT UNE COMMANDE DE SECOURS (sudo -a, sudo -p, sudo -co)."
];

export default function NotFound() {
  const location = useLocation();
  const navigate = useNavigate();

  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLogs, setTerminalLogs] = useState([]);
  const [sirenActive, setSirenActive] = useState(false);

  const canvasRef = useRef(null);
  const audioSirenRef = useRef(null);
  const terminalEndRef = useRef(null);

  // ── 1. Authentic Prisoner Escape / High-Security Red Alert Siren Synthesizer ──
  const startPrisonerEscapeSiren = useCallback(() => {
    try {
      if (audioSirenRef.current) {
        try {
          audioSirenRef.current.stop();
        } catch (e) {}
      }

      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();

      // Master Volume Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.25, ctx.currentTime);
      masterGain.connect(ctx.destination);

      // Continuous Prisoner Escape Siren Oscillators (Frequency Sweep 420Hz <-> 1180Hz)
      const sirenOsc = ctx.createOscillator();
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();

      sirenOsc.type = "sawtooth";
      sirenOsc.frequency.setValueAtTime(780, ctx.currentTime);

      lfo.type = "sine";
      lfo.frequency.setValueAtTime(1.8, ctx.currentTime); // Speed of siren sweep (WAAOOUU)
      lfoGain.gain.setValueAtTime(380, ctx.currentTime); // Sweep depth

      lfo.connect(sirenOsc.frequency);

      // Resonant Lowpass Filter for authentic cyber alarm tone
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(2400, ctx.currentTime);

      sirenOsc.connect(filter);
      filter.connect(masterGain);

      sirenOsc.start();
      lfo.start();

      // Sub-Bass Emergency Pulse (85Hz Strobe)
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      const subLfo = ctx.createOscillator();

      subOsc.type = "triangle";
      subOsc.frequency.setValueAtTime(85, ctx.currentTime);

      subLfo.type = "square";
      subLfo.frequency.setValueAtTime(3.5, ctx.currentTime);

      subLfo.connect(subGain.gain);
      subOsc.connect(subGain);
      subGain.connect(masterGain);

      subOsc.start();
      subLfo.start();

      if (ctx.state === "suspended") {
        ctx.resume().then(() => setSirenActive(true)).catch(() => {});
      } else {
        setSirenActive(true);
      }

      audioSirenRef.current = {
        ctx,
        masterGain,
        stop: () => {
          try {
            masterGain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
            setTimeout(() => {
              sirenOsc.stop();
              lfo.stop();
              subOsc.stop();
              subLfo.stop();
              ctx.close();
            }, 60);
          } catch (e) {}
          setSirenActive(false);
        }
      };
    } catch (err) {
      console.warn("Audio Context init blocked:", err);
    }
  }, []);

  const stopSiren = useCallback(() => {
    if (audioSirenRef.current) {
      audioSirenRef.current.stop();
      audioSirenRef.current = null;
    }
    setSirenActive(false);
  }, []);

  const toggleSiren = () => {
    if (sirenActive) {
      stopSiren();
    } else {
      startPrisonerEscapeSiren();
    }
  };

  // Clean up audio on unmount or path change
  useEffect(() => {
    return () => {
      stopSiren();
    };
  }, [location.pathname, stopSiren]);

  // ── 2. Terminal Auto-Logs ──
  useEffect(() => {
    let index = 0;
    setTerminalLogs([]);
    const interval = setInterval(() => {
      if (index < SYSTEM_LOGS.length) {
        setTerminalLogs(prev => [...prev, SYSTEM_LOGS[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 450);

    return () => clearInterval(interval);
  }, [location.pathname]);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalLogs]);

  // ── 3. Navigation & Immediate Alarm Shutdown on Valid Sudo Command ──
  const navigateWithDeactivation = (path) => {
    stopSiren();
    navigate(path);
  };

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    const newLogs = [...terminalLogs, `sys_user@quantum:~# ${terminalInput}`];

    if (cmd === "help") {
      newLogs.push(
        "COMMANDES DE SÉCURITÉ DE SECOURS (DÉSACTIVATION ALARME) :",
        "  sudo -a   : Couper l'alarme & Aller à la Page d'Accueil",
        "  sudo -p   : Couper l'alarme & Naviguer vers les Projets IA",
        "  sudo -co  : Couper l'alarme & Rediriger vers Contact",
        "  clear     : Vider le journal de bord"
      );
      setTerminalLogs(newLogs);
      setTerminalInput("");
      return;
    } else if (cmd === "sudo -a") {
      newLogs.push("🚨 ALARME ÉTEINTE // REDIRECTION ACCUEIL EN COURS...");
      setTerminalLogs(newLogs);
      setTerminalInput("");
      stopSiren();
      setTimeout(() => navigate("/"), 400);
      return;
    } else if (cmd === "sudo -p") {
      newLogs.push("🚨 ALARME ÉTEINTE // REDIRECTION PROJETS EN COURS...");
      setTerminalLogs(newLogs);
      setTerminalInput("");
      stopSiren();
      setTimeout(() => navigate("/projects"), 400);
      return;
    } else if (cmd === "sudo -co") {
      newLogs.push("🚨 ALARME ÉTEINTE // REDIRECTION CONTACT EN COURS...");
      setTerminalLogs(newLogs);
      setTerminalInput("");
      stopSiren();
      setTimeout(() => navigate("/contact"), 400);
      return;
    } else if (cmd === "clear") {
      setTerminalLogs([]);
      setTerminalInput("");
      return;
    } else {
      newLogs.push(`❌ COMMANDE NON RECONNUE: '${cmd}'. TAPEZ 'help' POUR AFFICHER LES COMMANDES DE SECOURS.`);
      setTerminalLogs(newLogs);
      setTerminalInput("");
    }
  };

  // ── 4. Cyber Red Alert Matrix & Warning Flash ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = Array(columns).fill(1);
    const chars = "🚨_BREACH_ALERT_DOS_ATTACK_PRISON_ESCAPE_SECURITY_LOCKDOWN_404_0x99";

    const draw = () => {
      ctx.fillStyle = "rgba(10, 2, 5, 0.2)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        if (Math.random() > 0.9) {
          ctx.fillStyle = "#ff0033";
        } else if (Math.random() > 0.75) {
          ctx.fillStyle = "#ff5500";
        } else {
          ctx.fillStyle = "rgba(239, 68, 68, 0.4)";
        }

        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>404 // ALERTE ROUGE SÉCURITÉ — Dona Eric</title>
        <meta name="description" content="Alerte de Sécurité Critique — Zone de Confinement." />
      </Helmet>

      <style>{`
        @keyframes red-alert-flash {
          0%, 100% { background-color: rgba(255, 0, 51, 0.08); }
          50% { background-color: rgba(255, 0, 51, 0.25); }
        }

        @keyframes glitch-shake {
          0% { transform: translate(0); }
          20% { transform: translate(-3px, 3px); text-shadow: 3px 0 #ff0033, -3px 0 #00f0ff; }
          40% { transform: translate(-2px, -3px); text-shadow: -3px 0 #ff0033, 3px 0 #00f0ff; }
          60% { transform: translate(3px, 1px); text-shadow: 3px 0 #00f0ff, -3px 0 #ff0033; }
          80% { transform: translate(1px, -2px); text-shadow: -2px 0 #ff0033, 2px 0 #00f0ff; }
          100% { transform: translate(0); }
        }

        @keyframes pulse-red-alert {
          0%, 100% { border-color: rgba(255, 0, 51, 0.6); box-shadow: 0 0 35px rgba(255, 0, 51, 0.4); }
          50% { border-color: rgba(255, 0, 51, 1); box-shadow: 0 0 70px rgba(255, 0, 51, 0.8); }
        }

        @keyframes pulse-btn {
          0%, 100% { transform: scale(1); box-shadow: 0 0 20px #ff0033; }
          50% { transform: scale(1.03); box-shadow: 0 0 40px #ff0033; }
        }

        .red-alert-overlay {
          animation: red-alert-flash 1.2s infinite ease-in-out;
        }

        .cyber-prison-glitch {
          font-family: 'Space Grotesk', monospace;
          animation: glitch-shake 1.8s infinite linear alternate-reverse;
        }

        .cyber-hud-breach {
          animation: pulse-red-alert 2s infinite ease-in-out;
        }

        .pulsing-siren-trigger-btn {
          animation: pulse-btn 1.5s infinite ease-in-out;
        }
      `}</style>

      <main className="red-alert-overlay" style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#050103",
        color: "#ffffff",
        fontFamily: "'Space Grotesk', monospace",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        overflow: "hidden"
      }}>
        {/* Canvas Matrix Rain */}
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, zIndex: 1, opacity: 0.85 }} />

        {/* Central HUD Card */}
        <div className="cyber-hud-breach" style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "820px",
          width: "100%",
          background: "rgba(12, 2, 5, 0.95)",
          backdropFilter: "blur(20px)",
          border: "2px solid rgba(255, 0, 51, 0.8)",
          borderRadius: "16px",
          padding: "40px 32px",
          boxShadow: "0 0 60px rgba(255, 0, 51, 0.5)",
          overflow: "hidden"
        }}>
          {/* Header Siren Bar */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
            borderBottom: "1px solid rgba(255, 0, 51, 0.3)",
            paddingBottom: "12px",
            flexWrap: "wrap",
            gap: "10px"
          }}>
            <div style={{ fontSize: "12px", letterSpacing: "2px", color: "#ff0033", fontWeight: "800", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ display: "inline-block", width: "10px", height: "10px", background: "#ff0033", borderRadius: "50%", boxShadow: "0 0 12px #ff0033" }} />
              🚨 ALERTE ROUGE // SÉCURITÉ CONFINEMENT MAXIMAL
            </div>

            <div style={{ fontSize: "12px", color: "#ff5500", fontFamily: "monospace", fontWeight: "700" }}>
              ROUTE: <span style={{ color: "#ffffff" }}>{location.pathname}</span>
            </div>
          </div>

          {/* Glowing Siren Activation / Deactivation Button */}
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <button
              onClick={toggleSiren}
              className={!sirenActive ? "pulsing-siren-trigger-btn" : ""}
              style={{
                width: "100%",
                padding: "14px 20px",
                background: sirenActive ? "rgba(239, 68, 68, 0.15)" : "linear-gradient(135deg, #ff0033, #e95420)",
                color: sirenActive ? "#ef4444" : "#ffffff",
                border: sirenActive ? "1px solid rgba(239, 68, 68, 0.6)" : "none",
                borderRadius: "10px",
                fontWeight: "800",
                fontSize: "13.5px",
                letterSpacing: "1px",
                cursor: "pointer",
                fontFamily: "monospace",
                transition: "all 0.2s"
              }}
            >
              {sirenActive ? "🔇 COUPER LA SIRÈNE D'ÉVASION ROUGE" : "🔊 DÉCLENCHER LA SIRÈNE D'ÉVASION ROUGE 🚨"}
            </button>
          </div>

          {/* Glitch 404 Title */}
          <div style={{ textAlign: "center", margin: "10px 0 28px 0" }}>
            <h1 className="cyber-prison-glitch" style={{
              fontSize: "clamp(76px, 13vw, 130px)",
              fontWeight: "900",
              margin: 0,
              lineHeight: 0.85,
              color: "#ffffff",
              letterSpacing: "-3px"
            }}>
              404
            </h1>
            <div style={{
              fontSize: "18px",
              fontWeight: "800",
              color: "#ff0033",
              letterSpacing: "3px",
              marginTop: "16px",
              textTransform: "uppercase"
            }}>
              💥 INTRUSION DÉTECTÉE — ALARME ÉVASION ACTIVÉE
            </div>
            <p style={{ color: "#cbd5e1", fontSize: "14px", marginTop: "12px", lineHeight: "1.6" }}>
              Déclenchez la sirène d'évasion rouge ci-dessus ou saisissez une commande de secours dans le terminal (`sudo -a`, `sudo -p`, `sudo -co`) pour vous évader vers les sections autorisées.
            </p>
          </div>

          {/* Terminal Console */}
          <div style={{
            background: "#050002",
            border: "1px solid rgba(255, 0, 51, 0.5)",
            borderRadius: "10px",
            padding: "18px",
            fontFamily: "monospace",
            fontSize: "13px",
            color: "#ff3366",
            maxHeight: "220px",
            overflowY: "auto",
            marginBottom: "24px",
            boxShadow: "inset 0 0 25px rgba(255, 0, 51, 0.3)"
          }}>
            {terminalLogs.map((log, i) => (
              <div key={i} style={{ marginBottom: "6px", wordBreak: "break-all" }}>
                {log}
              </div>
            ))}
            <div ref={terminalEndRef} />

            {/* Input Form */}
            <form onSubmit={handleCommand} style={{ display: "flex", alignItems: "center", marginTop: "12px" }}>
              <span style={{ color: "#ff0055", marginRight: "8px", fontWeight: "700" }}>sys_user@quantum:~#</span>
              <input
                type="text"
                value={terminalInput}
                onChange={e => setTerminalInput(e.target.value)}
                placeholder="Tapez 'help' ou exécutez (sudo -a, sudo -p, sudo -co) pour couper l'alarme..."
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#ffffff",
                  fontFamily: "monospace",
                  fontSize: "13.5px"
                }}
                autoFocus
              />
            </form>
          </div>

          {/* Sudo Action Shortcuts */}
          <div style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap"
          }}>
            <button
              onClick={() => navigateWithDeactivation("/")}
              style={{
                padding: "10px 18px",
                background: "rgba(233, 84, 32, 0.2)",
                border: "1px solid rgba(233, 84, 32, 0.6)",
                color: "#ff7744",
                borderRadius: "8px",
                fontWeight: "700",
                fontSize: "12px",
                cursor: "pointer",
                fontFamily: "monospace",
                transition: "all 0.2s"
              }}
              onMouseOver={e => e.currentTarget.style.background = "rgba(233, 84, 32, 0.4)"}
              onMouseOut={e => e.currentTarget.style.background = "rgba(233, 84, 32, 0.2)"}
            >
              $ sudo -a (Éteindre Alarme & Accueil)
            </button>

            <button
              onClick={() => navigateWithDeactivation("/projects")}
              style={{
                padding: "10px 18px",
                background: "rgba(0, 240, 255, 0.15)",
                border: "1px solid rgba(0, 240, 255, 0.5)",
                color: "#00f0ff",
                borderRadius: "8px",
                fontWeight: "700",
                fontSize: "12px",
                cursor: "pointer",
                fontFamily: "monospace",
                transition: "all 0.2s"
              }}
              onMouseOver={e => e.currentTarget.style.background = "rgba(0, 240, 255, 0.3)"}
              onMouseOut={e => e.currentTarget.style.background = "rgba(0, 240, 255, 0.15)"}
            >
              $ sudo -p (Éteindre Alarme & Projets)
            </button>

            <button
              onClick={() => navigateWithDeactivation("/contact")}
              style={{
                padding: "10px 18px",
                background: "rgba(168, 85, 247, 0.2)",
                border: "1px solid rgba(168, 85, 247, 0.5)",
                color: "#c084fc",
                borderRadius: "8px",
                fontWeight: "700",
                fontSize: "12px",
                cursor: "pointer",
                fontFamily: "monospace",
                transition: "all 0.2s"
              }}
              onMouseOver={e => e.currentTarget.style.background = "rgba(168, 85, 247, 0.4)"}
              onMouseOut={e => e.currentTarget.style.background = "rgba(168, 85, 247, 0.2)"}
            >
              $ sudo -co (Éteindre Alarme & Contact)
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
