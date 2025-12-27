'use client';

import React, { useMemo } from 'react';
import { ImageChoiceProps } from '../../types/quiz.types';

export default function ImageChoiceQuiz({
  CauHoi,
  DuongDanA,
  DuongDanB,
  DuongDanC,
  DuongDanD,
  selectedAnswer,
  onSelectAnswer,
}: ImageChoiceProps) {
  // Tạo mảng options từ các props DuongDan
  const options = useMemo(() => {
    const optionList = [];
    if (DuongDanA) {
      optionList.push({
        value: 'A',
        imageUrl: DuongDanA,
        label: 'A',
      });
    }
    if (DuongDanB) {
      optionList.push({
        value: 'B',
        imageUrl: DuongDanB,
        label: 'B',
      });
    }
    if (DuongDanC) {
      optionList.push({
        value: 'C',
        imageUrl: DuongDanC,
        label: 'C',
      });
    }
    if (DuongDanD) {
      optionList.push({
        value: 'D',
        imageUrl: DuongDanD,
        label: 'D',
      });
    }
    return optionList;
  }, [DuongDanA, DuongDanB, DuongDanC, DuongDanD]);

  return (
    <div>
      <div className="text-purple-500 font-bold mb-3 text-sm">
        CHỌN HÌNH ẢNH
      </div>
      <h2 className="text-2xl font-bold mb-6">{CauHoi}</h2>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
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
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 font-bold">
                  {option.label}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}