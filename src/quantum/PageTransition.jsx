import React from "react";
import { motion } from "framer-motion";
import { useMotion } from "./MotionContext";
import { EASE_IO } from "./primitives";

/*
  Route transition: a panel rises to cover the page on exit,
  then a second panel lifts away on enter, carrying the route label.
*/
const ROUTE_LABELS = {
  "/": "Accueil",
  "/projects": "Projets",
  "/skills": "Compétences",
  "/about": "Profil",
  "/contact": "Contact",
  "/blog": "Blog",
  "/academy": "MLAcademy",
  "/academy/bootcamp": "Bootcamp",
};

export function routeLabel(path) {
  if (ROUTE_LABELS[path]) return ROUTE_LABELS[path];
  if (path.startsWith("/masterclass")) return "Masterclass";
  return "404";
}

export default function PageTransition({ children, path }) {
  const { reduced, introDone } = useMotion();

  if (reduced) {
    return <div>{children}</div>;
  }

  const label = routeLabel(path);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
    >
      {children}

      {/* cover (plays on exit) */}
      <motion.div
        className="q-curtain"
        style={{ transformOrigin: "bottom" }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.7, ease: EASE_IO }}
      />

      {/* reveal (plays on enter) — skipped on the very first load, the intro handles it */}
      {introDone && (
        <motion.div
          className="q-curtain q-curtain--reveal"
          style={{ transformOrigin: "top" }}
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.8, ease: EASE_IO, delay: 0.15 }}
        >
          <motion.span
            className="q-curtain-label"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.45, ease: EASE_IO, delay: 0.1 }}
          >
            <span className="q-label q-label--accent">ψ → </span>
            {label}
          </motion.span>
        </motion.div>
      )}
    </motion.div>
  );
}
