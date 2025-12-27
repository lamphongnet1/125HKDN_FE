'use client';

import { FillBlankProps } from '../../types/quiz.types';

export default function FillBlankQuiz({
  CauHoi,
  CauMau,
  ManhGhepA,
  ManhGhepB,
  ManhGhepC,
  ManhGhepD,
  onAnswerChange
}: FillBlankProps) {
  return (
    <div>
      <div className="text-purple-500 font-bold mb-3 text-sm">
        ĐIỀN VÀO CHỖ TRỐNG
      </div>

      <h2 className="text-2xl font-bold mb-4">{CauHoi}</h2>

      <p className="text-xl mb-6">{CauMau}</p>

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-6">
        {[ManhGhepA, ManhGhepB, ManhGhepC, ManhGhepD].map((item) => (
          <button
            key={item}
            onClick={() => onAnswerChange(item)}
            className="px-4 py-3 border rounded-lg hover:bg-green-100"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
