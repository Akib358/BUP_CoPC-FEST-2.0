import React from 'react';
import { motion } from 'framer-motion';
import { Plus, ShieldAlert } from 'lucide-react';

export default function Sponsors() {
  return (
    <section className="py-20 px-6 bg-primary/5 dark:bg-bgDark-card/10 border-b border-bgLight-border dark:border-bgDark-border relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-50" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <div className="inline-flex p-1.5 rounded-full border border-primary/10 dark:border-accent-cyan/25 text-primary dark:text-accent-cyan font-mono text-[9px] tracking-widest font-bold uppercase bg-bgLight dark:bg-bgDark">
            [ LOCK SPONSORSHIP CODES ]
          </div>
          <h2 className="text-3xl font-bold text-primary dark:text-white">
            FESTIVAL PATRONS
          </h2>
          {/* Prominent high-contrast creamy white description */}
          <p className="text-base sm:text-lg font-sans font-semibold text-stone-100 dark:text-stone-100 leading-relaxed max-w-xl mx-auto">
            Strategic technical partners supporting technical breakthroughs.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((slot) => (
            <motion.div
              key={slot}
              initial={{ opacity: 0.8, scale: 0.98 }}
              whileHover={{ opacity: 1, scale: 1.02 }}
              className="relative aspect-video rounded border border-dashed border-primary/20 dark:border-accent-cyan/20 bg-bgLight-card/30 dark:bg-bgDark-card/30 backdrop-blur-sm overflow-hidden flex flex-col items-center justify-center p-6 group cursor-pointer transition-all duration-300"
            >
              <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-primary/40 dark:border-accent-cyan/40" />
              <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-primary/40 dark:border-accent-cyan/40" />
              <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-primary/40 dark:border-accent-cyan/40" />
              <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-primary/40 dark:border-accent-cyan/40" />

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
                <div className="w-full h-[1px] bg-primary dark:bg-accent-cyan" />
                <div className="absolute w-[1px] h-full bg-primary dark:bg-accent-cyan" />
              </div>

              <div className="relative z-10 flex flex-col items-center space-y-2 text-center font-mono">
                <div className="p-2 bg-primary/5 dark:bg-accent-cyan/5 rounded border border-primary/10 dark:border-accent-cyan/10 text-primary/40 dark:text-accent-cyan/50 group-hover:scale-110 transition-transform duration-300">
                  <Plus className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] text-primary/60 dark:text-white/60 font-bold uppercase tracking-wider">
                    RESERVED_SLOT_{slot}
                  </p>
                  <p className="text-[8px] text-primary/40 dark:text-white/30 uppercase tracking-widest">
                    AWAITING_PARTNER_LOG_SWEEP
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="p-4 rounded-md border border-primary/15 dark:border-bgDark-border bg-primary/5 dark:bg-bgDark-card/30 font-mono text-[10px] max-w-lg mx-auto flex items-center justify-between gap-4 text-primary/75 dark:text-white/60 leading-relaxed">
          <span className="flex items-center space-x-1.5 text-accent-cyan shrink-0 font-bold">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>METADATA_STATUS:</span>
          </span>
          <p className="text-right">
            Sponsorship modules are active. Connect with organizing grids to index custom logo channels into active portal loops.
          </p>
        </div>

      </div>
    </section>
  );
}