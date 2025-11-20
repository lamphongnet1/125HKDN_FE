import React from 'react';
import { Star, Lock, Package, Award } from 'lucide-react';

interface LessonNodeProps {
  type: 'lesson' | 'chest' | 'trophy';
  status: 'active' | 'locked' | 'completed';
  position: { x: number; y: number };
  onClick?: () => void;
}

export const LessonNode: React.FC<LessonNodeProps> = ({ 
  type, 
  status, 
  position,
  onClick
}) => {
  return (
    <div 
      className="absolute flex flex-col items-center"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      {type === 'lesson' && (
        <>
          {/* Outer white border ring */}
          <div className="relative">
            <div className="absolute inset-0 bg-white rounded-full scale-110 shadow-xl z-0" />
            
            {/* Lesson Circle */}
            <div 
              className={`
                relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all
                ${status === 'active' ? 'bg-gradient-to-b from-blue-400 to-blue-500 cursor-pointer hover:scale-105' : ''}
                ${status === 'locked' ? 'bg-gradient-to-b from-gray-300 to-gray-400 cursor-not-allowed' : ''}
                ${status === 'completed' ? 'bg-gradient-to-b from-purple-300 to-purple-400 cursor-pointer hover:scale-105' : ''}
                shadow-lg
              `}
              onClick={status !== 'locked' ? onClick : undefined}
              style={{
                boxShadow: status === 'active' 
                  ? '0 8px 0 #2563eb, 0 10px 20px rgba(0,0,0,0.2)' 
                  : status === 'locked'
                  ? '0 6px 0 #b0b0b0, 0 8px 15px rgba(0,0,0,0.15)'
                  : '0 8px 0 #9333ea, 0 10px 20px rgba(0,0,0,0.2)'
              }}
            >
              {status === 'locked' ? (
                <Lock className="w-10 h-10 text-gray-600" />
              ) : (
                <Star className="w-11 h-11 text-white fill-white" />
              )}
            </div>
          </div>
          
          {status === 'active' && (
            <div className="mt-6 bg-white px-5 py-2 rounded-full font-bold text-blue-500 text-sm shadow-md border-2 border-gray-100">
              START
            </div>
          )}
        </>
      )}

      {type === 'chest' && (
        <div className="relative">
          <div className="absolute inset-0 bg-white rounded-2xl scale-105 shadow-xl z-0" />
          <div 
            className="relative z-10 w-20 h-20 bg-gradient-to-b from-gray-400 to-gray-500 rounded-xl flex items-center justify-center"
            style={{
              boxShadow: '0 6px 0 #909090, 0 8px 15px rgba(0,0,0,0.2)'
            }}
          >
            <Package className="w-9 h-9 text-white" />
          </div>
        </div>
      )}

      {type === 'trophy' && (
        <div className="relative">
          <div className="absolute inset-0 bg-white rounded-full scale-110 shadow-xl z-0" />
          <div 
            className="relative z-10 w-24 h-24 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full flex items-center justify-center"
            style={{
              boxShadow: '0 6px 0 #b0b0b0, 0 8px 15px rgba(0,0,0,0.15)'
            }}
          >
            <Award className="w-11 h-11 text-gray-600" />
          </div>
        </div>
      )}
    </div>
  );
};