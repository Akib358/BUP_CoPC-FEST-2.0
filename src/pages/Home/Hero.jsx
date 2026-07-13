import React from 'react';
import Terminal from '../../components/interactive/Terminal';
import Countdown from '../../components/ui/Countdown';
import { Terminal as TerminalIcon, Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero({ setActivePage }) {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center pt-10 pb-12 px-6 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-80" />
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-primary/20 dark:border-accent-cyan/20 bg-primary/5 dark:bg-accent-cyan/5 font-mono text-[10px] tracking-widest text-primary dark:text-accent-cyan uppercase font-bold"
          >
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>BANGLADESH UNIVERSITY OF PROFESSIONALS</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary dark:text-white font-sans leading-none">
            BUP CSE <br />
            {/* Visual Header adjusted to Yellow while preserving the glow properties */}
            <span className="text-accent-gold font-bold font-sans cyber-glow-cyan">
              TECHFEST 2026
            </span>
          </h1>

          <p className="text-base text-primary dark:text-white/80 leading-relaxed font-sans font-medium max-w-md mx-auto lg:mx-0">
            Three tracks. One epic weekend. Compile your ambition and lock your rosters. Registration is now fully active.
          </p>

          <Countdown />

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 font-mono text-xs text-primary dark:text-white/85 font-bold">
            <span className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-primary dark:text-accent-cyan" />
              <span>JULY 11-12, 2026</span>
            </span>
            <span className="hidden sm:inline text-primary/30 dark:text-white/20">|</span>
            <span className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-primary dark:text-accent-cyan" />
              <span>BUP CAMPUS, DHAKA</span>
            </span>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button
              onClick={() => setActivePage('registration')}
              className="w-full sm:w-auto px-8 py-3.5 font-sans text-sm uppercase tracking-wider bg-primary dark:bg-accent-cyan text-white dark:text-bgDark font-bold rounded-sm shadow-lg dark:shadow-glow-cyan/20 hover:scale-[1.02] transition-transform"
            >
              ./register --team=your_squad
            </button>
            <button
              onClick={() => {
                const element = document.getElementById('competitions-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-3.5 font-sans text-sm uppercase tracking-wider border border-primary/30 dark:border-white/20 hover:border-primary dark:hover:border-accent-cyan text-primary dark:text-white bg-transparent rounded-sm hover:bg-primary/5 dark:hover:bg-accent-cyan/5 transition-all font-bold"
            >
              Explore Tracks
            </button>
          </div>
        </div>

        <div className="lg:col-span-6 w-full flex justify-center">
          <Terminal setActivePage={setActivePage} />
        </div>
      </div>
    </section>
  );
}