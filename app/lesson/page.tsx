// app/quiz/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MultipleChoiceQuiz from './QuizComponents/MultipleChoiceQuiz';
import ListeningQuiz from './QuizComponents/ListeningQuiz';
import FillBlankQuiz from './QuizComponents/FillBlankQuiz';
import CompleteSentenceQuiz from './QuizComponents/CompleteSentenceQuiz';
import ImageChoiceQuiz from './QuizComponents/ImageChoiceQuiz';
import VideoChoiceQuiz from './QuizComponents/VideoChoiceQuiz';
import { QuizQuestion } from '../types/quiz.types';

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [lives, setLives] = useState(5);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [fillBlankAnswer, setFillBlankAnswer] = useState('');
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const router = useRouter();
  const questions: QuizQuestion[] = [
    {
      id: '1',
      type: 'multiple-choice',
      data: {
        label: 'CHỌN ĐÁP ÁN ĐÚNG',
        question: 'Đâu là "NƯỚC"?',
        options: ['みず', 'おちゃ', 'ください'],
        correctAnswer: 'みず',
        meaning: 'Nước'
      }
    },
    {
      id: '2',
      type: 'listening',
      data: {
        question: 'Nghe và chọn đáp án',
        options: ['みず', 'すし', 'ごはん', 'ください', 'おちゃ'],
        correctAnswer: 'ごはん',
        meaning: 'Cơm',
        audioUrl: undefined
      }
    },
    {
      id: '3',
      type: 'fill-blank',
      data: {
        question: 'Từ tiếng Nhật có nghĩa là "Cảm ơn" là gì?',
        correctAnswer: 'ありがとう',
        meaning: 'Cảm ơn'
      }
    },
    {
      id: '4',
      type: 'complete-sentence',
      data: {
        sentence: 'みず と ごはん を ください',
        translation: 'Hãy cho tôi nước và cơm',
        words: ['みず', 'と', 'ごはん', 'を', 'ください'],
        correctAnswer: ['みず', 'と', 'ごはん', 'を', 'ください'],
        meaning: 'Hãy cho tôi nước và cơm'
      }
    },
    {
      id: '5',
      type: 'image-choice',
      data: {
        label: 'TỪ VỰNG MỚI',
        question: 'Đâu là "cơm"?',
        options: [
          {
            value: 'ごはん',
            label: 'ごはん',
            imageUrl:
              'https://media.istockphoto.com/id/1748480431/vi/vec-to/c%C6%A1m-n%E1%BA%A5u-trong-m%E1%BB%99t-c%C3%A1i-b%C3%A1t-b%E1%BB%8B-c%C3%B4-l%E1%BA%ADp-tr%C3%AAn-n%E1%BB%81n-tr%E1%BA%AFng.jpg?s=612x612&w=0&k=20&c=c2cGCbofrjy51HA-xNWywogq2AM_TUKE7VztLpTs2fw=',
            number: 1
          },
          {
            value: 'おちゃ',
            label: 'おちゃ',
            imageUrl:
              'https://i.pinimg.com/736x/61/6f/af/616faf6bf1b054071243f5690f98d89e.jpg',
            number: 2
          },
          {
            value: 'みず',
            label: 'みず',
            imageUrl:
              'https://tse4.mm.bing.net/th/id/OIP.kTzTuzO_iuwF0nMUY8lskQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
            number: 3
          }
        ],
        correctAnswer: 'ごはん',
        meaning: 'Cơm'
      }
    },
    {
      id: '6',
      type: 'video-choice',
      data: {
        label: 'CÂU NÓI CHỦ ĐỀ',
        question: 'Xin cho tôi trà',
        videoUrl: '/videos/xin_cho_toi_tra.mp4',
        options: ['みず ください', 'ごはん ください', 'おちゃ ください'],
        correctAnswer: 'おちゃ ください',
        meaning: 'Xin cho tôi trà'
      }
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const correctAnswerText = Array.isArray(currentQuestion.data.correctAnswer)
    ? currentQuestion.data.correctAnswer.join(' ')
    : currentQuestion.data.correctAnswer;

  const meaningText = currentQuestion.data.meaning;

  const canCheck = () => {
    if (
      currentQuestion.type === 'multiple-choice' ||
      currentQuestion.type === 'listening' ||
      currentQuestion.type === 'image-choice' ||
      currentQuestion.type === 'video-choice'
    ) {
      return selectedAnswer !== null;
    } else if (currentQuestion.type === 'fill-blank') {
      return fillBlankAnswer.trim() !== '';
    } else if (currentQuestion.type === 'complete-sentence') {
      return selectedWords.length > 0;
    }
    return false;
  };

  const handleCheck = () => {
    let correct = false;

    if (
      currentQuestion.type === 'multiple-choice' ||
      currentQuestion.type === 'listening' ||
      currentQuestion.type === 'image-choice' ||
      currentQuestion.type === 'video-choice'
    ) {
      correct = selectedAnswer === currentQuestion.data.correctAnswer;
    } else if (currentQuestion.type === 'fill-blank') {
      correct = fillBlankAnswer.trim().toLowerCase() === currentQuestion.data.correctAnswer.toLowerCase();
    } else if (currentQuestion.type === 'complete-sentence') {
      const correctWords = Array.isArray(currentQuestion.data.correctAnswer)
        ? currentQuestion.data.correctAnswer
        : [currentQuestion.data.correctAnswer];

      correct = JSON.stringify(selectedWords) === JSON.stringify(correctWords);
    }

    setIsCorrect(correct);
    setShowResult(true);

    if (!correct) {
      setLives(prev => Math.max(0, prev - 1));
    }
  };

  const handleContinue = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      router.push('/learn');
      setCurrentQuestionIndex(0);
      setLives(5);
    }

    setSelectedAnswer(null);
    setFillBlankAnswer('');
    setSelectedWords([]);
    setShowResult(false);
    setIsCorrect(false);
  };

  const handleSkip = () => handleContinue();

  const renderQuizContent = () => {
    switch (currentQuestion.type) {
      case 'multiple-choice':
        return (
          <MultipleChoiceQuiz
            label={currentQuestion.data.label}
            question={currentQuestion.data.question}
            options={currentQuestion.data.options}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={setSelectedAnswer}
          />
        );

      case 'listening':
        return (
          <ListeningQuiz
            question={currentQuestion.data.question}
            options={currentQuestion.data.options}
            audioUrl={currentQuestion.data.audioUrl}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={setSelectedAnswer}
          />
        );

      case 'fill-blank':
        return (
          <FillBlankQuiz
            question={currentQuestion.data.question}
            answer={fillBlankAnswer}
            onAnswerChange={setFillBlankAnswer}
          />
        );

      case 'complete-sentence':
        return (
          <CompleteSentenceQuiz
            sentence={currentQuestion.data.sentence}
            translation={currentQuestion.data.translation}
            words={currentQuestion.data.words}
            selectedWords={selectedWords}
            onSelectWord={(word) => setSelectedWords([...selectedWords, word])}
            onRemoveWord={(index) => setSelectedWords(selectedWords.filter((_, i) => i !== index))}
          />
        );

      case 'image-choice':
        return (
          <ImageChoiceQuiz
            label={currentQuestion.data.label}
            question={currentQuestion.data.question}
            options={currentQuestion.data.options}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={setSelectedAnswer}
          />
        );

      case 'video-choice':
        return (
          <VideoChoiceQuiz
            label={currentQuestion.data.label}
            question={currentQuestion.data.question}
            videoUrl={currentQuestion.data.videoUrl}
            options={currentQuestion.data.options}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={setSelectedAnswer}
          />
        );

      default:
        return <div>Lỗi: Loại câu hỏi không xác định.</div>;
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-5 bg-white rounded-xl">

      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-red-500 font-bold text-lg">
            <span className="mr-1">❤️</span>
            <span>{lives}</span>
          </div>

          <button
            onClick={handleSkip}
            className="text-gray-400 hover:text-gray-600 font-bold text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="text-center text-gray-500 text-sm mt-2">
          Câu {currentQuestionIndex + 1} / {questions.length}
        </div>
      </div>

      {/* Quiz content */}
      <div className="min-h-[360px]">
        {renderQuizContent()}
      </div>

      {/* Bottom actions */}
      {!showResult ? (
        <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-200">
          <button
            onClick={handleSkip}
            className="px-6 py-3 rounded-xl border-2 border-gray-300 bg-white text-gray-600 font-bold cursor-pointer transition-all duration-200 hover:bg-gray-100 hover:border-gray-400"
          >
            BỎ QUA
          </button>

          <button
            onClick={handleCheck}
            disabled={!canCheck()}
            className={`px-8 py-3 rounded-xl border-none font-bold cursor-pointer transition-all duration-200
              ${canCheck()
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
          >
            KIỂM TRA
          </button>
        </div>
      ) : (
        <div className={`
          w-full rounded-xl flex items-center gap-5 justify-between p-4 mt-8
          ${isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}
        `}>
          <div className={`
            w-14 h-14 bg-white rounded-full flex justify-center items-center text-2xl shrink-0
            ${isCorrect ? 'text-green-600' : 'text-red-600'}
          `}>
            {isCorrect ? '✔' : '✖'}
          </div>

          <div className="flex-1">
            <div className="text-xl font-bold">
              {isCorrect ? 'Tuyệt quá!' : 'Đáp án đúng:'}
            </div>

            {!isCorrect && (
              <>
                <div className="text-lg mt-1 font-semibold">
                  {correctAnswerText}
                </div>

                {meaningText && (
                  <div className="text-sm mt-2">
                    <strong>Nghĩa là:</strong> {meaningText}
                  </div>
                )}
              </>
            )}
          </div>

          <button
            onClick={handleContinue}
            className={`
              px-8 py-3 border-none text-white rounded-xl cursor-pointer font-bold transition-all duration-200 shrink-0
              ${isCorrect ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
            `}
          >
            TIẾP TỤC
          </button>
        </div>
      )}

    </div>
  );
}
