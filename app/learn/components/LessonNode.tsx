  import React, { useState,useRef,useEffect } from 'react';
  import { Star, Package, Award, X } from 'lucide-react';
  import { useRouter } from 'next/navigation';

  interface LessonNodeProps {
    type: 'lesson' | 'chest' | 'trophy';
    status: 'active' | 'locked' | 'completed';
    position: { x: number; y: number };
    onClick?: () => void;
    color?: string;
    lessonTitle?: string;
    lessonNumber?: number;
    totalLessons?: number;
    xpReward?: number;
  }

  const colorToHex = (color: string): string => {
    const colorMap: Record<string, string> = {
      'blue-400': '#1e3a8a',
      'green-400': '#166534',
      'purple-400': '#6b21a8',
      'pink-400': '#be185d',      // Thêm pink
      'red-400': '#991b1b',        // Thêm red
      'orange-400': '#c2410c',     // Thêm orange
      'yellow-400': '#a16207',     // Thêm yellow
      'cyan-400': '#155e75',       // Thêm cyan
      'teal-400': '#115e59',
    };
    return colorMap[color] || '#1e3a8a';
  };

  const colorToRgb = (color: string): string => {
    const rgbMap: Record<string, string> = {
      'blue-400': '30, 58, 138',
      'green-400': '22, 101, 52',
      'purple-400': '107, 33, 168',
    };
    return rgbMap[color] || '30, 58, 138';
  };

  export const LessonNode: React.FC<LessonNodeProps> = ({ 
    type, 
    status, 
    position,
    onClick,
    color = 'blue-400',
    lessonTitle = 'Order drinks',
    lessonNumber = 1,
    totalLessons = 4,
    xpReward = 10,
  }) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
const [showModal, setShowModal] = useState(false);
const [modalPos, setModalPos] = useState({ top: 0, left: 0 });
const router = useRouter();
const openModal = () => {
  setShowModal(true);
};

useEffect(() => {
  if (showModal && buttonRef.current) {
    const rect = buttonRef.current.getBoundingClientRect();

    setModalPos({
      top: rect.bottom + 10,
      left: rect.left + rect.width / 2
    });
  }
}, [showModal]);
useEffect(() => {
  if (!showModal) return;

  const handleScroll = () => {
    setShowModal(false);
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, [showModal]);

const getColors = () => {
  const hexColor = colorToHex(color);
  const rgbColor = colorToRgb(color);

  // Gradient map cho từng màu
  const gradientMap: Record<string, string> = {
    'blue-400': 'from-blue-400 to-blue-600',
    'green-400': 'from-green-400 to-green-600',
    'purple-400': 'from-purple-400 to-purple-600',
    'pink-400': 'from-pink-400 to-pink-600',
    'red-400': 'from-red-400 to-red-600',
    'orange-400': 'from-orange-400 to-orange-600',
    'yellow-400': 'from-yellow-400 to-yellow-600',
    'cyan-400': 'from-cyan-400 to-cyan-600',
    'teal-400': 'from-teal-400 to-teal-600',
  };

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
    default:
      if (status === 'locked') {
        return {
          gradient: 'from-gray-300 to-gray-400',
          shadow: '0 8px 0 #6b7280, 0 10px 20px rgba(0,0,0,0.2)',
          hoverShadow: '0 6px 0 #6b7280, 0 8px 16px rgba(0,0,0,0.2)',
          activeShadow: '0 0px 0 #6b7280, 0 2px 8px rgba(0,0,0,0.2)'
        };
      }
      // Sử dụng gradientMap thay vì template string
      return {
        gradient: gradientMap[color] || 'from-blue-400 to-blue-600',
        shadow: `0 8px 0 ${hexColor}, 0 10px 20px rgba(${rgbColor}, 0.4)`,
        hoverShadow: `0 6px 0 ${hexColor}, 0 8px 16px rgba(${rgbColor}, 0.4)`,
        activeShadow: `0 0px 0 ${hexColor}, 0 2px 8px rgba(${rgbColor}, 0.4)`
      };
  }
};

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
    const handleButtonClick = () => {
      if (status !== 'locked') {
        setShowModal(true);
      }
    };

    const handleStartLesson = () => {
      router.push('/lesson');
        
        // Tùy chọn: Đóng modal sau khi bắt đầu chuyển hướng
        setShowModal(false);
    };

    return (
      <>
        <div 
          className="absolute flex flex-col items-center"
          style={{ 
            left: `${position.x}px`, 
            top: `${position.y}px`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="relative" style={{ perspective: '1000px' }}>
            {/* START Label */}
            {!showModal &&type === 'lesson' && status === 'active' && (
              <div
              className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white px-4 py-1.5 
                rounded-[10px] font-bold text-[15px] tracking-wide
                border border-gray-500 uppercase animate-bounce z-20
                
                // PSEUDO-ELEMENT 'BEFORE' (Tạo viền ngoài)
                before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 
                before:top-full before:w-0 before:h-0 
                before:border-l-8 before:border-r-8 before:border-t-[11px] // Độ dày viền ngoài 11px
                before:border-l-transparent before:border-r-transparent before:border-t-gray-500 // Màu viền ngoài (Ví dụ: xám)
                
                // PSEUDO-ELEMENT 'AFTER' (Tạo lớp màu trắng bên trong)
                after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 
                after:top-[calc(100%-1px)] after:w-0 after:h-0 // Điều chỉnh vị trí để lọt vào lớp 'before'
                after:border-l-8 after:border-r-8 after:border-t-[10px] // Độ dày nội dung 10px (nhỏ hơn 1px so với 'before')
                after:border-l-transparent after:border-r-transparent after:border-t-white" // Màu nội dung (Trắng)
                style={{
                  color: colorToHex(color),
                  fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
                  fontWeight: 700,
                  letterSpacing: '1px'
                }}
              >
                START
              </div>
            )}

            {/* Outer Ring */}
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

            {/* Main Button */}
            <button 
              className={`
                relative z-10 w-[72px] h-[72px] rounded-full flex items-center justify-center
                transition-all duration-100 ease-out group
                bg-gradient-to-b ${colors.gradient}
                ${status === 'locked' ? 'cursor-not-allowed' : 'cursor-pointer'}
              `}
              ref={buttonRef}
              onClick={handleButtonClick}
              disabled={status === 'locked'}
              style={{
                transform: 'perspective(600px) rotateX(35deg) translateY(0px)',
                boxShadow: colors.shadow,
                transformStyle: 'preserve-3d'
              }}
              onMouseEnter={(e) => {
                if (status === 'locked') return;
                e.currentTarget.style.transform = 'perspective(600px) rotateX(35deg) translateY(2px)';
                e.currentTarget.style.boxShadow = colors.hoverShadow;
              }}
              onMouseLeave={(e) => {
                if (status === 'locked') return;
                e.currentTarget.style.transform = 'perspective(600px) rotateX(35deg) translateY(0px)';
                e.currentTarget.style.boxShadow = colors.shadow;
              }}
              onMouseDown={(e) => {
                if (status === 'locked') return;
                e.currentTarget.style.transform = 'perspective(600px) rotateX(35deg) translateY(8px)';
                e.currentTarget.style.boxShadow = colors.activeShadow;
              }}
              onMouseUp={(e) => {
                if (status === 'locked') return;
                e.currentTarget.style.transform = 'perspective(600px) rotateX(35deg) translateY(2px)';
                e.currentTarget.style.boxShadow = colors.hoverShadow;
              }}
            >
              {getIcon()}
            </button>


          </div>
          
        </div>
        {showModal && (
          <div className="fixed inset-0  z-[9999]"
          onClick={() => setShowModal(false)} >
            <div
              className="fixed  z-[9999] -translate-x-1/2 animate-fadeIn
                        rounded-2xl p-6 w-96 shadow-2xl"
              style={{
                top: modalPos.top,
                left: modalPos.left,
                backgroundColor: colorToHex(color)
              }}
            >
              {/* arrow */}
              <div
                className="absolute -top-2 left-1/2 -translate-x-1/2 
                          w-0 h-0 border-l-8 border-r-8 border-b-[10px]
                          border-l-transparent border-r-transparent"
                style={{
                  borderBottomColor: colorToHex(color)
                }}
              />

              {/* Close */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-white"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Content */}
              <h2 className="text-white text-2xl font-bold mb-2 text-center">
                {lessonTitle}
              </h2>
              <p className="text-white/70 text-center mb-6">
                Lesson {lessonNumber} of {totalLessons}
              </p>

              <button
                onClick={handleStartLesson}
                className="w-full bg-white text-lg font-bold py-4 rounded-xl cursor-pointer transition-all duration-200 hover:brightness-130"
                style={{
                  color: colorToHex(color)
                }}
              >
                  START +{xpReward} XP
              </button>
            </div>
          </div>
        )}

      </>
    );
  };