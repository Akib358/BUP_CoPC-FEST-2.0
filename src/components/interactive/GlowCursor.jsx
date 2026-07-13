import React, { useEffect } from 'react';

export default function GlowCursor() {
  useEffect(() => {
    const updateCoordinates = (e) => {
      // Feeds coordinate offsets to styles
      document.body.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.body.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', updateCoordinates);
    return () => window.removeEventListener('mousemove', updateCoordinates);
  }, []);

  return (
    /* Tracking light layer without floating ring elements */
    <div className="pointer-events-none fixed inset-0 z-0 mouse-glow-layer" />
  );
}