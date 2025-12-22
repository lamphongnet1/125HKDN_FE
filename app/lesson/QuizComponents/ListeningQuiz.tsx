'use client';

import React from 'react';
import { ListeningQuizProps } from '../../types/quiz.types';

export default function ListeningQuiz({
  CauHoi,
  DapAnA,
  DapAnB,
  DuongDanAudio,
  // PhuDe,
  selectedAnswer,
  onSelectAnswer,
}: ListeningQuizProps) {
  const handlePlayAudio = () => {
    if (DuongDanAudio) {
      const audio = new Audio(DuongDanAudio);
      audio.play();
    } else {
      console.log('Phát âm thanh');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">{CauHoi}</h2>

      <div className="flex justify-center mb-8">
        <button
          onClick={handlePlayAudio}
          className="bg-blue-500 border-none rounded-2xl p-6 text-3xl text-white cursor-pointer shadow-lg transition-transform duration-100 hover:scale-110 active:scale-95"
        >
          🔊
        </button>
      </div>

      <div className="flex justify-center flex-wrap gap-3">
        
          <button
            key={DapAnA}
            onClick={() => onSelectAnswer(DapAnA)}
            className={`
              border-2 px-6 py-4 text-xl rounded-xl cursor-pointer transition-all duration-200
              ${selectedAnswer === DapAnA 
                ? 'bg-green-500 text-white border-green-500' 
                : 'bg-white text-black border-gray-300 hover:border-green-500 hover:bg-green-50'
              }
            `}
          >
            {DapAnA}
          </button>
          <button
            key={DapAnB}
            onClick={() => onSelectAnswer(DapAnB)}
            className={`
              border-2 px-6 py-4 text-xl rounded-xl cursor-pointer transition-all duration-200
              ${selectedAnswer === DapAnB 
                ? 'bg-green-500 text-white border-green-500' 
                : 'bg-white text-black border-gray-300 hover:border-green-500 hover:bg-green-50'
              }
            `}
          >
            {DapAnB}
          </button>
      </div>
    </div>
  );
}

