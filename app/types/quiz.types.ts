export interface QuizQuestion {
  ID_Cau: number;
  ThuTu: number;
  LoaiCauHoi:
    | 'nghehoithoai'
    | 'nghexepcau'
    | 'dientu'
    | 'tracnghiem'
    | 'chonanh'
    | 'video';
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
  DapAnDung?: string;
  children: React.ReactNode;
  onSkip: () => void;
  onCheck: () => void;
  onContinue: () => void;
}

export interface MultipleChoiceProps {
  CauHoi: string;
  DapAnA: string;
  DapAnB: string;
  DapAnC: string;
  DapAnD: string;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
}

export interface ListeningQuizProps {
  CauHoi: string;
  DapAnA: string;
  DapAnB: string;
  DuongDanAudio?: string;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
}

export interface FillBlankProps {
  CauHoi: string;
  CauMau: string;
  ManhGhepA: string;
  ManhGhepB: string;
  ManhGhepC: string;
  ManhGhepD: string;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
}

export interface CompleteSentenceProps {
  DuongDanAudio: string;
  ManhGhepA: string;
  ManhGhepB: string;
  ManhGhepC: string;
  ManhGhepD: string;
  selectedWords: string[];
  onSelectWord: (word: string) => void;
  onRemoveWord: (index: number) => void;
}


export interface ImageChoiceProps {
  CauHoi: string;
  DuongDanA: string;
  DuongDanB: string;
  DuongDanC: string;
  DuongDanD: string;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
}

export interface VideoChoiceProps {
  CauHoi: string;
  DuongDanVideo: string;
  DapAnA: string;
  DapAnB: string;
  DapAnC: string;
  DapAnD: string;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
}