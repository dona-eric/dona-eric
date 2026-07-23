import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import GenerativeBg from "../components/GenerativeBg";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: Route not found:", location.pathname);
  }, [location.pathname]);

  return (
    <main style={{ minHeight: "calc(100vh - 80px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", position: "relative", overflow: "hidden" }}>
      <GenerativeBg />
      
      <div style={{ textAlign: "center", position: "relative", zIndex: 10, maxWidth: "600px", width: "100%" }}>
        <div style={{
          background: "rgba(15, 23, 42, 0.6)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          borderRadius: "24px",
          padding: "48px 32px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
        }}>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "72px", fontWeight: "700", lineHeight: "1", marginBottom: "16px", color: "var(--neon-pink)" }}>
            404
          </div>
          
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "28px", fontWeight: "600", marginBottom: "16px", color: "#f8fafc" }}>
            <span style={{ color: "#64748b" }}>$</span> Error: route_not_found
          </h1>
          
          <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: "1.6", marginBottom: "32px" }}>
            Il semble que cette page ait été absorbée par un trou noir. 
            Le chemin <span style={{ color: "var(--neon-cyan)", background: "rgba(0, 212, 255, 0.1)", padding: "2px 8px", borderRadius: "4px" }}>{location.pathname}</span> n'existe pas.
          </p>
          
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/" style={{
              padding: "12px 24px", borderRadius: "100px", background: "var(--neon-cyan)", color: "#0f172a", textDecoration: "none", fontWeight: "600", fontSize: "15px", transition: "all 0.2s ease"
            }}>
              Retour à l'accueil
            </Link>
            <Link to="/contact" style={{
              padding: "12px 24px", borderRadius: "100px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#e2e8f0", textDecoration: "none", fontWeight: "600", fontSize: "15px", transition: "all 0.2s ease"
            }}>
              Me contacter
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
