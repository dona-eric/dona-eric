import React from "react";
import { COMPONENT_CLASSES } from "../../config/styles";

export const Button = ({ 
  variant = "primary", 
  size = "md", 
  children, 
  className = "",
  ...props 
}) => {
  const baseClasses = COMPONENT_CLASSES.buttonBase;
  const variantClasses = {
    primary: COMPONENT_CLASSES.buttonPrimary,
    secondary: COMPONENT_CLASSES.buttonSecondary,
    ghost: COMPONENT_CLASSES.buttonGhost,
  }[variant];

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }[size];

  return (
    <button 
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const Card = ({ children, className = "", ...props }) => {
  return (
    <div className={`${COMPONENT_CLASSES.card} ${className}`} {...props}>
      {children}
    </div>
  );
};

export const Badge = ({ children, variant = "default", className = "" }) => {
  const classes = {
    default: COMPONENT_CLASSES.badge,
    primary: COMPONENT_CLASSES.badgePrimary,
  }[variant];

  return (
    <span className={`${classes} ${className}`}>
      {children}
    </span>
  );
};

export const Section = ({ children, className = "", ...props }) => {
  return (
    <section className={`${COMPONENT_CLASSES.sectionPadding} ${className}`} {...props}>
      <div className={COMPONENT_CLASSES.container}>
        {children}
      </div>
    </section>
  );
};

export const Container = ({ children, className = "", ...props }) => {
  return (
    <div className={`${COMPONENT_CLASSES.container} ${className}`} {...props}>
      {children}
    </div>
  );
};

export const SectionTitle = ({ 
  tag = "Features", 
  title, 
  description,
  className = "" 
}) => {
  return (
    <div className={`text-center mb-12 ${className}`}>
      {tag && <Badge>{tag}</Badge>}
      <h2 className={`mt-4 ${COMPONENT_CLASSES.gradientText}`}>
        {title}
      </h2>
      {description && (
        <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
};
