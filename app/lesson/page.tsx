// app/quiz/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import MultipleChoiceQuiz from './QuizComponents/MultipleChoiceQuiz';
import ListeningQuiz from './QuizComponents/ListeningQuiz';
import FillBlankQuiz from './QuizComponents/FillBlankQuiz';
import CompleteSentenceQuiz from './QuizComponents/CompleteSentenceQuiz';
import ImageChoiceQuiz from './QuizComponents/ImageChoiceQuiz';
import VideoChoiceQuiz from './QuizComponents/VideoChoiceQuiz';
import { QuizQuestion } from '../types/quiz.types';

export default function QuizPage() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [lives, setLives] = useState(5);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [fillBlankAnswer, setFillBlankAnswer] = useState('');
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const baiHocId = searchParams.get('baihoc') || searchParams.get('id');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        // Fetch từ API - endpoint: /api/baihoc/{id}/cauhoichitiet
        const id = baiHocId || '1'; // Tạm thời dùng 1 để test, sau này sẽ lấy từ URL params
        const url = `http://127.0.0.1:8000/api/baihoc/${id}/cauhoichitiet`;
        
        const response = await fetch(url);
        const result = await response.json();
        
        if (result.success && result.data) {
          setQuestions(result.data);
        } else {
          console.error('Failed to fetch questions:', result);
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [baiHocId]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-5 bg-white rounded-xl">
        <div className="text-center py-10">Đang tải dữ liệu...</div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="max-w-3xl mx-auto p-5 bg-white rounded-xl">
        <div className="text-center py-10">Không có câu hỏi nào.</div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  // Lấy đáp án đúng từ DapAnDung
  const correctAnswerText = currentQuestion.data.DapAnDung || '';

  const meaningText = currentQuestion.data.meaning || '';

  const canCheck = () => {
    if (!currentQuestion) return false;
    
    if (
      currentQuestion.LoaiCauHoi === 'tracnghiem' ||
      currentQuestion.LoaiCauHoi === 'nghehoithoai' ||
      currentQuestion.LoaiCauHoi === 'chonanh' ||
      currentQuestion.LoaiCauHoi === 'video'
    ) {
      return selectedAnswer !== null;
    } else if (currentQuestion.LoaiCauHoi === 'dientu') {
      return fillBlankAnswer.trim() !== '';
    } else if (currentQuestion.LoaiCauHoi === 'nghexepcau') {
      return selectedWords.length > 0;
    }
    return false;
  };

  const handleCheck = () => {
    if (!currentQuestion) return;
    
    let correct = false;
    const correctAnswer = currentQuestion.data.DapAnDung;

    if (currentQuestion.LoaiCauHoi === 'tracnghiem') {
      // tracnghiem: selectedAnswer là text của đáp án (DapAnA, DapAnB, etc.), DapAnDung cũng là text
      correct = selectedAnswer === correctAnswer;
    } else if (currentQuestion.LoaiCauHoi === 'nghehoithoai') {
      // nghehoithoai: selectedAnswer là text của đáp án (DapAnA, DapAnB), DapAnDung cũng là text
      correct = selectedAnswer === correctAnswer;
    } else if (currentQuestion.LoaiCauHoi === 'chonanh') {
      // chonanh: selectedAnswer là 'A', 'B', 'C', 'D' (value), DapAnDung cũng là 'A', 'B', 'C', 'D'
      correct = selectedAnswer === correctAnswer;
    } else if (currentQuestion.LoaiCauHoi === 'video') {
      // video: selectedAnswer là text của đáp án (DapAnA, DapAnB, etc.), DapAnDung cũng là text
      correct = selectedAnswer === correctAnswer;
    } else if (currentQuestion.LoaiCauHoi === 'dientu') {
      // dientu: fillBlankAnswer là text người dùng chọn từ ManhGhep, DapAnDung là text đúng
      correct = fillBlankAnswer.trim().toLowerCase() === (correctAnswer || '').toLowerCase();
    } else if (currentQuestion.LoaiCauHoi === 'nghexepcau') {
      // nghexepcau: Parse DapAnDung thành array để so sánh với selectedWords
      const correctWords = correctAnswer ? correctAnswer.split(' ').filter((w: string) => w.trim() !== '') : [];
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
    if (!currentQuestion) return null;

    switch (currentQuestion.LoaiCauHoi) {
      case 'tracnghiem':
        return (
          <MultipleChoiceQuiz
            CauHoi={currentQuestion.data.CauHoi}
            DapAnA={currentQuestion.data.DapAnA}
            DapAnB={currentQuestion.data.DapAnB}
            DapAnC={currentQuestion.data.DapAnC}
            DapAnD={currentQuestion.data.DapAnD}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={setSelectedAnswer}
          />
        );

      case 'nghehoithoai':
        return (
          <ListeningQuiz
            CauHoi={currentQuestion.data.CauHoi}
            DapAnA={currentQuestion.data.DapAnA}
            DapAnB={currentQuestion.data.DapAnB}
            DuongDanAudio={currentQuestion.data.DuongDanAudio}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={setSelectedAnswer}
          />
        );

      case 'dientu':
        return (
          <FillBlankQuiz
            CauHoi={currentQuestion.data.CauHoi}
            CauMau={currentQuestion.data.CauMau}
            ManhGhepA={currentQuestion.data.ManhGhepA}
            ManhGhepB={currentQuestion.data.ManhGhepB}
            ManhGhepC={currentQuestion.data.ManhGhepC}
            ManhGhepD={currentQuestion.data.ManhGhepD}            
            onAnswerChange={setFillBlankAnswer}
          />
        );

      case 'nghexepcau':
        return (
          <CompleteSentenceQuiz
            DuongDanAudio={currentQuestion.data.DuongDanAudio}
            ManhGhepA={currentQuestion.data.ManhGhepA}
            ManhGhepB={currentQuestion.data.ManhGhepB}
            ManhGhepC={currentQuestion.data.ManhGhepC}
            ManhGhepD={currentQuestion.data.ManhGhepD}
            selectedWords={selectedWords}
            onSelectWord={(word) => setSelectedWords([...selectedWords, word])}
            onRemoveWord={(index) => setSelectedWords(selectedWords.filter((_, i) => i !== index))}
          />
        );

      case 'chonanh':
        return (
          <ImageChoiceQuiz
            CauHoi={currentQuestion.data.CauHoi}
            DuongDanA={currentQuestion.data.DuongDanA}
            DuongDanB={currentQuestion.data.DuongDanB}
            DuongDanC={currentQuestion.data.DuongDanC}
            DuongDanD={currentQuestion.data.DuongDanD}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={setSelectedAnswer}
          />
        );

      case 'video':
     
        return (
          <VideoChoiceQuiz
            CauHoi={currentQuestion.data.CauHoi}
            DuongDanVideo={currentQuestion.data.DuongDanVideo}
            DapAnA={currentQuestion.data.DapAnA}
            DapAnB={currentQuestion.data.DapAnB}
            DapAnC={currentQuestion.data.DapAnC}
            DapAnD={currentQuestion.data.DapAnD}
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
          <button
            onClick={() => router.push('/learn')}
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
