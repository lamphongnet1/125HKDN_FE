'use client';

import React, { useState } from 'react';
import { LessonPath } from './components/LessonPath';
import { Modal } from './components/Modal';
import { Header } from './components/Header';

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [headerData, setHeaderData] = useState({
    section: 'SECTION 1',
    unit: 'UNIT 1',
    title: 'Order food 2',
    color: 'blue-400'
  });
  const colors = ['blue-400', 'purple-400', 'yellow-400'];

  const handleLessonPathInView = (label: string, pathId: number, color: string) => {
    setHeaderData({
      section: 'SECTION 1',
      unit: `UNIT ${pathId}`,
      title: label,
      color: color,
    });
  };

  return (
    <div className='w-full'>
      <div className="sticky top-0 z-50 bg-white">
        <div className="h-[20px]"></div>
        <Header 
          section={headerData.section}
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
        
       
      <div className="max-w-3xl mx-auto p-8 border-2 border-gray-300 rounded-3xl bg-white">
  <div className="text-center space-y-4">
    <div className="inline-block px-4 py-1.5 bg-gray-200 text-gray-400 text-sm font-bold rounded-lg uppercase tracking-wide">
      UP NEXT
    </div>
    <div className="flex items-center justify-center gap-3 text-gray-500">
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
      </svg>
      <h2 className="text-3xl font-bold">Section 2</h2>
    </div>
    <p className="text-gray-400 text-lg px-8">
      Learn words, phrases, and grammar concepts for basic interactions
    </p>
    <div className="pt-4">
      <button className="cursor-pointer w-full max-w-2xl px-8 py-4 bg-white border-2 border-gray-300 rounded-2xl text-blue-500 font-bold text-lg hover:bg-gray-50 transition-colors">
        JUMP HERE?
      </button>
    </div>
  </div>
</div>
      </div>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}