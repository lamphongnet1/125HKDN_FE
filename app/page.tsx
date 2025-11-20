'use client';

import React, { useState } from 'react';
import { LessonPath } from './components/LessonPath';
import { Modal } from './components/Modal';
import { Header } from './components/Header';

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Header nếu không đưa vào layout */}
      <Header 
        section="SECTION 1"
        unit="UNIT 1"
        title="Order food"
      />

      <div className="max-w-2xl mx-auto">
        <LessonPath onLessonClick={() => setIsModalOpen(true)} />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
