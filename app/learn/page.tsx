'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { LessonPath, CurrentLesson } from './components/LessonPath';
import { Modal } from './components/Modal';
import { Header } from './components/Header';

type Chuong = {
  ID_Chuong: number;
  TenChuong: string;
  ThuTu: number;
};

type BaiHoc = {
  ID_BaiHoc: number;
  ID_Chuong: number;
  TenBaiHoc: string;
  IconBaiHoc: string;
  ThuTu: number;
};

// Default nodes array - moved outside component to avoid recreation
const DEFAULT_NODES = [
  { type: 'lesson' as const, status: 'locked' as const },
  { type: 'lesson' as const, status: 'locked' as const },
  { type: 'lesson' as const, status: 'locked' as const },
  { type: 'lesson' as const, status: 'locked' as const },
  { type: 'lesson' as const, status: 'locked' as const },
];

export default function Page() {
  const [chuong, setChuong] = useState<Chuong[] | null>(null);
  const [baiHocMap, setBaiHocMap] = useState<Record<number, BaiHoc[]>>({});
  const [currentLesson, setCurrentLesson] = useState<CurrentLesson | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userID = localStorage.getItem('ID_User');

        const [chuongRes, currentLessonRes] = await Promise.all([
          fetch("http://127.0.0.1:8000/api/chuong").then(res => res.json()),
          userID 
            ? fetch(`http://127.0.0.1:8000/api/user/${userID}/baihoc/dang-hoc`)
                .then(res => res.json())
                .then(res => res.data ? res : { data: null })
                .catch(() => ({ data: null }))
            : Promise.resolve({ data: null })
        ]);

        if (chuongRes.success) {
          setChuong(chuongRes.data);
          
          const baiHocPromises = chuongRes.data.map((ch: Chuong) =>
            fetch(`http://127.0.0.1:8000/api/chuong/${ch.ID_Chuong}/baihoc`)
              .then(res => res.json())
              .then(res => res.success ? { chuongId: ch.ID_Chuong, data: res.data } : null)
              .catch(err => {
                console.error(`Error fetching baihoc for chuong ${ch.ID_Chuong}:`, err);
                return null;
              })
          );

          const baiHocResults = await Promise.all(baiHocPromises);
          const newBaiHocMap: Record<number, BaiHoc[]> = {};
          baiHocResults.forEach(result => {
            if (result) {
              newBaiHocMap[result.chuongId] = result.data;
            }
          });
          setBaiHocMap(newBaiHocMap);
        }

        if (currentLessonRes.data) {
          setCurrentLesson(currentLessonRes.data);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [headerData, setHeaderData] = useState({
    unit: 'Chương 1',
    title: 'Order food 2',
    color: 'blue-400'
  });
  
  const colors = useMemo(() => ['blue-400', 'purple-400', 'yellow-400','green-400','orange-400'], []);

  const handleLessonPathInView = useCallback((label: string, pathId: number, color: string) => {
    setHeaderData({
      unit: `Chương ${pathId}`,
      title: label,
      color: color,
    });
  }, []);

  if (loading || !chuong) {
    return <div className="p-10">Đang tải dữ liệu...</div>;
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