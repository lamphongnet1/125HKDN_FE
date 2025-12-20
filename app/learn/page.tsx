'use client';

import { useState, useEffect } from 'react';

import { LessonPath } from './components/LessonPath';
import { Modal } from './components/Modal';
import { Header } from './components/Header';

type Chuong = {
  TenChuong: string;
  ThuTu: number;
};


export default function Page() {
  const [chuong, setChuong] = useState<Chuong[] | null>(null);
  
    useEffect(() => {
      fetch("http://127.0.0.1:8000/api/chuong")
        .then(res => res.json())
        .then(res => {
          if (res.success) {
            setChuong(res.data);
          }
        })
        .catch(err => console.error(err));
    }, []);
  
    

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [headerData, setHeaderData] = useState({
    unit: 'Chương 1',
    title: 'Order food 2',
    color: 'blue-400'
  });
  const colors = ['blue-400', 'purple-400', 'yellow-400','green-400','orange-400'];

  const handleLessonPathInView = (label: string, pathId: number, color: string) => {
    setHeaderData({
      unit: `Chương ${pathId}`,
      title: label,
      color: color,
    });
  };

  if (!chuong) {
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
      {chuong.map((chuongcon,index) => {
        return (
          <LessonPath 
          nodes={[
            { type: 'lesson', status: 'active' },
            { type: 'lesson', status: 'locked' },
            { type: 'chest', status: 'locked' },
            { type: 'lesson', status: 'locked' },
            { type: 'trophy', status: 'locked' },
          ]}
          pathId={chuongcon.ThuTu}
          label={chuongcon.TenChuong}
          onInView={handleLessonPathInView}
          color={colors[chuongcon.ThuTu - 1]}
        />
        );
      })}

       
      </div>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}