'use client';

import React from 'react';
import { VideoChoiceProps } from '../../types/quiz.types';

export default function VideoChoiceQuiz({
  label,
  question,
  videoUrl,
  options,
  selectedAnswer,
  onSelectAnswer,
}: VideoChoiceProps) {
  return (
    <div>
      {label && (
        <div className="text-purple-500 font-bold mb-3 text-sm">{label}</div>
      )}
      <h2 className="text-2xl font-bold mb-6">{question}</h2>

      <div className="rounded-2xl overflow-hidden shadow-md mb-6">
        <video
          controls
          muted
          className="w-full max-h-[360px] bg-black"
          src={videoUrl}
        >
          Trình duyệt của bạn không hỗ trợ video.
        </video>
      </div>

      <div className="flex flex-col gap-3">
        {options.map((option) => {
          const isSelected = selectedAnswer === option;
          return (
            <button
              key={option}
              onClick={() => onSelectAnswer(option)}
              className={`w-full text-left border-2 px-6 py-4 text-lg rounded-xl cursor-pointer transition-all duration-200
                ${
                  isSelected
                    ? 'bg-green-500 text-white border-green-500'
                    : 'bg-white text-black border-gray-300 hover:border-green-500 hover:bg-green-50'
                }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

