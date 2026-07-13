import React, { useState, useRef } from 'react';

export default function Card3D({ children, className = "" }) {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Compute cursor offset coordinates relative to center of the card
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Scale rotation to max tilt of 10 degrees
    const rX = -(y / (rect.height / 2)) * 10;
    const rY = (x / (rect.width / 2)) * 10;

    setRotate({ x: rX, y: rY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: "transform 0.15s ease-out"
      }}
      className={`relative rounded-lg overflow-hidden border border-bgLight-border dark:border-bgDark-border bg-bgLight-card dark:bg-bgDark-card shadow-md transition-shadow duration-300 hover:shadow-glow-cyan/15 ${className}`}
    >
      <div style={{ transform: "translateZ(20px)" }} className="relative z-10">
        {children}
      </div>
    </div>
  );
}