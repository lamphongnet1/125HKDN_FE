export interface QuizQuestion {
  id: string;
  type:
    | 'multiple-choice'
    | 'listening'
    | 'fill-blank'
    | 'complete-sentence'
    | 'image-choice'
    | 'video-choice';
  data: any;
}

export interface QuizPageLayoutProps {
  lives: number;
  progress: number;
  currentQuestion: number;
  totalQuestions: number;
  canCheck: boolean;
  showResult: boolean;
  isCorrect: boolean;
  correctAnswer?: string;
  meaning?: string;
  children: React.ReactNode;
  onSkip: () => void;
  onCheck: () => void;
  onContinue: () => void;
}

export interface MultipleChoiceProps {
  label?: string;
  question: string;
  options: string[];
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
}

export interface ListeningQuizProps {
  question: string;
  options: string[];
  audioUrl?: string;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
}

export interface FillBlankProps {
  question: string;
  placeholder?: string;
  answer: string;
  onAnswerChange: (answer: string) => void;
}

export interface CompleteSentenceProps {
  sentence: string;
  translation: string;
  words: string[];
  selectedWords: string[];
  onSelectWord: (word: string) => void;
  onRemoveWord: (index: number) => void;
}

export interface ImageOption {
  value: string;
  label: string;
  imageUrl: string;
  number?: number | string;
}

export interface ImageChoiceProps {
  label?: string;
  question: string;
  options: ImageOption[];
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
}

export interface VideoChoiceProps {
  label?: string;
  question: string;
  videoUrl: string;
  options: string[];
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
}