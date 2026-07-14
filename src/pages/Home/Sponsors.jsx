import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

// আপনার কাস্টমাইজড স্পন্সর লিস্টটি সম্পূর্ণ অক্ষুণ্ন রাখা হয়েছে
const SPONSORS_LIST = [
  { 
    id: 1, 
    name: "BAT Bangladesh", 
    primaryUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/British_American_Tobacco_Logo.svg/512px-British_American_Tobacco_Logo.svg.png",
    localUrl: "/assets/sponsors/bat.png", 
    url: "https://www.batbangladesh.com", 
    role: "TITLE SPONSOR", 
    bg: "bg-white border-accent-cyan", 
    headline: "BAT Bangladesh officially indexes core development blocks."
  },
  { 
    id: 2, 
    name: "bKash", 
    primaryUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/BKash_Logo.svg/512px-BKash_Logo.svg.png",
    localUrl: "/assets/sponsors/bkash.png", 
    url: "https://www.bkash.com", 
    role: "TRANSACTION PARTNER", 
    bg: "bg-[#e2136e] border-accent-cyan", 
    headline: "bKash commits active financial transaction channels."
  },
  { 
    id: 3, 
    name: "Pathao", 
    primaryUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Pathao_Logo.svg/512px-Pathao_Logo.svg.png",
    localUrl: "/assets/sponsors/pathao.png", 
    url: "https://pathao.com", 
    role: "RIDE-SHARING PARTNER", 
    bg: "bg-[#FAF9F6] border-accent-cyan", 
    headline: "Pathao onboarded as official transport coordinate partner."
  },
  { 
    id: 4, 
    name: "Brain Station 23", 
    primaryUrl: "https://raw.githubusercontent.com/mdmunna3/MD-MUNNA/main/brainstation23.png",
    localUrl: "/assets/sponsors/brainstation.png", 
    url: "https://www.brainstation-23.com", 
    role: "TECH RECRUITMENT PARTNER", 
    bg: "bg-[#0f172a] border-accent-cyan", 
    headline: "Brain Station 23 scheduled for active student recruitment sweeps."
  },
  { 
    id: 5, 
    name: "Therap BD", 
    primaryUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Therap_Services_Logo.svg/512px-Therap_Services_Logo.svg.png",
    localUrl: "/assets/sponsors/therap.png", 
    url: "https://www.therapbd.com", 
    role: "PLATINUM SPONSOR", 
    bg: "bg-slate-900 border-accent-cyan", 
    headline: "Therap BD commits active technical mentoring channels."
  },
  { 
    id: 6, 
    name: "Skitto", 
    primaryUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Skitto_Logo.svg/512px-Skitto_Logo.svg.png", // Corrected dynamic fallback
    localUrl: "/assets/sponsors/skitto.png", 
    url: "https://www.skitto.com/", 
    role: "COMMUNICATION PARTNER", 
    bg: "bg-[#FFE135] border-accent-cyan", 
    headline: "Skitto ensure the connectivity overall in country"
  },
  { 
    id: 7, 
    name: "SELISE", 
    primaryUrl: "https://selise.ch/wp-content/uploads/2021/01/selise_logo_black.png",
    localUrl: "/assets/sponsors/selise.png", 
    url: "https://selise.ch", 
    role: "GLOBAL SOFTWARE PARTNER", 
    bg: "bg-[#6D8994] border-accent-cyan", 
    headline: "SELISE deploying agile prototype testing environments."
  }
];

export default function Sponsors() {
  const [typingText, setTypingText] = useState("");
  const [showTicker, setShowTicker] = useState(false);
  const [headlineIndex, setHeadlineIndex] = useState(0);

  const titleSponsor = SPONSORS_LIST[0]; 
  const coSponsors = SPONSORS_LIST.slice(1); 

  useEffect(() => {
    const phrase = "Our Title Sponsor: ";
    let idx = 0;
    const typingTimer = setInterval(() => {
      if (idx < phrase.length) {
        setTypingText(phrase.slice(0, idx + 1));
        idx++;
      } else {
        clearInterval(typingTimer);
        setTimeout(() => {
          setShowTicker(true);
        }, 1500);
      }
    }, 70);

    return () => clearInterval(typingTimer);
  }, []);

  useEffect(() => {
    if (!showTicker) return;

    const timer = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % SPONSORS_LIST.length);
    }, 4000); 

    return () => clearInterval(timer);
  }, [showTicker]);

  return (
    <section className="py-20 px-6 bg-primary/5 dark:bg-bgDark-card/10 border-b border-bgLight-border dark:border-bgDark-border relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-50" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <div className="inline-flex p-1.5 rounded-full border border-primary/10 dark:border-accent-cyan/25 text-primary dark:text-accent-cyan font-mono text-[9px] tracking-widest font-bold uppercase bg-bgLight dark:bg-bgDark">
            [ LOCK SPONSORSHIP CODES ]
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-primary dark:text-white">
            FESTIVAL PATRONS
          </h2>
          <p className="text-base sm:text-lg font-sans font-semibold text-stone-100 dark:text-stone-100 leading-relaxed max-w-xl mx-auto">
            Strategic technical partners supporting technical breakthroughs.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 1. SINGLE PROMINENT TITLE SPONSOR (BAT) ON TOP */}
        {/* ========================================================================= */}
        <div className="flex justify-center">
          <motion.a
            href={titleSponsor.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0.98, opacity: 0.9 }}
            whileHover={{ scale: 1.03, opacity: 1 }}
            className={`relative w-full max-w-md aspect-[16/7] rounded border-2 ${titleSponsor.bg} shadow-2xl flex items-center justify-center p-6 group cursor-pointer transition-all duration-300`}
          >
            <div className="absolute top-2.5 left-3 font-mono text-[9px] text-[#092763] font-extrabold tracking-widest">
              [ TITLE SPONSOR ]
            </div>

            {/* Official High-Resolution BAT Logo centered - standardized to h-20 */}
            <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-[280px]">
              <img 
                src={titleSponsor.primaryUrl} 
                alt={titleSponsor.name}
                onError={(e) => {
                  e.target.src = titleSponsor.localUrl;
                }}
                className="h-20 object-contain select-none" 
              />
            </div>
          </motion.a>
        </div>

        {/* ========================================================================= */}
        {/* 2. CO-SPONSORS GRID (Sponsors Styled as solid brand theme cards) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {coSponsors.map((co, idx) => {
            return (
              <motion.a
                key={co.id}
                href={co.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0.9, scale: 0.98 }}
                whileHover={{ opacity: 1, scale: 1.02 }}
                className={`relative p-5 rounded border-2 overflow-hidden flex items-center justify-center group cursor-pointer transition-all duration-300 shadow-md ${co.bg}`}
              >
                {/* White brand container block centered on color card */}
                <div className="w-full max-w-[170px] h-12 rounded bg-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform border border-black/5 p-2">
                  <img 
                    src={co.primaryUrl} 
                    alt={co.name}
                    onError={(e) => {
                      e.target.src = co.localUrl;
                    }}
                    className="h-12 object-contain select-none" 
                  />
                </div>

                <div className="absolute top-1.5 right-2 font-mono text-[7px] opacity-35 font-extrabold select-none">
                  COORD_0{idx + 1}
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* 3. METADATA STATUS BOX: PURE WHITE VERTICAL SLIDING TICKER */}
        {/* ========================================================================= */}
        <div className="max-w-2xl mx-auto">
          <div className="py-2 px-5 rounded-md border border-[#0d2d6c] bg-white font-mono text-[11px] flex items-center justify-center text-primary shadow-xl min-h-[64px] relative overflow-hidden">
            <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

            <div className="relative w-full h-12 overflow-hidden z-10 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {!showTicker ? (
                  /* STEP 1: Typewriter prompt on entrance */
                  <motion.div
                    key="typing-state"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center space-x-3 text-primary font-bold tracking-wider"
                  >
                    <span className="animate-pulse">&gt;</span>
                    <span>{typingText}</span>
                  </motion.div>
                ) : (
                  /* STEP 2: Automated vertical slide loop with inline official HQ logos */
                  <motion.div
                    key={`headline-${headlineIndex}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center space-x-4"
                  >
                    {/* Left Side Logo Icon inside the ticker - stretched properly to h-12 */}
                    <div className="px-3 rounded bg-white shrink-0 border border-primary/20 flex items-center justify-center min-w-[100px] h-12 shadow-sm">
                      <img 
                        src={SPONSORS_LIST[headlineIndex].primaryUrl} 
                        alt={SPONSORS_LIST[headlineIndex].name}
                        onError={(e) => {
                          e.target.src = SPONSORS_LIST[headlineIndex].localUrl;
                        }}
                        className="h-9 object-contain select-none" 
                      />
                    </div>

                    {/* Dynamic Headline Text */}
                    <span className="text-[#092763] font-bold text-xs leading-relaxed truncate">
                      {SPONSORS_LIST[headlineIndex].headline}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}