import React, { useState, useEffect } from 'react';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Dynamic countdown targeting 7 days into the future on load
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);
    targetDate.setHours(targetDate.getHours() + 5);

    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      let newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      setTimeLeft(newTimeLeft);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, '0');

  const segments = [
    { label: 'DAYS', value: formatNumber(timeLeft.days) },
    { label: 'HRS', value: formatNumber(timeLeft.hours) },
    { label: 'MIN', value: formatNumber(timeLeft.minutes) },
    { label: 'SEC', value: formatNumber(timeLeft.seconds) },
  ];

  return (
    <div className="flex items-center space-x-3 sm:space-x-5 font-mono justify-center lg:justify-start">
      {segments.map((seg, idx) => (
        <React.Fragment key={seg.label}>
          <div className="flex flex-col items-center">
            {/* Parallelogram Box Container - Skewed with upright text contents */}
            <div className="-skew-x-12 relative px-4 py-2 bg-primary border border-accent-cyan/20 text-accent-gold shadow-md min-w-[50px] text-center">
              <span className="skew-x-12 block relative z-10 font-mono font-bold text-lg sm:text-xl text-accent-gold">
                {seg.value}
              </span>
            </div>
            {/* Yellow Label */}
            <span className="text-[9px] sm:text-[10px] mt-2 text-accent-gold tracking-widest font-bold font-mono">
              {seg.label}
            </span>
          </div>
          {/* Separator */}
          {idx < segments.length - 1 && (
            <span className="text-accent-gold font-sans text-base sm:text-lg pb-6 select-none animate-pulse">:</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}