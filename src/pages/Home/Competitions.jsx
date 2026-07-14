import React from 'react';
import Card3D from '../../components/ui/Card3D';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Custom Tech Vector Icons
const IupcIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
    <line x1="14" y1="4" x2="10" y2="20" />
  </svg>
);

const HackathonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <polyline points="7 9 10 12 7 15" />
    <line x1="12" y1="15" x2="16" y2="15" />
  </svg>
);

const CtfIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7s0 6 8 10z" />
    <rect x="9" y="11" width="6" height="5" rx="1" />
    <path d="M10.5 11V9a1.5 1.5 0 0 1 3 0v2" />
  </svg>
);

const TRACKS = [
  {
    id: 'iupc',
    icon: IupcIcon, // custom code icon
    title: 'IUPC',
    subtitle: 'Programming Contest',
    desc: 'Solve real-world algorithms in a fast-paced 5-hour competitive coding bracket. Battle for a share of 250K BDT prize pool.',
    tag: 'ACM RULES'
  },
  {
    id: 'hackathon',
    icon: HackathonIcon, // custom terminal console icon
    title: 'Hackathon',
    subtitle: 'Innovation Sprint',
    desc: 'Pitch, build, and deploy technical systems in a 24-hour innovation challenge covering Web, App, AI & hardware projects.',
    tag: '24-HOUR SPRINT'
  },
  {
    id: 'ctf',
    icon: CtfIcon, // custom encrypted shield icon
    title: 'CTF Contest',
    subtitle: 'Capture the Flag',
    desc: 'A Jeopardy-style cybersecurity challenge. Exploit web-apps, perform digital forensics, and decrypt flags on system files.',
    tag: 'CYBER SECURITY'
  },
];

export default function Competitions({ setActivePage }) {
  return (
    <section id="competitions-section" className="py-20 px-6 bg-primary/5 dark:bg-bgDark-card/25 border-y border-bgLight-border dark:border-bgDark-border relative">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Dynamic news ticking headline banner */}
        <div className="w-full max-w-2xl mx-auto overflow-hidden bg-primary dark:bg-[#051638]/90 border border-accent-cyan/25 dark:border-bgDark-border py-2.5 px-4 rounded-md flex items-center space-x-3 shadow-lg font-mono text-xs text-white">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-accent-gold text-bgDark font-bold shrink-0 animate-pulse">
            [LIVE]
          </span>
          <div className="relative w-full overflow-hidden h-4">
            <div className="absolute whitespace-nowrap animate-scroll-left font-bold text-stone-100">
              ROSTER VERIFICATION UNDERWAY FOR IUPC 2026 // CODE SANDBOX JUDGING NETWORKS DETECTED: ACTIVE // HACKATHON SPRINTS BOOT IN 48 HOURS // SECURE FLAGS INDEXED FOR CTF CITADEL...
            </div>
          </div>
        </div>

        <div className="text-center space-y-4 max-w-xl mx-auto">
          <div className="inline-flex p-1.5 rounded-full border border-primary/10 dark:border-accent-cyan/25 text-primary dark:text-accent-cyan font-mono text-[9px] tracking-widest font-bold uppercase bg-bgLight dark:bg-bgDark">
            [ SELECT TRACK ]
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary dark:text-white">
            COMPETITION CHAMPIONSHIPS
          </h2>
          <p className="text-sm font-mono text-primary/70 dark:text-white/60 leading-relaxed font-bold">
            Choose your challenge vertical, analyze the ruleboards, and lock your team parameters now.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TRACKS.map((track, idx) => {
            const Icon = track.icon;
            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
              >
                <Card3D className="h-full flex flex-col justify-between">
                  <div className="p-8 space-y-6 flex-1">
                    <div className="flex justify-between items-start">
                      <div className="p-3.5 bg-primary/5 dark:bg-accent-cyan/10 border border-primary/10 dark:border-accent-cyan/20 text-accent-cyan rounded-md">
                        <Icon />
                      </div>
                      <span className="font-mono text-[10px] tracking-wider uppercase border border-bgLight-border dark:border-bgDark-border px-2 py-1 bg-bgLight dark:bg-bgDark text-primary/60 dark:text-white/50 rounded-sm">
                        {track.tag}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-sans font-bold text-2xl text-primary dark:text-white flex items-center gap-2">
                        {track.title}
                      </h3>
                      <p className="font-mono text-xs text-accent-cyan uppercase tracking-wider">
                        {track.subtitle}
                      </p>
                    </div>

                    <p className="text-xs text-primary/70 dark:text-white/65 leading-relaxed">
                      {track.desc}
                    </p>
                  </div>

                  <div className="px-8 pb-8 pt-4 border-t border-bgLight-border/50 dark:border-bgDark-border/50 bg-primary/5 dark:bg-bgDark-card/50 flex flex-col gap-3">
                    <button
                      onClick={() => setActivePage(track.id)}
                      className="w-full py-2.5 rounded border border-primary/20 dark:border-white/10 hover:border-accent-cyan text-primary/80 dark:text-white/70 hover:text-accent-cyan font-mono text-xs uppercase tracking-wider transition-colors bg-transparent flex items-center justify-center gap-1.5"
                    >
                      View Guidelines <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setActivePage('registration')}
                      className="w-full py-2.5 rounded bg-primary dark:bg-accent-cyan hover:bg-primary-light dark:hover:bg-[#00c6ff] text-white dark:text-bgDark font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-md"
                    >
                      REGISTER TEAM
                    </button>
                  </div>
                </Card3D>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}