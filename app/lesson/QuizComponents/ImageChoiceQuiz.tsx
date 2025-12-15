'use client';

import React from 'react';
import { ImageChoiceProps } from '../../types/quiz.types';

export default function ImageChoiceQuiz({
  label,
  question,
  options,
  selectedAnswer,
  onSelectAnswer,
}: ImageChoiceProps) {
  return (
    <div>
      {label && (
        <div className="text-purple-500 font-bold mb-3 text-sm">{label}</div>
      )}
      <h2 className="text-2xl font-bold mb-6">{question}</h2>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {options.map((option) => {
          const isSelected = selectedAnswer === option.value;
          return (
            <button
              key={option.value}
              onClick={() => onSelectAnswer(option.value)}
              className={`w-full relative rounded-2xl border-2 p-3 text-left transition-all duration-200 hover:shadow-lg focus:outline-none
                ${
                  isSelected
                    ? 'border-green-500 shadow-green-200 shadow-lg'
                    : 'border-gray-200 hover:border-green-400'
                }`}
            >
              <div className="w-full overflow-hidden rounded-xl mb-3 bg-gray-50">
                <img
                  src={option.imageUrl}
                  alt={option.label}
                  className="w-full h-32 md:h-40 object-cover"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold">{option.label}</div>
                {option.number && (
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 font-bold">
                    {option.number}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

