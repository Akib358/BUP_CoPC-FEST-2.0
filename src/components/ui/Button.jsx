import React from 'react';
import { motion } from 'framer-motion';

export default function Button({ 
  children, 
  onClick, 
  type = "button", 
  variant = "primary", 
  className = "" 
}) {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-primary dark:bg-accent-cyan text-white dark:text-bgDark border-primary dark:border-accent-cyan shadow-glow-primary dark:shadow-glow-cyan hover:bg-transparent dark:hover:bg-transparent hover:text-primary dark:hover:text-accent-cyan";
      case "secondary":
        return "bg-transparent text-primary dark:text-white border-primary/20 dark:border-white/20 hover:border-primary dark:hover:border-accent-cyan hover:bg-primary/5 dark:hover:bg-accent-cyan/10";
      case "accent":
        return "bg-accent-gold text-bgDark border-accent-gold shadow-glow-gold hover:bg-transparent hover:text-accent-gold";
      default:
        return "";
    }
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative px-6 py-3 font-mono text-xs uppercase tracking-widest border font-bold rounded-sm transition-all duration-300 focus:outline-none ${getVariantStyles()} ${className}`}
    >
      <span className="relative z-10 flex items-center justify-center space-x-2">
        {children}
      </span>
    </motion.button>
  );
}