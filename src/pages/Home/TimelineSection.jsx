import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Compass, Trophy, Shield, Code, Cpu, Flag, Wind } from 'lucide-react';

const MILESTONES = [
  /* Adjusted threshold parameters to map fully within 60% of the screen scroll progress */
  { id: 1, title: "Quest Initiation", subtitle: "Registration Opens", date: "June 01, 2026", desc: "Unlock the gate. Lock your team registration parameters.", icon: Compass, threshold: 0.08, cx: 180, cy: 90 },
  { id: 2, title: "Gate Cutoff", subtitle: "Registration Closes", date: "June 30, 2026", desc: "The gate closes. Final roster sweeps and payment checks lock.", icon: Shield, threshold: 0.15, cx: 480, cy: 150 },
  { id: 3, title: "Algorithm Arena", subtitle: "IUPC Contest", date: "July 11, 09:00 AM", desc: "Solve complex algorithms in a fast 5-hour competitive coding bracket.", icon: Code, threshold: 0.22, cx: 800, cy: 230 },
  { id: 4, title: "Cyber Citadel", subtitle: "CTF Challenge", date: "July 11, 11:00 AM", desc: "Breach networks, decrypt strings, and capture hidden flags.", icon: Shield, threshold: 0.30, cx: 780, cy: 420 },
  { id: 5, title: "Prototype Peak", subtitle: "Hackathon Launch", date: "July 11, 12:00 PM", desc: "Pitch, build, and deploy technical systems in 24 hours.", icon: Cpu, threshold: 0.38, cx: 450, cy: 530 },
  { id: 6, title: "Jury Confrontation", subtitle: "Final Evaluations", date: "July 12, 11:30 AM", desc: "Pitch your completed systems before active industry juries.", icon: Trophy, threshold: 0.46, cx: 160, cy: 650 },
  { id: 7, title: "Prize Giving Ceremony", subtitle: "Crown Assembly", date: "July 12, 03:30 PM", desc: "Crowning of tech champions and prize bank distributions.", icon: Trophy, threshold: 0.54, cx: 320, cy: 780 },
  { id: 8, title: "Event Horizon", subtitle: "TechFest End", date: "July 12, 06:00 PM", desc: "All channels exit successfully. Compile process finished.", icon: Flag, threshold: 0.60, cx: 750, cy: 880 }
];

export default function TimelineSection() {
  const containerRef = useRef(null);
  const [scrollRatio, setScrollRatio] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  useEffect(() => {
    return smoothProgress.onChange((v) => {
      setScrollRatio(v);
    });
  }, [smoothProgress]);

  // The path finishes drawing fully (reaches 1) as soon as scrollProgress reaches 60% (0.60)
  const pathLength = useTransform(smoothProgress, [0.05, 0.60], [0, 1]);

  return (
    <section 
      ref={containerRef} 
      className="py-24 px-6 bg-bgLight dark:bg-[#020b1e] border-y border-primary/20 dark:border-bgDark-border relative overflow-hidden"
    >
      <div className="absolute inset-0 cyber-grid opacity-60" />
      <div className="absolute inset-0 cyber-dots opacity-20" />

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <div className="inline-flex p-1.5 rounded-full border border-primary/10 dark:border-accent-cyan/25 text-primary dark:text-accent-cyan font-mono text-[9px] tracking-widest font-bold uppercase bg-bgLight dark:bg-bgDark">
            [ SECURE MAP PROTOCOLS ]
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-primary dark:text-white">
            TREASURE QUEST TIMELINE
          </h2>
          <p className="text-sm font-mono text-primary dark:text-white/70 leading-relaxed font-bold">
            Trace the winding vector path. Scroll down to draw your journey from registration kickoff to final prize redemption.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP COMPRESSED MAP (950px height) */}
        {/* ========================================================================= */}
        <div className="hidden md:block relative w-full h-[950px] rounded-lg border border-primary/20 dark:border-bgDark-border bg-white dark:bg-[#051638]/40 backdrop-blur-sm overflow-hidden shadow-2xl">
          
          <motion.div 
            animate={{ x: [-200, 1200] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="absolute top-24 opacity-35 select-none pointer-events-none text-primary/30 dark:text-accent-cyan/35"
          >
            <Wind className="w-16 h-16" />
          </motion.div>

          <div className="absolute top-8 right-8 p-4 border border-dashed border-primary/25 dark:border-accent-cyan/30 rounded-full animate-[spin_50s_linear_infinite] opacity-60">
            <Compass className="w-12 h-12 text-primary dark:text-accent-cyan" />
          </div>

          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <path
              d="M 180 90 Q 330 120 480 150 T 800 230 T 780 420 T 450 530 T 160 650 T 320 780 T 750 880"
              fill="none"
              stroke="rgba(9, 39, 99, 0.1)"
              className="dark:stroke-[#0d2d6c]/40"
              strokeWidth="4"
              strokeDasharray="8,8"
            />
            <motion.path
              d="M 180 90 Q 330 120 480 150 T 800 230 T 780 420 T 450 530 T 160 650 T 320 780 T 750 880"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="4"
              strokeDasharray="10,10"
              style={{ pathLength }}
            />
          </svg>

          {MILESTONES.map((stone) => {
            const Icon = stone.icon;
            const isPassed = scrollRatio >= stone.threshold;
            const isFinal = stone.id === 8;

            return (
              <div 
                key={stone.id} 
                style={{ 
                  left: `${stone.cx}px`, 
                  top: `${stone.cy}px`, 
                  transform: 'translate(-50%, -50%)' 
                }}
                className="absolute z-20 group"
              >
                <div className="relative cursor-pointer">
                  {isFinal ? (
                    <motion.div 
                      animate={{ 
                        rotateY: [0, 15, -15, 0],
                        skewY: [0, 4, -4, 0]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className={`relative flex items-center justify-center p-3.5 rounded-full border bg-bgDark border-accent-rose text-accent-rose ${
                        isPassed ? 'shadow-[0_0_25px_rgba(244,63,94,0.5)]' : 'opacity-75'
                      } group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Flag className="w-8 h-8" />
                      <span className="absolute inset-0 rounded-full border border-accent-rose animate-ping opacity-40" />
                    </motion.div>
                  ) : (
                    <div className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isPassed 
                        ? 'bg-primary dark:bg-accent-cyan border-[#fbbf24] text-[#fbbf24] dark:text-bgDark shadow-glow-cyan/50 scale-105' 
                        : 'bg-bgLight-card dark:bg-[#051638] border-primary/20 dark:border-white/10 text-primary/50 dark:text-white/40'
                    } group-hover:scale-110`}>
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                  )}

                  {/* compressed informational cards */}
                  <div className={`absolute bottom-14 left-1/2 -translate-x-1/2 w-56 p-3.5 rounded border bg-white dark:bg-[#051638] ${
                    isPassed 
                      ? 'border-[#fbbf24] dark:border-accent-cyan shadow-xl' 
                      : 'border-primary/10 dark:border-white/5 opacity-0 group-hover:opacity-100'
                  } transition-all duration-300 pointer-events-none group-hover:opacity-100 group-hover:translate-y-[-5px]`}>
                    
                    <div className="font-mono text-[9px] uppercase font-bold text-accent-gold dark:text-accent-cyan mb-1 flex justify-between">
                      <span>COORD_0{stone.id}</span>
                      <span>{stone.date}</span>
                    </div>
                    <h4 className="font-sans font-bold text-xs text-primary dark:text-white mb-0.5">
                      {stone.title}
                    </h4>
                    <p className="font-sans text-[10px] text-accent-gold dark:text-accent-cyan font-bold uppercase mb-1">
                      {stone.subtitle}
                    </p>
                    <p className="font-mono text-[10px] text-primary/80 dark:text-white/60 leading-relaxed">
                      {stone.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* MOBILE VIEWPORT */}
        {/* ========================================================================= */}
        <div className="md:hidden relative border-l-2 border-dashed border-[#fbbf24]/50 ml-4 pl-8 space-y-12">
          <div className="absolute left-[-2px] top-0 bottom-0 w-[2px] bg-primary/10 dark:bg-accent-cyan/10 pointer-events-none" />

          {MILESTONES.map((stone) => {
            const Icon = stone.icon;
            const isFinal = stone.id === 8;

            return (
              <div key={stone.id} className="relative group">
                <div className="absolute left-[-42px] top-1.5 z-10">
                  {isFinal ? (
                    <div className="w-10 h-10 rounded-full border border-accent-rose bg-bgDark text-accent-rose flex items-center justify-center shadow-lg">
                      <Flag className="w-5 h-5 animate-bounce" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full border border-[#fbbf24] bg-primary dark:bg-accent-cyan text-[#fbbf24] dark:text-bgDark flex items-center justify-center shadow-md">
                      <Icon className="w-4 h-4" />
                    </div>
                  )}
                </div>

                <div className="p-5 rounded border border-[#fbbf24]/30 bg-primary/5 dark:bg-[#051638]/60 backdrop-blur-sm space-y-3">
                  <div className="font-mono text-[9px] uppercase tracking-wider font-bold text-accent-gold dark:text-accent-cyan flex justify-between items-center">
                    <span>INDEX_COORD_0{stone.id}</span>
                    <span>{stone.date}</span>
                  </div>

                  <div className="space-y-0.5">
                    <h3 className="font-sans font-bold text-base text-primary dark:text-white">
                      {stone.title}
                    </h3>
                    <p className="font-sans text-[11px] font-bold text-accent-gold dark:text-accent-cyan uppercase">
                      {stone.subtitle}
                    </p>
                  </div>

                  <p className="font-mono text-xs text-primary/80 dark:text-white/65 leading-relaxed">
                    {stone.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}