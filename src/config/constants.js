// Portfolio Constants & Configuration
export const PORTFOLIO = {
  name: "Dona Eric",
  title: "Data Scientist & ML Engineer",
  subtitle: "Transforming data into intelligent solutions",
  description: "Specialized in Machine Learning, Data Science, and AI. Building impactful, data-driven solutions for organizations and innovators.",
  location: "Abomey-Calavi, Benin",
  email: "donaerickoulodji@gmail.com",
  phone: "+229 01 41 73 02 40",
};

export const SOCIAL_LINKS = [
  { name: "LinkedIn", url: "https://linkedin.com/in/dona-erick", icon: "linkedin" },
  { name: "GitHub", url: "https://github.com", icon: "github" },
  { name: "Twitter", url: "https://twitter.com", icon: "twitter" },
  { name: "Email", url: "mailto:donaerickoulodji@gmail.com", icon: "mail" },
  { name: "WhatsApp", url: "https://wa.me/2290141730240", icon: "phone" },
];

export const NAVIGATION = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Skills", path: "/skills" },
  { name: "Projects", path: "/projects" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" },
];

export const CTA_BUTTON = {
  label: "Start a Project",
  url: "https://wa.me/2290141730240",
};

export const SKILLS = [
  {
    category: "Machine Learning",
    items: ["TensorFlow", "PyTorch", "Scikit-learn", "XGBoost", "Neural Networks"],
  },
  {
    category: "Data Science",
    items: ["Python", "Data Analysis", "Statistical Modeling", "Visualization", "Big Data"],
  },
  {
    category: "AI & NLP",
    items: ["LLMs", "NLP", "Computer Vision", "Groq API", "RAG Systems"],
  },
  {
    category: "Full Stack",
    items: ["React", "Node.js", "SQL", "MongoDB", "API Development"],
  },
];

export const PROJECTS = [
  {
    id: 1,
    title: "AI Chat Assistant",
    description: "Real-time AI-powered chat with advanced NLP capabilities",
    category: "AI",
    tech: ["React", "Groq API", "Python"],
    link: "/projects",
  },
  {
    id: 2,
    title: "ML Model Deployment",
    description: "Production-ready machine learning pipeline",
    category: "ML",
    tech: ["TensorFlow", "Flask", "Docker"],
    link: "/projects",
  },
  {
    id: 3,
    title: "Data Analytics Dashboard",
    description: "Real-time analytics with interactive visualizations",
    category: "Data Science",
    tech: ["React", "D3.js", "Python"],
    link: "/projects",
  },
];

export const SERVICES = [
  {
    id: 1,
    title: "Machine Learning Solutions",
    description: "Custom ML models tailored to your business needs",
    icon: "brain",
  },
  {
    id: 2,
    title: "Data Analysis & Visualization",
    description: "Transform raw data into actionable insights",
    icon: "chart",
  },
  {
    id: 3,
    title: "AI Consulting",
    description: "Strategic guidance for AI/ML implementation",
    icon: "sparkles",
  },
  {
    id: 4,
    title: "Full-Stack Development",
    description: "End-to-end application development",
    icon: "zap",
  },
];

export const STATS = [
  { label: "Projects Delivered", value: "10+" },
  { label: "Client Satisfaction", value: "100%" },
  { label: "Response Time", value: "24h" },
  { label: "Years Experience", value: "5+" },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Client Name",
    role: "CEO / Company",
    text: "Dona Eric delivered exceptional results exceeding our expectations.",
    image: "https://via.placeholder.com/100",
  },
];

export const THEME = {
  colors: {
    primary: "#6366f1",      // Indigo
    secondary: "#8b5cf6",    // Violet
    accent: "#ec4899",       // Pink
    success: "#10b981",      // Emerald
    danger: "#ef4444",       // Red
  },
};
