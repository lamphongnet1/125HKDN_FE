'use client';

import React, { useMemo } from 'react';
import { VideoChoiceProps } from '../../types/quiz.types';

export default function VideoChoiceQuiz({
  CauHoi,
  DuongDanVideo,
  DapAnA,
  DapAnB,
  DapAnC,
  DapAnD,
  selectedAnswer,
  onSelectAnswer,
}: VideoChoiceProps) {
  const options = useMemo(() => {
    const optionList = [];
    if (DapAnA) optionList.push(DapAnA);
    if (DapAnB) optionList.push(DapAnB);
    if (DapAnC) optionList.push(DapAnC);
    if (DapAnD) optionList.push(DapAnD);
    return optionList;
  }, [DapAnA, DapAnB, DapAnC, DapAnD]);

  return (
    <div>
      <div className="text-purple-500 font-bold mb-3 text-sm">CHỌN ĐÁP ÁN</div>
      <h2 className="text-2xl font-bold mb-6">{CauHoi}</h2>

      {DuongDanVideo && (
        <div className="rounded-2xl overflow-hidden shadow-md mb-6">
          <video
            controls
            muted
            className="w-full max-h-[360px] bg-black"
            src={DuongDanVideo}
          >
            Trình duyệt của bạn không hỗ trợ video.
          </video>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          return (
            <button
              key={index}
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