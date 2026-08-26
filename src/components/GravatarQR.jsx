import React, { useState, useEffect } from "react";

// Default email from portfolio configuration
const DEFAULT_EMAIL = "donaerickoulodji@gmail.com";

/**
 * Computes SHA-256 hash of a string using Web Crypto API
 */
export async function sha256(message) {
  const msgUint8 = new TextEncoder().encode(message.trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function GravatarQR({ 
  email = DEFAULT_EMAIL, 
  username = "", 
  size = 300, 
  defaultType = "gravatar", 
  defaultVersion = "3",
  showControls = true 
}) {
  const [hash, setHash] = useState("");
  const [type, setType] = useState(defaultType); // 'gravatar' | 'user' | ''
  const [version, setVersion] = useState(defaultVersion); // '3' | '1'
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (username) {
      setHash(username);
    } else if (email) {
      sha256(email).then((h) => {
        if (isMounted) setHash(h);
      });
    }
    return () => { isMounted = false; };
  }, [email, username]);

  const qrUrl = hash 
    ? `https://gravatar.com/${hash}.qr?${type ? `type=${type}&` : ''}${version ? `version=${version}&` : ''}s=${size}`
    : "";

  const profileUrl = hash ? `https://gravatar.com/${hash}` : "https://gravatar.com";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!hash) {
    return (
      <div style={{ color: "#94a3b8", padding: "20px", textAlign: "center", fontSize: "14px" }}>
        Chargement du code QR Gravatar...
      </div>
    );
  }

  return (
    <div style={{
      background: "rgba(15, 23, 42, 0.75)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "20px",
      padding: "28px 24px",
      maxWidth: "380px",
      margin: "0 auto",
      textAlign: "center",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(99, 102, 241, 0.15)",
      backdropFilter: "blur(16px)",
      color: "#ffffff",
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Badge Header */}
      <div style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "6px 14px",
        background: "rgba(99, 102, 241, 0.12)",
        border: "1px solid rgba(99, 102, 241, 0.3)",
        borderRadius: "9999px",
        fontSize: "11px",
        fontWeight: "700",
        color: "#a5b4fc",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        marginBottom: "20px"
      }}>
        <span>🆔 Profil Gravatar Officiel</span>
      </div>

      <h3 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: "20px",
        fontWeight: "700",
        marginBottom: "8px",
        color: "#ffffff"
      }}>
        Scannez mon QR Code
      </h3>

      <p style={{
        fontSize: "13px",
        color: "#94a3b8",
        lineHeight: "1.5",
        marginBottom: "20px"
      }}>
        Utilisez l'appareil photo de votre smartphone pour accéder directement à mon profil et portfolio Gravatar.
      </p>

      {/* QR Code Container */}
      <div style={{
        position: "relative",
        display: "inline-block",
        padding: "16px",
        background: "#ffffff",
        borderRadius: "16px",
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.1)",
        marginBottom: "20px"
      }}>
        <img
          src={qrUrl}
          alt="Gravatar QR Code Dona Eric"
          width={size > 240 ? 220 : size}
          height={size > 240 ? 220 : size}
          style={{ display: "block", borderRadius: "8px" }}
        />
      </div>

      {/* Customization Controls */}
      {showControls && (
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          marginBottom: "20px",
          flexWrap: "wrap"
        }}>
          {/* Logo Type Selector */}
          <div style={{ display: "flex", background: "rgba(255, 255, 255, 0.05)", padding: "4px", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <button
              type="button"
              onClick={() => setType("gravatar")}
              style={{
                background: type === "gravatar" ? "#6366f1" : "transparent",
                color: "#ffffff",
                border: "none",
                padding: "4px 10px",
                borderRadius: "6px",
                fontSize: "11px",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              Logo Gravatar
            </button>
            <button
              type="button"
              onClick={() => setType("user")}
              style={{
                background: type === "user" ? "#6366f1" : "transparent",
                color: "#ffffff",
                border: "none",
                padding: "4px 10px",
                borderRadius: "6px",
                fontSize: "11px",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              Avatar User
            </button>
          </div>

          {/* Style Version Selector */}
          <div style={{ display: "flex", background: "rgba(255, 255, 255, 0.05)", padding: "4px", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <button
              type="button"
              onClick={() => setVersion("3")}
              style={{
                background: version === "3" ? "#10b981" : "transparent",
                color: "#ffffff",
                border: "none",
                padding: "4px 10px",
                borderRadius: "6px",
                fontSize: "11px",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              Style Dots (v3)
            </button>
            <button
              type="button"
              onClick={() => setVersion("1")}
              style={{
                background: version === "1" ? "#10b981" : "transparent",
                color: "#ffffff",
                border: "none",
                padding: "4px 10px",
                borderRadius: "6px",
                fontSize: "11px",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              Standard (v1)
            </button>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "10px 16px",
            background: "#6366f1",
            color: "#ffffff",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: "600",
            textDecoration: "none",
            transition: "background 0.2s"
          }}
        >
          <span>Ouvrir Profil</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>

        <button
          type="button"
          onClick={handleCopyLink}
          style={{
            padding: "10px 14px",
            background: "rgba(255, 255, 255, 0.06)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            color: copied ? "#10b981" : "#ffffff",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s"
          }}
        >
          {copied ? "Lien copié ! ✓" : "Copier lien"}
        </button>
      </div>
    </div>
  );
}
