import React from 'react';
import { LessonNode } from './LessonNode';

interface LessonPathProps {
  onLessonClick: () => void;
}

export const LessonPath: React.FC<LessonPathProps> = ({ onLessonClick }) => {
  // Define positions for nodes to create snake-like path
  const nodes = [
    { type: 'lesson' as const, status: 'active' as const, x: 300, y: 80 },
    { type: 'lesson' as const, status: 'locked' as const, x: 400, y: 200 },
    { type: 'chest' as const, status: 'locked' as const, x: 200, y: 320 },
    { type: 'lesson' as const, status: 'locked' as const, x: 300, y: 440 },
    { type: 'trophy' as const, status: 'locked' as const, x: 400, y: 560 },
  ];

  // Generate SVG path
  const pathD = `
    M 300 80
    Q 350 140, 400 200
    Q 400 260, 200 320
    Q 200 380, 300 440
    Q 350 500, 400 560
  `;

  return (
    <div className="relative w-full" style={{ height: '700px' }}>
      {/* SVG curved path */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#d1d5db" />
            <stop offset="100%" stopColor="#d1d5db" />
          </linearGradient>
        </defs>
        <path
          d={pathD}
          stroke="url(#pathGradient)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Lesson nodes */}
      {nodes.map((node, index) => (
        <LessonNode
          key={index}
          type={node.type}
          status={node.status}
          position={{ x: node.x, y: node.y }}
          onClick={index === 0 ? onLessonClick : undefined}
        />
      ))}
    </div>
  );
};