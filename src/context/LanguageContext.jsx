import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const TRANSLATIONS = {
  fr: {
    // Navigation
    nav: {
      home: "Accueil",
      projects: "Projets",
      about: "À propos",
      contact: "Contact",
      academy: "MLAcademy",
      blog: "Blog & Livres",
      desktop: "Bureau OS",
      downloadCv: "Télécharger CV",
      langSelect: "Langue",
      themeDark: "Mode Sombre",
      themeLight: "Mode Clair",
    },
    // Desktop OS
    os: {
      pc: "Ce PC",
      projects: "Projets",
      blog: "Blog & Livres",
      cv: "Mon CV",
      contact: "Contact",
      academy: "Academy",
      activities: "Activités",
      showApps: "Afficher les applications",
      power: "Éteindre / Accueil"
    },
    // Home Page
    home: {
      badge: "Ingénieur IA & Data Scientist",
      heroTitleLine1: "Concevoir le Futur",
      heroTitleLine2: "avec l'Intelligence Artificielle.",
      heroSubtitle: "Spécialiste en Deep Learning, Computer Vision et Architectures RAG / LLM. Je transforme la donnée en systèmes intelligents de haute performance.",
      btnProjects: "Explorer mes Projets",
      btnContact: "Me Contacter",
      btnDesktop: "Lancer Ubuntu OS Portfolio",
      skillsTitle: "Domaines d'Expertise & Technologies",
      skillsSubtitle: "Des algorithmes de pointe à l'intégration cloud en production",
      featuredTitle: "Projets à la Une",
      featuredSubtitle: "Découvrez une sélection de mes réalisations les plus impactantes",
      viewAllProjects: "Voir tous les projets",
      reviewsTitle: "Recommandations & Témoignages",
      reviewsSubtitle: "Ce que disent mes collaborateurs et mentors"
    },
    // Projects Page
    projects: {
      title: "Projets & Réalisations IA",
      subtitle: "Portfolio de systèmes intelligents, modèles de Deep Learning et applications RAG.",
      all: "Tous",
      ai: "Intelligence Artificielle",
      data: "Data Engineering",
      web: "Web & Apps",
      viewProject: "Consulter le projet",
      sourceCode: "Code source"
    },
    // About Page
    about: {
      title: "À propos de moi",
      subtitle: "Passionné par l'Intelligence Artificielle, le Deep Learning et la création de solutions numériques d'impact.",
      bioTitle: "Parcours & Philosophie",
      bioText1: "Ingénieur de formation spécialisé en Intelligence Artificielle et Data Science, je conçois des systèmes d'apprentissage automatique capables d'analyser des données complexes et d'automatiser des prises de décision à forte valeur ajoutée.",
      bioText2: "Mon approche combine rigueur mathématique, maîtrise des architectures modernes (PyTorch, LLMs, Computer Vision) et souci d'une expérience utilisateur fluide et élégante.",
      experienceTitle: "Expériences & Rôles",
      educationTitle: "Formation & Diplômes",
      certificationsTitle: "Certifications de Spécialité"
    },
    // Contact Page
    contact: {
      title: "Prenons Contact",
      subtitle: "Un projet en Intelligence Artificielle, une opportunité ou une collaboration ? Écrivez-moi !",
      nameLabel: "Votre Nom",
      emailLabel: "Votre Email",
      messageLabel: "Votre Message",
      sendBtn: "Envoyer le Message",
      sending: "Envoi en cours...",
      success: "Message envoyé avec succès ! Merci.",
      location: "Localisation",
      locationVal: "Paris / Cotonou / Remote",
      emailVal: "contact@dona-eric.com"
    },
    // Blog Page
    blog: {
      title: "Blog & Publications",
      subtitle: "Articles sur l'IA, le Machine Learning, les LLM et le développement logiciel.",
      readMore: "Lire l'article sur Medium",
      storeTitle: "Boutique & Livres",
      storeSubtitle: "E-books et guides pratiques pour maîtriser l'Intelligence Artificielle."
    },
    // Academy Page
    academy: {
      title: "MLAcademy",
      subtitle: "La plateforme d'apprentissage et de certification en Intelligence Artificielle et Data Science.",
      exploreBootcamps: "Découvrir nos Bootcamps",
      viewMasterclasses: "Voir les Masterclasses"
    },
    // 404 Cybersecurity Page
    notfound: {
      title: "INTRUSION DÉTECTÉE — ALARME SÉCURITÉ",
      sirenOn: "🔊 DÉCLENCHER LA SIRÈNE D'ÉVASION ROUGE 🚨",
      sirenOff: "🔇 COUPER LA SIRÈNE D'ÉVASION ROUGE",
      subtitle: "Déclenchez la sirène d'évasion rouge ci-dessus ou saisissez une commande de secours dans le terminal (sudo -a, sudo -p, sudo -co) pour vous évader vers les sections autorisées.",
      cmdHome: "$ sudo -a (Accueil)",
      cmdProjects: "$ sudo -p (Projets)",
      cmdContact: "$ sudo -co (Contact)"
    }
  },
  en: {
    nav: {
      home: "Home",
      projects: "Projects",
      about: "About",
      contact: "Contact",
      academy: "MLAcademy",
      blog: "Blog & Books",
      desktop: "OS Desktop",
      downloadCv: "Download CV",
      langSelect: "Language",
      themeDark: "Dark Mode",
      themeLight: "Light Mode",
    },
    os: {
      pc: "This PC",
      projects: "Projects",
      blog: "Blog & Books",
      cv: "My CV",
      contact: "Contact",
      academy: "Academy",
      activities: "Activities",
      showApps: "Show Applications",
      power: "Power Off / Home"
    },
    home: {
      badge: "AI Engineer & Data Scientist",
      heroTitleLine1: "Designing the Future",
      heroTitleLine2: "with Artificial Intelligence.",
      heroSubtitle: "Specialist in Deep Learning, Computer Vision, and RAG/LLM Architectures. Transforming complex data into high-performance intelligent systems.",
      btnProjects: "Explore My Projects",
      btnContact: "Contact Me",
      btnDesktop: "Launch Ubuntu OS Portfolio",
      skillsTitle: "Areas of Expertise & Technologies",
      skillsSubtitle: "From cutting-edge algorithms to production cloud integration",
      featuredTitle: "Featured Projects",
      featuredSubtitle: "Discover a selection of my most impactful achievements",
      viewAllProjects: "View All Projects",
      reviewsTitle: "Recommendations & Endorsements",
      reviewsSubtitle: "What collaborators and mentors say about my work"
    },
    projects: {
      title: "AI Projects & Achievements",
      subtitle: "Portfolio of intelligent systems, Deep Learning models, and RAG applications.",
      all: "All",
      ai: "Artificial Intelligence",
      data: "Data Engineering",
      web: "Web & Apps",
      viewProject: "View Project",
      sourceCode: "Source Code"
    },
    about: {
      title: "About Me",
      subtitle: "Passionate about Artificial Intelligence, Deep Learning, and building impactful digital solutions.",
      bioTitle: "Background & Philosophy",
      bioText1: "Trained as an engineer specializing in Artificial Intelligence and Data Science, I design machine learning systems capable of analyzing complex data and automating high-value decision-making.",
      bioText2: "My approach combines mathematical rigor, mastery of modern architectures (PyTorch, LLMs, Computer Vision), and a commitment to seamless, elegant user experiences.",
      experienceTitle: "Experience & Roles",
      educationTitle: "Education & Degrees",
      certificationsTitle: "Specialty Certifications"
    },
    contact: {
      title: "Get in Touch",
      subtitle: "Have an AI project, an opportunity, or a potential collaboration? Send me a message!",
      nameLabel: "Your Name",
      emailLabel: "Your Email",
      messageLabel: "Your Message",
      sendBtn: "Send Message",
      sending: "Sending...",
      success: "Message sent successfully! Thank you.",
      location: "Location",
      locationVal: "Paris / Cotonou / Remote",
      emailVal: "contact@dona-eric.com"
    },
    blog: {
      title: "Blog & Publications",
      subtitle: "Articles on AI, Machine Learning, LLMs, and software engineering.",
      readMore: "Read article on Medium",
      storeTitle: "Store & Books",
      storeSubtitle: "E-books and practical guides to mastering Artificial Intelligence."
    },
    academy: {
      title: "MLAcademy",
      subtitle: "The learning and certification platform for Artificial Intelligence and Data Science.",
      exploreBootcamps: "Explore Bootcamps",
      viewMasterclasses: "View Masterclasses"
    },
    notfound: {
      title: "INTRUSION DETECTED — SECURITY ALARM",
      sirenOn: "🔊 TRIGGER RED ESCAPE SIREN 🚨",
      sirenOff: "🔇 MUTE RED ESCAPE SIREN",
      subtitle: "Trigger the red escape siren above or enter a backup command in the terminal (sudo -a, sudo -p, sudo -co) to escape to authorized sections.",
      cmdHome: "$ sudo -a (Home)",
      cmdProjects: "$ sudo -p (Projects)",
      cmdContact: "$ sudo -co (Contact)"
    }
  },
  es: {
    nav: {
      home: "Inicio",
      projects: "Proyectos",
      about: "Sobre mí",
      contact: "Contacto",
      academy: "MLAcademy",
      blog: "Blog y Libros",
      desktop: "Escritorio OS",
      downloadCv: "Descargar CV",
      langSelect: "Idioma",
      themeDark: "Modo Oscuro",
      themeLight: "Modo Claro",
    },
    os: {
      pc: "Este PC",
      projects: "Proyectos",
      blog: "Blog y Libros",
      cv: "Mi CV",
      contact: "Contacto",
      academy: "Academy",
      activities: "Actividades",
      showApps: "Mostrar Aplicaciones",
      power: "Apagar / Inicio"
    },
    home: {
      badge: "Ingeniero de IA y Data Scientist",
      heroTitleLine1: "Diseñando el Futuro",
      heroTitleLine2: "con Inteligencia Artificial.",
      heroSubtitle: "Especialista en Deep Learning, Visión por Computadora y Arquitecturas RAG/LLM. Transformando datos complejos en sistemas inteligentes de alto rendimiento.",
      btnProjects: "Explorar Mis Proyectos",
      btnContact: "Contáctame",
      btnDesktop: "Iniciar Ubuntu OS Portfolio",
      skillsTitle: "Áreas de Experiencia y Tecnologías",
      skillsSubtitle: "Desde algoritmos avanzados hasta integración en la nube en producción",
      featuredTitle: "Proyectos Destacados",
      featuredSubtitle: "Descubre una selección de mis logros más impactantes",
      viewAllProjects: "Ver Todos los Proyectos",
      reviewsTitle: "Recomendaciones y Testimonios",
      reviewsSubtitle: "Lo que dicen mis colaboradores y mentores"
    },
    projects: {
      title: "Proyectos y Logros en IA",
      subtitle: "Portafolio de sistemas inteligentes, modelos de Deep Learning y aplicaciones RAG.",
      all: "Todos",
      ai: "Inteligencia Artificial",
      data: "Ingeniería de Datos",
      web: "Web y Apps",
      viewProject: "Ver Proyecto",
      sourceCode: "Código Fuente"
    },
    about: {
      title: "Sobre Mí",
      subtitle: "Apasionado por la Inteligencia Artificial, el Deep Learning y la creación de soluciones digitales de impacto.",
      bioTitle: "Trayectoria y Filosofía",
      bioText1: "Como ingeniero especializado en Inteligencia Artificial y Ciencia de Datos, diseño sistemas de aprendizaje automático capaces de analizar datos complejos y automatizar la toma de decisiones.",
      bioText2: "Mi enfoque combina rigor matemático, dominio de arquitecturas modernas (PyTorch, LLMs, Visión por Computadora) y un compromiso con una experiencia de usuario fluida y elegante.",
      experienceTitle: "Experiencia y Roles",
      educationTitle: "Formación y Títulos",
      certificationsTitle: "Certificaciones de Especialidad"
    },
    contact: {
      title: "Ponte en Contacto",
      subtitle: "¿Tienes un proyecto de IA, una oportunidad o una colaboración? ¡Escríbeme!",
      nameLabel: "Tu Nombre",
      emailLabel: "Tu Email",
      messageLabel: "Tu Mensaje",
      sendBtn: "Enviar Mensaje",
      sending: "Enviando...",
      success: "¡Mensaje enviado con éxito! Gracias.",
      location: "Ubicación",
      locationVal: "París / Cotonú / Remoto",
      emailVal: "contact@dona-eric.com"
    },
    blog: {
      title: "Blog y Publicaciones",
      subtitle: "Artículos sobre IA, Machine Learning, LLMs y desarrollo de software.",
      readMore: "Leer artículo en Medium",
      storeTitle: "Tienda y Libros",
      storeSubtitle: "E-books y guías prácticas para dominar la Inteligencia Artificial."
    },
    academy: {
      title: "MLAcademy",
      subtitle: "La plataforma de aprendizaje y certificación en Inteligencia Artificial y Ciencia de Datos.",
      exploreBootcamps: "Descubrir Bootcamps",
      viewMasterclasses: "Ver Masterclasses"
    },
    notfound: {
      title: "INTRUSIÓN DETECTADA — ALARMA DE SEGURIDAD",
      sirenOn: "🔊 ACTIVAR SIRENA ROJA DE ESCAPE 🚨",
      sirenOff: "🔇 DESACTIVAR SIRENA ROJA DE ESCAPE",
      subtitle: "Activa la sirena de escape roja arriba o ingresa un comando de emergencia en la terminal (sudo -a, sudo -p, sudo -co) para escapar a secciones autorizadas.",
      cmdHome: "$ sudo -a (Inicio)",
      cmdProjects: "$ sudo -p (Proyectos)",
      cmdContact: "$ sudo -co (Contacto)"
    }
  },
  ja: {
    nav: {
      home: "ホーム",
      projects: "プロジェクト",
      about: "自己紹介",
      contact: "お問い合わせ",
      academy: "MLAcademy",
      blog: "ブログ＆書籍",
      desktop: "OSデスクトップ",
      downloadCv: "CVをダウンロード",
      langSelect: "言語",
      themeDark: "ダークモード",
      themeLight: "ライトモード",
    },
    os: {
      pc: "このPC",
      projects: "プロジェクト",
      blog: "ブログ＆書籍",
      cv: "私のCV",
      contact: "お問い合わせ",
      academy: "Academy",
      activities: "アクティビティ",
      showApps: "アプリ一覧を表示",
      power: "電源オフ / ホーム"
    },
    home: {
      badge: "AIエンジニア ＆ データサイエンティスト",
      heroTitleLine1: "人工知能で",
      heroTitleLine2: "未来をデザインする。",
      heroSubtitle: "ディープラーニング、コンピュータビジョン、RAG/LLMアーキテクチャのスペシャリスト。複雑なデータを高性能なインテリジェントシステムへと変換します。",
      btnProjects: "プロジェクトを見る",
      btnContact: "お問い合わせ",
      btnDesktop: "Ubuntu OS ポートフォリオを起動",
      skillsTitle: "専門分野 ＆ 使用技術",
      skillsSubtitle: "最先端アルゴリズムからプロダクションクラウド統合まで",
      featuredTitle: "注目のプロジェクト",
      featuredSubtitle: "最も影響力のある実績の厳選コレクション",
      viewAllProjects: "すべてのプロジェクトを見る",
      reviewsTitle: "推薦文 ＆ 評価",
      reviewsSubtitle: "コラボレーターやメンターからの声"
    },
    projects: {
      title: "AIプロジェクト ＆ 実績",
      subtitle: "インテリジェントシステム、ディープラーニングモデル、RAGアプリケーションのポートフォリオ。",
      all: "すべて",
      ai: "人工知能",
      data: "データエンジニアリング",
      web: "Web ＆ アプリ",
      viewProject: "プロジェクトを見る",
      sourceCode: "ソースコード"
    },
    about: {
      title: "自己紹介",
      subtitle: "人工知能、ディープラーニング、影響力のあるデジタルソリューションの創造に情熱を注いでいます。",
      bioTitle: "経歴 ＆ 理念",
      bioText1: "人工知能とデータサイエンスを専攻したエンジニアとして、複雑なデータを分析し、高付加価値な意思決定を自動化する機械学習システムを設計しています。",
      bioText2: "私の手法は、数学的厳密さ、現代的なアーキテクチャ（PyTorch、LLM、コンピュータビジョン）の熟達、そして洗練されたユーザー体験へのこだわりを組み合わせています。",
      experienceTitle: "職歴 ＆ 役割",
      educationTitle: "学歴 ＆ 学位",
      certificationsTitle: "専門資格・認定"
    },
    contact: {
      title: "お問い合わせ",
      subtitle: "AIプロジェクトのご相談、採用のご案内、コラボレーションのお問い合わせはこちらからどうぞ！",
      nameLabel: "お名前",
      emailLabel: "メールアドレス",
      messageLabel: "メッセージ内容",
      sendBtn: "メッセージを送信",
      sending: "送信中...",
      success: "メッセージが正常に送信されました！ありがとうございます。",
      location: "拠点",
      locationVal: "パリ / コトヌー / リモート",
      emailVal: "contact@dona-eric.com"
    },
    blog: {
      title: "ブログ ＆ 執筆記事",
      subtitle: "AI、機械学習、LLM、ソフトウェア開発に関する最新記事。",
      readMore: "Mediumで記事を読む",
      storeTitle: "ストア ＆ 書籍",
      storeSubtitle: "人工知能をマスターするための電子書籍と実践ガイド。"
    },
    academy: {
      title: "MLAcademy",
      subtitle: "人工知能とデータサイエンスのための学習・認定プラットフォーム。",
      exploreBootcamps: "ブートキャンプを見る",
      viewMasterclasses: "マスタークラスを見る"
    },
    notfound: {
      title: "侵入検知 — セキュリティアラーム発動",
      sirenOn: "🔊 レッド脱走サイレンを起動 🚨",
      sirenOff: "🔇 レッド脱走サイレンを消音",
      subtitle: "上の脱走サイレンを起動するか、ターミナルで緊急コマンド（sudo -a, sudo -p, sudo -co）を実行して脱出してください。",
      cmdHome: "$ sudo -a (ホーム)",
      cmdProjects: "$ sudo -p (プロジェクト)",
      cmdContact: "$ sudo -co (お問い合わせ)"
    }
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("dona_lang") || "fr";
  });

  const changeLanguage = (newLang) => {
    if (TRANSLATIONS[newLang]) {
      setLang(newLang);
      localStorage.setItem("dona_lang", newLang);
    }
  };

  const t = (path) => {
    const keys = path.split(".");
    let current = TRANSLATIONS[lang] || TRANSLATIONS.fr;
    for (const key of keys) {
      if (current[key] !== undefined) {
        current = current[key];
      } else {
        // Fallback to French if translation key missing
        let fallback = TRANSLATIONS.fr;
        for (const fKey of keys) {
          if (fallback && fallback[fKey] !== undefined) {
            fallback = fallback[fKey];
          } else {
            return path;
          }
        }
        return fallback;
      }
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
