'use client';

import { MultipleChoiceProps } from '../../types/quiz.types';

export default function MultipleChoiceQuiz({
  CauHoi,
  DapAnA,
  DapAnB,
  DapAnC,
  DapAnD,
  selectedAnswer,
  onSelectAnswer,
}: MultipleChoiceProps) {
  return (
    <div>
        <div className="text-purple-500 font-bold mb-3 text-sm">
           CHỌN ĐÁP ÁN ĐÚNG
        </div>
      
      <h2 className="text-2xl font-bold mb-8">{CauHoi}</h2>

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
          <button
            key={DapAnC}
            onClick={() => onSelectAnswer(DapAnC)}
            className={`
              border-2 px-6 py-4 text-xl rounded-xl cursor-pointer transition-all duration-200
              ${selectedAnswer === DapAnC
                ? 'bg-green-500 text-white border-green-500' 
                : 'bg-white text-black border-gray-300 hover:border-green-500 hover:bg-green-50'
              }
            `}
          >
            {DapAnC}
          </button>
          <button
            key={DapAnD}
            onClick={() => onSelectAnswer(DapAnD)}
            className={`
              border-2 px-6 py-4 text-xl rounded-xl cursor-pointer transition-all duration-200
              ${selectedAnswer === DapAnD
                ? 'bg-green-500 text-white border-green-500' 
                : 'bg-white text-black border-gray-300 hover:border-green-500 hover:bg-green-50'
              }
            `}
          >
            {DapAnD}
          </button>
      </div>
    </div>
  );
}