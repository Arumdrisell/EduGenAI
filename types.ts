export enum Subject {
  KOREAN = '국어',
  MATH = '수학',
  ENGLISH = '영어',
  SOCIAL = '사회',
  SCIENCE = '과학'
}

export enum Difficulty {
  EASY = '쉬움',
  NORMAL = '보통',
  HARD = '어려움'
}

export interface ExamConfig {
  grade: number;
  semester: number;
  subject: Subject;
  unit: string;
  difficulty: Difficulty;
  questionCount: number;
  apiKey?: string; // Optional user override
}

export interface Question {
  id: string; // Generated on client side for keying
  listeningText?: string | null;
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  svgImage?: string | null;
}

export interface ExamResult {
  score: number;
  userAnswers: Record<string, string>; // questionId -> answer
  questions: Question[];
}

export interface CurriculumUnit {
  grade: number;
  semester: number;
  subjects: {
    [key in Subject]?: string[];
  };
}