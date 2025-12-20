import {useRef, useEffect,useState} from 'react';
import { LessonNode } from './LessonNode';
import { BaiHoc } from './type';

export type NodeType = 'lesson' | 'chest' | 'trophy';
export type NodeStatus = 'active' | 'locked';


interface LessonPathProps {
  pathId: number;
  onLessonClick?: () => void;
  label?: string;
  onInView?: (label: string, pathId: number, color: string) => void;
  color: string;
}

export const LessonPath: React.FC<LessonPathProps> = ({
  pathId,
  onLessonClick,
  label = 'Order drinks',
  onInView,
  color,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [baihoc, setBaihoc] = useState<BaiHoc[] | null>(null);

  useEffect(() => {
            fetch("http://127.0.0.1:8000/api/chuong/1/baihoc")
              .then(res => res.json())
              .then(res => {
                if (res.success) {
                  setBaihoc(res.data);
                }
              })
              .catch(err => console.error(err));
          }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && onInView) {
          onInView(label, pathId, color);
        }
      },
      {
        threshold: 0.5,
        rootMargin: '-150px 0px -40% 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [label, pathId, onInView, color]);

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

  const positions = pathPositions[pathId] || pathPositions[1];
if(!baihoc){
    return <div className="p-10">Đang tải dữ liệu...</div>;
  }
  return (
    <div ref={ref}>
      {pathId !== 1 && (
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
      )}
      <div className="relative w-full h-[450px]">
        {baihoc.map((baihoccon, index) => {

          return (
            <LessonNode
              key={index}
              type="lesson"
              status="active"
              position={positions[index]}
              lessonTitle={baihoccon.TenBaiHoc}
              onClick={index === 0 && onLessonClick ? onLessonClick : undefined}
              color={color}
              lessonNumber={baihoccon.ThuTu}
            />
          );
        })}


      </div>

      
    </div>
  );
};