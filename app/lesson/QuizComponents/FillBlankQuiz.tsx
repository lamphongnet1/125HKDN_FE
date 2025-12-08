'use client';

import { FillBlankProps } from '../../types/quiz.types';

export default function FillBlankQuiz({ 
  question, 
  placeholder = "Nhập câu trả lời...", 
  answer, 
  onAnswerChange 
}: FillBlankProps) {
  return (
    <div>
      <div className="text-purple-500 font-bold mb-3 text-sm">
        ĐIỀN VÀO CHỖ TRỐNG
      </div>
      <h2 className="text-2xl font-bold mb-8">
        {question}
      </h2>
      
      <div className="flex justify-center">
        <input
          type="text"
          value={answer}
          onChange={(e) => onAnswerChange(e.target.value)}
          placeholder={placeholder}
          className="w-full max-w-md px-6 py-4 text-xl border-2 border-gray-300 rounded-xl focus:outline-none focus:border-green-500 transition-colors"
        />
      </div>
    </div>
  );
}
