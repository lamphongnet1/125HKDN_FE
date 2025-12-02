import React from 'react';
import { LessonNode } from './LessonNode';

export type NodeType = 'lesson' | 'chest' | 'trophy';
export type NodeStatus = 'active' | 'locked';

interface Node {
  type: NodeType;
  status: NodeStatus;
}

interface LessonPathProps {
  nodes: Node[];
  pathId: number; // path 1, 2, 3 ...
  onLessonClick?: () => void;
  label?: string;
}

export const LessonPath: React.FC<LessonPathProps> = ({
  nodes,
  pathId,
  onLessonClick,
  label = 'Order drinks',
}) => {
  // map các pathId -> positions
const pathPositions: Record<number, { x: number; y: number }[]> = {
  1: [
    { x: 300, y: 40 },
    { x: 250, y: 135 },
    { x: 200, y: 220 },
    { x: 230, y: 310 },
    { x: 280, y: 390 },
  ],
  2: [
    { x: 340, y: 50 },
    { x: 370, y: 135 },
    { x: 400, y: 220 },
    { x: 360, y: 310 },
    { x: 330, y: 390 },
  ],
  3: [
    { x: 280, y: 50 },
    { x: 230, y: 135 },
    { x: 200, y: 220 },
    { x: 220, y: 310 },
    { x: 270, y: 390 },
  ],
};

  const positions = pathPositions[pathId] || pathPositions[1]; // fallback

  return (
    <>
      <div className="relative w-full h-[450px]">
        {nodes.map((node, index) => (
          <LessonNode
            key={index}
            type={node.type}
            status={node.status}
            position={positions[index]}
            onClick={index === 0 && onLessonClick ? onLessonClick : undefined}
          />
        ))}
      </div>

      <div className="relative my-7">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-gray-300"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-6 py-2 text-[15px] font-bold text-gray-400 tracking-wide">
            {label}
          </span>
        </div>
      </div>
    </>
  );
};
