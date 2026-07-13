import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Accordion({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border border-bgLight-border dark:border-bgDark-border rounded-md bg-bgLight-card dark:bg-bgDark-card overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between text-left font-mono text-xs uppercase tracking-wider text-primary dark:text-white font-bold hover:bg-primary/5 dark:hover:bg-accent-cyan/5 transition-colors"
      >
        <span>{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-accent-cyan"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="px-6 pb-5 pt-1 text-sm text-primary/70 dark:text-white/60 leading-relaxed border-t border-bgLight-border/50 dark:border-bgDark-border/50">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}