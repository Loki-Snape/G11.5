"use client";

import React from 'react';

export default function TiltContainer({ children }: { children: React.ReactNode }) {
  // Simple tilt effect using CSS transform on hover
  return (
    <div className="tilt-container" style={{ perspective: '1000px' }}>
      <div className="tilt-inner" style={{ transformStyle: 'preserve-3d', transition: 'transform 0.3s' }}
        onMouseMove={(e) => {
          const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20; // tilt range
          const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
          (e.currentTarget as HTMLDivElement).style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = 'rotateX(0) rotateY(0)';
        }}
      >
        {children}
      </div>
    </div>
  );
}
