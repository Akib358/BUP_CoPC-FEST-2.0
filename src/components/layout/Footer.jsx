import React from 'react';
import { Terminal, ShieldCheck, Cpu, GitCommit } from 'lucide-react';

export default function Footer({ setActivePage }) {
  const handlePageClick = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-bgLight-border dark:border-bgDark-border bg-bgLight/60 dark:bg-bgDark/40 backdrop-blur-sm py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1: Info and Metadata */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Terminal className="w-5 h-5 text-accent-cyan" />
            <span className="font-mono font-bold tracking-wider text-primary dark:text-white">
              BUP<span className="text-accent-cyan">.TECHFEST</span>
            </span>
          </div>
          <p className="text-sm text-primary/70 dark:text-white/60 leading-relaxed max-w-xs">
            Compile your ambition. Join Bangladesh University of Professionals' flagship technical carnival of national standards.
          </p>
        </div>

        {/* Column 2: Quick Direct coordinates */}
        <div className="space-y-3 font-mono">
          <h4 className="text-xs uppercase tracking-widest text-primary dark:text-accent-cyan font-bold">Directories</h4>
          <ul className="space-y-2 text-xs">
            {['home', 'iupc', 'hackathon', 'ctf'].map((coord) => (
              <li key={coord}>
                <button 
                  onClick={() => handlePageClick(coord)}
                  className="text-primary/70 dark:text-white/60 hover:text-accent-cyan dark:hover:text-accent-cyan transition-colors capitalize"
                >
                  ./{coord}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Event Tracks */}
        <div className="space-y-3 font-mono">
          <h4 className="text-xs uppercase tracking-widest text-primary dark:text-accent-cyan font-bold">Tracks</h4>
          <ul className="space-y-2 text-xs text-primary/70 dark:text-white/60">
            <li>Inter-University Programming Contest</li>
            <li>24-Hour Innovation Hackathon</li>
            <li>Jeopardy Style Capture The Flag</li>
          </ul>
        </div>

        {/* Column 4: Host Status Logs */}
        <div className="p-4 rounded-md border border-bgLight-border dark:border-bgDark-border bg-bgLight-card dark:bg-bgDark-card/50 font-mono text-[11px] space-y-2">
          <div className="flex items-center justify-between text-accent-cyan">
            <span className="flex items-center space-x-1.5">
              <Cpu className="w-3.5 h-3.5" />
              <span>CORE STATUS:</span>
            </span>
            <span className="px-1.5 py-0.5 rounded bg-accent-cyan/10 font-bold">LIVE</span>
          </div>
          <div className="text-primary/60 dark:text-white/50 space-y-1">
            <div className="flex justify-between">
              <span>LATENCY:</span>
              <span>12ms</span>
            </div>
            <div className="flex justify-between">
              <span>HOST_PORT:</span>
              <span>8080</span>
            </div>
            <div className="flex justify-between">
              <span>COMMIT:</span>
              <span className="flex items-center text-accent-cyan/80"><GitCommit className="w-3 h-3" /> bup2026</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-bgLight-border dark:border-bgDark-border flex flex-col md:flex-row items-center justify-between text-xs text-primary/50 dark:text-white/40 font-mono">
        <span>© {new Date().getFullYear()} BUP CSE Department. All Rights Reserved.</span>
        <span className="flex items-center space-x-1.5 mt-4 md:mt-0">
          <ShieldCheck className="w-3.5 h-3.5 text-accent-cyan" />
          <span>PORTAL SECURED</span>
        </span>
      </div>
    </footer>
  );
}