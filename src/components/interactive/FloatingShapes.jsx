import React from 'react';
import { motion } from 'framer-motion';

export default function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Code bracket symbol ornament left */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-[8%] font-mono text-4xl text-primary/10 dark:text-accent-cyan/10 hidden md:block"
      >
        {"{/*"}
      </motion.div>

      {/* Binary terminal code node right */}
      <motion.div
        animate={{
          y: [0, 25, 0],
          rotate: [0, -15, 0]
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/3 right-[10%] font-mono text-3xl text-primary/10 dark:text-accent-cyan/10 hidden md:block"
      >
        {"1010"}
      </motion.div>

      {/* Abstract Grid Crosses */}
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/4 left-1/3 w-3 h-3 border border-primary/20 dark:border-accent-cyan/25 rounded-sm hidden lg:block"
      />
    </div>
  );
}