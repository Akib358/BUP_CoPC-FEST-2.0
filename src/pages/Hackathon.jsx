import React from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import { Terminal, Lightbulb, Hourglass, Award, CheckCircle } from 'lucide-react';

const SPEC_LIST = [
  { icon: Lightbulb, label: 'TRACK SECTOR', value: 'Software, IoT & Hardware, AI' },
  { icon: Hourglass, label: 'DURATION CODE', value: '24 Hours non-stop sprint' },
  { icon: Award, label: 'PRIZES POOL', value: '100K BDT cash' },
];

const GUIDELINES = [
  "Roster squads can have between 1 to 3 active undergraduate university players.",
  "Teams must choose a challenge theme (Software, IoT/Hardware integration, or AI modeling) on sprint kickoff.",
  "Working prototypes must be fully coded and deployed during the locked 24-hour bracket.",
  "Sourcing pre-built layouts or plagiarism leads to direct deletion sweeps.",
  "Jury reviews working builds, system schemas, and technical pitch boards on Day 2 final sweeps."
];

export default function Hackathon({ setActivePage }) {
  return (
    <PageWrapper>
      <div className="absolute inset-0 cyber-grid opacity-40 pointer-events-none" />
      <div className="max-w-4xl mx-auto px-6 space-y-12 relative z-10">
        
        {/* Heading */}
        <div className="space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-accent-cyan font-bold block">
            ./hackathon_guidelines.md
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-sans text-primary dark:text-white">
            24-HOUR INNOVATION HACKATHON
          </h1>
          <p className="text-sm font-mono text-primary/70 dark:text-white/60 leading-relaxed max-w-xl">
            Design, construct, and deploy practical technical systems in a non-stop 24-hour engineering bracket. Show your coding grit.
          </p>
        </div>

        {/* Spec blocks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono">
          {SPEC_LIST.map((spec, idx) => {
            const Icon = spec.icon;
            return (
              <div key={idx} className="p-5 border border-bgLight-border dark:border-bgDark-border bg-bgLight-card dark:bg-bgDark-card/50 rounded-sm flex items-center space-x-4">
                <div className="p-2.5 bg-primary/5 dark:bg-accent-cyan/10 border border-primary/10 dark:border-accent-cyan/20 text-accent-cyan rounded">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[9px] text-primary/40 dark:text-white/40 font-bold uppercase tracking-widest">{spec.label}</p>
                  <p className="text-xs text-primary dark:text-white font-bold">{spec.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Technical Guidelines container */}
        <div className="p-8 border border-bgLight-border dark:border-bgDark-border bg-bgLight-card dark:bg-bgDark-card/50 rounded-sm space-y-6">
          <div className="flex items-center space-x-2 text-primary dark:text-white font-mono font-bold text-sm">
            <Terminal className="w-4 h-4 text-accent-cyan" />
            <span>OPERATIONAL_SPECIFICATION_CODES:</span>
          </div>

          <ul className="space-y-4 font-mono text-xs text-primary/70 dark:text-white/60">
            {GUIDELINES.map((guide, idx) => (
              <li key={idx} className="flex items-start space-x-3 leading-relaxed">
                <CheckCircle className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
                <span>{guide}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => setActivePage('registration')}
            className="w-full sm:w-auto px-8 py-4 font-mono text-xs uppercase tracking-widest bg-primary dark:bg-accent-cyan text-white dark:text-bgDark font-bold rounded-sm shadow-md"
          >
            PROCEED REGISTRATION FLOW
          </button>
          <button
            onClick={() => setActivePage('home')}
            className="w-full sm:w-auto px-8 py-4 font-mono text-xs uppercase tracking-widest border border-primary/20 dark:border-white/20 hover:border-primary dark:hover:border-accent-cyan text-primary dark:text-white bg-transparent rounded-sm hover:bg-primary/5 dark:hover:bg-accent-cyan/5 transition-all"
          >
            RETURN HOME
          </button>
        </div>

      </div>
    </PageWrapper>
  );
}