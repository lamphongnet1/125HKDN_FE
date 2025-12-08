'use client';

import React from 'react';
import { CompleteSentenceProps } from '../../types/quiz.types';

export default function CompleteSentenceQuiz({
  sentence,
  translation,
  words,
  selectedWords,
  onSelectWord,
  onRemoveWord,
}: CompleteSentenceProps) {
  return (
    <div>
      <div className="text-purple-500 font-bold mb-3 text-sm">
        HOÀN THÀNH CÂU
      </div>
      <h2 className="text-2xl font-bold mb-2">
        Sắp xếp các từ để tạo thành câu hoàn chỉnh
      </h2>
      <p className="text-gray-600 mb-6">
        {translation} ({sentence})
      </p>
      
      {/* Answer Area */}
      <div className="mb-8 p-6 bg-gray-50 rounded-xl min-h-[80px] flex flex-wrap gap-2 items-center justify-center border-2 border-dashed border-gray-300">
        {selectedWords.length === 0 ? (
          <span className="text-gray-400">Chọn các từ bên dưới</span>
        ) : (
          selectedWords.map((word, index) => (
            <button
              key={index}
              onClick={() => onRemoveWord(index)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              {word}
            </button>
          ))
        )}
      </div>

      {/* Word Options */}
      <div className="flex justify-center flex-wrap gap-3">
        {words.map((word, index) => {
          const isUsed = selectedWords.includes(word);
          return (
            <button
              key={index}
              onClick={() => !isUsed && onSelectWord(word)}
              disabled={isUsed}
              className={`
                border-2 px-6 py-3 text-lg rounded-xl cursor-pointer transition-all duration-200
                ${isUsed 
                  ? 'bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed' 
                  : 'bg-white text-black border-gray-300 hover:border-green-500 hover:bg-green-50'
                }
              `}
            >
              {word}
            </button>
          );
        })}
      </div>
    </div>
  );
}