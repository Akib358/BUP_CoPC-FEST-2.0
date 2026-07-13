import React, { useMemo } from 'react';
import Hero from './Hero';
import Competitions from './Competitions';
import Statistics from './Statistics';
import TimelineSection from './TimelineSection';
import Sponsors from './Sponsors';
import Gallery from './Gallery';
import FAQSection from './FAQSection';
import PageWrapper from '../../components/layout/PageWrapper';
import NetworkGraph from '../../components/interactive/NetworkGraph';
import FloatingShapes from '../../components/interactive/FloatingShapes';
import { Users, ShieldAlert } from 'lucide-react';

export default function Home({ setActivePage, triggerRegistration, registrations }) {
  // Extract and format the latest live sign-ups for the Activity Dashboard
  const liveRosterActivity = useMemo(() => {
    return [...registrations].reverse().slice(0, 4);
  }, [registrations]);

  return (
    <PageWrapper>
      <NetworkGraph />
      <FloatingShapes />

      {/* Hero Section */}
      <Hero setActivePage={setActivePage} />

      {/* Public Live Signup activity feed dashboard */}
      <section className="py-12 px-6 bg-primary/5 dark:bg-bgDark-card/5 border-b border-primary/25 dark:border-bgDark-border relative">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          
          <div className="md:col-span-4 space-y-3 font-mono">
            <span className="text-[10px] text-accent-gold dark:text-accent-cyan tracking-widest font-bold flex items-center gap-1.5 uppercase">
              <ShieldAlert className="w-4 h-4 animate-pulse" /> LIVE TELEMETRY
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-sans text-primary dark:text-white">ROSTER ACTIVITY</h3>
            <p className="text-xs text-primary/80 dark:text-white/50 leading-relaxed">
              Global telemetry index displaying live registration packets transmitted by various universities.
            </p>
          </div>

          {/* Activity cards list */}
          <div className="md:col-span-8 grid grid-cols-1 gap-3 font-mono text-[11px]">
            {liveRosterActivity.map((reg) => (
              <div 
                key={reg.id}
                className="p-3.5 rounded border border-primary/20 dark:border-white/5 bg-white dark:bg-[#051638]/90 flex items-center justify-between text-primary dark:text-white hover:border-[#fbbf24] dark:hover:border-accent-cyan transition-all"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-1.5 rounded bg-primary/5 text-accent-gold dark:text-accent-cyan">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-primary-light dark:text-accent-cyan">{reg.teamName}</span>
                    <span className="text-primary/50 dark:text-white/40"> ({reg.university})</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="uppercase text-[9px] font-bold px-2 py-0.5 rounded bg-primary/10 text-primary dark:bg-accent-cyan/10 dark:text-accent-cyan">
                    {reg.track}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                    reg.paymentStatus === 'Approved' 
                      ? 'bg-accent-emerald/10 text-accent-emerald' 
                      : 'bg-accent-gold/10 text-accent-gold'
                  }`}>
                    {reg.paymentStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats deck & Competitions blocks */}
      <Statistics />
      <Competitions setActivePage={setActivePage} />
      <TimelineSection />
      <Sponsors />
      <Gallery />
      <FAQSection />
    </PageWrapper>
  );
}