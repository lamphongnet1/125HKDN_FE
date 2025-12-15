'use client';

import React, { useState } from 'react';
import { LessonPath } from './components/LessonPath';
import { Modal } from './components/Modal';
import { Header } from './components/Header';

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [headerData, setHeaderData] = useState({
    unit: 'Chương 1',
    title: 'Order food 2',
    color: 'blue-400'
  });
  const colors = ['blue-400', 'purple-400', 'yellow-400'];

  const handleLessonPathInView = (label: string, pathId: number, color: string) => {
    setHeaderData({
      unit: `Chương ${pathId}`,
      title: label,
      color: color,
    });
  };

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
        <LessonPath 
          nodes={[
            { type: 'lesson', status: 'active' },
            { type: 'lesson', status: 'locked' },
            { type: 'chest', status: 'locked' },
            { type: 'lesson', status: 'locked' },
            { type: 'trophy', status: 'locked' },
          ]}
          pathId={1}
          label="Order food"
          onInView={handleLessonPathInView}
          color={colors[0]}
        />
        <LessonPath 
          nodes={[
            { type: 'lesson', status: 'active' },
            { type: 'lesson', status: 'locked' },
            { type: 'chest', status: 'locked' },
            { type: 'lesson', status: 'locked' },
            { type: 'trophy', status: 'locked' },
          ]}
          pathId={2}
          label="Order food 2"
          onInView={handleLessonPathInView}
          color={colors[1]}
        />
        <LessonPath 
          nodes={[
            { type: 'lesson', status: 'active' },
            { type: 'lesson', status: 'locked' },
            { type: 'chest', status: 'locked' },
            { type: 'lesson', status: 'locked' },
            { type: 'trophy', status: 'locked' },
          ]}
          pathId={3}
          label="Order food 3"
          onInView={handleLessonPathInView}
          color={colors[2]}
        />
      </div>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}