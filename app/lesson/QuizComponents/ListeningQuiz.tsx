'use client';

import React from 'react';
import { ListeningQuizProps } from '../../types/quiz.types';

export default function ListeningQuiz({
  question,
  options,
  audioUrl,
  selectedAnswer,
  onSelectAnswer,
}: ListeningQuizProps) {
  const handlePlayAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    } else {
      console.log('Phát âm thanh');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">{question}</h2>

      <div className="flex justify-center mb-8">
        <button
          onClick={handlePlayAudio}
          className="bg-blue-500 border-none rounded-2xl p-6 text-3xl text-white cursor-pointer shadow-lg transition-transform duration-100 hover:scale-110 active:scale-95"
        >
          🔊
        </button>
      </div>

      <div className="flex justify-center flex-wrap gap-3">
        {options.map((option: string) => (
          <button
            key={option}
            onClick={() => onSelectAnswer(option)}
            className={`
              border-2 px-6 py-4 text-xl rounded-xl cursor-pointer transition-all duration-200
              ${selectedAnswer === option 
                ? 'bg-green-500 text-white border-green-500' 
                : 'bg-white text-black border-gray-300 hover:border-green-500 hover:bg-green-50'
              }
            `}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

