'use client';

import React from 'react';
import { MultipleChoiceProps } from '../../types/quiz.types';

export default function MultipleChoiceQuiz({
  label,
  question,
  options,
  selectedAnswer,
  onSelectAnswer,
}: MultipleChoiceProps) {
  return (
    <div>
      {label && (
        <div className="text-purple-500 font-bold mb-3 text-sm">
          {label}
        </div>
      )}
      <h2 className="text-2xl font-bold mb-8">{question}</h2>

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