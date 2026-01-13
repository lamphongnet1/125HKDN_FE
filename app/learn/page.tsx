'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { LessonPath, CurrentLesson } from './components/LessonPath';
import { Modal } from './components/Modal';
import { Header } from './components/Header';
import { useLearn } from '@/contexts/learncontext';  // ✅ Đã import
import { LearnPageSkeleton } from './components/SkeletonLoader'; 
import { useOnlineTimeTracker } from './components/useOnlineTimeTracker';
const DEFAULT_NODES = [
  { type: 'lesson' as const, status: 'locked' as const },
  { type: 'lesson' as const, status: 'locked' as const },
  { type: 'lesson' as const, status: 'locked' as const },
  { type: 'lesson' as const, status: 'locked' as const },
  { type: 'lesson' as const, status: 'locked' as const },
];

export default function Page() {
  useOnlineTimeTracker();
  // ✅ LẤY DATA TỪ CONTEXT (không cần state nữa!)
  const { chuong, baiHocMap, loading: contextLoading } = useLearn();
  
  // ✅ CHỈ GIỮ LẠI currentLesson state (vì không lưu trong Context)
  const [currentLesson, setCurrentLesson] = useState<CurrentLesson | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [headerData, setHeaderData] = useState({
    unit: 'Chương 1',
    title: 'Order food 2',
    color: 'blue-400'
  });

  // ✅ CHỈ FETCH currentLesson (vì data cá nhân, thay đổi thường xuyên)
  useEffect(() => {
    const fetchCurrentLesson = async () => {
      const userID = localStorage.getItem('ID_User');
      if (!userID) return;

      try {
        const res = await fetch(`http://127.0.0.1:8000/api/user/${userID}/baihoc/dang-hoc`)
          .then(res => res.json());
        
        if (res.data) {
          setCurrentLesson(res.data);
        }
      } catch (err) {
        console.error('Error fetching current lesson:', err);
      }
    };

    // Chỉ fetch khi đã có chuong data
    if (chuong) {
      fetchCurrentLesson();
    }
  }, [chuong]);  // ✅ Chạy khi chuong có data
  
  const colors = useMemo(() => ['blue-400', 'purple-400', 'yellow-400','green-400','orange-400'], []);

  const handleLessonPathInView = useCallback((label: string, pathId: number, color: string) => {
    setHeaderData({
      unit: `Chương ${pathId}`,
      title: label,
      color: color,
    });
  }, []);

  // ✅ Loading từ Context
  if (contextLoading || !chuong) {
    return <LearnPageSkeleton />;
  }

  return (
    <div className='w-full'>
      <div className="sticky top-0 z-50 bg-white">
        <div className="h-[20px]"></div>
        <Header 
          unit={headerData.unit}
          title={headerData.title}
          color={headerData.color}
        />
      </div>

      <div className="mt-10 relative mx-auto">
        {chuong.map((chuongcon) => {
           const baiHocList = baiHocMap[chuongcon.ID_Chuong] || [];
           const startLessonId = (chuongcon.ThuTu - 1) * 5 + 1;

          if(chuongcon.ID_Chuong === 1){
            const NODE_CHUONG1 = [
              { type: 'lesson' as const, status: 'active' as const },
              { type: 'lesson' as const, status: 'locked' as const },
              { type: 'lesson' as const, status: 'locked' as const },
              { type: 'lesson' as const, status: 'locked' as const },
              { type: 'lesson' as const, status: 'locked' as const },
            ];
            return (
              <LessonPath 
                key={chuongcon.ID_Chuong}
                nodes={NODE_CHUONG1}
                pathId={chuongcon.ThuTu}
                label={chuongcon.TenChuong}
                onInView={handleLessonPathInView}
                color={colors[chuongcon.ThuTu - 1] || colors[0]}
                baiHocList={baiHocList}
                currentLesson={currentLesson}
                startLessonId={startLessonId}
              />
            );
          }
          
          return (
            <LessonPath 
              key={chuongcon.ID_Chuong}
              nodes={DEFAULT_NODES}
              pathId={chuongcon.ThuTu}
              label={chuongcon.TenChuong}
              onInView={handleLessonPathInView}
              color={colors[chuongcon.ThuTu - 1] || colors[0]}
              baiHocList={baiHocList}
              currentLesson={currentLesson}
              startLessonId={startLessonId}
            />
          );
        })}
      </div>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}