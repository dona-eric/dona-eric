// Unified Style Configuration
export const STYLES = {
  // Spacing
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "2.5rem",
    "3xl": "3rem",
  },

  // Borders
  border: {
    radius: {
      sm: "0.375rem",
      md: "0.75rem",
      lg: "1rem",
      xl: "1.5rem",
      full: "9999px",
    },
    width: {
      thin: "1px",
      base: "2px",
      thick: "4px",
    },
  },

  // Typography
  typography: {
    h1: "text-4xl lg:text-5xl font-bold",
    h2: "text-3xl lg:text-4xl font-bold",
    h3: "text-2xl lg:text-3xl font-semibold",
    h4: "text-xl lg:text-2xl font-semibold",
    body: "text-base font-normal",
    caption: "text-sm font-normal",
  },

  // Shadows
  shadow: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },

  // Transitions
  transition: {
    fast: "all 150ms ease-in-out",
    base: "all 200ms ease-in-out",
    slow: "all 300ms ease-in-out",
  },
};

// Reusable class combinations
export const COMPONENT_CLASSES = {
  // Containers
  container: "max-w-6xl mx-auto px-6 sm:px-8 lg:px-12",
  sectionPadding: "py-20 sm:py-28 lg:py-32",
  
  // Cards
  card: "bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 sm:p-8 lg:p-10 hover:bg-white/10 transition-all duration-300 hover:border-white/20",
  cardSm: "p-5 sm:p-6",
  cardMd: "p-6 sm:p-8",
  cardLg: "p-8 sm:p-12 lg:p-16",

  // Buttons
  buttonBase: "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 px-6 py-3",
  buttonPrimary: "bg-white text-black hover:bg-gray-100 hover:shadow-lg hover:shadow-white/20 font-semibold",
  buttonSecondary: "bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:border-white/40",
  buttonGhost: "text-white hover:bg-white/10 hover:text-white",

  // Links
  linkBase: "text-white hover:text-gray-300 transition-colors duration-300 underline-offset-2 hover:underline",

  // Badges
  badge: "px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-medium text-white/80",
  badgePrimary: "px-3 py-1 bg-white text-black rounded-full text-xs font-semibold",

  // Gradients
  gradientText: "bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent",
  gradientBg: "bg-gradient-to-br from-white/5 to-white/0",
};
