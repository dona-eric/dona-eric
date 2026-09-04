import React from 'react';

// Dossier personnel (Home)
export const UbuntuMonitorIcon = ({ size = 48, className = "" }) => (
  <img src="/os-icons/home.png" width={size} height={size} className={className} alt="Home" />
);

// Dossier (Jaune/Orange Yaru)
export const UbuntuFolderIcon = ({ size = 48, className = "" }) => (
  <img src="/os-icons/project.png" width={size} height={size} className={className} alt="Folder" />
);

// Fichier / CV (Texte)
export const UbuntuFileIcon = ({ size = 48, className = "" }) => (
  <img src="/os-icons/cv.png" width={size} height={size} className={className} alt="Document" />
);

// Email (Mail App)
export const UbuntuMailIcon = ({ size = 48, className = "" }) => (
  <img src="/os-icons/gmail.png" width={size} height={size} className={className} alt="Mail" />
);

// Logiciel (Software Store)
export const UbuntuAcademyIcon = ({ size = 48, className = "" }) => (
<img src="/os-icons/academy.png" width={size} height={size} className={className} alt="Software" />
);

// Blog / Ecrits & Produits (Yaru News / Book style)
export const UbuntuBlogIcon = ({ size = 48, className = "" }) => (
  <img src="/os-icons/ebook.png" width={size} height={size} className={className} alt="Document" />
);

export const ShowAppsIcon = ({ size = 32, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="6" cy="6" r="2.5" fill="#ffffff" fillOpacity="0.8"/>
    <circle cx="16" cy="6" r="2.5" fill="#ffffff" fillOpacity="0.8"/>
    <circle cx="26" cy="6" r="2.5" fill="#ffffff" fillOpacity="0.8"/>
    
    <circle cx="6" cy="16" r="2.5" fill="#ffffff" fillOpacity="0.8"/>
    <circle cx="16" cy="16" r="2.5" fill="#ffffff" fillOpacity="0.8"/>
    <circle cx="26" cy="16" r="2.5" fill="#ffffff" fillOpacity="0.8"/>
    
    <circle cx="6" cy="26" r="2.5" fill="#ffffff" fillOpacity="0.8"/>
    <circle cx="16" cy="26" r="2.5" fill="#ffffff" fillOpacity="0.8"/>
    <circle cx="26" cy="26" r="2.5" fill="#ffffff" fillOpacity="0.8"/>
  </svg>
);
