import React, { useState, useEffect, useRef } from 'react';

export const Dog: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const dogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const calculatePupilPosition = (eyeIndex: number) => {
    if (!dogRef.current) return { x: 0, y: 0 };

    const dogRect = dogRef.current.getBoundingClientRect();
    const eyeX = dogRect.left + dogRect.width / 2 + (eyeIndex === 0 ? -20 : 20);
    const eyeY = dogRect.top + dogRect.height * 0.4;

    const angle = Math.atan2(mousePos.y - eyeY, mousePos.x - eyeX);
    const distance = Math.min(6, Math.hypot(mousePos.x - eyeX, mousePos.y - eyeY) / 25);

    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    };
  };

  return (
    <div className="fixed bottom-24 right-24 w-40 h-40 animate-float">
      <div
        ref={dogRef}
        className="w-full h-full relative"
      >
        {/* Dog Head */}
        <div className="absolute w-32 h-32 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl shadow-amber-700/50" />
        
        {/* Dog Ears */}
        <div className="absolute w-16 h-20 bg-gradient-to-br from-amber-700 to-amber-800 rounded-full -left-2 top-6 rotate-[-20deg] shadow-lg" />
        <div className="absolute w-16 h-20 bg-gradient-to-br from-amber-700 to-amber-800 rounded-full -right-2 top-6 rotate-[20deg] shadow-lg" />
        
        {/* Dog Snout */}
        <div className="absolute w-16 h-14 bg-gradient-to-b from-amber-500 to-amber-600 rounded-full left-1/2 -translate-x-1/2 bottom-8 shadow-md" />
        
        {/* Dog Nose */}
        <div className="absolute w-6 h-5 bg-gray-900 rounded-full left-1/2 -translate-x-1/2 bottom-14 z-10" />
        
        {/* Dog Eyes */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 flex gap-5 z-10">
          {[0, 1].map((i) => {
            const pos = calculatePupilPosition(i);
            return (
              <div key={i} className="relative">
                <div className="w-8 h-9 bg-white rounded-full shadow-md" />
                <div
                  className="absolute w-3 h-3 bg-gray-900 rounded-full top-1/2 left-1/2 transition-transform duration-100"
                  style={{
                    transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`,
                  }}
                />
              </div>
            );
          })}
        </div>
        
        {/* Dog Tongue (cute detail) */}
        <div className="absolute w-4 h-6 bg-pink-500 rounded-b-full left-1/2 -translate-x-1/2 bottom-6 z-5" />
      </div>
    </div>
  );
};