import React, { useState } from 'react';
import Accordion from '../../components/ui/Accordion';

const FAQS = [
  {
    q: "Who can participate in BUP CSE TechFest?",
    a: "Undergraduate students enrolled in any recognized university or board in Bangladesh are eligible. Roster participants must carry valid student identifications."
  },
  {
    q: "Can a team have members from different universities?",
    a: "No, all members of a single squad team (for IUPC or Hackathon) must belong to the exact same hosting university or institution."
  },
  {
    q: "What is the registration layout and submission rules?",
    a: "Every squad must complete the unified web portal form. Teams must supply student ID snapshots, team names, and correct payment screenshot transaction proofs."
  },
  {
    q: "Will fooding and travel logistics be supplied?",
    a: "Basic breakfast and lunch packs are fully covered during active festival slots on July 11 and 12. Travel logistics are self-funded by external participants."
  }
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const handleToggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-20 px-6 bg-bgLight dark:bg-bgDark relative">
      <div className="max-w-3xl mx-auto space-y-12 relative z-10">
        
        {/* Title elements */}
        <div className="text-center space-y-4">
          <div className="inline-flex p-1.5 rounded-full border border-primary/10 dark:border-accent-cyan/25 text-primary dark:text-accent-cyan font-mono text-[9px] tracking-widest font-bold uppercase bg-bgLight dark:bg-bgDark">
            [ PORTAL CONSOLE ]
          </div>
          <h2 className="text-3xl font-bold text-primary dark:text-white">
            HELP DESK FAQS
          </h2>
          <p className="text-sm font-mono text-primary/60 dark:text-white/50 max-w-sm mx-auto">
            Review standard operational specs and registration guidelines.
          </p>
        </div>

        {/* List mapping */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <Accordion
              key={idx}
              question={faq.q}
              answer={faq.a}
              isOpen={openIdx === idx}
              onToggle={() => handleToggle(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}