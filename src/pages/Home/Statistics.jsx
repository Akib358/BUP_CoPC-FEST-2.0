import React from 'react';
import CountUp from '../../components/interactive/CountUp';
import { Users, School, Trophy, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const STATS = [
  { icon: Users, end: 5000, suffix: '+', label: 'ATTENDEES EXPECTED' },
  { icon: School, end: 150, suffix: '+', label: 'UNIVERSITIES INVITED' },
  { icon: Trophy, end: 200, suffix: '+', label: 'SQUAD TEAMS LOCKED' },
  { icon: Award, end: 400000, suffix: ' BDT', label: 'CUMULATIVE PRIZES' },
];

export default function Statistics() {
  return (
    <section className="py-16 px-6 bg-bgLight dark:bg-bgDark border-b border-bgLight-border dark:border-bgDark-border relative">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
        {STATS.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.3 }}
              className="p-6 rounded-md border border-bgLight-border dark:border-bgDark-border bg-bgLight-card/50 dark:bg-bgDark-card/50 text-center font-mono space-y-3"
            >
              <div className="inline-flex p-3 rounded-full bg-primary/5 dark:bg-accent-cyan/5 text-primary/70 dark:text-accent-cyan">
                <Icon className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-sans font-bold text-primary dark:text-white">
                  <CountUp end={stat.end} />
                  <span className="text-accent-cyan">{stat.suffix}</span>
                </div>
                <p className="text-[9px] uppercase tracking-widest text-primary/50 dark:text-white/40 font-bold">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}