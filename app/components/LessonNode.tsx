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
  // Xác định màu sắc theo type
  const getColors = () => {
    switch (type) {
      case 'chest':
        return status === 'locked' 
          ? {
              gradient: 'from-gray-300 to-gray-400',
              shadow: '0 8px 0 #6b7280, 0 10px 20px rgba(0,0,0,0.2)',
              hoverShadow: '0 6px 0 #6b7280, 0 8px 16px rgba(0,0,0,0.2)',
              activeShadow: '0 0px 0 #6b7280, 0 2px 8px rgba(0,0,0,0.2)'
            }
          : {
              gradient: 'from-purple-400 to-purple-600',
              shadow: '0 8px 0 #6b21a8, 0 10px 20px rgba(147, 51, 234, 0.4)',
              hoverShadow: '0 6px 0 #6b21a8, 0 8px 16px rgba(147, 51, 234, 0.4)',
              activeShadow: '0 0px 0 #6b21a8, 0 2px 8px rgba(147, 51, 234, 0.4)'
            };
      case 'trophy':
        return status === 'locked'
          ? {
              gradient: 'from-gray-300 to-gray-400',
              shadow: '0 8px 0 #6b7280, 0 10px 20px rgba(0,0,0,0.2)',
              hoverShadow: '0 6px 0 #6b7280, 0 8px 16px rgba(0,0,0,0.2)',
              activeShadow: '0 0px 0 #6b7280, 0 2px 8px rgba(0,0,0,0.2)'
            }
          : {
              gradient: 'from-amber-400 to-amber-600',
              shadow: '0 8px 0 #b45309, 0 10px 20px rgba(217, 119, 6, 0.4)',
              hoverShadow: '0 6px 0 #b45309, 0 8px 16px rgba(217, 119, 6, 0.4)',
              activeShadow: '0 0px 0 #b45309, 0 2px 8px rgba(217, 119, 6, 0.4)'
            };
      default: // lesson
        if (status === 'locked') {
          return {
            gradient: 'from-gray-300 to-gray-400',
            shadow: '0 8px 0 #6b7280, 0 10px 20px rgba(0,0,0,0.2)',
            hoverShadow: '0 6px 0 #6b7280, 0 8px 16px rgba(0,0,0,0.2)',
            activeShadow: '0 0px 0 #6b7280, 0 2px 8px rgba(0,0,0,0.2)'
          };
        }
        if (status === 'completed') {
          return {
            gradient: 'from-yellow-300 to-yellow-500',
            shadow: '0 8px 0 #b45309, 0 10px 20px rgba(217, 119, 6, 0.4)',
            hoverShadow: '0 6px 0 #b45309, 0 8px 16px rgba(217, 119, 6, 0.4)',
            activeShadow: '0 0px 0 #b45309, 0 2px 8px rgba(217, 119, 6, 0.4)'
          };
        }
        return {
          gradient: 'from-blue-400 to-blue-600',
          shadow: '0 8px 0 #1e40af, 0 10px 20px rgba(37, 99, 235, 0.4)',
          hoverShadow: '0 6px 0 #1e40af, 0 8px 16px rgba(37, 99, 235, 0.4)',
          activeShadow: '0 0px 0 #1e40af, 0 2px 8px rgba(37, 99, 235, 0.4)'
        };
    }
  };

  // Xác định icon theo type
  const getIcon = () => {
    const iconColor = status === 'locked' ? 'text-gray-600' : 'text-white';
    const iconFill = status === 'locked' ? 'fill-gray-600' : 'fill-white';

    switch (type) {
      case 'chest':
        return <Package className={`w-10 h-10 ${iconColor} ${iconFill} drop-shadow-md`} strokeWidth={0} />;
      case 'trophy':
        return <Award className={`w-10 h-10 ${iconColor} ${iconFill} drop-shadow-md`} strokeWidth={0} />;
      default:
        return <Star className={`w-10 h-10 ${iconColor} ${iconFill} drop-shadow-md`} strokeWidth={0} />;
    }
  };

  const colors = getColors();

  return (
    <div 
      className="absolute flex flex-col items-center"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div className="relative" style={{ perspective: '1000px' }}>
        {/* START Label - chỉ hiện cho lesson active */}
        {type === 'lesson' && status === 'active' && (
          <div 
            className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white px-4 py-1.5 
            rounded-[10px] font-bold text-blue-600 text-[15px] tracking-wide shadow-lg 
            border border-gray-500 uppercase animate-bounce-custom z-20
            before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 
            before:top-full before:w-0 before:h-0 
            before:border-l-8 before:border-r-8 before:border-t-[10px]
            before:border-l-transparent before:border-r-transparent before:border-t-white"
            style={{
              fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
              fontWeight: 700,
              letterSpacing: '1px'
            }}
          >
            START
          </div>
        )}

        {/* Outer Ring - chỉ hiện cho lesson active */}
        {type === 'lesson' && status === 'active' && (
          <svg 
            viewBox="0 0 100 100" 
            className="absolute mt-0.5 w-28 h-28 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 transition-transform duration-100"
            style={{ 
              filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))',
              transform: 'rotateX(35deg) translateZ(0)'
            }}
          >
            <defs>
              <linearGradient id="ringGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e5e7eb" />
                <stop offset="100%" stopColor="#d1d5db" />
              </linearGradient>
            </defs>
            <ellipse
              cx="50"
              cy="52"
              rx="45"
              ry="45"
              fill="none"
              stroke="url(#ringGradient)"
              strokeWidth="8"
            />
          </svg>
        )}

        {/* Main Button - áp dụng cho tất cả types */}
        <button 
  className={`
    relative z-10 w-[72px] h-[72px] rounded-full flex items-center justify-center
    transition-all duration-100 ease-out group
    bg-gradient-to-b ${colors.gradient}
    cursor-pointer
  `}
  onClick={onClick}
  style={{
    transform: 'perspective(600px) rotateX(35deg) translateY(0px)',
    boxShadow: colors.shadow,
    transformStyle: 'preserve-3d'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'perspective(600px) rotateX(35deg) translateY(2px)';
    e.currentTarget.style.boxShadow = colors.hoverShadow;
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'perspective(600px) rotateX(35deg) translateY(0px)';
    e.currentTarget.style.boxShadow = colors.shadow;
  }}
  onMouseDown={(e) => {
    e.currentTarget.style.transform = 'perspective(600px) rotateX(35deg) translateY(8px)';
    e.currentTarget.style.boxShadow = colors.activeShadow;
  }}
  onMouseUp={(e) => {
    e.currentTarget.style.transform = 'perspective(600px) rotateX(35deg) translateY(2px)';
    e.currentTarget.style.boxShadow = colors.hoverShadow;
  }}
>
  {getIcon()}
        </button>
      </div>
    </div>
  );
};