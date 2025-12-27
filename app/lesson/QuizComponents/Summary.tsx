'use client';

import React from 'react';

interface SummaryProps {
  totalPoints: number;
  totalQuestions: number;
  onNextLesson: () => void;
  onRetry: () => void;
}

export default function Summary({
  totalPoints,
  totalQuestions,
  onNextLesson,
  onRetry,
}: SummaryProps) {
  const passed = totalPoints >= 30;

  return (
    <div className="max-w-3xl mx-auto p-5 bg-white rounded-xl">
      <div className="text-center py-10">
        {/* Icon */}
        <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center text-5xl ${
          passed ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
        }`}>
          {passed ? '🎉' : '📚'}
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-4">
          {passed ? 'Chúc mừng!' : 'Cần cố gắng thêm'}
        </h1>

        {/* Points Display */}
        <div className="mb-8">
          <div className="text-6xl font-bold mb-2 text-green-600">
            {totalPoints}
          </div>
          <div className="text-gray-600 text-lg">
            điểm / {totalQuestions * 10} điểm
          </div>
        </div>

        {/* Message */}
        <div className="mb-8 text-gray-700">
          {passed ? (
            <p className="text-xl">
              Bạn đã hoàn thành bài học với số điểm xuất sắc! 🎊
            </p>
          ) : (
            <p className="text-xl">
              Bạn cần đạt ít nhất 30 điểm để tiếp tục. Hãy làm lại để cải thiện kết quả nhé!
            </p>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-8">
          {passed ? (
            <button
              onClick={onNextLesson}
              className="px-12 py-4 bg-green-600 text-white rounded-xl font-bold text-lg cursor-pointer transition-all duration-200 hover:bg-green-700 shadow-lg hover:shadow-xl"
            >
              LÀM BÀI TIẾP THEO
            </button>
          ) : (
            <button
              onClick={onRetry}
              className="px-12 py-4 bg-orange-600 text-white rounded-xl font-bold text-lg cursor-pointer transition-all duration-200 hover:bg-orange-700 shadow-lg hover:shadow-xl"
            >
              LÀM LẠI
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

