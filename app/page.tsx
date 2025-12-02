'use client';

import React, { useState } from 'react';
import { LessonPath } from './components/LessonPath';
import { Modal } from './components/Modal';
import { Header } from './components/Header';
import Mascot from './components/Mascot'; // Import component Mascot của bạn

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
      <div className='w-full'>
        <Header 
          section="SECTION 1"
          unit="UNIT 1"
          title="Order food"
        />

        <div className="relative mx-auto">
          <LessonPath 
            nodes={[
              { type: 'lesson', status: 'active' },
              { type: 'lesson', status: 'locked' },
              { type: 'chest', status: 'locked' },
              { type: 'lesson', status: 'locked' },
              { type: 'trophy', status: 'locked' },
            ]}
            pathId = {1}
            onLessonClick={() => setIsModalOpen(true)} 
            label="Order food"
          />
          <LessonPath 
            nodes={[
              { type: 'lesson', status: 'active' },
              { type: 'lesson', status: 'locked' },
              { type: 'chest', status: 'locked' },
              { type: 'lesson', status: 'locked' },
              { type: 'trophy', status: 'locked' },
            ]}
            pathId = {2}
            onLessonClick={() => setIsModalOpen(true)} 
            label="Order food"
          />
          <LessonPath 
            nodes={[
              { type: 'lesson', status: 'active' },
              { type: 'lesson', status: 'locked' },
              { type: 'chest', status: 'locked' },
              { type: 'lesson', status: 'locked' },
              { type: 'trophy', status: 'locked' },
            ]}
            pathId = {3}
            onLessonClick={() => setIsModalOpen(true)} 
            label="Order food"
          />
          <Mascot 
            src="/animations/piggy_bank_dancing.lottie"
            className="absolute bottom-60 right-4 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 z-50"
        />
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
  );
}
