import {useRef, useEffect, useMemo} from 'react';
import { LessonNode } from './LessonNode';

export type NodeType = 'lesson' | 'chest' | 'trophy';
export type NodeStatus = 'active' | 'locked' | 'completed';

interface Node {
  type: NodeType;
  status: NodeStatus;
}

type BaiHoc = {
  ID_BaiHoc: number;
  ID_Chuong: number;
  TenBaiHoc: string;
  IconBaiHoc: string;
  ThuTu: number;
};

export type CurrentLesson = {
  ID_BaiHoc: number;
  TenBaiHoc: string;
  ID_Chuong: number;
  TrangThai: string;
  ThoiDiemHoc: string;
};

const PATH_POSITIONS: Record<number, { x: number; y: number }[]> = {
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

interface LessonPathProps {
  nodes: Node[];
  pathId: number;
  onLessonClick?: () => void;
  label?: string;
  onInView?: (label: string, pathId: number, color: string) => void;
  color: string;
  baiHocList: BaiHoc[];
  currentLesson?: CurrentLesson | null;
  startLessonId?: number;
}

export const LessonPath: React.FC<LessonPathProps> = ({
  nodes,
  pathId,
  onLessonClick,
  label = 'Order drinks',
  onInView,
  color,
  baiHocList,
  currentLesson = null,
  startLessonId = 1,
}) => {
  const ref = useRef<HTMLDivElement>(null);

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

  const updatedNodes = useMemo(() => {
    if (!currentLesson || baiHocList.length === 0) {
      return nodes;
    }

    const chapterId = baiHocList[0]?.ID_Chuong;
    if (!chapterId || currentLesson.ID_Chuong !== chapterId) {
      return nodes;
    }

    const currentLessonIndex = baiHocList.findIndex(
      baiHoc => baiHoc.ID_BaiHoc === currentLesson.ID_BaiHoc
    );

    if (currentLessonIndex === -1) {
      return nodes;
    }

    return nodes.map((node, index) => {
      if (node.type === 'lesson') {
        const lessonIndex = nodes.slice(0, index + 1).filter(n => n.type === 'lesson').length - 1;
        const lessonData = baiHocList[lessonIndex];
        
        if (lessonData && lessonData.ID_BaiHoc === currentLesson.ID_BaiHoc) {
          return { ...node, status: 'active' as NodeStatus };
        } else if (lessonIndex < currentLessonIndex) {
          return { ...node, status: 'completed' as NodeStatus };
        } else {
          return { ...node, status: 'locked' as NodeStatus };
        }
      } else {
        const previousLessonCount = nodes.slice(0, index).filter(n => n.type === 'lesson').length;
        if (previousLessonCount <= currentLessonIndex) {
          return { ...node, status: 'locked' as NodeStatus };
        }
        return node;
      }
    });
  }, [currentLesson, baiHocList, nodes]);

  const positions = PATH_POSITIONS[pathId] || PATH_POSITIONS[1];

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
        {updatedNodes.map((node, index) => {
          let currentLessonId = startLessonId;
          if (node.type === 'lesson') {
            const lessonsBefore = updatedNodes.slice(0, index).filter(n => n.type === 'lesson').length;
            currentLessonId = startLessonId + lessonsBefore;
          }

          let lessonData = null;
          if (node.type === 'lesson' && baiHocList.length > 0) {
            const lessonIndex = updatedNodes.slice(0, index + 1).filter(n => n.type === 'lesson').length - 1;
            lessonData = baiHocList[lessonIndex];
          }

          return (
            <LessonNode
              key={index}
              type={node.type}
              status={node.status}
              position={positions[index]}
              onClick={index === 0 && onLessonClick ? onLessonClick : undefined}
              color={color}
              lessonTitle={lessonData?.TenBaiHoc || 'Order drinks'}
              lessonNumber={lessonData?.ThuTu || index + 1}
              totalLessons={baiHocList.filter(bh => bh).length || updatedNodes.filter(n => n.type === 'lesson').length}
              lessonId={node.type === 'lesson' ? currentLessonId : undefined}
            />
          );
        })}
      </div>
    </div>
  );
};