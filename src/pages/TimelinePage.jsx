import React from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import { Calendar, Clock, MapPin } from 'lucide-react';

const FULL_SCHEDULE = [
  { day: 'Day 1 - July 11, 2026', items: [
    { time: '08:00 AM', event: 'Participant Check-in & Goodie Bag Sweep', venue: 'BUP Plaza' },
    { time: '09:00 AM', event: 'TechFest Grand Inauguration', venue: 'Central Auditorium' },
    { time: '10:30 AM', event: 'IUPC Contest Kickoff (5-Hour Run)', venue: 'Central Programming Labs' },
    { time: '11:00 AM', event: '24H Hackathon Sprint Begins', venue: 'Multipurpose Exhibition Hall' },
    { time: '12:00 PM', event: 'Jeopardy CTF Bracket Starts', venue: 'Cyber Lab 304' },
    { time: '03:30 PM', event: 'IUPC Solution Evaluation & Board Freeze', venue: 'Programming Labs' },
  ]},
  { day: 'Day 2 - July 12, 2026', items: [
    { time: '09:00 AM', event: 'CTF Roster Wrap & Score Verification', venue: 'Cyber Lab 304' },
    { time: '11:00 AM', event: '24H Hackathon Sprint Finishes', venue: 'Multipurpose Hall' },
    { time: '11:30 AM', event: 'Hackathon Project Pitching & Jury Sweep', venue: 'Jury Boardrooms' },
    { time: '01:00 PM', event: 'Tech Seminar: Software Engineering Trends', venue: 'Seminar Hall' },
    { time: '03:30 PM', event: 'Grand Closing Ceremony & Awards Distribution', venue: 'Central Auditorium' },
  ]}
];

export default function TimelinePage() {
  return (
    <PageWrapper>
      <div className="absolute inset-0 cyber-grid opacity-40 pointer-events-none" />
      <div className="max-w-4xl mx-auto px-6 space-y-12 relative z-10">
        
        {/* Title headings */}
        <div className="space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-accent-cyan font-bold block">
            ./full_festival_timetables.sh
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-sans text-primary dark:text-white">
            EVENT TIMETABLE SCHEDULES
          </h1>
          <p className="text-sm font-mono text-primary/70 dark:text-white/60 leading-relaxed max-w-xl">
            Track times, track rooms, and make sure your team doesn't miss key evaluation or check-in windows.
          </p>
        </div>

        {/* Schedule Mapping Blocks */}
        <div className="space-y-12">
          {FULL_SCHEDULE.map((section, idx) => (
            <div key={idx} className="space-y-6">
              <div className="flex items-center space-x-2 border-b border-bgLight-border dark:border-bgDark-border pb-3">
                <Calendar className="w-5 h-5 text-accent-cyan" />
                <h2 className="font-mono text-sm uppercase tracking-wider font-bold text-primary dark:text-white">
                  {section.day}
                </h2>
              </div>

              <div className="space-y-4">
                {section.items.map((item, id) => (
                  <div 
                    key={id} 
                    className="p-5 border border-bgLight-border dark:border-bgDark-border bg-bgLight-card/50 dark:bg-bgDark-card/40 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-primary/20 dark:hover:border-accent-cyan/35 transition-colors"
                  >
                    <div className="flex items-center space-x-4 font-mono">
                      <div className="flex items-center space-x-1.5 text-accent-cyan text-xs font-bold shrink-0">
                        <Clock className="w-4 h-4" />
                        <span>{item.time}</span>
                      </div>
                      <span className="text-xs text-primary dark:text-white font-sans font-bold">
                        {item.event}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1.5 font-mono text-[10px] text-primary/50 dark:text-white/40 uppercase bg-primary/5 dark:bg-bgDark-card px-2.5 py-1 rounded border border-bgLight-border dark:border-white/5 font-bold">
                      <MapPin className="w-3.5 h-3.5 text-accent-cyan" />
                      <span>{item.venue}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </PageWrapper>
  );
}