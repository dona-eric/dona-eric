import React from "react";
import Desktop from "../components/os/Desktop";

/**
 * /about ouvre le bureau du portfolio.
 * Le contenu du profil vit dans components/os/windows/AboutContent.jsx
 * (une seule source de vérité, pas de lock screen).
 */
export default function About() {
  return <Desktop />;
}
